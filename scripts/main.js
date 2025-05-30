import BootScene from "./scenes/BootScene.js";
import PreloadScene from "./scenes/PreloadScene.js";
import MenuScene from "./scenes/MenuScene.js";
import OptionsScene from "./scenes/OptionsScene.js";
import GameScene from "./scenes/GameScene.js";
import GameOverScene from "./scenes/GameOverScene.js";
import UIScene from "./ui/UIScene.js";

const config = {
    //type: Phaser.AUTO,
    type: Phaser.WEBGL,
    width: 240*5,
    height: 210*5,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    pixelArt: true,
    backgroundColor:"#0000cc",
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

const game = new Phaser.Game(config);
/*
window.onload = function() {
    const game = new Phaser.Game(config);
};
*/