class Preload extends Phaser.Scene {
  constructor() {
    super("preload");
  }

  preload() {
    this.load.image("bg1", "assets/background/back.png");
    this.load.image("floor", "assets/background/floor.png");
    // this.load.tilemapTiledJSON('platforms1', 'assets/background/platforms1.json');
    // this.load.image('tilemap1', 'assets/background/tilemap1.png')
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
