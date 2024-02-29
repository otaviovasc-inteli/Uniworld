import Player from "../entities/Player.js";

export default class Level2 extends Phaser.Scene {
  constructor() {
    super("level2");
  }

  create () {
    // this.add.image(0, -200, "bg1").setScale(1.12).setOrigin(0, 0);

    // Add map and layers
    const map = this.createMap();
    const layers = this.createLayers(map);
    const playerZones = this.getPlayerZones(layers.playerZones)

    // Add player object and set bounds to map pass player from previous scene
    const oldPlayer = this.sys.settings.data.player;
    const player = this.createPlayer(playerZones, oldPlayer);

    this.physics.world.bounds.height = map.heightInPixels;
    this.physics.world.bounds.width = map.widthInPixels;

    this.createBg(map)

    // Collider player with platforms
    this.createPlayerColliders(player, {
      colliders: {
        platforms: layers.platforms,
        // platformsMoving: layers.platformsMoving
    }})

    this.createEndOfLevel(playerZones.end, player)
    this.setupFollowupCameraOn(player, map)
  }

  createPlayer({start}, oldPlayer) {
    return new Player(this, start.x, start.y, oldPlayer);
  }

  createPlayerColliders(player, {colliders}) {
    player.addCollider(colliders.platforms)
  }

  createMap() {
    const map = this.make.tilemap({key: `level2`});
    map.addTilesetImage('level2_t1', 'level2_t1');
    map.addTilesetImage('level2_t2', 'level2_t2');
    map.addTilesetImage('bg-color-green', 'bg_color_green');
    map.addTilesetImage('bg-color-blue', 'bg_color_blue');
    return map;
  }

  createLayers(map) {
    // Add tilesets
    const tileset1 = map.getTileset('level2_t1');
    const tileset2 = map.getTileset('level2_t2');
    const tileset3 = map.getTileset('bg-color-blue');
    const tileset4 = map.getTileset('bg-color-green');

    // Create layers
    const env = map.createLayer('env', tileset2);
    const platforms = map.createLayer('platforms', tileset1);
    map.createLayer('bg-color-green', tileset4).setDepth(-9);
    map.createLayer('bg-color-blue', tileset3).setDepth(-12);
    const playerZones = map.getObjectLayer('player_zones');



    platforms.setCollisionByExclusion(-1, true);

    return { env, platforms, playerZones };
  }

  createBg(map) {

    const bgSky = map.getObjectLayer('bg-sky').objects[0]
    this.add.tileSprite(bgSky.x - 100, bgSky.y, bgSky.width, bgSky.height, 'bg_color_blue')
      .setDepth(-10)
      .setOrigin(0, 1)
      .setScrollFactor(0, 1)

    const bgCloud = map.getObjectLayer('bg-cloud').objects[0]
    this.add.tileSprite(bgCloud.x - 100, bgCloud.y, bgCloud.width, bgCloud.height, 'bg_cloud')
      .setDepth(-9)
      .setOrigin(0, 1)
      .setScrollFactor(0, 1)

    const bgHills = map.getObjectLayer('bg-hills').objects[0]
    this.add.tileSprite(bgHills.x - 100, bgHills.y, bgHills.width, bgHills.height, 'bg_hills')
      .setDepth(-8)
      .setOrigin(0, 1)
      .setScrollFactor(0, 1)
      .setScale(1.3)

    const bgForeGround = map.getObjectLayer('bg-foreground').objects[0]
    this.add.tileSprite(bgForeGround.x - 100, bgForeGround.y, bgForeGround.width, bgForeGround.height, 'bg_foreground')
      .setDepth(-7)
      .setOrigin(0, 1)
      .setScrollFactor(0, 1)
      .setScale(1.3)

  }

  getPlayerZones(playerZonesLayer) {
    const playerZones = playerZonesLayer.objects
    return {
      start: playerZones.find(zone => zone.name === 'startZone'),
      end: playerZones.find(zone => zone.name === 'endZone')
    }
  }

  createEndOfLevel(end, player) {
    const endOfLevel = this.physics.add.sprite(end.x, end.y, 'end')
      .setSize(5, 400)
      .setAlpha(0)

    this.physics.add.overlap(player, endOfLevel, () => {
      console.log("start level3");
    })
  }
  setupFollowupCameraOn(player, map) {
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
    this.cameras.main.startFollow(player, true)
    this.cameras.main.setZoom(0.9);
    this.cameras.main.setDeadzone(50, 300);
  }
}
