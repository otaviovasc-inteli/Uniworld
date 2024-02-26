import Player from "../entities/Player.js";

export default class Level2 extends Phaser.Scene {
  constructor() {
    super("level2");
  }

  create () {
    this.add.image(0, -200, "bg1").setScale(1.12).setOrigin(0, 0);

    // Add map and layers
    const map = this.createMap();
    const layers = this.createLayers(map);
    const playerZones = this.getPlayerZones(layers.playerZones)

    // Add player object
    const player = this.createPlayer(playerZones).setScale(0.6);
    // let player = this.registry.get('player');
    console.log(player);

    // Collider player with platforms
    this.createPlayerColliders(player, {
      colliders: {
        platforms: layers.platforms
    }})

    this.createEndOfLevel(playerZones.end, player)
  }

  createPlayer({start}) {
    return new Player(this, start.x, start.y);
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

    const bg = map.createLayer('bg', tileset2).setScale(0.4);
    const platforms = map.createLayer('platforms', tileset1).setScale(0.4);
    const playerZones = map.getObjectLayer('player_zones');


    platforms.setCollisionByExclusion(-1, true);

    return { bg, platforms, playerZones };
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
      this.registry.set('player', player);
      console.log("start level3");
    })
  }
}
