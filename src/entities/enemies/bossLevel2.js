import collidable from "../../mixins/collidable.js";
import initAnimations from "./anims/BossAnims.js";

export default class BossLevel2 extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Mixins
    Object.assign(this, collidable);

    this.init();
    this.initEvents();

    // Create Enemy anims
    initAnimations(scene.anims);
  }

  init() {
    this.gravity = 1000;
    this.speed = 150;

    this.body.setGravityY(this.gravity);
    this.setCollideWorldBounds(true);
    this.setOrigin(0.5, 1);
    this.setImmovable(true);
    this.setSize(110, 125);
    this.body.offset.y = 10;
    this.setFlipX(true)
    this.setScale(2)
  }

  initEvents() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  update() {
    this.play("boss2_idle", true)
  }
}
