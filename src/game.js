// Phaser config to instanciate game
const WIDTH = 1280;
const HEIGHT = 720;
const PLAYER_POSITION = {x: WIDTH * 0.1, y: HEIGHT / 2}

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  startPosition: PLAYER_POSITION
}

const Scenes = [TitleScreen, Scene1, Preload];
const createScenes = Scene => new Scene(SHARED_CONFIG);
const initScene = () => Scenes.map(createScenes)

var config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 1000 },
        debug: true
    }
  },
  scene: initScene()
};

var game = new Phaser.Game(config);
