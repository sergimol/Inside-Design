export default class Button extends Phaser.GameObjects.Image {
    constructor(scene, x, y, sprite, sprite2, label) {
        super(scene, x, y, sprite);
        this.image = scene.add.image(x, y, sprite);
        this.setInteractive()
            .on('pointerover', () => this.enterButtonHoverState())
            .on('pointerout', () => this.enterButtonRestState())
            .on('pointerup', () => {
                this.enterButtonHoverState();
                this.enterActiveState(label);
            });
        this.image.depth = 5;
        this.sprite = sprite;
        this.sprite2 = sprite2;
        this.label = label;

        this.escenaOrigen = this.scene.scene.get('main');
    }
    //Al pasar por encima se ilumina el boton
    enterButtonHoverState() {
        this.image.setTexture(this.sprite2);
    }

    enterButtonRestState() {
        this.image.setTexture(this.sprite);
    }

    enterActiveState() {
        if (this.label === 'play') {
            //if (this.escenaOrigen != null)
            //    this.escenaOrigen.scene.actualMusic.stop();
            if (this.scene.health != undefined)
                this.scene.scene.start('main', { health: this.scene.health, ammo: this.scene.ammo, weaponID: this.scene.weaponID, level: this.scene.level });
            else
                this.scene.scene.start('main', { health: 10, ammo: 100, weaponID: 9, level: 0 });
        }
        else if (this.label === 'quit') {
            this.scene.scene.stop('main');
            this.scene.scene.start('sceneManager');
        }
        else if (this.label === 'resume') {
            this.scene.resumeGame();
        }
        else if (this.label === 'options' || this.label === 'gdd') {
            console.log("Casi crack")
        }
    }
}