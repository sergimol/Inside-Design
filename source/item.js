export default class Item extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, sprite, player, label,cantidad) {
        super(scene, x, y, sprite);
        this.depth = 3;
        this.setSize(1,1);
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
        
        let angle = Phaser.Math.Angle.Between(this.x,this.y, this.playerRef.x, this.playerRef.y);
        this.scene.matter.body.setAngle(this.body, angle);
        //this.scene.matter.body.setAngle(this.body, Phaser.Math.Angle.Between(0,0, this.body.velocity.x, this.body.velocity.y));
        console.log(this.angle)
        //this.thrust(0.0001);
        //this.scene.matter.body.applyForce(this.body,this.angle, 0.003);
        //console.log(angle);
        //if ( Math.sqrt(Math.pow(this.body.velocitys.x, 2) + Math.pow(this.body.velocity.y, 2)) <= this.velocidadMinima) {
        //    this.destroy();
        //}    
    }
}