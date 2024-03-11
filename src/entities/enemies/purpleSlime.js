import Enemy from "./enemy.js";
import initAnimations from "./anims/SlimeAnims.js";

export default class purpleSlime extends Enemy {
    constructor(scene, x, y, slime_name) {
        super(scene, x, y, slime_name);
        initAnimations(scene.anims);
        this.initEvents();
        this.initSlime();

    }

    initSlime() {
        this.setSize(128, 76.8);
        this.setScale(.6);
        this.body.offset.x = 0
        this.body.offset.y = 0

        console.log(this.body)

    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
      }

    update() {
        this.setVelocityX(-30)
        if(this.velocityX != 0) {
            this.play("purpleSlime_jump", true)
        }
        if (this.velocityX < 0) {
            this.setFlip(true, false)
        }
    }
}