import initAnimations from './playerAnims.js'
import collidable from '../mixins/collidable.js';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'player_idle')
    scene.add.existing(this);
    scene.physics.add.existing(this);

    Object.assign(this, collidable);

    this.init()
    this.initEvents()
  }

  init() {
    // Controls
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.interactKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

    this.gravity = 1000
    this.body.setGravityY(this.gravity);
    this.playerSpeed = 200;
    this.jumpCount = 0;
    this.consecutiveJumps = 1;

    this.setSize(40, 124);
    this.setCollideWorldBounds(true);

    initAnimations(this.scene.anims)
  }

  initEvents() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
  }

  update() {
    const { left, right, down, up, space } = this.cursors;
    const isSpaceJustDown = Phaser.Input.Keyboard.JustDown(space);
    const isUpJustDown = Phaser.Input.Keyboard.JustDown(up);
    const onFloor = this.body.onFloor();
    const interactKey = this.interactKey;

    this.playerVelocityY = this.body.velocity.y;

    // If 'left' walks left and play animation, if not moving play "player idle"
    if (left.isDown) {
      this.setFlip(true, false);
      this.setVelocityX(-this.playerSpeed);
      this.play('player_run', true);
    }
    else if (right.isDown) {
      this.setFlip(false, false);
      this.setVelocityX(this.playerSpeed);
      this.play('player_run', true);
    }
    else {
      this.setVelocityX(0);
      this.play('player_idle', true);
    }

    if (down.isDown)
      this.setVelocityY(this.playerSpeed * 2)

    // Jumping logics with double jumpt
    if ((isSpaceJustDown || isUpJustDown) && (onFloor || this.jumpCount < this.consecutiveJumps)) {
      this.setVelocityY(-this.playerSpeed * 1.6)
      this.jumpCount++;
    }

    // Jump and fall animation
    if (!onFloor) {
      this.play('player_jump', true);
      if (!onFloor && this.playerVelocityY > 0)
        this.play('player_fall', true);
    }

    if (onFloor)
      this.jumpCount = 0;
  }
}
