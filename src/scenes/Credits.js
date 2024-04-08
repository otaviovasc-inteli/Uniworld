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
    // adiciona o fundo
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

    // adiciona o retângulo de fundo e o botão voltar
    this.add.image(640, 440, "credit_space").setScale(0.5);
    this.botaoVoltar = this.add.image(640, 660, "botao_voltar", 0);

    // adiciona os nomes dos integrantes na tela e links do linkedin aos respectivos nomes (mudar o do ricardo)
    this.add.text(415, 275, "                Integrantes do Grupo:\n (clique nos nomes para ver os linkedins!)", { font: "bold 25px poppins", color: "#000000", stroke: "#ffffff", strokeThickness: 4});
    //this.add.text(520, 320, "clique nos nomes para ver os linkedins!", {font: "15px poppins" });
    this.add // Raphael
      .text(480, 360, "Raphael Silva - Programação", { font: "bold 25px poppins",  color: "#000000", stroke: "#ffffff", strokeThickness: 4 })
      .setInteractive()
      .on("pointerdown", () => {
        window.open("https://www.linkedin.com/in/raphaelfelipesilva/");
      });
    this.add // Igor
      .text(485, 395, "Igor Sampaio Silva - Design", { font: "bold 25px poppins",  color: "#000000", stroke: "#ffffff", strokeThickness: 4 })
      .setInteractive()
      .on("pointerdown", () => {
        window.open("https://www.linkedin.com/in/igor-sampaio-silva/");
      });
    this.add // Thiago
      .text(468, 430, "Thiago Volcati - Documentação", { font: "bold 25px poppins",  color: "#000000", stroke: "#ffffff", strokeThickness: 4 })
      .setInteractive()
      .on("pointerdown", () => {
        window.open("https://www.linkedin.com/in/thiago-volcati-a42a94208/");
      });
    this.add // David
      .text(468, 465, "David Deodato - Documentação", { font: "bold 25px poppins",  color: "#000000", stroke: "#ffffff", strokeThickness: 4 })
      .setInteractive()
      .on("pointerdown", () => {
        window.open("https://www.linkedin.com/in/david-deodato-41b9b72b7/");
      });
    this.add // Otávio
      .text(455, 500, "Otávio Vasconcelos - Programação", { font: "bold 25px poppins",  color: "#000000", stroke: "#ffffff", strokeThickness: 4 })
      .setInteractive()
      .on("pointerdown", () => {
        window.open(
          "https://www.linkedin.com/in/otavio-vasconcelos-a11827208/"
        );
      });
    this.add // Marlos
      .text(515, 535, "Marlos Guedes - Design", { font: "bold 25px poppins",  color: "#000000", stroke: "#ffffff", strokeThickness: 4 })
      .setInteractive()
      .on("pointerdown", () => {
        window.open(
          "https://www.linkedin.com/in/marlos-do-carmo-guedes-366987250/"
        );
      });
    this.add // Ricardo
      .text(515, 570, "Ricardo Planas - Design", { font: "bold 25px poppins",  color: "#000000", stroke: "#ffffff", strokeThickness: 4 })
      .setInteractive()
      .on("pointerdown", () => {
        window.open("https://www.linkedin.com/school/inteli-edu/");
      });

    this.botaoVoltar.setInteractive();
    this.botaoVoltar.on("pointerover", () => {
      // alterna o frame para 1 quando o mouse passa por cima
      this.botaoVoltar.setFrame(1);
    });

    this.botaoVoltar.on("pointerout", () => {
      // alterna o frame para 0 quando o mouse não está por cima
      this.botaoVoltar.setFrame(0);
    });

    // retorna para a tela de início quando clicado
    this.botaoVoltar.on("pointerdown", () => {
      this.sound.add("select_sound", { loop: false, volume: 0.7 }).play();
      this.scene.start("titleScreen", { titleMusicObject: this.titleMusic });
    });
  }
}
