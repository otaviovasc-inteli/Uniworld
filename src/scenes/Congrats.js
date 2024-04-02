export default class Congrats extends Phaser.Scene {
    constructor() {
      super("congrats");
    }

    create () {
        this.add.image(0, 0,'congrats_bg').setOrigin(0, 0)
    }
}
