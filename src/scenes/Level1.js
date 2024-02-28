import Player from "../entities/Player.js";
import Npc from "../entities/Npc.js";

export default class Level1 extends Phaser.Scene {
  constructor() {
    super("level1");
  }

  create () {
    // Background
    this.add.image(0, -200, "bg1").setScale(1.12).setOrigin(0, 0);

    // Interact Key
    const interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

    // Add map and layers
    const map = this.createMap();
    const layers = this.createLayers(map);
    const playerZones = this.getPlayerZones(layers.playerZones)

    // Add pc sprite
    const player = this.createPlayer(playerZones)
    .setScale(1.3)

    // ComputerNpc sprite
    const computerNpc = new Npc(this, 400, 530, 'computer_sprite', 'computer', player)
      .setScale(0.9)
      .setOrigin(0, 0)
      .setSize(150, 120)

    // RexonaNpc sprite
    const rexonaNpc = new Npc(this, 800, 500, 'rexona_sprite', 'rexona', player)
    .setScale(0.6)
    .setOrigin(0, 0)
    .setSize(150, 120)

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

  createEndOfLevel(end, player) {
    const endOfLevel = this.physics.add.sprite(end.x, end.y, 'end')
      .setSize(5, 400)
      .setAlpha(0)

    this.physics.add.overlap(player, endOfLevel, () => {
      this.registry.set('player', player);
      this.scene.start("level2");
    })
  }

  createPlayerColliders(player, {colliders}) {
    player.addCollider(colliders.platforms)
  }

  createMap() {
    const map = this.make.tilemap({key: `level1`});
    map.addTilesetImage('level1_t1', `level1_t1`);
    map.addTilesetImage('level1_t2', `level1_t2`);
    map.addTilesetImage('level1_t3', `level1_t3`);
    return map;
  }

  createLayers(map) {
    const tileset1 = map.getTileset('level1_t1');
    const tileset2 = map.getTileset('level1_t2');
    const tileset3 = map.getTileset('level1_t3');

    const bg = map.createLayer('bg', [tileset1, tileset2, tileset3]);
    const platforms = map.createLayer('platforms', tileset1);
    const env = map.createLayer('env', [tileset2, tileset3]);
    const playerZones = map.getObjectLayer('player_zones');

    platforms.setCollisionByExclusion(-1, true);

    return { bg, env, platforms, playerZones };
  }

  getPlayerZones(playerZonesLayer) {
    const playerZones = playerZonesLayer.objects
    return {
      start: playerZones.find(zone => zone.name === 'startZone'),
      end: playerZones.find(zone => zone.name === 'endZone')
    }
  }
}
