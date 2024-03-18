import collidable from "../mixins/collidable.js";
import GreenSlime from "../entities/enemies/GreenSlime.js";
import PurpleSlime from "../entities/enemies/PurpleSlime.js";


export default class enemies extends Phaser.GameObjects.Group {
    constructor(scene) {
        super(scene);

        Object.assign(this, collidable);
    }

    getTypes() {
        const enemyTypes = {
            GreenSlime: GreenSlime,
            PurpleSlime: PurpleSlime,
        }
        return enemyTypes
    }
}   