export default class Bullet extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, sprite){
        super(scene, x, y, sprite);
        
        this.setSize(8, 8);
        this.scene.matter.add.gameObject(this);
        this.setOrigin(1);
        this.setMass(50);
        this.scene.add.existing(this);
        this.body.label = 'bullet';
        
        //quitarles la rotacion xd
        this.scene.matter.body.setInertia(this.body, Infinity);
        


        //atributos
        this.body.restitution = 1;
        this.rebotes = 3;
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
                    if (bodyA.label === 'enemy' || bodyB.label === 'enemy') {
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
            this.rebotes--;
            /**
             * 
             if (this.body.velocity.x < 0) this.body.scale(this, -1, 1);
             else this.body.scale(this, -1, 1);
             
             if (this.body.velocity.y < 0) this.body.scale(this, 1, -1);
             else this.body.scale(this, 1, 1);
             */
        }
        else this.destroy();
    }
    preUpdate(){
        
        
         if (this.body.velocity.x <= 0.8 && this.body.velocity.y <= 0.8 && this.body.velocity.x >= -0.8 && this.body.velocity.y >= -0.8) {
             this.destroy();
            }    
            
    }
}