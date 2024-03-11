import Player from "../entities/Player.js";
import Enemies from "../groups/enemies.js";
import Npc from "../entities/Npc.js";

export default class Level2 extends Phaser.Scene {
  constructor() {
    super("level2");
  }

  create () {
    // Init all sounds in the level
    this.createSounds()

    // FadeIn effect
    this.cameras.main.fadeIn(2000, 30, 30, 0)

    // Add map and layers
    const map = this.createMap();
    const layers = this.createLayers(map);
    const playerZones = this.getPlayerZones(layers.playerZones);

    // Add player object and set bounds to map pass player from previous scene
    const oldPlayer = this.sys.settings.data.player;
    const player = this.createPlayer(playerZones, oldPlayer);

    // create enemies
    const enemies = this.createEnemies(layers.enemySpawns);
    
    // RexonaNpc sprite
    const dvdNpc = new Npc(this, 7420, 700, 'hub_sprite', 'hub', player)
    .setSize(100, 120)
    .setScale(1.2)

    // Set world bounds based on maps
    this.physics.world.bounds.height = map.heightInPixels;
    this.physics.world.bounds.width = map.widthInPixels;

    // Create background
    this.createBg(map)
    
    // Create decorations
    this.createEnv()

    // Collider player with platforms
    this.createPlayerColliders(player, {
      colliders: {
        platforms: layers.platforms,
    }})

    // Collider enemy with platforms
    this.createEnemyColliders(enemies, {
      colliders: {
        platforms: layers.platforms,
        player: player,

      },
    });
    this.createEndOfLevel(playerZones.end, player);
    this.setupFollowupCameraOn(player, map);
  }

  //create player in scene
  createPlayer({ start }, oldPlayer) {
    return new Player(this, start.x, start.y, oldPlayer);
  }

  //create enemy slime in scene
  createEnemies(spawnLayer) {
    const enemies = new Enemies(this);
    const enemyTypes = enemies.getTypes();
    spawnLayer.objects.forEach(spawnPoint => {
      const enemy =  new enemyTypes[spawnPoint.type](this, spawnPoint.x, spawnPoint.y);
      enemies.add(enemy);
    });

    return enemies;
  }

  // add enemy slime colliders
  createEnemyColliders(enemies, { colliders }) {
    enemies
      .addCollider(colliders.platforms)
      .addCollider(colliders.player)
  }

  // Add player colliders
  createPlayerColliders(player, { colliders }) {
    player.addCollider(colliders.platforms)
  }

  createMap() {
    const map = this.make.tilemap({ key: `level2` });
    map.addTilesetImage("level2_t1", "level2_t1");
    map.addTilesetImage("level2_t2", "level2_t2");
    map.addTilesetImage("bg-color-green", "bg_color_green");
    return map;
  }

  createLayers(map) {
    // Add tilesets
    const tileset1 = map.getTileset("level2_t1");
    const tileset2 = map.getTileset("level2_t2");
    const tileset3 = map.getTileset("bg-color-green");

    // create layers
    const env = map.createLayer("env", tileset2);
    const platforms = map.createLayer("platforms", tileset1);
    map.createLayer("bg-color-green", tileset3).setDepth(-9);
    const playerZones = map.getObjectLayer("player_zones");
    const enemySpawns = map.getObjectLayer("enemy_spawns");

    platforms.setCollisionByExclusion(-1, true);

    return { env, platforms, playerZones, enemySpawns };
  }

  // Create background for assets and set its positions
  createBg(map) {
    const bgSkyObject = map.getObjectLayer('bg-sky').objects[0]
    this.bgSky =this.add.tileSprite(bgSkyObject.x - 300, bgSkyObject.y, bgSkyObject.width, bgSkyObject.height, 'bg_color_blue')
      .setDepth(-10)
      .setOrigin(0, 1)
      .setScrollFactor(0, 1)
      .setScale(7)

    const bgCloudObject = map.getObjectLayer('bg-cloud').objects[0]
    this.bgCloud = this.add.tileSprite(bgCloudObject.x - 300, bgCloudObject.y, bgCloudObject.width, bgCloudObject.height, 'bg_cloud')
      .setDepth(-9)
      .setOrigin(0, 1)
      .setScrollFactor(0, 1)
      .setScale(1.2)

    const bgHillsObject = map.getObjectLayer('bg-hills').objects[0]
    this.bgHills = this.add.tileSprite(bgHillsObject.x - 300, bgHillsObject.y, bgHillsObject.width, bgHillsObject.height, 'bg_hills')
      .setDepth(-8)
      .setOrigin(0, 1)
      .setScrollFactor(0, 1)
      .setScale(1.7)

    const bgForeGroundObject = map.getObjectLayer('bg-foreground').objects[0]
    this.bgForeGround = this.add.tileSprite(bgForeGroundObject.x - 300, bgForeGroundObject.y, bgForeGroundObject.width, bgForeGroundObject.height, 'bg_foreground')
      .setDepth(-7)
      .setOrigin(0, 1)
      .setScrollFactor(0, 1)
      .setScale(1.7)
  }

  // Return the start and end zone from Tiled
  getPlayerZones(playerZonesLayer) {
    const playerZones = playerZonesLayer.objects;
    return {
      start: playerZones.find((zone) => zone.name === "startZone"),
      end: playerZones.find((zone) => zone.name === "endZone"),
    };
  }

  // Uses endZone from Tiled and change level when overlapping
  createEndOfLevel(end, player) {
    const endOfLevel = this.physics.add
      .sprite(end.x, end.y, "end")
      .setSize(5, 400)
      .setAlpha(0);

    this.physics.add.overlap(player, endOfLevel, () => {
      console.log("start level3");
    });
  }

  setupFollowupCameraOn(player, map) {
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
    this.cameras.main.startFollow(player, true)
    this.cameras.main.setZoom(0.7);
  }

  // Handle sounds logics
  createSounds() {
    //starts playing music
    this.musicSound = this.sound.add("music_level2", {loop: true, volume: 0.2});

    // start playing music if not playing already
    if (!this.musicSound.isPlaying)
      this.musicSound.play();
  }

  update() {
    this.bgCloud.tilePositionX = this.cameras.main.scrollX * 0.25
    this.bgForeGround.tilePositionX = this.cameras.main.scrollX * 0.5
    this.bgHills.tilePositionX = this.cameras.main.scrollX * 0.4
    // Moves plane every frame
    this.plane.x += 0.7
  }

  createEnv() {
    // Aviao
    this.plane = this.add.sprite(600, 1000, 'aviao_unilever')
      .setOrigin(0, 0).setScale(0.7).setAlpha(0.6).setDepth(-2);
    this.anims.create({
      key: 'aviao',
      frames: this.anims.generateFrameNumbers(`aviao_unilever`, { start: 0, end: 4 }),
      frameRate: 8,
      repeat: -1
    });
    this.plane.play('aviao', true)

    // Balao
    this.balao = this.add.sprite(2100, 700, 'balao_unilever')
      .setOrigin(0, 0).setScale(0.8).setAlpha(0.8).setDepth(-1);
    this.anims.create({
      key: 'balao',
      frames: this.anims.generateFrameNumbers(`balao_unilever`, { start: 0, end: 1 }),
      frameRate: 2,
      repeat: -1
    });
    this.balao.play('balao')

    // Placas
    this.add.image(600, 1680, 'placa_unilever').setScale(0.8)
    this.add.image(3100, 1680, 'placa_unilever').setScale(0.8)
    this.add.image(7630, 720, 'placa_unilever').setScale(0.8)
  }
}
