import initAnimations from "./projectileAnims.js";

export default class Projectile extends Phaser.Physics.Arcade.Sprite{
    static instanceCount = 0;
    constructor(scene, x, y, sprite){

        super(scene, x + 30, y, sprite);
        this.init()
        this.initEvents()
        Projectile.instanceCount++
    }

    init() {
        initAnimations(this.scene.anims);
        this.play("projectile_anim", true)
        this.scene.add.existing(this).setDepth(4).setScale(0.8)
        this.isDestroyed = true;
    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    update() {
        this.x += 10
        this.scene.time.delayedCall(1000, () => {
            this.destroyInstance()
        })
    }

    destroyInstance() {
        // If already destroyed, do nothing
        if (this.isDestroyed) return;
    
        // Mark this instance as destroyed
        this.isDestroyed = true;
    
        // Unregister the update function from the scene's update event
        this.scene.events.removeListener(Phaser.Scenes.Events.UPDATE, this.update, this);
    
        // Remove physics from NPC
        if (this.body) {
          this.scene.physics.world.remove(this.body)
        }

        Projectile.instanceCount--;
    
        // Finally, call the superclass destroy method
        super.destroy();
      }
}


