export default class Puntero extends Phaser.GameObjects.Image{
    constructor(scene, x, y){
        super(scene, x, y)
        //middle = super(scene,x,y, '');
        this.intermedio = scene.add.image(x, y, "crosshair");
        scene.add.existing(this);
        //this.setScale(3);
        this.px = 0;
        this.py = 0;
    }

    move(pointer,player){
        this.x = (pointer.x/this.scene.cameras.main.zoom) + this.scene.cameras.main.worldView.x;
        this.y = (pointer.y/this.scene.cameras.main.zoom) + this.scene.cameras.main.worldView.y;
        this.px = player.x - this.x;
        this.py = player.y - this.y;
    }
    moverconjugador(player){
        this.x = player.x - this.px;
        this.y = player.y - this.py;
    }

    updateMiddle(player){
        
        this.intermedio.x = (player.x + (player.x + this.x)/2) /2;
        this.intermedio.y = (player.y + (player.y + this.y)/2) /2;
    }
}