export default class Item extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, sprite, player, label,cantidad) {
        super(scene, x, y, sprite);
        this.depth = 3;
        this.scene.matter.add.gameObject(this);
        this.scene.add.existing(this);

        this.body.label = label;
        //this.setScale(4);
        //Referencia al player
        this.playerRef = player;
        //this.dir = new Phaser.Math.Vector2();
        //this.dir.normalize();
    }
    preUpdate(){
        this.setAngle(this.body,this.playerRef);
        //this.thrust(0.00000000000000000000000000000000000001);
        //this.scene.matter.body.applyForce(this.body,this.angle, 0.003);
        console.log(this.body.position.x);
        //if ( Math.sqrt(Math.pow(this.body.velocitys.x, 2) + Math.pow(this.body.velocity.y, 2)) <= this.velocidadMinima) {
        //    this.destroy();
        //}    
    }
}