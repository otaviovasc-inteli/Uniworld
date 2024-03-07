import collidable from "../mixins/collidable";

class Slime extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, `Slime`);

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
        this.SlimeSpeed = 250;
        this.setCollideWorldBounds(true);
    }

    tweensMovement(slime, x) {
        this.Slime.move = this.tweens.add({
            targets: slime,
            x: x,
            ease: "Linear", // add (falar heitor)
            duration: 1800,
            repeat: -1,
            yoyo: true,
          });
        if(x === slime.x) {
            slime.setFlip(true, false);
        }
    }

    create() {
        this.slimeVerde = this.physics.add.sprite("green_slime"); 
        this.slimeRoxo = this.physics.add.sprite("purple_slime");

        this.slimeAnims("greenSlime_jump", "green_slime", 0, 2, 12);
        this.slimeAnims("purpleSlime_jump", "purple_slime", 0, 2, 12);
        }

    update () {
        this.enemyFollows();
        this.slimesOverlap();
    }

    // animate slimes movement
    slimeAnims(enemy, spriteSheet, initFrame, endFrame, frameRate) {   
        this.anims.create({
        key: enemy,
        frames: this.anims.generateFrameNumbers(spriteSheet, {start:initFrame, end:endFrame}),
        frameRate:frameRate,
        repeat:-1
        });
    }

    // makes the slime follow player
    // slimeFollows (slimes, playerSelecionado) {
    //     if (aaa) { // (talvez) se o qualquer slimes aparecer na tela, ele segue o player
    //         this.physics.moveToObject(slimes, playerSelecionado, 100);
    //     }
    // }

    //overlap that works for both slimes, green and purple
    slimesOverlap (slimes, playerSelecionado) {
        if (this.scenes.physics.overlap(slimes, playerSelecionado)) {
            doDamage()
        }
    }

    // doDamage(player, slime){
    //     console.log(player);
    // }
}