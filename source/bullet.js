export default class Bullet extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, sprite){
        super(scene, x, y, sprite);
        
        this.setSize(16, 16);
        this.scene.matter.add.gameObject(this);
        this.label = "bullet";
        this.setMass(50);
        this.scene.add.existing(this);


        //esto no puede ir aquiporque entonce spor cada iteracion de bala se ejecutara una colision
        //el ejemplo ahora mismo ya que al disparar 2 veces cuadno choca la primera se dustruyen todas las balas
        this.scene.matter.world.on("collisionstart", (event, bodyA, bodyB) => {
            this.destroy();
            console.log("xd");
            //no me funciona lo de las labels pos lloro
            if((bodyA.label == "bullet") || (bodyB.label == "bullet")) {
            }
        });




        //this.body.thrust(1);
        //scene.physics.add.existing(this);
        
        //this.physicsBodyType = Phaser.Physics.ARCADE;
        //this.setVelocity(800);
    }
}