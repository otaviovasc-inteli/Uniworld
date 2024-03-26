import Player from "../entities/Player.js";
import Npc from "../entities/Npc.js";

export default class level4 extends Phaser.Scene {
  constructor() {
    super("level4");
    this.zoomFactor = 0.7
  }

  create() {
    // Init all sounds in the level
    //this.createSounds()

    // FadeIn effect
    this.cameras.main.fadeIn(2000, 30, 30, 0)

    // Add map and layers
    const map = this.createMap();
    const layers = this.createLayers(map);
    const playerZones = this.getPlayerZones(layers.playerZones);

    // DiretoraNpc sprite
    // const diretora = new Npc(this, 7420, 700, 'hub_sprite', 'hub', player)
    // .setSize(100, 120)
    // .setScale(1.2)

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
      }
    });

    //   this.createEndOfLevel(playerZones.end, player, playerSelecionado);
    //   this.setupFollowupCameraOn(player, map);
    // }

    // Add player object and set bounds to map pass player from previous scene
    const oldPlayer = this.sys.settings.data.player;
    const playerSelecionado = this.sys.settings.data.playerSelecionado;
    const player = this.createPlayer(playerZones, playerSelecionado, oldPlayer);
  }
  //create player in scene
  createPlayer({ start }, playerSelecionado, oldPlayer) {
    return new Player(this, start.x, start.y, playerSelecionado, oldPlayer);
  }

  //create enemy in scene
  createEnemies(layers) {
    const enemies = new Enemies(this);
    const enemyTypes = enemies.getTypes();
    layers.enemySpawns.objects.forEach(spawnPoint => {
      console.log("Enemy type:" + spawnPoint.type);
      const enemy = new enemyTypes[spawnPoint.type](this, spawnPoint.x, spawnPoint.y, [layers.platforms, spawnPoint.type]);
      enemies.add(enemy);
    });
    return enemies;
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
    const env = map.createLayer("env", [tileset2, tileset1]);
    const platforms = map.createLayer("platforms", tileset1);
    map.createLayer("bg-color-green", tileset3).setDepth(-9);
    const playerZones = map.getObjectLayer("player_zones");

    platforms.setCollisionByExclusion(-1, true);

    return { env, platforms, playerZones };
  }

  setupFollowupCameraOn(player, map) {
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
    this.cameras.main.setZoom(this.zoomFactor);
    this.cameras.main.startFollow(player, true)
  }

  // Handle sounds logics
  // createSounds() {
  //starts playing music
  //this.musicSound = this.sound.add("music_level4", {loop: true, volume: 0.2});

  // start playing music if not playing already
  //   if (!this.musicSound.isPlaying)
  //     this.musicSound.play();
  // }
}
