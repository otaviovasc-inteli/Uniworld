// Phaser config to instanciate game
var config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 300 },
        debug: false
    }
  },
  scene: {
      preload: preload,
      create: create,
      update: update
  }
};

// Declare variables/objects in camelCase
var player;
var cursors;
var platforms;
var npc1;
var dialogueBox;
var game = new Phaser.Game(config);

function preload() {
  // Preload all assets
  this.load.image("bg1", "assets/sprites/background/back.png");
  this.load.image("floor", "assets/sprites/background/floor.png");
  this.load.spritesheet("npc1_talk", "assets/sprites/npc/npc_talk.png", { frameWidth: 256, frameHeight: 160 });
  this.load.spritesheet("player_fall", "assets/sprites/player/fall.png", { frameWidth: 256, frameHeight: 160 });
  this.load.spritesheet("player_jump", "assets/sprites/player/jump.png", { frameWidth: 256, frameHeight: 160 });
  this.load.spritesheet("player_run", "assets/sprites/player/run.png", { frameWidth: 256, frameHeight: 160 });
  this.load.spritesheet("player_idle", "assets/sprites/player/idle.png", { frameWidth: 256, frameHeight: 160 });
}

function create() {
  // Add image background
  this.add.image(650, 350, "bg1").setScale(1.1);

  // create platforms
  platforms = this.physics.add.staticGroup();
  for (let index = 0; index < 30; index++) {
    platforms.create(64 * index, 710, 'floor').setScale(1).refreshBody();
    if (index>10)
      platforms.create(64 * index, 400, 'floor').setScale(1).refreshBody();
  }

  // Add player and npc config hitbox
  npc1 = this.physics.add.sprite(1100, 310, 'npc1_talk').setScale(1);
  npc1.setSize(110, 110);
  npc1.setFlip(true, false);
  player = this.physics.add.sprite(100, 500, 'player_idle').setScale(1);
  player.setSize(110, 110);

  // Create a dialogue box and make sure it doesnt move
  dialogueBox = this.add.text(450, 500, '', { fontSize: '32px', fill: '#fff' });
  dialogueBox.setScrollFactor(0);

  // Player properties, player not to run outside the canvas
  player.setCollideWorldBounds(true);

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
  cursors = this.input.keyboard.createCursorKeys();
  interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

  this.physics.add.collider(player, platforms);
  this.physics.add.collider(npc1, platforms);

  // Play the sprite animation
  player.anims.play('player_idle');
  npc1.anims.play('npc1_talk');

}

function update() {
  // Store player velocityY
  var playerVelocityY = player.body.velocity.y;

  // If 'left' walks left and play animation, if not moving play "player idle"
  if (cursors.left.isDown) {
    player.setFlip(true, false);
    player.setVelocityX(-160);
    player.anims.play('player_run', true);
  }
  else if (cursors.right.isDown) {
    player.setFlip(false, false);
    player.setVelocityX(160);
    player.anims.play('player_run', true);
  }
  else {
    player.setVelocityX(0);
    player.anims.play('player_idle', true);
  }

  // Jump movement
  if (cursors.up.isDown && player.body.touching.down)
    player.setVelocityY(-450);

  // Jump and fall animation
  if (!player.body.touching.down)
  {
    player.anims.play('player_jump', true);
    if (!player.body.touching.down && playerVelocityY > 0)
      player.anims.play('player_fall', true);
  }

  // Interact with npc
  if (this.physics.overlap(player, npc1) && Phaser.Input.Keyboard.JustDown(interactKey)) {
    showDialogue("Bem vindo a Unilever\nAqui voce vai aprender os\nprincipais pontos da empresa.");
  }
  else if (!this.physics.overlap(player, npc1))
  {
    hideDialogue()
  }
}

function showDialogue(message) {
  dialogueBox.setText(message);
}

function hideDialogue() {
  dialogueBox.setText('');
}
