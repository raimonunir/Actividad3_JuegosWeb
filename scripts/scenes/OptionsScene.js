export default class OptionsScene extends Phaser.Scene {
    constructor() {
        super('OptionsScene');
        this.currentSelection = 0; // 0: Start, 1: Options
        this.selectionChar = '*';
        this.noSelecitonChar = ' ';
        this.musicVolumeText = "Music volume:";
        this.soundVolumeText = "SFX volume:";
        this.exitText = "Exit";
        this.musicVolumeValue = 80;
        this.soundVolumeValue = 80;
        this.volumeStepSize = 5;
        this.minVolume = 0;
        this.maxVolume = 100;
        this.lineSpace = 50;
        this.fontSize = 36;
    }

    preload() {

    }

    create() {

         this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x000000)
        .setOrigin(0, 0);

        this.musicVolumeMenuText = this.add.bitmapText((this.scale.width / 2), (this.scale.height / 2)-this.lineSpace, "blackOutlineFont", this.selectionChar+this.musicVolumeText+this.musicVolumeValue);
        this.musicVolumeMenuText.setFontSize(this.fontSize).setOrigin(0.5);
        this.soundVolumeMenuText = this.add.bitmapText(this.scale.width / 2, this.scale.height / 2, "blackOutlineFont", this.noSelecitonChar+this.soundVolumeText+this.soundVolumeValue);
        this.soundVolumeMenuText.setFontSize(this.fontSize).setOrigin(0.5);
        this.exitMenuText = this.add.bitmapText(this.scale.width / 2, (this.scale.height / 2)+this.lineSpace, "blackOutlineFont", this.noSelecitonChar+this.exitText);
        this.exitMenuText.setFontSize(this.fontSize).setOrigin(0.5);


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
                this.setSelection(this.currentSelection+1);
                this.lastKeyPressedTime = time;
            } else if (this.cursors.up.isDown) {
                this.setSelection(this.currentSelection-1);
                this.lastKeyPressedTime = time;
            }
        }

        // Enter
        if (Phaser.Input.Keyboard.JustDown(this.enterKey) || Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            if (this.currentSelection === 0) {
                this.setMusicVolume(this.musicVolumeValue += this.volumeStepSize);
            } else if (this.currentSelection === 1){
                this.setSoundVolume(this.soundVolumeValue += this.volumeStepSize);
            } else if (this.currentSelection === 2){
                this.currentSelection = 0; // rest currectSelection;
                this.scene.start('MenuScene');
            } else {
                
            }
        }
    }

    setMusicVolume(volume){
        volume < this.minVolume ? volume = this.minVolume : volume = volume;
        volume > this.maxVolume ? volume = this.maxVolume : volume = volume;
        this.musicVolumeValue = volume;
        this.musicVolumeMenuText.setText(this.selectionChar+this.musicVolumeText+this.musicVolumeValue);
    }

    setSoundVolume(volume){
        volume < this.minVolume ? volume = this.minVolume : volume = volume;
        volume > this.maxVolume ? volume = this.maxVolume : volume = volume;
        this.soundVolumeValue = volume;
        this.soundVolumeMenuText.setText(this.selectionChar+this.soundVolumeText+this.soundVolumeValue);
    }

    setSelection(index) {
        console.log(index);
        index < 0 ? index = 0 : index = index;
        index > 2 ? index = 2 : index = index;
        console.log("index after:"+index);
        this.currentSelection = index;

        switch(this.currentSelection){
            case 0:
                this.musicVolumeMenuText.setText(this.selectionChar+this.musicVolumeText+this.musicVolumeValue);
                this.soundVolumeMenuText.setText(this.noSelecitonChar+this.soundVolumeText+this.soundVolumeValue);
                this.exitMenuText.setText(this.noSelecitonChar+this.exitText);
                break;
            case 1:
                this.musicVolumeMenuText.setText(this.noSelecitonChar+this.musicVolumeText+this.musicVolumeValue);
                this.soundVolumeMenuText.setText(this.selectionChar+this.soundVolumeText+this.soundVolumeValue);
                this.exitMenuText.setText(this.noSelecitonChar+this.exitText);
                break;
            case 2:
                this.musicVolumeMenuText.setText(this.noSelecitonChar+this.musicVolumeText+this.musicVolumeValue);
                this.soundVolumeMenuText.setText(this.noSelecitonChar+this.soundVolumeText+this.soundVolumeValue);
                this.exitMenuText.setText(this.selectionChar+this.exitText);
                break;
            default:
                console.log("ERROR OptionsScene exception");
        }
    }
}