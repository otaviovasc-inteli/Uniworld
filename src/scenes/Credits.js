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
    // add the background
    this.sky = this.add.image(0, 0, "sky").setOrigin(0, 0).setScale(1.5);
    this.cloudCover = this.add
      .image(0, -50, "cloudCover")
      .setOrigin(0, 0)
      .setScale(1.12);
    this.clouds = this.add
      .image(0, -80, "clouds")
      .setOrigin(0, 0)
      .setScale(1.12);
    this.title = this.add.image(250, 120, "title").setOrigin(0, 0);
    this.hills = this.add
      .image(0, -100, "hills")
      .setOrigin(0, 0)
      .setScale(1.12);
    this.foreground = this.add
      .image(0, -100, "foreground")
      .setOrigin(0, 0)
      .setScale(1.12);

    this.add.image(640, 450, "credit_space").setScale(0.5);
    this.botaoVoltar = this.add.image(640, 660, "botao_voltar", 0);

    this.add.text(390, 290, "Integrantes do Grupo:", {font: "40px"});
    this.names = [
      this.add.text(510, 370, "Raphael Silva", {font: "40px"}),
      this.add.text(460, 400, "Igor Sampaio Silva", {font: "40px"}),
      this.add.text(505, 430, "Thiago Volcati", {font: "40px"}),
      this.add.text(515, 460, "David Deodato", {font: "40px"}),
      this.add.text(460, 490, "Otávio Vasconcelos", {font: "40px"}),
      this.add.text(510, 520, "Marlos Guedes", {font: "40px"}),
      this.add.text(480, 550, "Ricardo Redondas", {font: "40px"}),
    ];
    //this.names.setInteractive();
    //this.names.forEach(name => {
        
    //});

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
      this.scene.start("titleScreen", { titleMusicObject: this.titleMusic });
    });
  }
}
