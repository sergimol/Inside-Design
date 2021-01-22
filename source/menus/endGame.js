import config from "../config.js"

const winList = ['win0', 'win1'];
const looseList = ['loose0', 'loose1'];

export default class Game extends Phaser.Scene {
    constructor() {
        super({ key: "endGame" });
    }
    preload() {
        this.load.image('menuBackground', 'sprites/buttons/MainmenuBackground.png');

        //Imagenes Victoria
        this.win0 = this.load.image('win0', 'sprites/gdd/atributos/cogo.jpg');
        this.win1 = this.load.image('win1', 'sprites/gdd/atributos/cogo.jpg');


        //Imagenes de Derrota
        this.loose0 = this.load.image('loose0', 'sprites/gdd/atributos/sanic.jpg');
        this.loose0 = this.load.image('loose1', 'sprites/gdd/atributos/sanic.jpg');

    }
    create() {
        //this.portada = this.add.image(900, 500, 'menuBackground').setScale(config.button.maNiggaDed - 0.025).setDepth(config.depths.buttonBackground);
        this.escenaGame = this.scene.get('main');
        this.cameras.main.fadeOut(1000, 0, 0, 0);
        this.time.delayedCall(1200, this.endGame, [], this);
    }

    endGame() {
        this.escenaGame.scene.stop();
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        //Sacame un numero entre todas las screens de final de juego
        let numRandom = Phaser.Math.RND.between(0, 1);
        if (this.escenaGame.player.isDead) {
            console.log("moriste")
            this.add.image(700, 400, looseList[numRandom]);
        }
        else {
            console.log("ganaste")
            this.add.image(700, 400, winList[numRandom]);
        }
    }
}
