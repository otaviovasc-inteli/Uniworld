import initAnimations from './playerAnims.js'
import collidable from '../mixins/collidable.js'

export default class Player extends Phaser.Physics.Arcade.Sprite {
  static instanceCount = 0;

  constructor(scene, x, y, oldPlayer) {
    super(scene, x, y, `player_idle`)
    scene.add.existing(this);
    scene.physics.add.existing(this);
    Object.assign(this, collidable);

    if (oldPlayer)
      this.oldPlayer = oldPlayer
    else
      this.oldPlayer = false

    // Track how many Npc is in the scene
    Player.instanceCount++;

    this.init()
    this.initEvents()
  }

  init() {
    // Controls
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.dashKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

    // Player properties
    this.setDepth(1);
    this.gravity = this.oldPlayer.gravity || 1000
    this.body.setGravityY(this.gravity);

    this.playerSpeed = this.oldPlayer.playerSpeed || 250;
    this.jumpSpeed = this.oldPlayer.jumpSpeed || 550;
    this.jumpCount = this.oldPlayer.jumpCount || 0;
    this.consecutiveJumps = this.oldPlayer.consecutiveJumps || 1;
    this.dashSpeed = this.oldPlayer.dashSpeed || 2000;
    this.canDash = this.oldPlayer.canDash || false;
    this.dashDuration = this.oldPlayer.dashDuration || 500;

    this.damage = this.oldPlayer.damage || 0;

    // Collider
    this.setSize(40, 124);
    this.setCollideWorldBounds(true);

    // This if is just to not recriate animations.
    if(Player.instanceCount <= 1)
      initAnimations(this.scene.anims)
  }

  initEvents() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
  }

  update() {
    const { left, right, down, up } = this.cursors;
    const isWJustDown = Phaser.Input.Keyboard.JustDown(this.dashKey);
    const isUpJustDown = Phaser.Input.Keyboard.JustDown(up);
    const onFloor = this.body.onFloor();

    this.playerVelocityY = this.body.velocity.y;

    // Movement logic
    if (left.isDown) {
        this.setFlip(true, false);
        this.setVelocityX(-this.playerSpeed);
        this.play('player_run', true);
    } else if (right.isDown) {
        this.setFlip(false, false);
        this.setVelocityX(this.playerSpeed);
        this.play('player_run', true);
    } else {
        this.setVelocityX(0);
        this.play('player_idle', true);
    }

    // Increase gravity when pressing down
    if (down.isDown)
      this.body.setGravityY(this.gravity * 3)
    else
      this.body.setGravityY(this.gravity);

    // Jump logic
    if (isUpJustDown && (onFloor || this.jumpCount < this.consecutiveJumps)) {
      this.setVelocityY(-this.jumpSpeed);
      this.jumpCount++;
    }

    // Animation logic for jumping and falling
    if (!onFloor) {
      this.play('player_jump', true);
      if (this.playerVelocityY > 0)
        this.play('player_fall', true);
    }

    // Reset jump count and dash availability on landing
    if (onFloor) {
      this.jumpCount = 0;
      this.canDash = true;
    }
  }
}
