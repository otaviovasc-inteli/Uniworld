import TitleScreen from "./scenes/TitleScreen.js";
import Preload from "./scenes/Preload.js";
import Level1 from "./scenes/Level1.js";
import Level2 from "./scenes/Level2.js";

// Phaser config to instanciate game
const WIDTH = 1280;
const HEIGHT = 720;
const PLAYER_POSITION = {x: WIDTH * 0.1, y: HEIGHT / 2}

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  startPosition: PLAYER_POSITION
}

const Scenes = [TitleScreen, Level1, Level2, Preload];
const createScenes = Scene => new Scene(SHARED_CONFIG);
const initScene = () => Scenes.map(createScenes)

var config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 0 },
        debug: true
    }
  },
  scene: initScene()
};

var game = new Phaser.Game(config);
