import collidable from "../../mixins/collidable.js";
import initAnimations from "./anims/SlimeAnims.js";

export default class Slime extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, name, key) {
        super(scene, x, y, key);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.name = name

        // Mixins
        Object.assign(this, collidable)

        this.init();
        this.initEvents();

        // Create Slime anims
        Slime.instanceCount++
        if (Slime.instanceCount <= 1)
          initAnimations(this.scene.anims);
    }

    init() {
        this.gravity = 1000;
        this.speed = 150

        this.body.setGravityY(this.gravity);
        this.setCollideWorldBounds(true);
        this.setOrigin(0.5, 1);
        this.setImmovable(true);
        this.setSize(120, 76.8);
        this.setScale(0.6);
        this.body.offset.x = 0;
        this.body.offset.y = 0;
    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    update() {
        // set slime movements
        if (this.body.onFloor()) {
          this.play(`${this.name}_jump`, true);
          this.setVelocityX(0);
          this.setVelocityY(0);
          this.scene.time.delayedCall(400, () => {
            this.setVelocityY(-200);
            this.play(`${this.name}_idle`, true);
            this.setVelocityX(-50);
          });
        }
      }
}
