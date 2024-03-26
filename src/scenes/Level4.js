export default class Level2 extends Phaser.Scene {
    constructor() {
      super("level2");
      this.zoomFactor = 0.7
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
      const playerSelecionado = this.sys.settings.data.playerSelecionado;
      const player = this.createPlayer(playerZones, playerSelecionado, oldPlayer);
  
      // create enemies
      const enemies = this.createEnemies(layers);
  
      //create boss
      const boss = new BossLevel2(this, 9664, 960, 'boss_level2')
  
      // RexonaNpc sprite
      const dvdNpc = new Npc(this, 7420, 700, 'hub_sprite', 'hub', player)
      .setSize(100, 120)
      .setScale(1.2)
  
      // Npc sprite
      const omoNpc = new Npc(this, 7600, 700, 'omo_sprite', 'omo', player)
      .setScale(0.6)
      .setSize(150, 120)
  
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
  
      // Collider boss with platforms
      this.createEnemyColliders(boss, {
        colliders: {
          platforms: layers.platforms,
          player: player,
  
        },
      });
      this.createEndOfLevel(playerZones.end, player, playerSelecionado);
      this.setupFollowupCameraOn(player, map);
    }
  
    // erase enemies raycast line
    finishDrawing(pointer, layer) {
      this.line.x2 = pointer.worldX;
      this.line.y2 = pointer.worldY;
  
      this.graphics.clear();
      this.graphics.strokeLineShape(this.line);
  
      this.tileHits = layer.getTilesWithinShape(this.line);
  
      console.log(this.tileHits.length);
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
        const enemy =  new enemyTypes[spawnPoint.type](this, spawnPoint.x, spawnPoint.y, [layers.platforms, spawnPoint.type]);
        enemies.add(enemy);
      });
      return enemies;
    }
  
    onPlayerCollision(enemy, player) {
      player.takesHit(enemy)
    }
  
    // add enemy slime colliders
    createEnemyColliders(enemies, { colliders }) {
      enemies
        .addCollider(colliders.platforms)
        .addCollider(colliders.player, this.onPlayerCollision)
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
      const enemySpawns = map.getObjectLayer("enemy_spawns");
  
      platforms.setCollisionByExclusion(-1, true);
  
      return { env, platforms, playerZones, enemySpawns };
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
  