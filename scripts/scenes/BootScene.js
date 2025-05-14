class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        // Carga de recursos mínimos
    }

    create() {
        this.scene.start('PreloadScene');
    }
}