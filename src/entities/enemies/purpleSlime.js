import Slime from "./Slime.js";
import initAnimations from "./anims/SlimeAnims.js";

export default class PurpleSlime extends Slime {
  constructor(scene, x, y, slime_name) {
    super(scene, x, y, slime_name);
    initAnimations(scene.anims);
  }
}
