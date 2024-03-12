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

    this.questionIndex = 0; // Keep track of the current question on quiz

    // Track how many Npc is in the scene
    Npc.instanceCount++;

    // Create interactKeyImage
    this.interactKeyImage = this.scene.add.image(x, y - 120, 'Ekey').setScale(0.1).setAlpha(0)

    this.init()
    this.initEvents()
  }

  async init() {
    // Update is enabled by default
    this.updateEnabled = true;
    // Set layer depth
    this.setDepth(0);
    // Set InteractKey
    this.interactKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    // Set dialog sound
    this.dialogSound = this.scene.sound.add('dialog_sound', {loop: false, volume: 0.5, rate: 2})

    // This is just to not recriate animations.
    if(Npc.instanceCount <= 1);
      initAnimations(this.scene.anims);

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
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  update() {
    // Do nothing if update is not enabled
    if (!this.updateEnabled)
      return;

    // When overlapping
    if (this.scene.physics.overlap(this.npcPlayer, this)) {
      this.interactKeyImage.setAlpha(1)
      this.name === 'computer' ? this.setFrame(1) : this.play(`${this.name}_overlap`, true);
      if (Phaser.Input.Keyboard.JustDown(this.interactKey))
      {
        // Which Npc are you interacting with
        switch (this.name) {
          case 'computer':
            // Computer logic
              this.computerLogic();
            break;
          case 'rexona':
              this.rexonaLogic();
            break;
          case 'hub':
              this.hubLogic();
            break;
          default:
            console.log('Npc name wrong');;
        }
      }
    }
    // Not overlapping
    else if (!this.scene.physics.overlap(this.npcPlayer, this))
    {
      this.interactKeyImage.setAlpha(0)
      this.name === 'computer' ? this.setFrame(0) : this.play(`${this.name}_idle`, true);
    }
  }

  pauseUpdate() {
    this.updateEnabled = false
  }
  resumeUpdate() {
    this.updateEnabled = true
  }

  // Help functions
  destroyInstance() {
    // Unregister the update function from the scene's update event
    this.scene.events.removeListener(Phaser.Scenes.Events.UPDATE, this.update, this);

    // Destroy interaction button image
    this.interactKeyImage.destroy()

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


  // Npc's Logics
  computerLogic() {
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
  }

  rexonaLogic() {
    // Parse informations from texts array
    const currentQuestion = this.texts[this.questionIndex];
    const questionText = currentQuestion[0];
    const answers = currentQuestion[1];
    const correctAnswerLetter = answers[3];
    this.answerButtons = []

    // Get the camera's center x and y coordinates
    const centerX = this.scene.cameras.main.centerX;
    const centerY = this.scene.cameras.main.centerY;

    this.npcPlayer.pauseUpdate() // Make sure player will not move while interacting
    this.pauseUpdate() // Make sure no other interaction while interacting

    // Make sure not to recreate things
    this.closeQuiz()

    // Create quiz window
    this.quizWindow = this.scene.add.image(centerX, centerY, 'quiz_window').setDepth(2);

    // Create 'UniQuiz'
    this.quizTitle = this.scene.add.text(centerX, centerY - 200, 'UniQuiz', { font: '24px Arial', fill: '#000' }).setOrigin(0.5).setDepth(2);

    // Display the question text, creating or updating it
    this.quizText = this.scene.add.text(centerX - 170, centerY - 150, questionText, { font: '24px Arial', fill: '#000' }).setOrigin(0.5).setDepth(2);

    // Close button logic
    this.quizXBtn = this.scene.add.image(centerX + 200, centerY - 200, 'hub_close').setInteractive().setDepth(3).setScale(0.05);
    this.quizXBtn.on('pointerdown', () => this.closeQuiz());

    // Display each answer button
    ['A', 'B', 'C'].forEach((letter, index) => {
        // Determine button image based on letter
        let buttonImage = `quiz_button_${letter}`;
        let answerButton = this.scene.add.image(centerX + (index * 172) - 172, centerY + 170, buttonImage).setScale(3.8).setInteractive().setDepth(2);
        this.answerButtons.push(answerButton)

        // Checking if the selected button is the correct answer
        answerButton.on('pointerdown', () => {
            if (letter === correctAnswerLetter) {
                console.log('Correct answer!');
                this.nextQuestion();
            } else {
                console.log('Wrong answer!');
                this.nextQuestion();
            }
        });
    });
  }

  nextQuestion() {
    this.questionIndex++;
    if (this.questionIndex < this.texts.length) {
        // this.scene.restart(); // Or another way to refresh your question display
        console.log("NextQuestion");
        this.closeQuiz()
        this.rexonaLogic()
    } else {
        console.log('End of quiz');
        this.npcPlayer.resumeUpdate() // Make sure player will not move while interacting
        this.resumeUpdate() // Make sure no other interaction while interacting
        this.closeQuiz()
        this.questionIndex = 0
    }
  }

  closeQuiz() {
    // Close button logic to destroy the quiz interface
    if (this.quizWindow) this.quizWindow.destroy();
    if (this.quizText) this.quizText.destroy();
    if (this.quizTitle) this.quizTitle.destroy();
    this.answerButtons.forEach(button => button.destroy());
    if (this.quizXBtn) this.quizXBtn.destroy();

    // Resetting the flags and references
    this.quizWindow = null;
    this.quizText = null;
    this.quizTitle = null;
    this.answerButtons = [];
    this.quizXBtn = null;
  }

  // Build hub images links and texts
  hubLogic() {
    // Get texts and urls from hubTexts.js
    const url1 = this.texts[0]
    const url2 = this.texts[1]
    const url3 = this.texts[2]
    const url4 = this.texts[3]

    // Those if's check if the element already exists so it wont double them.
    // Add hub screen and x button if they dont exist already
    if (!this.screen) this.screen = this.scene.add.image(this.npcPlayer.x, this.npcPlayer.y - 50, "hub_screen").setDepth(2)
    if (!this.xBtnLink) this.xBtnLink = this.scene.add.image(this.npcPlayer.x + 380, this.npcPlayer.y - 290, "hub_close").setDepth(3).setScale(0.05)

    // Clickable links
    if (!this.link_button1) this.link_button1 = this.scene.add.image(this.npcPlayer.x + 400, this.npcPlayer.y - 110  - 50, 'hub_link_button').setDepth(3).setScale(0.5).setInteractive();
    if (!this.link_button2) this.link_button2 = this.scene.add.image(this.npcPlayer.x + 400, this.npcPlayer.y - 20 - 50, 'hub_link_button').setDepth(3).setScale(0.5).setInteractive();
    if (!this.link_button3) this.link_button3 = this.scene.add.image(this.npcPlayer.x + 400, this.npcPlayer.y + 70 - 50, 'hub_link_button').setDepth(3).setScale(0.5).setInteractive();
    if (!this.link_button4) this.link_button4 = this.scene.add.image(this.npcPlayer.x + 400, this.npcPlayer.y + 160 - 50, 'hub_link_button').setDepth(3).setScale(0.5).setInteractive();

    // Add text labels
    if (!this.text_hub_1) this.text_hub_1 = this.scene.add.text(this.npcPlayer.x - 450, this.npcPlayer.y - 130 - 50, url1[1], { font: '40px Arial', fill: '#ffffff' }).setDepth(3);
    if (!this.text_hub_2) this.text_hub_2 = this.scene.add.text(this.npcPlayer.x - 450, this.npcPlayer.y - 40 - 50, url2[1], { font: '40px Arial', fill: '#ffffff' }).setDepth(3);
    if (!this.text_hub_3) this.text_hub_3 = this.scene.add.text(this.npcPlayer.x - 450, this.npcPlayer.y + 50 - 50, url3[1], { font: '40px Arial', fill: '#ffffff' }).setDepth(3);
    if (!this.text_hub_4) this.text_hub_4 = this.scene.add.text(this.npcPlayer.x - 450, this.npcPlayer.y + 140 - 50, url4[1], { font: '40px Arial', fill: '#ffffff' }).setDepth(3);

    // Add links to the buttons
    this.link_button1.on('pointerdown', () => {
      window.open(url1[0], '_blank'); // Open in a new tab
    });

    this.link_button2.on('pointerdown', () => {
      window.open(url2[0], '_blank'); // Open in a new tab
    });

    this.link_button3.on('pointerdown', () => {
      window.open(url3[0], '_blank'); // Open in a new tab
    });

    this.link_button4.on('pointerdown', () => {
      window.open(url4[0], '_blank'); // Open in a new tab
    });

    // Prevent player from moving while hub is opened
    this.npcPlayer.pauseUpdate()

    // Close button loginc
    this.xBtnLink.setInteractive()
    this.xBtnLink.on('pointerdown', () => {
      // Destroy images and end function
      this.npcPlayer.resumeUpdate()
      this.screen.destroy()
      this.screen = null
      this.xBtnLink.destroy()
      this.xBtnLink = null
      this.link_button1.destroy()
      this.link_button1 = null
      this.link_button2.destroy()
      this.link_button2 = null
      this.link_button3.destroy()
      this.link_button3 = null
      this.link_button4.destroy()
      this.link_button4 = null
      this.text_hub_1.destroy()
      this.text_hub_2.destroy()
      this.text_hub_3.destroy()
      this.text_hub_4.destroy()
      return;
    });
  }
}
