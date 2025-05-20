import BootScene from "./scenes/BootScene.js";
import PreloadScene from "./scenes/PreloadScene.js";
import MenuScene from "./scenes/MenuScene.js";
import GameScene from "./scenes/GameScene.js";
import GameOverScene from "./scenes/GameOverScene.js";
import UIScene from "./ui/UIScene.js";

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
        GameScene,
        UIScene,
        GameOverScene
    ]
};

const game = new Phaser.Game(config);
/*
window.onload = function() {
    const game = new Phaser.Game(config);
};
*/