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
        // this.initEvents()
    }

    //initiates physics and colliders
    init() {
        this.gravity = 1000;
        this.speed = 150

        this.body.setGravityY(this.gravity)
        this.setCollideWorldBounds(true);
        this.setOrigin(0.5, 1)
        this.setImmovable(true)
        this.setSize(this.width, this.height)
    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    // create() {
    //     this.slimeAnims("green_slime");
    //     this.play("slime_jump");
    //     this.setBounce(1);
    //     this.body.setSize(100, 45);

    //     this.scene.tweens.add({
    //         targets: this,
    //         x: 1550,
    //         flipX: true,
    //         ease: "Linear",
    //         duration: 9000,
    //         repeat: -1,
    //         yoyo: true
    //     }).play();
    // }

    // update () {
    //     this.scene.physics.add.overlap(this, this.npcPlayer, () => {
    //         console.log("hitou o slime");
    //     });
    // }

    // animate slimes movement
    slimeAnims(slime_name) {   
        this.anims.create({
        key: "slime_jump",
        frames: this.anims.generateFrameNumbers(slime_name, {start: 0, end: 2}),
        frameRate: 3,
        repeat:-1
        });
    }
}