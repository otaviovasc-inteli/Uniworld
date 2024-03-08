import collidable from "../../mixins/collidable.js";

export default class Slime extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, sprite, slimeName, player) {
        super(scene, x, y, sprite);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.npcPlayer = player
        this.name = slimeName

        //Mixins
        Object.assign(this, collidable);

        this.init();
    }

    update () {
        //this.enemyFollows();
        this.slimesOverlap("green_slime", this.npcPlayer);
    }

    //initiates physics and colliders
    init() {
        this.gravity = 1000;
        this.body.setGravityY(this.gravity);
        this.SlimeSpeed = 250;
        this.setCollideWorldBounds(true);
    }

    // animate slimes movement
    slimeAnims(slime_name) {   
        this.anims.create({
        key: "slime_jump",
        frames: this.anims.generateFrameNumbers(slime_name, {start: 0, end: 2}),
        frameRate: 3,
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
    slimesOverlap (slime_name, player) {
        this.scene.physics.overlap(slime_name, player)
    }
}