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

        //Imagenes de Derrota
        
    }
    create() {
        console.log("se crea")
        this.cameras.main.zoom = 3;

        this.stick = this.add.image(900, 500, 'menuBackground').setScale(config.button.maNiggaDed - 0.025).setDepth(config.depths.buttonBackground);
        this.playButton = new Button(this, this.stick.x, this.stick.y - 8, 'restartButton', 'restartButtonlight', 'play',config.button.maNiggaDed)
        this.gddButton = new Button(this, this.stick.x, this.stick.y + 12, 'quitButton', 'quitButtonlight', 'quit',config.button.maNiggaDed)

        
    }
}