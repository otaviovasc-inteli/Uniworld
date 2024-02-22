import Player from "../entities/Player.js";

export default class Scene1 extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  create () {
    this.add.image(0, -200, "bg1").setScale(1.12).setOrigin(0, 0);

    // Add map and layers
    const map = this.createMap();
    const layers = this.createLayers(map);

    // Add player object
    const player = this.createPlayer().setScale(0.6);

    // Collider player with platforms
    this.physics.add.collider(player, layers.platforms);
  }

  createPlayer() {
    return new Player(this, 100, 250);
  }

  createMap() {
    const map = this.make.tilemap({key: 'map1'});
    map.addTilesetImage('terrainGrass16', 'tileset1');
    map.addTilesetImage('cenario01_16x4', 'tileset2');
    return map;
  }

  createLayers(map) {
    const tileset1 = map.getTileset('terrainGrass16');
    const tileset2 = map.getTileset('cenario01_16x4');
    const environment = map.createLayer('bg', tileset2).setScale(0.4);
    const platforms = map.createLayer('platform', tileset1).setScale(0.4);

    platforms.setCollisionByExclusion(-1, true);

    return { environment, platforms };
  }
}
