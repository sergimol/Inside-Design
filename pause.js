import Button from "./source/button.js";
export default class Game extends Phaser.Scene {
    constructor() {
        super({ key: "pause" });
    }
    preload() {
        this.load.image('menuBackground', 'Sprites/MenuBackground.png');

        this.load.image('quitButton', 'Sprites/buttons/quitButton.png');
        this.load.image('quitButtonlight', 'Sprites/buttons/quitButtonlight.png');
        this.load.image('resumeButton', 'Sprites/buttons/resumeButton.png');
        this.load.image('resumeButtonlight', 'Sprites/buttons/resumeButtonlight.png');
    }
    create() {
        const { ESC } = Phaser.Input.Keyboard.KeyCodes
        this.cursors = this.input.keyboard.addKeys({
            escape: ESC
        })
        this.cameras.main.zoom = 3;

        this.resumeButton = new Button(this, 700, 380, 'resumeButton', 'resumeButtonlight', 'resume')
        this.gddButton = new Button(this, 700, 405, 'quitButton', 'quitButtonlight', 'quit')
        this.optionsButton = new Button(this, 700, 430, 'optionsButton', 'optionsButtonlight', 'options')

        this.input.keyboard.on('keydown_ESC', this.resumeGame, this);

        let background = this.matter.add.image(700, 400, 'menuBackground');
    }
    resumeGame() {
        console.log("resume")
        this.scene.stop();
        this.scene.resume('UIScene');
        this.scene.resume('main');
    }
}
