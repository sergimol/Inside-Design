import Button from "../button.js";
import config from "../config.js"
export default class Game extends Phaser.Scene {
    constructor() {
        super({ key: "pause" });
    }
    preload() {
        this.load.image('menuBackground', './sprites/buttons/menuBackGround.png');

        this.load.image('quitButton', './sprites/buttons/quitButton.png');
        this.load.image('quitButtonlight', './sprites/buttons/quitButtonlight.png');
        this.load.image('resumeButton', './sprites/buttons/resumeButton.png');
        this.load.image('resumeButtonlight', './sprites/buttons/resumeButtonlight.png');
    }
    create() {
        const { ESC } = Phaser.Input.Keyboard.KeyCodes
        this.cursors = this.input.keyboard.addKeys({
            escape: ESC
        })
        this.cameras.main.zoom = config.cameraSettings.zoom;

        this.resumeButton = new Button(this, 700, 380, 'resumeButton', 'resumeButtonlight', 'resume',config.button.mainMenu)
        this.quitButton = new Button(this, 700, 405, 'quitButton', 'quitButtonlight', 'quit', config.button.mainMenu)
        this.optionsButton = new Button(this, 700, 430, 'optionsButton', 'optionsButtonlight', 'options', config.button.mainMenu)

        this.input.keyboard.on('keydown_ESC', this.resumeGame, this);

        let background = this.add.image(700, 400, 'menuBackground');
        background.setScale(0.25); 
        background.setDepth = config.depths.buttonBackground;
    }
    resumeGame() {
        console.log("resume")
        this.scene.stop();
        this.scene.resume('UIScene');
        this.scene.resume('main');
    }
    //Me servira para parar la musica?
    stopMusic(){
    }
}
