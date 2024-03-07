export default class Preload extends Phaser.Scene {
  constructor() {
    super("preload");
  }

  preload() {
    this.load.image("bg1", "assets/level2/back.png");

    // ------------------------------------------------------------------
    // playerSelect
    this.load.spritesheet("frame1F", "assets/selection/selection1F.png", { frameWidth: 256, frameHeight: 256 })
    this.load.spritesheet("frame1M", "assets/selection/selection1M.png", { frameWidth: 256, frameHeight: 256 })
    this.load.spritesheet("frame2F", "assets/selection/selection2F.png", { frameWidth: 256, frameHeight: 256 })
    this.load.spritesheet("frame2M", "assets/selection/selection2M.png", { frameWidth: 256, frameHeight: 256 })
    this.load.image("blue-bg", "assets/selection/bg-lightblue.png")
    // ------------------------------------------------------------------
    // Tutorial
    this.load.video('tutorial', 'assets/links/videoTutorial.mp4');
    // ------------------------------------------------------------------
    // level1
    this.load.spritesheet("computer_sprite", "assets/level1/computer.png", { frameWidth: 320, frameHeight: 192 });
    this.load.spritesheet("rexona_sprite", "assets/level1/rexona.png", { frameWidth: 128, frameHeight: 192 });
    this.load.image('reuniaoTeams', 'assets/level1/reuniaoTeams.png');
    this.load.tilemapTiledJSON('level1', 'assets/level1/sceneInterior.json');
    this.load.image('level1_t1', 'assets/level1/level1_t1.png');
    this.load.image('level1_t2', 'assets/level1/level1_t2.png');
    this.load.image('level1_t3', 'assets/level1/level1_t3.png');
    // ------------------------------------------------------------------
    // Level2
    this.load.tilemapTiledJSON('level2', 'assets/level2/mundo_ludico.json');
    this.load.image('level2_t1', 'assets/level2/level2_t1.png');
    this.load.image('level2_t2', 'assets/level2/level2_t2.png');
    this.load.image('bg_cloud', 'assets/level2/background/bg-cloud.png');
    this.load.image('bg_color_blue', 'assets/level2/background/bg-color-blue.png');
    this.load.image('bg_color_green', 'assets/level2/background/bg-color-green.png');
    this.load.image('bg_foreground', 'assets/level2/background/foreground.png');
    this.load.image('bg_hills', 'assets/level2/background/hills.png');
    // Hub
    this.load.spritesheet('hub_sprite', 'assets/level2/dvd_npc.png', { frameWidth: 256, frameHeight: 160 });
    this.load.image('hub_screen', 'assets/links/links_screen.png');
    this.load.image('hub_close', 'assets/links/x_button.png');

    // ------------------------------------------------------------------
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
    this.load.image("Ekey", "assets/player/E.png");

    // ------------------------------------------------------------------
    // Sound effects and music
    this.load.audio("grass_sound", "assets/sounds/level2/lvl_2_grass_walk.ogg");
    this.load.audio("floor_sound", "assets/sounds/level1/lvl_1_floor_walk.ogg");
    this.load.audio("music_level1", "assets/sounds/level1/music_level1.ogg");
    this.load.audio("open_level1", "assets/sounds/level1/open_level_1.ogg");
    this.load.audio("dialog_sound", "assets/sounds/dialog_sound.ogg");
    this.load.audio("hover_sound", "assets/sounds/hover_sound.wav");
    this.load.audio("select_sound", "assets/sounds/select_sound.wav");

    // Completed
    this.load.once('complete', () => {
      console.log('Assets Loaded');
      this.startSelectScreen();
    })
  }

  startSelectScreen() {
    console.log('Player Select');
    this.scene.start("playerSelect", {titleMusicObject: this.sys.settings.data.titleMusicObject})
  }
}
