//import Button from "./source/button.js";
export default class Game extends Phaser.Scene {
    constructor() {
        super({ key: "theEnd" });
    }
    preload() {
        this.load.image('endBackground', 'sprites/endGame.png');
        //this.load.image('quitButton', 'Sprites/quitButton.png');
        //this.load.image('quitButtonlight', 'Sprites/quitButtonlight.png');
    }
    create() {
        const { ESC } = Phaser.Input.Keyboard.KeyCodes
        this.cursors = this.input.keyboard.addKeys({
            escape: ESC
        })

        this.input.keyboard.on('keydown_ESC', this.exitMenu, this);

        let background = this.matter.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'endBackground');
        let scaleX = this.cameras.main.width / background.width;
        let scaleY = this.cameras.main.height / background.height;
        let scale = Math.max(scaleX, scaleY);
        background.setScale(scale).setScrollFactor(0)
    }
    exitMenu() {
        this.scene.stop();
        this.scene.stop('UIScene');
        this.scene.start('sceneManager');
    }
}