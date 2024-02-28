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
    return map;
  }

  createLayers(map) {
    const tileset1 = map.getTileset('level2_t1');
    const tileset2 = map.getTileset('level2_t2');

    const env = map.createLayer('env', tileset2);
    const platforms = map.createLayer('platforms', tileset1);
    // const movingPlatforms = map.createLayer('movingPlatforms', tileset1);
    const playerZones = map.getObjectLayer('player_zones');

    platforms.setCollisionByExclusion(-1, true);

    return { env, platforms, playerZones };
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
