import Player from "../entities/Player.js";
import Npc from "../entities/Npc.js";
export default class Level3 extends Phaser.Scene {
  constructor() {
    super("level3");
    this.zoomFactor = 0.7
  }

  create() {
    // FadeIn effect
    this.cameras.main.fadeIn(2000, 30, 30, 0);

    // Add map and layers
    const map = this.createMap();
    const layers = this.createLayers(map);
    const playerZones = this.getPlayerZones(layers.playerZones);
    this.createBg(map);

    // Add player object and set bounds to map, pass player from previous scene
    const oldPlayer = this.sys.settings.data.player;
    const playerSelecionado = this.sys.settings.data.playerSelecionado
    const player = this.createPlayer(playerZones, playerSelecionado, oldPlayer);

    // Set world bounds based on maps
    this.physics.world.bounds.height = map.heightInPixels;
    this.physics.world.bounds.width = map.widthInPixels;

    // Collider player with platforms
    this.createPlayerColliders(player, {
      colliders: {
        platforms: layers.platforms,
      },
    });

    this.setupFollowupCameraOn(player, map);
    this.createEndOfLevel(playerZones.end, player, playerSelecionado);

  }

  // Create player in scene
  createPlayer({ start }, playerSelecionado, oldPlayer) {
    return new Player(this, start.x, start.y, playerSelecionado, oldPlayer);
  }

  createMap() {
    const map = this.make.tilemap({ key: `level3` });
    map.addTilesetImage("buildings_t1", "buildings");
    map.addTilesetImage("road", "road");
    map.addTilesetImage("predios", "predios_env");
    return map;
  }

  createLayers(map) {
    // Add tilesets
    const tileset1 = map.getTileset("buildings_t1");
    const tileset2 = map.getTileset("road");
    const tileset3 = map.getTileset("predios");

    // Create layers
    const env1 = map.createLayer("env1", [tileset1, tileset3]);
    const env2 = map.createLayer("env2", tileset3);
    const env3 = map.createLayer("env3", tileset1);
    const platforms = map.createLayer("platforms", [tileset1, tileset2]);
    const playerZones = map.getObjectLayer("player_zones");

    platforms.setCollisionByExclusion(-1, true);

    return { platforms, playerZones, env1, env2, env3 };
  }

  createBg(map) {
    const bgSkyObject = map.getObjectLayer("bg_sky").objects[0];
    this.bgSky = this.add
      .tileSprite(
        bgSkyObject.x - 300,
        bgSkyObject.y + 200,
        bgSkyObject.width,
        bgSkyObject.height,
        "ceu_bg"
      )
      .setDepth(-10)
      .setOrigin(0, 1)
      .setScrollFactor(0, 1)
      .setScale(3);

    const bgCloudObject = map.getObjectLayer("bg_nuvem").objects[0];
    this.bgCloud = this.add
      .tileSprite(
        bgCloudObject.x - 270,
        bgCloudObject.y,
        bgCloudObject.width,
        bgCloudObject.height,
        "nuvem_bg"
      )
      .setDepth(-9)
      .setOrigin(0, 1)
      .setScrollFactor(0, 1)
      .setScale(2);

    const bgBuildingObject = map.getObjectLayer("bg_predios").objects[0];
    this.bgBuilding = this.add
      .tileSprite(
        bgBuildingObject.x + 100,
        bgBuildingObject.y,
        bgBuildingObject.width,
        bgBuildingObject.height,
        "predios_bg"
      )
      .setDepth(-8)
      .setScrollFactor(0, 1)
      .setScale(1);
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
  createEndOfLevel(end, player, playerSelecionado) {
    const endOfLevel = this.physics.add
      .sprite(end.x, end.y, "end")
      .setSize(5, 500)
      .setAlpha(0);

    // Change level logic, sounds and camera effect
    this.physics.add.overlap(player, endOfLevel, () => {this.scene.start("level3", {player: player, playerSelecionado: playerSelecionado});
  });
}

  // Add player colliders
  createPlayerColliders(player, { colliders }) {
    player.addCollider(colliders.platforms);
  }

  setupFollowupCameraOn(player, map) {
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(player, true);
    this.cameras.main.setZoom(this.zoomFactor);
  }

  update() {
    this.bgCloud.tilePositionX = this.cameras.main.scrollX * 0.1;
    this.bgBuilding.tilePositionX = this.cameras.main.scrollX * 0.4;
  }
}
