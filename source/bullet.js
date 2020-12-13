export default class Bullet extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'bullet');
        
        this.setSize(16, 16);
        this.scene.matter.add.gameObject(this);
        this.setMass(50);
        this.scene.add.existing(this);
        
        //this.body.thrust(1);
        //scene.physics.add.existing(this);
        
        //this.physicsBodyType = Phaser.Physics.ARCADE;
        //this.setVelocity(800);
    }
}