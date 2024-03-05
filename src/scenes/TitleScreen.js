export default class TitleScreen extends Phaser.Scene {
  constructor() {
    super("titleScreen");
  }

  preload() {
    this.load.image('sky', 'assets/titleScreen/sky.png');
    this.load.image('title', 'assets/titleScreen/title.png');
    this.load.image('hills', 'assets/titleScreen/hills.png');
    this.load.image('clouds', 'assets/titleScreen/clouds.png');
    this.load.image('foreground', 'assets/titleScreen/foreground.png');
    this.load.image('cloudCover', 'assets/titleScreen/cloudCover.png');
    this.load.spritesheet("play", "assets/titleScreen/play_x4.png", { frameWidth: 192, frameHeight: 52 });
    this.load.spritesheet("music", "assets/titleScreen/music_x4.png", { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet("settings", "assets/titleScreen/settings_x4.png", { frameWidth: 64, frameHeight: 64 });
    this.load.audio("musicSound", "assets/musicSound.ogg");
  }

  create() {
    this.sky = this.add.image(0, 0, "sky").setOrigin(0, 0).setScale(1.5);
    this.cloudCover = this.add.image(0, -50, "cloudCover").setOrigin(0, 0).setScale(1.12);
    this.clouds = this.add.image(0, -80, "clouds").setOrigin(0, 0).setScale(1.12);
    this.title = this.add.image(250, 120, "title").setOrigin(0, 0);
    this.hills = this.add.image(0, -100, "hills").setOrigin(0, 0).setScale(1.12);
    this.foreground = this.add.image(0, -100, "foreground").setOrigin(0, 0).setScale(1.12);
    //const musicSound = this.sound.add("musicSound", {loop: true, volume: 0.2});
    

    const playButton = this.add.sprite(533, 320, 'play', 0).setOrigin(0, 0).setScale(1.2);
    const musicButton = this.add.sprite(686, 400, 'music', 0).setOrigin(0, 0).setScale(1.2);
    const settingsButton = this.add.sprite(533, 400, 'settings', 0).setOrigin(0, 0).setScale(1.2);

    playButton.setInteractive();
    playButton.on('pointerover', () => {
        // Change the frame to 1 when mouse is over
        playButton.setFrame(1);
        this.globalMusic.play();

    //starts music
    this.ambientSound();
    });

    playButton.on('pointerout', () => {
        // Change the frame back to 0 when mouse is out
        playButton.setFrame(0);
    });

    playButton.on('pointerdown', () => {
      // Call the startGame function when the button is clicked
      this.preloadGame();
    });

    let isMusicToggled = false;
    musicButton.setInteractive();
    musicButton.on('pointerdown', () => {
      isMusicToggled = !isMusicToggled

      isMusicToggled ? musicButton.setFrame(0) : musicButton.setFrame(1)
    });
  }

  preloadGame() {
    this.scene.start("preload")
  }

  // ambientSound() {
  //   this.globalMusic = scene.sound.add("musicSound", {loop: true, volume: 0.2});
  //   this.globalMusic.play();
  // }
}
