export default class Game extends Phaser.Scene {
    constructor() {
        super({ key: "sceneManager" });
    }
    init(data) {
        this.health = data.health,
            this.ammo = data.ammo;
    }
    create() {
        this.add.text(10, 10, 'Press 1 to play, 2 for -nothing- or 3 for -nothing-', { font: '16px Courier', fill: '#00ff00' });

        this.input.keyboard.once('keyup-ONE', function () {
            if (this.health != undefined)
                this.scene.start('main', { health: this.health, ammo: this.ammo });
            else
                this.scene.start('main', { health: 10, ammo: 100 });

        }, this);

        /*this.input.keyboard.once('keyup-TWO', function () {

            this.scene.start('demo', { id: 1, image: 'babar-phaleon-coco.png' });

        }, this);

        this.input.keyboard.once('keyup-THREE', function () {

            this.scene.start('demo', { id: 2, image: 'babar-pym-wait.png' });

        }, this);*/

        this.events.on('shutdown', this.shutdown, this);
    }

    shutdown() {
        //  We need to clear keyboard events, or they'll stack up when the Menu is re-run
        this.input.keyboard.shutdown();
    }
}