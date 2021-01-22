import Button from "../button.js";
import config from "../config.js"
export default class Game extends Phaser.Scene {
    constructor() {
        super({ key: "death" });
    }
    preload() {
        this.load.image('menuBackground', 'sprites/buttons/MainmenuBackground.png');


        this.load.image('restartButton', 'sprites/buttons/restartButton.png');
        this.load.image('restartButtonlight', 'sprites/buttons/restartButtonlight.png');
        this.load.image('quitButton', 'sprites/buttons/quitButton.png');
        this.load.image('quitButtonlight', 'sprites/buttons/quitButtonlight.png');
    }
    create() {
        console.log("se crea")
        this.cameras.main.zoom = 3;

        this.playButton = new Button(this, 700, 380, 'restartButton', 'restartButtonlight', 'play',config.button.mainMenu)
        this.gddButton = new Button(this, 700, 405, 'quitButton', 'quitButtonlight', 'quit',config.button.mainMenu)

        let background = this.add.image(700, 400, 'menuBackground');
        background.setScale(0.25); 
        background.setDepth = config.depths.buttonBackground;
    }
}