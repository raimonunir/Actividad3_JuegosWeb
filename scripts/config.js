
const config = {
    type: Phaser.AUTO,
    width: 480,
    height: 270,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    pixelArt: true,
    backgroundColor:"#000000",
    scene: [
        BootScene,
        PreloadScene,
        MenuScene,
        OptionsScene,
        GameScene,
        UIScene,
        GameOverScene
    ]
};