export default class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
        this.currentSelection = 0; // 0: Start, 1: Options
    }

    preload() {
        this.load.image('menuStart', 'assets/images/mainMenuStartSelected.png');
        this.load.image('menuOptions', 'assets/images/mainMenuOptionsSelected.png');
    }

    create() {

         this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x000000)
        .setOrigin(0, 0);

        this.menuImages = [
            this.add.image(this.scale.width / 2, this.scale.height / 2, 'menuStart').setOrigin(0.5).setScale(4),
            this.add.image(this.scale.width / 2, this.scale.height / 2, 'menuOptions').setOrigin(0.5).setScale(4).setVisible(false)
        ];



        // keys
        this.cursors = this.input.keyboard.createCursorKeys();
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // keyboard input delay
        this.lastKeyPressedTime = 0;
        this.inputDelay = 150; 
    }

    update(time) {
        // up/down keys
        if (time - this.lastKeyPressedTime > this.inputDelay) {
            if (this.cursors.down.isDown) {
                this.setSelection(1);
                this.lastKeyPressedTime = time;
            } else if (this.cursors.up.isDown) {
                this.setSelection(0);
                this.lastKeyPressedTime = time;
            }
        }

        // Enter
        if (Phaser.Input.Keyboard.JustDown(this.enterKey) || Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            if (this.currentSelection === 0) {
                this.scene.start('GameScene');
            } else {
                this.currentSelection = 0; // rest currentSelection;
                this.scene.start('OptionsScene');
            }
        }
    }

    setSelection(index) {
        if (this.currentSelection !== index) {
            this.menuImages[this.currentSelection].setVisible(false);
            this.currentSelection = index;
            this.menuImages[this.currentSelection].setVisible(true);
        }
    }
}