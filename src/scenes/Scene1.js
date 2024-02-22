export default class Scene1 extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  create () {
    this.add.image(0, -200, "bg1").setScale(1.12).setOrigin(0, 0);

    // Add map and layers
    const map = this.createMap();
    const layers = this.createLayers(map);

    // Add player object
    this.player = this.createPlayer();
    this.playerSpeed = 200;

    // Collider player with platforms
    this.physics.add.collider(this.player, layers.platforms);

    // Say that our keyboard cursor will be a input
    this.cursors = this.input.keyboard.createCursorKeys();
    this.interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);



    // Animate the sprites
    this.anims.create({
      key: 'player_run',
      frames: this.anims.generateFrameNumbers('player_run', { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'player_idle',
      frames: this.anims.generateFrameNumbers('player_idle', { start: 0, end: 5 }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: 'player_jump',
      frames: this.anims.generateFrameNumbers('player_jump', { start: 0, end: 1 }),
      frameRate: 2,
      repeat: -1
    });

    this.anims.create({
      key: 'player_fall',
      frames: this.anims.generateFrameNumbers('player_fall', { start: 0, end: 1 }),
      frameRate: 2,
      repeat: -1
    });

    this.anims.create({
      key: 'npc1_talk',
      frames: this.anims.generateFrameNumbers('npc1_talk', { start: 0, end: 6 }),
      frameRate: 4,
      repeat: -1
    });

    // this.physics.add.collider(this.player, this.platforms);
    // this.physics.add.collider(this.npc1, this.platforms);

    // // Play the sprite animation
    this.player.anims.play('player_idle');
    // this.npc1.anims.play('npc1_talk');
  }


  update() {

    const { left, right, down } = this.cursors
    const spaceBar = this.spaceBar
    const interactKey = this.interactKey

    this.playerVelocityY = this.player.body.velocity.y;


    // If 'left' walks left and play animation, if not moving play "player idle"
    if (left.isDown) {
      this.player.setFlip(true, false);
      this.player.setVelocityX(-this.playerSpeed);
      this.player.anims.play('player_run', true);
    }
    else if (right.isDown) {
      this.player.setFlip(false, false);
      this.player.setVelocityX(this.playerSpeed);
      this.player.anims.play('player_run', true);
    }
    else {
      this.player.setVelocityX(0);
      this.player.anims.play('player_idle', true);
    }

    // Jump movement
    if (spaceBar.isDown && this.player.body.touching.down)
      this.player.setVelocityY(-this.playerSpeed);

    // Jump and fall animation
    if (!this.player.body.touching.down)
    {
      this.player.anims.play('player_jump', true);
      if (!this.player.body.touching.down && this.playerVelocityY > 0)
        this.player.anims.play('player_fall', true);
    }


    // Interact with npc
    // if (this.physics.overlap(this.player, this.npc1) && Phaser.Input.Keyboard.JustDown(this.interactKey)) {
    //   showDialogue("Bem vindo a Unilever\nAqui voce vai aprender os\nprincipais pontos da empresa.");
    // }
    // else if (!this.physics.overlap(this.player, this.npc1))
    // {
    //   hideDialogue()
    // }
  }

  createMap() {
    const map = this.make.tilemap({key: 'map1'});
    map.addTilesetImage('terrainGrass16', 'tileset1');
    map.addTilesetImage('cenario01_16x4', 'tileset2');
    return map;
  }

  createLayers(map) {
    const tileset1 = map.getTileset('terrainGrass16')
    const tileset2 = map.getTileset('cenario01_16x4')
    const environment = map.createLayer('bg', tileset2).setScale(0.4);
    const platforms = map.createLayer('platform', tileset1).setScale(0.4);

    platforms.setCollisionByExclusion(-1, true);

    return { environment, platforms };
  }

  createPlayer() {
    const player = this.physics.add.sprite(100, 250, 'player_idle').setScale(0.7);
    player.body.setGravityY(1000);
    player.setSize(40, 110);
    player.setCollideWorldBounds(true);
    return player
  }
}
