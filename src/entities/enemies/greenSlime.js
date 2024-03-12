import Enemy from "./enemy.js";
import initAnimations from "./anims/SlimeAnims.js";

export default class greenSlime extends Enemy {
  constructor(scene, x, y, slime_name) {
    super(scene, x, y, slime_name);
    initAnimations(scene.anims);
    this.initEvents();
    this.initSlime();
  }

  initSlime() {
    this.setSize(128, 76.8);
    this.setScale(0.6);
    this.body.offset.x = 0;
    this.body.offset.y = 0;
    this.slimeJump = false;
  }

  initEvents() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  update() {
    // set slime movements
    if (this.body.onFloor()) {
      this.play("greenSlime_idle", true);
      this.setVelocityX(0);
      this.setVelocityY(0);
      this.scene.time.delayedCall(400, () => {
        this.setVelocityY(-200);
        this.play("greenSlime_jump", true);
        this.setVelocityX(-50);
      });
    }
  }
}
