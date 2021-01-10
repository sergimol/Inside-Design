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
            if (this.scene.health != undefined)
            this.scene.scene.start('main', { health: this.health, ammo: this.ammo });
        else
            this.scene.scene.start('main', { health: 10, ammo: 100 });
        }
    }
}