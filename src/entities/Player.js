import initAnimations from "./playerAnims.js";
import collidable from "../mixins/collidable.js";

export default class Player extends Phaser.Physics.Arcade.Sprite {
  static instanceCount = 0;

  constructor(scene, x, y, selectedPlayer, oldPlayer) {
    super(scene, x, y);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    Object.assign(this, collidable);
    // Which player art will be used as sprite
    if (selectedPlayer) this.selectedPlayer = selectedPlayer;

    // Set old player properties when recreating
    if (oldPlayer) this.oldPlayer = oldPlayer;
    else this.oldPlayer = false;

    // Track how many Npc is in the scene
    Player.instanceCount++;

    this.init();
    this.initEvents();
  }

  init() {
    // Controls
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.dashKey = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.W
    );

    // Player properties
    this.setDepth(1);
    this.gravity = this.oldPlayer.gravity || 1000;
    this.body.setGravityY(this.gravity);
    this.playerSpeed = this.oldPlayer.playerSpeed || 250;
    this.jumpSpeed = this.oldPlayer.jumpSpeed || 600;
    this.jumpCount = this.oldPlayer.jumpCount || 0;
    this.consecutiveJumps = this.oldPlayer.consecutiveJumps || 1;
    this.dashSpeed = this.oldPlayer.dashSpeed || 2000;
    this.canDash = this.oldPlayer.canDash || false;
    this.dashDuration = this.oldPlayer.dashDuration || 500;
    this.damage = this.oldPlayer.damage || 0;

    // Sounds
    this.createSounds(this.scene)

    // Allow update (prevent player from moving)
    this.updateEnabled = true;

    // Collider
    this.setSize(40, 115);
    this.body.setOffset(110, 70);
    this.setCollideWorldBounds(true);

    // This if is just to not recriate animations.
    if (Player.instanceCount <= 1)
      initAnimations(this.scene.anims, this.selectedPlayer);
  }

  createSounds(scene) {
    this.jumpSound = scene.sound.add('jump_sound', {loop: false, volume: 0.2, rate: 1.5})
    switch (this.scene.sys.settings.key) {
      case "level1":
        this.walkSound = scene.sound.add("floor_sound", {loop: false, volume: 0.2, rate: 0.55});
        break;
      case "level2":
        this.walkSound = scene.sound.add("grass_sound", {loop: false, volume: 0.8, rate: 0.65});
        break;
      // add mais dps
      default:
        break;
    }
  }

  initEvents() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  pauseUpdate() {
    this.updateEnabled = false;
    this.setVelocityX(0);
    this.play('player_idle')
  }

  resumeUpdate() {
    this.updateEnabled = true;
  }

  update() {
    // If player update is paused, do nothing
    if (!this.updateEnabled) {
      return;
    }

    const { left, right, down, up } = this.cursors;
    const isWJustDown = Phaser.Input.Keyboard.JustDown(this.dashKey);
    const isUpJustDown = Phaser.Input.Keyboard.JustDown(up);
    const onFloor = this.body.onFloor();

    this.playerVelocityY = this.body.velocity.y;

    // Movement and movement sound logic
    if (left.isDown) {
      this.setFlip(true, false);
      this.setVelocityX(-this.playerSpeed);
      this.play("player_run", true);
      if (!this.walkSound.isPlaying)
        this.walkSound.play();
    } else if (right.isDown) {
      this.setFlip(false, false);
      this.setVelocityX(this.playerSpeed);
      this.play("player_run", true);
      if (!this.walkSound.isPlaying)
        this.walkSound.play();
    } else {
      this.setVelocityX(0);
      this.play("player_idle", true);
        this.walkSound.pause();
    }

    // stops walking sounds when player jumps
    if (!onFloor && this.walkSound.isPlaying) this.walkSound.pause()

    // Jump logic
    if (isUpJustDown && (onFloor || this.jumpCount < this.consecutiveJumps)) {
      this.jumpCount++;
      this.setVelocityY(-this.jumpSpeed)
      this.jumpSound.play()
    }

    // Animation logic for jumping and falling
    if (!onFloor) {
      this.play("player_jump", true);
      if (this.playerVelocityY > 0) this.play("player_fall", true);
    }
    // Reset jump count and dash availability on landing
    if (onFloor) {
      this.jumpCount = 0;
      this.canDash = true;
    }
  }
}
