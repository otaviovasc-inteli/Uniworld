export default class PlayerSelect extends Phaser.Scene {
  constructor() {
    super('playerSelect')
  }

  create() {
    const bg = this.add.image(0, 0, "blue-bg").setScale(10).setOrigin(0, 0);
    const title = this.add.image(250, 80, "title").setOrigin(0, 0);
    const f1 = this.add.image(240, 360, "frame1F");
    const f2 = this.add.image(510, 360, "frame2F");
    const m1 = this.add.image(770, 360, "frame1M");
    const m2 = this.add.image(1040, 360, "frame2M");

    f1.setInteractive();
    f2.setInteractive();
    m1.setInteractive();
    m2.setInteractive();

    f1.on('pointerover', () => {
        // Change the frame to 1 when mouse is over
        f1.setFrame(1);
    });

    f2.on('pointerover', () => {
        // Change the frame to 1 when mouse is over
        f2.setFrame(1);
    });

    m1.on('pointerover', () => {
      // Change the frame to 1 when mouse is over
      m1.setFrame(1);
    });

    m2.on('pointerover', () => {
      // Change the frame to 1 when mouse is over
      m2.setFrame(1);
    });

    f1.on('pointerout', () => {
      // Change the frame to 0 when mouse is over
      f1.setFrame(0);
    });

    f2.on('pointerout', () => {
      // Change the frame to 0 when mouse is over
      f2.setFrame(0);
    });

    m1.on('pointerout', () => {
      // Change the frame to 0 when mouse is over
      m1.setFrame(0);
    });

    m2.on('pointerout', () => {
      // Change the frame to 0 when mouse is over
      m2.setFrame(0);
    });

    // Click
    f1.on('pointerdown', () => {
      // Call the startGame function when the button is clicked
      this.playerSelecionado = '1'
      this.startGame(this.playerSelecionado)
    });

    f2.on('pointerdown', () => {
      // Call the startGame function when the button is clicked
      this.playerSelecionado = '2'
      this.startGame(this.playerSelecionado)
    });

    m1.on('pointerdown', () => {
      // Call the startGame function when the button is clicked
      this.playerSelecionado = '3'
      this.startGame(this.playerSelecionado)
    });

    m2.on('pointerdown', () => {
      // Call the startGame function when the button is clicked
      this.playerSelecionado = '4'
      this.startGame(this.playerSelecionado)
    });
  }

  startGame(playerSelecionado) {
    console.log('Start level 1');
    this.scene.start("level1", { playerSelecionado: playerSelecionado})
  }
}
