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

    // store the last attack time
    this.lastAttackTime = 0;
    this.attackInterval = 10000;
    this.isAttacking = false;
  }

  init() {
    this.gravity = 1000;
    this.speed = 150;

    this.body.setGravityY(this.gravity);
    this.setCollideWorldBounds(true);
    this.setOrigin(0.5, 1);
    this.setImmovable(true);
    this.setSize(110, 125);
    this.body.offset.y = 20;
    this.setFlipX(true);
    this.setScale(2);

  }

  initEvents() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  isAnimationPlaying(animationName) {
    return (
      this.anims.currentAnim &&
      this.anims.currentAnim.key === animationName &&
      this.anims.isPlaying
    );
  }


  update() {
    setInterval(() => {
      console.log("teste");
      this.play("boss2_attack", true);
    }, 1000);
  }
  // update(time, delta) {
  //   if (
  //     time - this.lastAttackTime >= this.attackInterval &&
  //     !this.isAttacking
  //   ) {

  //     this.lastAttackTime = time;
  //     this.isAttacking = true;
  //     console.log("ok");
  //   } else if (!this.isAnimationPlaying("boss2_attack") && this.isAttacking) {
  //     this.play("boss2_idle", true);
  //     this.isAttacking = false;
  //   }
  // }
}
