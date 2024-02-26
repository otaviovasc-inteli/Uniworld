export default class Npc extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, sprite, npcName) {
    super(scene, x, y, sprite)
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.name = npcName
  }
}
