


export default class Bullet extends Phaser.GameObjects.Container{
    constructor(scene, x, y, config, esEnemigo){
            
        super(scene, x, y);

        this.aspecto = scene.add.sprite(0,0, config.sprite);
        this.add(this.aspecto);

        //animacion

        const anims = this.scene.anims;

        anims.create({
            key: config.key,
            frameRate: config.frameRate,
            repeat: config.repeat,
            frames: anims.generateFrameNumbers(config.sprite, config.frames)
            
        });
        
        
        
        this.config = config;
        this.esEnemigo = esEnemigo;
        
        this.depth = 4; //lo voy a dejar asi porque de momento importa bastante poco
        this.aspecto.setScale(config.scale);
        this.setSize(config.sizeX, config.sizeY);
        this.scene.matter.add.gameObject(this);
        this.body.isSensor = config.isSensor;
        //this.setOrigin(config.originX, config.originY);
        this.setMass(config.mass);
        this.scene.add.existing(this);
        this.body.label = config.label;
        
        
        this.aspecto.play(config.key);
        //quitarles la rotacion xd
        this.scene.matter.body.setInertia(this.body, config.inertia);
        this.setFrictionAir(config.airFriction);

        if (config.inertia !== Infinity){
            let angularAux = ((Math.random() * config.angularVelocityMultiply) + config.angularVelocitySuma) * config.angularVelocityResultadoMultiply;
            //console.log(angularAux);
            this.scene.matter.body.setAngularVelocity(this.body, angularAux);
        }
        



        //atributos
        this.body.restitution = config.fuerzaRebote; //fuerza del rebote, momento que mantiene
        this.rebotes = config.rebotes;
        this.damage = config.damage;


        //Otras variables
        this.velocidadMinima = config.velocidadMinima;
        this.lifeTime = this.scene.time.now + config.lifeTime;


        //Definir las colisones de la bala

        //colisiones del disparo
                
                //si en vez de esta categoria s epone un 0, no colisionara con ese objeto
                if(esEnemigo === null){
                    // Default: 1, Player: 2, Enemy: 4, PlayerBullet: 8, Enemy Bullet: 16, Neutral Bullet: 32
                    if (config.isSensor){
                        
                        this.body.collisionFilter = {
                            'group' : -5, 
                            
                            'category': 32,
                            'mask':2 | 8 | 4 | 16, //choca con todos menos default
                        };
                        //disparo.body.isSensor = true;
                    }
                    else{

                        this.body.collisionFilter = {
                            'group' : -5, 
                            
                            'category': 32,
                            'mask': 1 | 2 | 8 | 4 | 16, //POR SI CHOCA CON el swing de un arma a meele del jugador
                        };
                    }
                }
                else if (esEnemigo){
                    // Default: 1, Player: 2, Enemy: 4, PlayerBullet: 8, Enemy Bullet: 16
                    //Aqui se asignan todas las colisiones
                    if (config.isSensor){
                        
                        this.body.collisionFilter = {
                            'group' : -5, 
                            
                            'category': 16,
                            'mask':2 | 8, //POR SI CHOCA CON el swing de un arma a meele del jugador
                        };
                        //disparo.body.isSensor = true;
                    }
                    else{

                        this.body.collisionFilter = {
                            'group' : -5, 
                            
                            'category': 16,
                            'mask': 1 | 2 | 8, //POR SI CHOCA CON el swing de un arma a meele del jugador
                        };
                    }
                }
                else{
                    // Default: 1, Player: 2, Enemy: 4, PlayerBullet: 8, Enemy Bullet: 16
                    //Aqui se asignan todas las colisiones

                    if (config.isSensor){
                        this.body.collisionFilter = {
                            'group' : -4, //hara siempre la regla category/mask
                            
                            'category': 8,
                            'mask':4 | 16, //PORa que detecte la colision del jugador tmb
                        };
                        //disparo.body.isSensor = true;
                    }
                    else{

                        this.body.collisionFilter = {
                            'group' : -4, //hara siempre la regla category/mask
                            
                            'category': 8,
                            'mask': 1 | 4,
                        };
                    }

                }







        //this.body.thrust(1);
        //scene.physics.add.existing(this);

        //this.physicsBodyType = Phaser.Physics.ARCADE;

            this.booleanoParaDestruirme = false;


        //this.setVelocity(800);
        this.scene.matter.world.on('collisionstart', (event) => {
            let wordBody = this.body;
            for (let i = 0; i < event.pairs.length; i++) {
                let bodyA = event.pairs[i].bodyA;
                let bodyB = event.pairs[i].bodyB;

                if (bodyA === wordBody || bodyB === wordBody) {
                    if (bodyA.label === 'enemy' || bodyA.label === 'player') {
                        //como le digo que ejecute el comando de humanoide si lo que tengo es una body, como se a que pertenece ese body? dios es demasiado esto?


                        bodyA.gameObject.damage(this.damage);  
                        //añadamos el puchback de la bala,
                        //primero calcular el vector y normalizarlo

                        let anguloAux = Phaser.Math.Angle.Between(this.x,this.y, bodyA.gameObject.x, bodyA.gameObject.y);
                        let vectorDeDireccion = ({x: Math.cos(anguloAux) * config.pushback, y: Math.sin(anguloAux) * config.pushback});
                        
                        
                        
                        //this.scene.matter.body.setVelocity(bodyA, vectorDeDireccion);
                        
                        //console.log(bodyA.speed);
                        

                        //TODO
                        //me gustaria que funcionase con un applyForce pero parece ser que no quiere realizar este comando, asique lo dejare cableado como un applyForce,
                        //pero esto quiere decir que no importa lo que pese el mmuñeco siempre empujara la misam distacia
                        //I dont like that
                        //this.scene.matter.body.setVelocity(bodyA, vectorDeDireccion);
                        bodyA.gameObject.forceSaved.x += vectorDeDireccion.x;
                        bodyA.gameObject.forceSaved.y += vectorDeDireccion.y;
                        
                        
                        //this.scene.matter.body.applyForce(bodyA, {x: bodyB.gameObject.x, y: bodyB.gameObject.y } ,10000000000);
                        //bodyA.gameObject.applyForce(vectorDeDireccion);
                        //console.log(bodyA.speed);

                        if (this.body.isSensor === false) this.booleanoParaDestruirme = true;

                    }
                    else if (bodyB.label === 'player' || bodyB.label === 'enemy') {

                        //TODO
                        //#Issue
                        //tiene que pasarle el daño y destruirse

                        
                        bodyB.gameObject.gameObject.damage(this.damage);

                        
                        //añadamos el puchback de la bala,
                        //primero calcular el vector y normalizarlo

                        let anguloAux = Phaser.Math.Angle.Between(this.x,this.y, bodyB.gameObject.x, bodyB.gameObject.y);
                        let vectorDeDireccion = ({x: Math.cos(anguloAux) * config.pushback, y: Math.sin(anguloAux) * config.pushback});
                        

                        
                        //this.scene.matter.body.setVelocity(bodyB, vectorDeDireccion);
                       // console.log(bodyB.speed);
                        
                        //this.scene.matter.body.setVelocity(bodyB, vectorDeDireccion);
                        
                        bodyB.gameObject.forceSaved.x += vectorDeDireccion.x;
                        bodyB.gameObject.forceSaved.y += vectorDeDireccion.y;
                        //this.scene.matter.body.applyForce(bodyB, {x:bodyA.gameObject.x, y: bodyA.gameObject.y},1000000000);
                        //bodyB.gameObject.applyForce(vectorDeDireccion);
                        //console.log(bodyB.speed);

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
    wallhit() {
        if (this.rebotes > 0) {
            //this.setFrictionAir(0.01); //ME EXPLICAS?¿
            //im afraid that i will need you to rotate
            this.rebotes--;

            //this.body.angle = Phaser.Math.Angle.Between(0,0,this.body.velocity.x, this.body.velocity.y);
            //this.scene.matter.body.setInertia(this.body, Infinity);

        }
        else this.booleanoParaDestruirme = true;
    }



    instanciarBala(esEnemigo){
        
        
        //this.canyon.getWorldTransformMatrix(this.tempMatrix, this.scene.TransformMatrix);

        //var d = this.tempMatrix.decomposeMatrix();
        
        //calcular dispersion
        let disp = Phaser.Math.Between(-this.config.dispersionHija, this.config.dispersionHija);
        let dispForce = Phaser.Math.Between(-this.config.forceDispersionHija, this.config.forceDispersionHija);

        //instanciar disparos
        
        let disparo = new Bullet(this.scene, this.x, this.y, this.config.balaHija, esEnemigo);
        
        //disparo.play("start");
        
    

        this.scene.matter.body.setAngle(disparo.body, ((this.rotation * this.config.hijaUsaAnguloPadre) + (disp * Math.PI/200) + this.config.hijaOffsetAngulo));
        //disparo.setRotation(this.rotation + (disp * Math.PI/200));
        disparo.thrust(this.config.bulletForceHija + (dispForce * this.config.bulletForceHija/100));
    }





    preUpdate(){
        
        //console.log(this.x + " " + this.y);

        //tengo que hacerlo asi, porque de otra forma al asignarle el angulo y tener otra interaccion empieza a girar como un condenado
        //this.body.setAngle = Phaser.Math.Angle.Between(0,0, this.body.velocity.x, this.body.velocity.y);

        //Sets the angle of the body instantly. Angular velocity, position, force etc. are unchanged.
        //# de esta manera se arreglan varias cossillas

        if (this.scene.time.now >= this.lifeTime){
            this.booleanoParaDestruirme = true;
        } 

        if (this.config.inertia === Infinity){
            this.scene.matter.body.setAngle(this.body, Phaser.Math.Angle.Between(0,0, this.body.velocity.x, this.body.velocity.y));
        }
        
        
        
         if ( this.body.speed <= this.velocidadMinima) {
             this.booleanoParaDestruirme = true;
            }
        if (this.booleanoParaDestruirme){
            
            if (this.config.balaHija !== null){

                if (this.config.hijaFaction === true){
                    for (let i = 0; i < this.config.bulletPelletHija; ++i){
                    this.instanciarBala(this.esEnemigo);
                    }
                    //let disparoHijo = new Bullet(this.scene, this.x, this.y, this.config.balaHija, this.esEnemigo);
                }
                else{
                    for (let i = 0; i < this.config.bulletPelletHija; ++i){
                    this.instanciarBala(null);
                    }
                    //let disparoHijo = new Bullet(this.scene, this.x, this.y, this.config.balaHija, null);
                }

                //disparoHijo.setAngle(this.angle + Math.PI);
                //disparoHijo.thrust(1);
            }
            
            this.destroy();    
        }
       
            

    }
}