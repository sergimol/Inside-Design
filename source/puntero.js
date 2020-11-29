export default class Puntero extends Phaser.GameObjects.Image{
    constructor(scene, x, y){
        super(scene, x, y, 'crosshair')
        //middle = super(scene,x,y, '');
        this.intermedio = scene.add.image(x, y);
        scene.add.existing(this);
        this.setScale(3);
        this.px = 0;
        this.py = 0;
    }

    move(pointer, scene, player){
        this.x = pointer.x + scene.cameras.main.worldView.x;
        this.y = pointer.y + scene.cameras.main.worldView.y;

        this.px = player.x - this.x;
        this.py = player.y - this.y;

        //calucloY = this.intermedio.y / 5;
        this.updateMiddle(player);
        //this.intermedio.y = calculoY;

    }

    updateMiddle(player){
        
        this.intermedio.x = (player.x + (player.x + this.x)/2) /2;
        this.intermedio.y = (player.y + (player.y + this.y)/2) /2;
    }
}