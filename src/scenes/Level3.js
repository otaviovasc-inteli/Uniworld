import Player from "../entities/Player.js";

export default class Level3 extends Phaser.Scene {
  constructor() {
    super("level3");
  }

  create() {
    // FadeIn effect
    this.cameras.main.fadeIn(2000, 30, 30, 0)

    // Add map and layers
    const map = this.createMap();
    const layers = this.createLayers(map);
    const playerZones = this.getPlayerZones(layers.playerZones);

    // Add player object and set bounds to map, pass player from previous scene
    const oldPlayer = this.sys.settings.data.player;
    const player = this.createPlayer(playerZones, oldPlayer);

    // Set world bounds based on maps
    this.physics.world.bounds.height = map.heightInPixels;
    this.physics.world.bounds.width = map.widthInPixels;

    // Collider player with platforms
    this.createPlayerColliders(player, {
      colliders: {
        platforms: layers.platforms,
    }})

    this.setupFollowupCameraOn(player, map);
  }

  // Create player in scene
  createPlayer({ start }, oldPlayer) {
    return new Player(this, start.x, start.y, oldPlayer);
  }

  createMap() {
    const map = this.make.tilemap({ key: `level3` });
    map.addTilesetImage("plat", "city_platform");
    map.addTilesetImage("road", "road");
    map.addTilesetImage("predios", "predios_env");
    map.addTilesetImage("ceu", "ceu_env");
    return map;
  }

  createLayers(map) {
    // Add tilesets
    const tileset1 = map.getTileset("plat");
    const tileset2 = map.getTileset("road");
    const tileset3 = map.getTileset("predios");

    // Create layers
    const bgSky = map.createLayer("bg_sky", tileset3);
    const env1 = map.createLayer("env1", tileset3);
    const env2 = map.createLayer("env2", tileset3);
    const platforms = map.createLayer("platforms", [tileset1, tileset2]);
    const playerZones = map.getObjectLayer("player_zones");

    platforms.setCollisionByExclusion(-1, true);

    return { platforms, playerZones, env1, env2, bgSky };
  }

  // Return the start and end zone from Tiled
  getPlayerZones(playerZonesLayer) {
    const playerZones = playerZonesLayer.objects;
    return {
      start: playerZones.find((zone) => zone.name === "startZone"),
      end: playerZones.find((zone) => zone.name === "endZone"),
    };
  }

  // Add player colliders
  createPlayerColliders(player, { colliders }) {
    player.addCollider(colliders.platforms)
  }

  setupFollowupCameraOn(player, map) {
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
    this.cameras.main.startFollow(player, true)
    this.cameras.main.setZoom(0.7);
  }

  update() {
    // Add any required update logic here
  }
}
