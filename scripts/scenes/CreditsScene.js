export default class CreditsScene extends Phaser.Scene {
    constructor() {
        super('CreditsScene');
    }

    create() {
        this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x000000).setOrigin(0);

        const creditsText = `
        Elaborado para la Actividad 3  
        de la asignatura 
        -- Juegos para la Web --

        Por:
        - Edgar Gomez Perez  
        - Guillem Munoz Pueyo  
        - Manuel Vicente Gonzalez Lacruz  
        - Raul Vivar Cano  
        - Raimon Rodriguez Alles  

        Homenaje a 
        "1943: The Battle of Midway".
        `;

        this.credits = this.add.bitmapText(this.scale.width / 2, this.scale.height, 'blackOutlineFont', creditsText, 32).setOrigin(0.5, 0);
        this.credits.setFontSize(36).setOrigin(0.5);
        this.scrollSpeed = 1;

        this.input.keyboard.once('keydown-ESC', () => {
            this.scene.start('OptionsScene');
        });
    }

    update() {
        this.credits.y -= this.scrollSpeed;

        // Optional: return after text goes off screen
        if (this.credits.y + this.credits.height < 0) {
            this.scene.start('OptionsScene');
        }
    }
}