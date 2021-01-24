import Button from "../button.js";
import config from "../config.js"

const winList = ['win0', 'win1'];
const looseList = ['loose0', 'loose1','loose2','loose3','loose4'];

export default class Game extends Phaser.Scene {
    constructor() {
        super({ key: "endGame" });
    }
    
    preload() {
        this.load.image('menuBackground', './sprites/buttons/mainMenuBackGround.png');
        this.load.image('exit', './sprites/gdd/gddexit.png');

        //Imagenes Victoria
        this.load.image('win0', './sprites/finales/finalBuenoBueno1.jpg');
        this.load.image('win1', './sprites/finales/finalBuenoBueno2.jpg');


        //Imagenes de Derrota
        this.load.image('loose0', './sprites/finales/ambicioso.jpg');
        this.load.image('loose1', './sprites/finales/canela.jpg');
        this.load.image('loose2', './sprites/finales/crunch.jpg');
        this.load.image('loose3', './sprites/finales/demandas.jpg');
        this.load.image('loose4', './sprites/finales/gdd.jpg');
    }
    create() {
        this.escenaGame = this.scene.get('main');
        this.cameras.main.fadeOut(1000, 0, 0, 0);
        this.time.delayedCall(1200, this.endGame, [], this);

    }

    endGame() {
        this.escenaGame.scene.stop();
        this.exitButton = new Button(this, 1200, 700, 'exit', 'exit', 'quit', config.button.endMenu)
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        let numRandom;
        //Sacame un numero entre todas las screens de final de juego
        
        if (this.escenaGame.player.isDead) {
            numRandom = Phaser.Math.RND.between(0, 4);
            console.log("moriste")
            this.add.image(700, 400, looseList[numRandom]);
        }
        else {
            numRandom = Phaser.Math.RND.between(0, 1);
            console.log("ganaste")
            this.add.image(700, 400, winList[numRandom]);
        }
    }
}
