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



        //Imagenes de Derrota
        this.loose0 = this.load.image('quit1', 'sprites/gdd/atributos/sanic.jpg');
    }
    create() {
        //this.portada = this.add.image(900, 500, 'menuBackground').setScale(config.button.maNiggaDed - 0.025).setDepth(config.depths.buttonBackground);
        this.escenaGame = this.scene.scene.get('main');
        this.endGame();
    }

    endGame() {
        if (this.escenaGame.player.isDead)
            console.log("moriste")
        else
            console.log("ganaste")
        // Phaser.Math.RND.between(0, 1);  //Sacame un numero entre todas las screens de final de juego
    }
}
/*
else if (this.label === 'endGame') {
    this.scene.time.delayedCall(200, this.fadeOut, [], this);
    this.scene.time.delayedCall(2000, this.endGame, [], this);
}
fadeOut() {
    this.escenaOrigen.cameras.main.fadeOut(1000, 0, 0, 0);

}
endGame() {
    this.scene.scene.stop('main');
    this.escenaOrigen.cameras.main.fadeIn(1000, 0, 0, 0);
    this.scene.time.delayedCall(500, this.scene.endGame, [], this.scene);
}*/