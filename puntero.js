export default class Puntero extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'crosshair')

        scene.add.existing(this);
        this.setScale(3);
    }

    move(pointer, scene){
        this.x = pointer.x + scene.cameras.main.worldView.x;
        this.y = pointer.y + scene.cameras.main.worldView.y;
    }
}