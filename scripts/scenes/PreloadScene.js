export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
    }

    preload() {
        // Precargar assets
		this.load.pack("asset-pack", "assets/asset-pack.json");
    }

    create() {
        this.scene.start('MenuScene');
    }
}