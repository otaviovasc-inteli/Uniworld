export default class Preload extends Phaser.Scene {
  constructor() {
    super("preload");
  }

  preload() {
    this.load.image("bg1", "assets/level1/back.png");

    // Room
    // this.load.tilemapTiledJSON('room', 'assets/room/sceneInterior.json');
    // this.load.image('tileset1', 'assets/level1/Tile-SetsDoor.png');
    // this.load.image('tileset2', 'assets/level1/Tile-SetsIntern.png');

    // Level 1
    this.load.tilemapTiledJSON('map1', 'assets/level1/map01v2.json');
    this.load.image('tileset1', 'assets/level1/terrainGrass16.png');
    this.load.image('tileset2', 'assets/level1/cenario01_16x4.png');


    this.load.spritesheet("npc1_talk", "assets/npc/npc_talk.png", { frameWidth: 256, frameHeight: 160 });
    this.load.spritesheet("player_fall", "assets/player/fall.png", { frameWidth: 256, frameHeight: 160 });
    this.load.spritesheet("player_jump", "assets/player/jump.png", { frameWidth: 256, frameHeight: 160 });
    this.load.spritesheet("player_run", "assets/player/run.png", { frameWidth: 256, frameHeight: 160 });
    this.load.spritesheet("player_idle", "assets/player/idle.png", { frameWidth: 256, frameHeight: 160 });
  }

  create() {
    this.scene.start("playGame")
  }
}
