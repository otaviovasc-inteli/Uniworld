export default class Preload extends Phaser.Scene {
  constructor() {
    super("preload");
  }

  preload() {
    this.load.image("bg1", "assets/level2/back.png");
    // this.load.plugin('DialogModalPlugin', 'plugins/dialogPlugin.js');

    // playerSelect
    this.load.spritesheet("frame1F", "assets/selection/selection1F.png", { frameWidth: 256, frameHeight: 256 })
    this.load.spritesheet("frame1M", "assets/selection/selection1M.png", { frameWidth: 256, frameHeight: 256 })
    this.load.spritesheet("frame2F", "assets/selection/selection2F.png", { frameWidth: 256, frameHeight: 256 })
    this.load.spritesheet("frame2M", "assets/selection/selection2M.png", { frameWidth: 256, frameHeight: 256 })
    this.load.image("blue-bg", "assets/selection/bg-lightblue.png")

    // level1
    this.load.spritesheet("computer_sprite", "assets/level1/computer.png", { frameWidth: 320, frameHeight: 192 });
    this.load.spritesheet("rexona_sprite", "assets/level1/rexona.png", { frameWidth: 128, frameHeight: 192 });
    this.load.image('reuniaoTeams', 'assets/level1/reuniaoTeams.png');
    this.load.tilemapTiledJSON('level1', 'assets/level1/sceneInterior.json');
    this.load.image('level1_t1', 'assets/level1/level1_t1.png');
    this.load.image('level1_t2', 'assets/level1/level1_t2.png');
    this.load.image('level1_t3', 'assets/level1/level1_t3.png');

    // Level2
    this.load.tilemapTiledJSON('level2', 'assets/level2/map01v2.json');
    this.load.image('level2_t1', 'assets/level2/level2_t1.png');
    this.load.image('level2_t2', 'assets/level2/level2_t2.png');
    this.load.image('bg_cloud', 'assets/level2/background/bg-cloud.png');
    this.load.image('bg_color_blue', 'assets/level2/background/bg-color-blue.png');
    this.load.image('bg_color_green', 'assets/level2/background/bg-color-green.png');

    this.load.image('bg_foreground', 'assets/level2/background/foreground.png');
    this.load.image('bg_hills', 'assets/level2/background/hills.png');


    // Players
    this.load.spritesheet("player1", "assets/player/player1.png", { frameWidth: 256, frameHeight: 256 });
    this.load.spritesheet("player2", "assets/player/player2.png", { frameWidth: 256, frameHeight: 256 });
    this.load.spritesheet("player3", "assets/player/player3.png", { frameWidth: 256, frameHeight: 256 });
    this.load.spritesheet("player4", "assets/player/player4.png", { frameWidth: 256, frameHeight: 256 });

    this.load.spritesheet("npc1_talk", "assets/npc/npc_talk.png", { frameWidth: 256, frameHeight: 160 });
    this.load.spritesheet("player_fall", "assets/player/fall.png", { frameWidth: 256, frameHeight: 160 });
    this.load.spritesheet("player_jump", "assets/player/jump.png", { frameWidth: 256, frameHeight: 160 });
    this.load.spritesheet("player_run", "assets/player/run.png", { frameWidth: 256, frameHeight: 160 });
    this.load.spritesheet("player_idle", "assets/player/idle.png", { frameWidth: 256, frameHeight: 160 });

    this.load.once('complete', () => {
      console.log('Assets Loaded');
      this.startSelectScreen();
    })
  }

  startSelectScreen() {
    console.log('Player Select');
    this.scene.start("playerSelect")
  }
}
