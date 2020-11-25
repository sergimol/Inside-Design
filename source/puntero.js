export default class Puntero extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'crosshair')
        //middle = super(scene,x,y, '');
        this.intermedio = scene.add.image(x, y, 'crosshair');
        scene.add.existing(this);
        this.setScale(3);
    }

    move(pointer, scene, player){
        this.x = pointer.x + scene.cameras.main.worldView.x;
        this.y = pointer.y + scene.cameras.main.worldView.y;

        this.intermedio.x = (player.x + (player.x + this.x)/2)/2;
        this.intermedio.y = (player.y + (player.y + this.y)/2) /2;

        //calucloY = this.intermedio.y / 5;

        //this.intermedio.y = calculoY;

    }
}