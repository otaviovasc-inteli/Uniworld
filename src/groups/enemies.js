import {ENEMY_TYPES} from "../types/index.js";
import collidable from "../mixins/collidable.js";


export default class enemies extends Phaser.GameObjects.Group {
    constructor(scene) {
        super(scene);

        Object.assign(this, collidable);
    }

    getTypes() {
        return ENEMY_TYPES
    }
}   