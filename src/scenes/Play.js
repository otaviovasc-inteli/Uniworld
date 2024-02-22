import Player from "../entities/Player.js";

export default class Play extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  create () {
    // this.add.image(0, -200, "bg1").setScale(1.12).setOrigin(0, 0);

    // Add map and layers
    const map = this.createMap();
    const layers = this.createLayers(map);

    // Add player object
    const player = this.createPlayer().setScale(0.6);

    // Collider player with platforms
    this.createPlayerColliders(player, {
      colliders: {
        platforms: layers.platforms
    }})
  }

  getCurrentLevel() {
    return 2
    // return this.registry.get('level') || 1
  }

  createPlayer() {
    return new Player(this, 100, 250);
  }

  createPlayerColliders(player, {colliders}) {
    player.addCollider(colliders.platforms)
  }

  createMap() {
    console.log(`level${this.getCurrentLevel()}_t1`);
    const map = this.make.tilemap({key: `level${this.getCurrentLevel()}`});
    map.addTilesetImage('level1_t1', `level${this.getCurrentLevel()}_t1`);
    map.addTilesetImage('level1_t2', `level${this.getCurrentLevel()}_t2`);
    map.addTilesetImage('level1_t3', `level${this.getCurrentLevel()}_t3`);
    return map;
  }

  createLayers(map) {
    const tileset1 = map.getTileset('level1_t1');
    const tileset2 = map.getTileset('level1_t2');
    const tileset3 = map.getTileset('level1_t3');

    const environment = map.createLayer('bg', tileset2).setScale(0.4);
    const platforms = map.createLayer('platform', [tileset1, tileset2, tileset3]).setScale(0.4);

    platforms.setCollisionByExclusion(-1, true);

    return { environment, platforms };
  }
}
