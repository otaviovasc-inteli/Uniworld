import initAnimations from './npcAnims.js'

export default class Npc extends Phaser.Physics.Arcade.Sprite {
  static instanceCount = 0;

  constructor(scene, x, y, sprite, npcName, player) {
    super(scene, x, y, sprite)
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.name = npcName
    this.npcPlayer = player

    // Track how many Npc is in the scene
    Npc.instanceCount++;

    this.init()
    this.initEvents()
  }

  init() {
    // Set layer depth
    this.setDepth(0);
    this.interactKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

    // This is just to not recriate animations.
    if(Npc.instanceCount <= 1)
      initAnimations(this.scene.anims)
  }

  initEvents() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
  }

  update() {
    // When overlapping
    if (this.scene.physics.overlap(this.npcPlayer, this)) {
      this.name === 'computer' ? this.setFrame(1) : this.play(`${this.name}_overlap`, true);
      if (Phaser.Input.Keyboard.JustDown(this.interactKey))
      {
        console.log('interact');
        // Which Npc are you interacting with
        switch (this.name) {
          case 'computer':
            console.log('computadooooo');
            break;
          case 'rexona':
            console.log('rexonaaaaa');
            break;
          default:
            console.log('Npc name wrong');;
        }
      }
    }
    // Not overlapping
    else if (!this.scene.physics.overlap(this.npcPlayer, this))
    {
      this.name === 'computer' ? this.setFrame(0) : this.play(`${this.name}_idle`, true);
    }
  }
}
