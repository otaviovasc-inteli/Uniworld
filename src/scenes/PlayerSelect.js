export default class PlayerSelect extends Phaser.Scene {
  constructor() {
    super('playerSelect')
  }

  create() {
    this.startGame()
  }

  startGame() {
    console.log('Start level 1');
    this.scene.start("level1", { playerSelecionado: 'player selecionado'})
  }
}
