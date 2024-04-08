export default class CreditScreen extends Phaser.Scene {
  constructor() {
    super("creditScreen");
  }
  preload() {
    // load images used only in credits screen
    this.load.image(
      "credit_space",
      "../src/assets/creditScreen/credits_space.png"
    );
    this.load.spritesheet(
      "botao_voltar",
      "../src/assets/creditScreen/botao_voltar.png",
      { frameWidth: 192, frameHeight: 52 }
    );
  }

  create() {
    this.music = this.sys.settings.data.titleMusicObject;
    this.music.resume()

    // Adds background
    this.add.video(0, -100, "background_clouds").setOrigin(0,0).setScale(1.12).play(true).setPlaybackRate(0.7);
    this.title = this.add.image(250, 120, "title").setOrigin(0, 0);
    this.hills = this.add.image(0, -100, "hills").setOrigin(0, 0).setScale(1.12);
    this.foreground = this.add.image(0, -100, "foreground").setOrigin(0, 0).setScale(1.12);

    // Add return button image and credits background
    this.add.image(640, 450, "credit_space").setScale(0.5);
    this.botaoVoltar = this.add.image(640, 660, "botao_voltar", 0);

    // Add contributtor names and its linkedin
    this.add.text(420, 290, "Integrantes do Grupo:", { font: "35px" });
    this.add.text(500, 340, "Raphael Silva", { font: "35px" }).setInteractive().on('pointerdown', () => {window.open("https://www.linkedin.com/in/raphaelfelipesilva/")});
    this.add.text(450, 380, "Igor Sampaio Silva", { font: "35px" }).setInteractive().on('pointerdown', () => {window.open("https://www.linkedin.com/in/igor-sampaio-silva/")});
    this.add.text(495, 420, "Thiago Volcati", { font: "35px" }).setInteractive().on('pointerdown', () => {window.open("https://www.linkedin.com/in/thiago-volcati-a42a94208/")});
    this.add.text(505, 460, "David Deodato", { font: "35px" }).setInteractive().on('pointerdown', () => {window.open("https://www.linkedin.com/in/david-deodato-41b9b72b7/")});
    this.add.text(450, 500, "Otávio Vasconcelos", { font: "35px" }).setInteractive().on('pointerdown', () => {window.open("https://www.linkedin.com/in/otavio-vasconcelos-a11827208/")});
    this.add.text(500, 540, "Marlos Guedes", { font: "35px" }).setInteractive().on('pointerdown', () => {window.open("https://www.linkedin.com/in/marlos-do-carmo-guedes-366987250/")});
    this.add.text(470, 580, "Ricardo Planas", { font: "35px" }, this.url7).setInteractive().on('pointerdown', () => {window.open("https://www.linkedin.com/school/inteli-edu/")});

    this.botaoVoltar.setInteractive();
    this.botaoVoltar.on("pointerover", () => {
      // Change the frame to 1 when mouse is over
      this.botaoVoltar.setFrame(1);
    });

    this.botaoVoltar.on("pointerout", () => {
      // Change the frame back to 0 when mouse is out
      this.botaoVoltar.setFrame(0);
    });

    this.botaoVoltar.on("pointerdown", () => {
      this.sound.add("select_sound", { loop: false, volume: 0.7 }).play();
      this.music.pause()
      this.scene.start("titleScreen", { titleMusicObject: this.music });
    });
  }
}
