export default class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }
    preload(){

    }
    create() {
        // Mostrar menú principal
        this.scene.start('GameScene');
    }

    update(){

    }
}