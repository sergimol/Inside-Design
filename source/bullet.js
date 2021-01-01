

export default class Bullet extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, config){
            
        super(scene, x, y, config.sprite);
        

this.config = config;

        this.depth = 4; //lo voy a dejar asi porque de momento importa bastante poco
        this.setScale(config.scale);
        this.setSize(config.sizeX, config.sizeY);
        this.scene.matter.add.gameObject(this);
        this.body.isSensor = config.isSensor;
        this.setOrigin(config.originX, config.originY);
        this.setMass(config.mass);
        this.scene.add.existing(this);
        this.body.label = config.label;
        
        //quitarles la rotacion xd
        this.scene.matter.body.setInertia(this.body, Infinity);
        this.setFrictionAir(config.airFriction);
        


        //atributos
        this.body.restitution = config.fuerzaRebote; //fuerza del rebote, momento que mantiene
        this.rebotes = config.rebotes;
        this.damage = config.damage;


        //Otras variables
        this.velocidadMinima = config.velocidadMinima;

        //this.body.thrust(1);
        //scene.physics.add.existing(this);
        
        //this.physicsBodyType = Phaser.Physics.ARCADE;

            this.booleanoParaDestruirme = false;


        //this.setVelocity(800);
        this.scene.matter.world.on('collisionstart', (event)=>{
            let wordBody = this.body;
            for (let i = 0; i < event.pairs.length; i++)
            {
                let bodyA = event.pairs[i].bodyA;
                let bodyB = event.pairs[i].bodyB;

                if (bodyA === wordBody || bodyB === wordBody)
                {
                    if (bodyA.label === 'enemy' || bodyA.label === 'player'){ 
                        //como le digo que ejecute el comando de humanoide si lo que tengo es una body, como se a que pertenece ese body? dios es demasiado esto?

                        bodyA.gameObject.damage(this.damage);  
                        if (this.body.isSensor === false) this.booleanoParaDestruirme = true;
                    }
                    else if (bodyB.label === 'player' || bodyB.label === 'enemy') { 
                        
                        //TODO
                        //#Issue
                        //tiene que pasarle el daño y destruirse
                        
                        bodyB.gameObject.damage(this.damage);
                        if (this.body.isSensor === false) this.booleanoParaDestruirme = true;
                    }
                    else if (bodyB.label === 'bullet' && bodyB !== wordBody && (this.body.isSensor === true || bodyB.isSensor == true)){ //para las armas a meele que devuelvan al bicho
                        //DARLE LA VUELTA  ALA BALA
                        if (config.devulveBalas){
                            //let velocidad = Math.sqrt(Math.pow(bodyB.velocity.x, 2) + Math.pow(bodyB.velocity.y, 2));

                            let anguloAux = Phaser.Math.Angle.Between(this.x,this.y, bodyB.gameObject.x, bodyB.gameObject.y);

                            
                            this.scene.matter.body.setAngle(bodyB, anguloAux);

                            let velocityVector = this.scene.matter.vector.create(Math.cos(anguloAux)* bodyB.speed *2, Math.sin(anguloAux)* bodyB.speed * 2);
                            
                            this.scene.matter.body.setVelocity(bodyB, velocityVector); //darle vector de velocidad

                            if (bodyB.isSensor === true){
                                bodyB.collisionFilter = {
                                    'group' : -5, 
                                    
                                    'category': 8,
                                    'mask':4, 
                                };

                            }else{
                                bodyB.collisionFilter = {
                                    'group' : -5, 
                                    
                                    'category': 8,
                                    'mask':4 | 1, 
                                };

                            }

                            //bodyB.velocity.x = -bodyB.velocity.x;//Math.cos(anguloAux)* velocidad;
                            //bodyB.velocity.y = -bodyB.velocity.y;//Math.sin(anguloAux)* velocidad;

                            //console.log("una bala nano B ");
                        }
                        else if (config.destruyeBalas){
                            bodyB.gameObject.booleanoParaDestruirme = true;
                        }
                    }
                    else if (bodyA.label === 'bullet' && bodyA !== wordBody && (this.body.isSensor === true || bodyA.isSensor == true) ){
                        //DARLE LA VUELTA  ALA BALA
                        if (config.devulveBalas){
                            //let velocidad = Math.sqrt(Math.pow(bodyA.velocity.x, 2) + Math.pow(bodyA.velocity.y, 2));

                            let anguloAux = Phaser.Math.Angle.Between(this.x,this.y, bodyA.gameObject.x, bodyA.gameObject.y);

                            let velocityVector = this.scene.matter.vector.create(Math.cos(anguloAux)* bodyA.speed * 2, Math.sin(anguloAux)* bodyA.speed * 2);
                            
                            this.scene.matter.body.setAngle(bodyA, anguloAux);
                            this.scene.matter.body.setVelocity(bodyA, velocityVector);

                            if (bodyA.isSensor === true){
                                bodyA.collisionFilter = {
                                    'group' : -5, 
                                    
                                    'category': 8,
                                    'mask':4, 
                                };

                            }else{
                                bodyA.collisionFilter = {
                                    'group' : -5, 
                                    
                                    'category': 8,
                                    'mask':4 | 1, 
                                };
                            }
                            //bodyA.velocity.x = -bodyA.velocity.x;//Math.cos(anguloAux)* velocidad;
                            //bodyA.velocity.y = -bodyA.velocity.y; //Math.sin(anguloAux)* velocidad;

                            
                            //console.log("una bala nano A ");
                        }
                        else if (config.destruyeBalas){
                            bodyA.gameObject.booleanoParaDestruirme = true;
                        }
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
        else this.booleanoParaDestruirme = true;
    }
    preUpdate(){
        //console.log(this.x + " " + this.y);
        //tengo que hacerlo asi, porque de otra forma al asignarle el angulo y tener otra interaccion empieza a girar como un condenado
        //this.body.setAngle = Phaser.Math.Angle.Between(0,0, this.body.velocity.x, this.body.velocity.y);
        
        //Sets the angle of the body instantly. Angular velocity, position, force etc. are unchanged.
        //# de esta manera se arreglan varias cossillas
        this.scene.matter.body.setAngle(this.body, Phaser.Math.Angle.Between(0,0, this.body.velocity.x, this.body.velocity.y));
        
        
        
         if ( this.body.speed <= this.velocidadMinima) {
             this.booleanoParaDestruirme = true;
            }
        if (this.booleanoParaDestruirme){
            
            if (this.config.balaHija !== null){

                let disparoHijo = new Bullet(this.scene, this.x, this.y, this.config.balaHija);
                disparoHijo.setAngle(this.angle + Math.PI);
                disparoHijo.thrust(1);
            }
            
            this.destroy();    
        } 
            
    }
}