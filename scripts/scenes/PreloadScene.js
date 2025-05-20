export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
    }

    preload() {
        // Precargar assets
    }

    create() {
        this.scene.start('MenuScene');
    }
}