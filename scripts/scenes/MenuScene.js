class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    create() {
        // Mostrar menú principal
        this.scene.start('GameScene');
    }
}