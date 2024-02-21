class Scene1 extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  create () {
    this.add.image(0, 0, "bg1").setOrigin(0, 0);

    // // Add tilesets
    // const map = this.make.tilemap({key: 'platforms1'});
    // const tileset1 = map.addTilesetImage('platforms');

    // create platforms
    this.platforms = this.physics.add.staticGroup();
    for (let index = 0; index < 30; index++) {
      this.platforms.create(64 * index, 710, 'floor').setScale(1).refreshBody();
      if (index>10)
        this.platforms.create(64 * index, 400, 'floor').setScale(1).refreshBody();
    }

    // Add player and npc config hitbox
    this.npc1 = this.physics.add.sprite(1100, 310, 'npc1_talk').setScale(1);
    this.npc1.setSize(140, 110);
    this.npc1.setFlip(true, false);
    this.player = this.physics.add.sprite(100, 500, 'player_idle').setScale(1);
    this.player.setSize(40, 110);

    // Player properties, player not to run outside the canvas
    this.player.setCollideWorldBounds(true);

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


    // Say that our keyboard cursor will be a input
    this.cursors = this.input.keyboard.createCursorKeys();
    this.interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.npc1, this.platforms);

    // Play the sprite animation
    this.player.anims.play('player_idle');
    this.npc1.anims.play('npc1_talk');
  }


  update() {
    // Store player velocityY
    this.playerVelocityY = this.player.body.velocity.y;

    // If 'left' walks left and play animation, if not moving play "player idle"
    if (this.cursors.left.isDown) {
      this.player.setFlip(true, false);
      this.player.setVelocityX(-160);
      this.player.anims.play('player_run', true);
    }
    else if (this.cursors.right.isDown) {
      this.player.setFlip(false, false);
      this.player.setVelocityX(160);
      this.player.anims.play('player_run', true);
    }
    else {
      this.player.setVelocityX(0);
      this.player.anims.play('player_idle', true);
    }

    // Jump movement
    if (this.spaceBar.isDown && this.player.body.touching.down)
      this.player.setVelocityY(-600);

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

}
