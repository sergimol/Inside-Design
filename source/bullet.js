export default class Bullet extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, sprite){
        super(scene, x, y, sprite);
        
        this.depth = 4;
        this.setScale(0.7);
        this.setSize(8, 8);
        this.scene.matter.add.gameObject(this);
        this.setOrigin(4,4);
        this.setMass(30);
        this.scene.add.existing(this);
        this.body.label = 'bullet';
        
        //quitarles la rotacion xd
        this.scene.matter.body.setInertia(this.body, Infinity);
        this.setFrictionAir(0);
        


        //atributos
        this.body.restitution = 0.8; //fuerza del rebote, momento que mantiene
        this.rebotes = 0;
        //this.body.thrust(1);
        //scene.physics.add.existing(this);
        
        //this.physicsBodyType = Phaser.Physics.ARCADE;
        //this.setVelocity(800);
        this.scene.matter.world.on('collisionstart', (event)=>{
            let wordBody = this.body;
            for (let i = 0; i < event.pairs.length; i++)
            {
                let bodyA = event.pairs[i].bodyA;
                let bodyB = event.pairs[i].bodyB;

                if (bodyA === wordBody || bodyB === wordBody)
                {
                    if (bodyA.label === 'enemy' || bodyB.label === 'enemy' || bodyA.label === 'player' || bodyB.label === 'player') {
                
                        //TODO
                        //#Issue
                        //tiene que pasarle el daño y destruirse
                        this.destroy();
                    }
                    else this.wallhit();
                }
            }
        });
    }
    wallhit(){
        if (this.rebotes > 0 ){
            //this.setFrictionAir(0.01); //ME EXPLICAS?¿
            //im afraid that i will need you to rotate
            this.rebotes--;
            
            //this.body.angle = Phaser.Math.Angle.Between(0,0,this.body.velocity.x, this.body.velocity.y);
            //this.scene.matter.body.setInertia(this.body, Infinity);
            
        }
        else this.destroy();
    }
    preUpdate(){
        //tengo que hacerlo asi, porque de otra forma al asignarle el angulo y tener otra interaccion empieza a girar como un condenado
        //this.body.setAngle = Phaser.Math.Angle.Between(0,0, this.body.velocity.x, this.body.velocity.y);
        
        //Sets the angle of the body instantly. Angular velocity, position, force etc. are unchanged.
        //# de esta manera se arreglan varias cossillas
        this.scene.matter.body.setAngle(this.body, Phaser.Math.Angle.Between(0,0, this.body.velocity.x, this.body.velocity.y));
        
         if (this.body.velocity.x <= 3 && this.body.velocity.y <= 3 && this.body.velocity.x >= -3 && this.body.velocity.y >= -3) {
             this.destroy();
            }    
            
    }
}