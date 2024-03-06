import collidable from "../mixins/collidable";

class Gosma extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, `Gosma`);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        //Mixins
        Object.assign(this, collidable);

        this.init();
        this.initEvents();
    }

    init() {
        this.gravity = 1000;
        this.body.setGravityY(this.gravity);
        this.gosmaSpeed = 250;
        this.setCollideWorldBounds(true);
    }

    tweensMovement(x, enemy) {
        this.Gosma.move = this.tweens.add({
            targets: enemy,
            x: x,
            ease: 0, // add (falar heitor)
            duration: 1800,
            repeat: -1,
            yoyo: true,
          });
        //this.Gosma.setFlip(true, false);
    }

    create() {
        this.Gosma = this.physics.add.sprite('gosma_verde'); 

        this.anims.create({
            key: 'pulo_gosma', // nome da animação
            frames: this.anims.generateFrameNumbers('gosma_verde', {start:0, end:2}),
            frameRate:3,
            repeat:-1
        });
    }

    update () {
        //uodate de movimentação
    }
}