import Button from "./source/button.js";
export default class Game extends Phaser.Scene {
    constructor() {
        super({ key: "death" });
    }
    preload() {
        this.load.image('menuBackground', 'Sprites/MenuBackground.png');

        this.load.image('restartButton', 'Sprites/restartButton.png');
        this.load.image('restartButtonlight', 'Sprites/restartButtonlight.png');
        this.load.image('quitButton', 'Sprites/quitButton.png');
        this.load.image('quitButtonlight', 'Sprites/quitButtonlight.png');
    }
    create() {
        console.log("se crea")
        this.cameras.main.zoom = 3;

        this.playButton = new Button(this, 700, 380, 'restartButton', 'restartButtonlight', 'play')
        this.gddButton = new Button(this, 700, 405, 'quitButton', 'quitButtonlight', 'quit')

        let background = this.matter.add.image(700,400,'menuBackground');
    }
}