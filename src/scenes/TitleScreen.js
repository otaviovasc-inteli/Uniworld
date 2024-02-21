class TitleScreen extends Phaser.Scene {
  constructor() {
    super("titleScreen");
  }

  create() {
    this.add.text(20, 20, "Press any key to start");
    this.input.keyboard.once('keydown', this.startGame, this);
  }

  startGame() {
    this.scene.start("preload")
  }
}
