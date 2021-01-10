import Humanoid from "./humanoid.js";
import Doors from "./doors.js";
import Weapon from "./weapon.js";
import config from "./config.js";

import defaultWeapon from "./weaponsFolder/defaultEnemyWeapon.js";

export default class Enemy extends Humanoid {
    constructor(scene, x, y, sprite, player, doorN, doorS) {
        super(scene, x, y, sprite);
        this.body.label = 'enemy';
        this.weapon = new Weapon(scene, 0, 5, defaultWeapon);
        this.add(this.weapon);


        //comportamientos
        this.Idle = false;
        this.acercarse = true;
        this.alejarse = true;
        this.strafe = true;

        this.strafeAngle = Math.PI/2; //izquierda o derecha del strafe
        if (Phaser.Math.RND.between(0, 1) != 0) 
        this.angleAcercarse = Math.PI/4; //preferencia para acercarse sobre el lado izquierdo o el derecho
        else 
        this.angleAcercarse = -Math.PI/4; //preferencia para acercarse sobre el lado izquierdo o el derecho

        //this.angleAcercarse = this.angleAcercarse * Math.random()/2; //para que no sea un movimiento perfecto
      

      this.arrayBehaviorStates = []; //array con arrais que cambian los booleanos de comportamientos (se pueden combinar)
      this.arrayBehaviorTime = []; //tiempo que s emantendra en cada uno de los estados mientras se recorre 

        //Atributos
        this.speed = 50;
        this.health = 3;
        this.depth = 3;

        this.body.frictionAir = 0.25;
        this.body.mass = 800;
        
        
        this.add(this.aspecto);
        /////////////
        //Animaciones
        const anims = scene.anims;
        anims.create({
            key: 'enemyWalk',
            frames: anims.generateFrameNumbers(sprite, { start: 4, end: 8 }), //15
            frameRate: 15,
            repeat: -1
        })
        anims.create({
            key: 'enemyIdle',
            frames: anims.generateFrameNumbers(sprite, { start: 1, end: 3 }),
            frameRate: 7,
            repeat: -1
        })
        anims.create({
            key: 'enemyDep',
            frames: anims.generateFrameNumbers(sprite, { start: 16, end: 28 }),
            frameRate: 14,
            repeat: 0
        })
        anims.create({
            key: 'enemyHit',
            frames: anims.generateFrameNumbers(sprite, { start: 9, end: 14 }),
            frameRate: 60,
            repeat: 0
        })

        //Referencia al player
        this.playerRef = player;
        //Referencia al DoorSystem
        this.doorRef = doorS;
        this.doorNum = doorN;   //Sala en la que se encuentra

        //Cambiar color "placeholder"
        this.aspecto.setTint(0x9999ff);

        //this.newNextPos();

        this.attackState = false;



        //Primera posicionaw
        this.dir = new Phaser.Math.Vector2();
        //this.enemyMove();

        //MOVIMIENTO
        this.enemyTime = config.enemy.idleMovTime;
        this.timerMove = this.scene.time.now + this.enemyTime;
        this.timerStrafe = this.scene.time.now + 3000;

        //DISPARO
        this.cadenceTime = config.enemy.cadenceTime;
        this.timerShoot = this.scene.time.now + this.cadenceTime * this.getShootTime();

        //Colisiones


        // Default: 1, Player: 2, Enemy: 4, PlayerBullet: 8, Enemy Bullet: 16
        //Aqui se asignan todas las colisiones
        this.body.collisionFilter = {
            'group': -2,
            'category': 4,
            'mask': 1 | 8 | 32, //mundo y balas jugador
            //'group':2,  //asi no colisionan entre si si tienen este mismo valor en negativo, en positivo siempre colisionaran si tienen el mismo valor, con 0 npi, explotara supongo
        };

        this.scene.matter.world.on('collisionstart', (event) => {
            let wordBody = this.body;
            for (let i = 0; i < event.pairs.length - 1; i++) {
                let bodyA = event.pairs[i].bodyA;
                let bodyB = event.pairs[i].bodyB;

                if (bodyA === wordBody || bodyB === wordBody) {
                    if (bodyA.label !== "bullet" || bodyB.label !== "bullet"){
                        this.angleAcercarse = -this.angleAcercarse;
                        this.strafeAngle = -this.strafeAngle;
                        console.log(this.strafeAngle);
                        
                        this.timerStrafe = this.scene.time.now + (10000 * Math.random());
                    }
                    


                }
            }
        });

      
        /** */
        

    }//Fin constructorasd


    //PREUPDATE
    preUpdate() {

        
    this.applyForce(this.forceSaved);
    this.forceSaved = { x: 0, y: 0};

        if (this.hitState) {
            this.aspecto.play('enemyHit', true);
            if (this.aspecto.anims.currentFrame.textureFrame === 14)
                this.hitState = false;
        }
        //Comprobamos el movimiento para asignar la animacion
        else if (this.isDead === false) {
            if (this.dir.x !== 0 || this.dir.y !== 0)
                this.aspecto.play('enemyWalk', true);
            else
                this.aspecto.play('enemyIdle', true);
        }
        else {
            if (this.body.speed <= 5) {
                this.setFrictionAir(0.4);
                //this.setCollisionCategory(null)
                
            }
            this.setActive(false);
        }


        //MOVEMOS AL ENEMIGO
        if (this.body.speed < 1 && !this.isDead){
            this.applyForce({x: this.dir.x * 0.6, y: this.dir.y * 0.6});
            this.dir = {x:0,y:0};

        }
        
        if (this.body.speed < 1){
            this.applyForce({x: this.dir.x * config.enemy.aggroVelFactor, y: this.dir.y * config.enemy.aggroVelFactor});
            this.dir = {x:0,y:0};
        }

        let distanciaentrejugador = Phaser.Math.Distance.Between(this.x, this.y, this.playerRef.x, this.playerRef.y);

        if (distanciaentrejugador <= config.enemy.aggroDistance){
            this.attackState = true;
        }


        //Para calcular la distancia entre siguientes posiciones   
        //ESTADO REPOSO
        if (!this.attackState){
            //comportamiento iddle
        }

        //ESTADO ATAQUE
        else {
            //Movimiento
            
            let angulo = Phaser.Math.Angle.Between(this.x,this.y, this.playerRef.x, this.playerRef.y);
            this.moveRotate(this.playerRef.x -this.x);
            this.weapon.rotateWeapon(angulo);

            let vectorAux = new Phaser.Math.Vector2(0,0);

        
            if(this.acercarse && distanciaentrejugador >= 100){
                
                vectorAux.add( new Phaser.Math.Vector2(this.playerRef.x - this.x, this.playerRef.y - this.y).rotate(this.angleAcercarse));
                //vectorAux.rotate(this.angleAcercarse);//todo
                //this.dir.normalize();
            }
            //else  if (this.dir === {x:0,y:0}) this.dir = {x:0, y:0}; //esta en 0,0 para asegurarse de que
            
            
            
            if (this.alejarse && distanciaentrejugador < 95){
                
                vectorAux.add( new Phaser.Math.Vector2(-this.playerRef.x + this.x, -this.playerRef.y + this.y));
                //this.dir.normalize();
            } //else if (this.dir === {x:0,y:0}) this.dir = {x:0, y:0};
            
            
            if(this.strafe){
                let vectorStrafe = new Phaser.Math.Vector2(this.playerRef.x - this.x, this.playerRef.y - this.y);
                vectorStrafe.rotate(this.strafeAngle);
                vectorAux.add(vectorStrafe);
                //this.dir.normalize();
            }
            
            vectorAux.normalize();
            this.dir = vectorAux;
            
                //cambiar la direccion de rotacion del strafe
            if (this.scene.time.now > this.timerStrafe) {
                //Disparamos y reactivamos el timer de disparo con un aleatorio

                this.strafeAngle = -this.strafeAngle;
                this.timerStrafe = this.scene.time.now + (10000 * Math.random());
            
            }
            
            //if(distanciaentrejugador >= 100){
                
            //} else this.dir = {x:0, y:0};
                
            if (this.scene.time.now > this.timerShoot) {
                //Disparamos y reactivamos el timer de disparo con un aleatorio

                //this.strafeAngle = -this.strafeAngle;
                //this.strafeAngle = -this.strafeAngle; //cambia la direcction del strafe de iz a derecha y viceversa



                
                
                
                this.weapon.shoot(true,this);

                let sound = this.scene.sound.add('gunShootSound');
                sound.setVolume(0.7);
                sound.play();
                this.timerShoot = this.scene.time.now + this.cadenceTime * this.getShootTime();
            }
        }


        

    }


    //DEVUELVE UN MULTIPLICADOR PARA LA CADENCIA
    getShootTime() {
        return Math.floor(Math.random() * (5 - 1)) + 2;
    }


    //CALCULA UNA NUEVA POSICION


    //CREA LA NUEVA DIRECCION A UTILIZAR EN EL MOVIMIENTO
    /**
     * 

     enemyMove() {
         this.dir = new Phaser.Math.Vector2(0, 0);
         this.dir.normalize();
        }
        */

    //Calculos auxiliares del movimiento en reposo
    //Auxiliar para rest, gira arma y enemigo

    //METODO QUE CALCULA LO RELACIONADO AL MOVIMIENTO EN ESTADO ATAQUE
    attackEnemy(distanceBetweenPos) {
        //Si llega a la siguiente pos
        if (distanceBetweenPos < config.enemy.minDistance) {

            //Elegimos entre una posicion aleatoria y que se acerque al jugador
            this.newNextPos();
            this.enemyMove();

            //AQUI INICILIZAMOS EL TIMER CADA VEZ
            this.timerMove = this.scene.time.now + this.enemyTime;
        }
        //Si no llega a la pos pero el tiempo llega a su maximo cambia de pos 
        else if (this.scene.time.now > this.timerMove) {
            this.newNextPos();
            this.enemyMove();

            //AQUI INICILIZAMOS EL TIMER CADA VEZ
            this.timerMove = this.scene.time.now + this.enemyTime;
        }

        //Rotamos sprite y arma en cada frame
        this.rotateWeapon(Phaser.Math.Angle.Between(this.x, this.y, this.playerRef.x, this.playerRef.y));
        this.moveRotate((this.playerRef.x - this.x));

        
    }

}
