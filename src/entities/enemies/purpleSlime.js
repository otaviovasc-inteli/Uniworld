import Slime from "./Slime.js";
import initAnimations from "./anims/SlimeAnims.js";

// extends slime properties (used only to specify class, so tile can read and spawn enemy correctly)
export default class PurpleSlime extends Slime {
  constructor(scene, x, y, slime_name) {
    super(scene, x, y, slime_name);
    initAnimations(scene.anims);
  }
}
