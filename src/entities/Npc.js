import initAnimations from './npcAnims.js'
import DialogModalPlugin from '../plugins/dialogPlugin.js'

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

  async init() {
    // Set layer depth
    this.setDepth(0);
    // Set InteractKey
    this.interactKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    // Set dialog sound
    this.dialogSound = this.scene.sound.add('dialog_sound', {loop: false, rate: 2})

    // This is just to not recriate animations.
    if(Npc.instanceCount <= 1)
      initAnimations(this.scene.anims)

    // Set texts modularly
    try {
      const textsModule = await import(`../texts/${this.name}Texts.js`);
      this.texts = textsModule.default;
    } catch (error) {
      console.error(`Error importing texts for ${this.name}:`, error);
      this.texts = ['Lorem Ipsum Dolor Amet'];
    }
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
        // Which Npc are you interacting with
        switch (this.name) {
          case 'computer':
            // Create Teams image
            if (!this.dialogImage) this.dialogImage = this.scene.add.image(-290, -520, 'reuniaoTeams').setOrigin(0, 0).setDepth(2)
            if (this.dialogIndex >= this.texts.length) {
              // If all messages have been displayed, destroy the dialog window and image
              this.destroyDialog();
              this.dialogImage.destroy();
              this.dialogImage = null
              this.npcPlayer.resumeUpdate() // Player able to move when interaction is over
              this.dialogSound.pause() // pause dialog sound
            } else {
              // Show the next message
              this.createDialog(this.texts);
              this.npcPlayer.pauseUpdate() // Prevent player from moving while interacting
              this.dialogSound.stop() // Stop dialog sound
              this.dialogSound.play() // Play dialog sound
            }
            break;
          case 'rexona':
            if (this.dialogIndex >= this.texts.length) {
              this.npcPlayer.damage += 1; // Aumenta o dano do player
              this.destroyDialog(); // If all messages have been displayed, destroy the dialog window
              this.destroyInstance() // Destroy NPC(collect item)
              this.npcPlayer.resumeUpdate() // Player able to move when interaction is over
            } else {
              this.npcPlayer.pauseUpdate() // Prevent player from moving while interacting
              this.createDialog(this.texts); // Show the next message
            }
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

  destroyInstance() {
    // Unregister the update function from the scene's update event
    this.scene.events.removeListener(Phaser.Scenes.Events.UPDATE, this.update, this);

    // Call the superclass destroy method
    super.destroy();
  }

  destroyDialog() {
    // Check if there is an existing dialogModal instance
    if (this.dialogModal) {
      // Destroy the dialog window
      this.dialogModal.destroy();
      this.dialogModal = null;
      this.dialogIndex = 0; // Reset the index for future interactions
    }
  }

  createDialog(texts) {
    // Check if there is an existing dialogModal instance
    if (this.dialogModal)
      this.dialogModal.destroy();

    // Create a new DialogModalPlugin instance
    this.dialogModal = new DialogModalPlugin(this.scene);
    console.log('Dialog Happening');

    // Start the dialog with the provided texts
    this.startDialog(this.dialogModal, texts, { depth: 3 });
  }

  startDialog(dialogModal, texts, options = {}) {
    // Set text for the dialog window
    dialogModal.init({
      depth: options.depth
    });

    // Initialize or increment the index based on the number of messages
    if (!this.dialogIndex || this.dialogIndex >= texts.length) {
        this.dialogIndex = 0;
    }

    dialogModal.setText(texts[this.dialogIndex], true);
    this.dialogIndex++;
  }
}
