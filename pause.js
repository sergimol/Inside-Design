export default class Game extends Phaser.Scene {
    constructor() {
        super({ key: "pause" });
    }
    create() {
        const { ESC } = Phaser.Input.Keyboard.KeyCodes
        this.cursors = this.input.keyboard.addKeys({
            escape: ESC
        })
        //this.input.once('pointerdown', function () {
        //this.scene.resume('main');
        //this.scene.stop();
        //}, this);
        this.input.keyboard.on('keydown_ESC', this.resumeGame, this);
    }
    resumeGame() {
        this.scene.resume('main');
        this.scene.stop();
    }
}