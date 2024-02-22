export default class Preload extends Phaser.Scene {
  constructor() {
    super("preload");
  }

  preload() {
    this.load.image("bg1", "assets/level2/back.png");

    // level1
    this.load.tilemapTiledJSON('level1', 'assets/level1/sceneInterior.json');
    this.load.image('level1_t1', 'assets/level1/level1_t1.png');
    this.load.image('level1_t2', 'assets/level1/level1_t2.png');
    this.load.image('level1_t3', 'assets/level1/level1_t3.png');

    // Level2
    this.load.tilemapTiledJSON('level2', 'assets/level2/map01v2.json');
    this.load.image('level2_t1', 'assets/level2/terrainGrass16.png');
    this.load.image('level2_t2', 'assets/level2/cenario01_16x4.png');


    this.load.spritesheet("npc1_talk", "assets/npc/npc_talk.png", { frameWidth: 256, frameHeight: 160 });
    this.load.spritesheet("player_fall", "assets/player/fall.png", { frameWidth: 256, frameHeight: 160 });
    this.load.spritesheet("player_jump", "assets/player/jump.png", { frameWidth: 256, frameHeight: 160 });
    this.load.spritesheet("player_run", "assets/player/run.png", { frameWidth: 256, frameHeight: 160 });
    this.load.spritesheet("player_idle", "assets/player/idle.png", { frameWidth: 256, frameHeight: 160 });

    this.load.once('complete', () => {
      this.startGame();
    })
  }

  startGame() {
    this.registry.set('level', 1)
    this.scene.start("playGame")
  }
}
