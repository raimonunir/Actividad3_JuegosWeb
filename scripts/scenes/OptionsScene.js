export default class OptionsScene extends Phaser.Scene {
    constructor() {
        super('OptionsScene');
        this.currentSelection = 0; // 0: Start, 1: Options
        this.selectionChar = '*';
        this.noSelecitonChar = ' ';
        this.musicVolumeText = "Music volume:";
        this.soundVolumeText = "SFX volume:";
        this.exitText = "Exit";
        this.musicVolumeValue = 40;
        this.soundVolumeValue = 100;
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
        this.exitMenuText = this.add.bitmapText(this.scale.width / 2, (this.scale.height / 2)+this.lineSpace, "blackOutlineFont", this.noSelecitonChar+this.exitText+this.noSelecitonChar);
        this.exitMenuText.setFontSize(this.fontSize).setOrigin(0.5);

        // get musicVolume
        if(this.registry.get('musicVolume') != null){
            this.musicVolumeValue = this.registry.get('musicVolume') * 100;
        }else{
            this.registry.set('musicVolume', this.musicVolumeValue/100);
        }
        // update music volume
        this.setMusicVolume(this.musicVolumeValue);

        // get sfx volume
        if(this.registry.get('sfxVolume') != null){
            this.soundVolumeValue = this.registry.get('sfxVolume') * 100;
        }else{
            this.registry.set('sfxVolume', this.soundVolumeValue/100);
        }
        // update sound volume
        this.setSoundVolume(this.soundVolumeValue, false);


        // keys
        this.cursors = this.input.keyboard.createCursorKeys();
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // keyboard input delay
        this.lastKeyPressedTime = 0;
        this.inputDelay = 150; 
    }

    update(time) {


        
        // input
        if (time - this.lastKeyPressedTime > this.inputDelay) {

            // seleccition
            if (this.cursors.down.isDown) {
                this.setSelection(this.currentSelection+1);
                this.lastKeyPressedTime = time;
            } else if (this.cursors.up.isDown) {
                this.setSelection(this.currentSelection-1);
                this.lastKeyPressedTime = time;
            }
        

            // modify, enter
            if (this.currentSelection === 0) {
                if (Phaser.Input.Keyboard.JustDown(this.enterKey) || Phaser.Input.Keyboard.JustDown(this.spaceKey) || this.cursors.right.isDown) {
                    this.setMusicVolume(this.musicVolumeValue += this.volumeStepSize);
                    this.lastKeyPressedTime = time;
                }

                if (this.cursors.left.isDown){
                    this.setMusicVolume(this.musicVolumeValue -= this.volumeStepSize);
                    this.lastKeyPressedTime = time;
                }
            } else if (this.currentSelection === 1){
                if (Phaser.Input.Keyboard.JustDown(this.enterKey) || Phaser.Input.Keyboard.JustDown(this.spaceKey) || this.cursors.right.isDown) {
                    this.setSoundVolume(this.soundVolumeValue += this.volumeStepSize);
                    this.lastKeyPressedTime = time;
                }
                if (this.cursors.left.isDown){
                    this.setSoundVolume(this.soundVolumeValue -= this.volumeStepSize);
                    this.lastKeyPressedTime = time;
                }
            } else if (this.currentSelection === 2){
                if(Phaser.Input.Keyboard.JustDown(this.spaceKey) || Phaser.Input.Keyboard.JustDown(this.enterKey)){
                    this.currentSelection = 0; // rest currectSelection;
                    this.scene.start('MenuScene');
                }
            } else {
                console.error("Unexpected currentSelection:"+this.currentSelection);
            }
        }
        
    }

    setMusicVolume(volume){
        // limit the volume between 0 and 100
        volume < this.minVolume ? volume = this.minVolume : volume = volume;
        volume > this.maxVolume ? volume = this.maxVolume : volume = volume;
        this.musicVolumeValue = volume;
    
        this.registry.set('musicVolume', this.musicVolumeValue/100);

        let text = this.beautifyTextVolume(true, this.musicVolumeText+this.musicVolumeValue, this.musicVolumeValue)
        this.musicVolumeMenuText.setText(text);
    }

    setSoundVolume(volume, isSelected=true){
        // limit the volume between 0 and 100
        volume < this.minVolume ? volume = this.minVolume : volume = volume;
        volume > this.maxVolume ? volume = this.maxVolume : volume = volume;
        this.soundVolumeValue = volume;

        this.registry.set('sfxVolume', this.soundVolumeValue/100);

        let text = this.beautifyTextVolume(isSelected, this.soundVolumeText+this.soundVolumeValue, this.soundVolumeValue)
        this.soundVolumeMenuText.setText(text);
    }

    beautifyTextVolume(isSelected, volumeText, value){
        // beautify text
        let text = ''; 
        if(value < 10){
            if(isSelected){
                text = this.noSelecitonChar+this.noSelecitonChar+this.selectionChar + volumeText + this.noSelecitonChar+this.noSelecitonChar+this.noSelecitonChar+this.noSelecitonChar;
            }else{
                text = this.noSelecitonChar+this.noSelecitonChar+this.noSelecitonChar + volumeText + this.noSelecitonChar+this.noSelecitonChar+this.noSelecitonChar+this.noSelecitonChar;
            }
        }else if(value < 100){
            if(isSelected){
                text = this.noSelecitonChar+this.selectionChar + volumeText + this.noSelecitonChar+this.noSelecitonChar;
            }else{
                text = this.noSelecitonChar+this.noSelecitonChar + volumeText + this.noSelecitonChar+this.noSelecitonChar;
            }
        }else if(value == 100){
            if(isSelected){
                text = this.selectionChar + volumeText ;
            }else{
                text = this.noSelecitonChar + volumeText ;
            }
        } else{
            log.error("NO implemented");
        }
        
        return text;
    }

    setSelection(index) {
        // limit current selection: 0, 1, 2
        index < 0 ? index = 0 : index = index;
        index > 2 ? index = 2 : index = index;
        this.currentSelection = index;

        let text = '';

        switch(this.currentSelection){
            case 0:
                // music
                text = this.beautifyTextVolume(true, this.musicVolumeText+this.musicVolumeValue, this.musicVolumeValue)
                this.musicVolumeMenuText.setText(text);
                // sound
                text = this.beautifyTextVolume(false, this.soundVolumeText+this.soundVolumeValue, this.soundVolumeValue)
                this.soundVolumeMenuText.setText(text);
                // exit
                this.exitMenuText.setText(this.noSelecitonChar+this.exitText+this.noSelecitonChar);
                break;
            case 1:
                // music
                text = this.beautifyTextVolume(false, this.musicVolumeText+this.musicVolumeValue, this.musicVolumeValue)
                this.musicVolumeMenuText.setText(text);
                // sound
                text = this.beautifyTextVolume(true, this.soundVolumeText+this.soundVolumeValue, this.soundVolumeValue)
                this.soundVolumeMenuText.setText(text);
                // exit
                this.exitMenuText.setText(this.noSelecitonChar+this.exitText+this.noSelecitonChar);
                break;
            case 2:
                // music
                text = this.beautifyTextVolume(false, this.musicVolumeText+this.musicVolumeValue, this.musicVolumeValue)
                this.musicVolumeMenuText.setText(text);
                // sound
                text = this.beautifyTextVolume(false, this.soundVolumeText+this.soundVolumeValue, this.soundVolumeValue)
                this.soundVolumeMenuText.setText(text);
                // exit
                this.exitMenuText.setText(this.selectionChar+this.exitText+this.noSelecitonChar);
                break;
            default:
                console.error("ERROR OptionsScene, no currectSelection implemented");
        }
    }
}