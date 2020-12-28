import Humanoid from "./humanoid.js";
import Weapon from "./weapon.js";
export default class Enemy extends Humanoid {
    constructor(scene, x, y, sprite, player, depth) {
        super(scene, x, y, sprite);
        this.body.label = 'enemy';
        this.weapon = new Weapon(scene, 0, 5, "gunShoot", "enemybullet", "mono", "semi", 300, 20, 1, 0.6, 30, 3, 300, 0.15, 0.5, 20, 0, false, 0, 0,
        //la parte de bullet del arma
        0.7, 8, 8, 4, 4, 30, 'bullet', 0.01, 0, 0.8, 0.3);
        this.add(this.weapon);

        //Atributos
        this.speed = 50;
        this.health = 3;
        this.depth = 3;
        
        
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

        //Cambiar color "placeholder"
        this.aspecto.setTint(0x9999ff);

        this.newNextPos();

        this.attackState = false;



        //Primera posicionaw
        this.dir = new Phaser.Math.Vector2();
        this.enemyMove();

        //MOVIMIENTO
        this.enemyTime = 2500;
        this.timerMove = this.scene.time.now + this.enemyTime;

        //DISPARO
        this.cadenceTime = 1000;
        this.timerShoot = this.scene.time.now + this.cadenceTime * this.getShootTime();

        //Colisiones
        
        
         // Default: 1, Player: 2, Enemy: 4, PlayerBullet: 8, Enemy Bullet: 16
        //Aqui se asignan todas las colisiones
        this.body.collisionFilter = {
            'group': -2,
            'category': 4,
            'mask': 1 | 8, //mundo y balas jugador
            //'group':2,  //asi no colisionan entre si si tienen este mismo valor en negativo, en positivo siempre colisionaran si tienen el mismo valor, con 0 npi, explotara supongo
        };

    }//Fin constructorasd


    //PREUPDATE
    preUpdate() {

        if(this.hitState)
        {
            this.aspecto.play('enemyHit', true);
            if(this.aspecto.anims.currentFrame.textureFrame === 14)
                this.hitState = false;
        }
        //Comprobamos el movimiento para asignar la animacion
        else if (this.isDead === false) {
            if (this.body.speed > 0)
                this.aspecto.play('enemyWalk', true);
            else
                this.aspecto.play('enemyIdle', true);
        }
        else {
            if (this.body.speed <= 5){
                this.setFrictionAir(0.4);
                this.setCollisionCategory(null)
                
            }
            this.setActive(false);
        }

        //Para calcular la distancia entre siguientes posiciones   
        let distanceBetweenPos = Phaser.Math.Distance.Between(this.x, this.y, this.nextX, this.nextY);
        //ESTADO REPOSO
        if (!this.attackState)
            this.restEnemy(distanceBetweenPos);

        //ESTADO ATAQUE
        else {
            //Movimiento
            this.attackEnemy(distanceBetweenPos);
            //Disparo
            if (this.scene.time.now > this.timerShoot) {
                //Disparamos y reactivamos el timer de disparo con un aleatorio
                this.weapon.shoot(true);

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
    newNextPos() {
        let newX, newY; //Offset de la nueva poscion respecto a la anterior
        let wichMove = 0; //Elige entre mov aleatorio y hacia al jugador

        if (!this.attackState) //reposo
        {
            newX = Math.floor(Math.random() * (30 + 30)) - 30;
            newY = Math.floor(Math.random() * (30 + 30)) - 30;
        }
        else //atake
        {
            wichMove = Math.floor(Math.random() * (6 - 1)) + 1;
            if (wichMove < 5) {
                newX = Math.floor(Math.random() * (30 + 30)) - 30;
                newY = Math.floor(Math.random() * (30 + 30)) - 30;
            }
        }
        //Reposo o ataque aleatorio
        if (wichMove < 5) {
            this.nextX = this.x + newX;
            this.nextY = this.y + newY;
            this.enemyTime = 2500; //Modificamos el margen del timer
        }
        //Ataque al jugador
        else {
            this.nextX = this.playerRef.x;
            this.nextY = this.playerRef.y;
            this.enemyTime = 500; //Modificamos el margen del timer
        }
    }


    //CREA LA NUEVA DIRECCION A UTILIZAR EN EL MOVIMIENTO
    enemyMove() {
        this.dir = new Phaser.Math.Vector2(this.nextX - this.x, this.nextY - this.y);
        this.dir.normalize();
    }


    //METODO QUE CALCULA LO RELACIONADO AL MOVIMIENTO EN ESTADO REPOSO
    restEnemy(distanceBetweenPos) {
        //Si llega a la siguiente pos
        if (distanceBetweenPos < 4) {
            //Nueva pos y mov
            this.newNextPos();
            this.auxRest();

            //AQUI INICILIZAMOS EL TIMER CADA VEZ
            this.timerMove = this.scene.time.now + this.enemyTime;
        }
        //Si no llega a la pos pero el tiempo llega a su maximo cambia de pos 
        else if (this.scene.time.now > this.timerMove) {
            //Nueva pos y mov
            this.newNextPos();
            this.auxRest();

            //AQUI INICILIZAMOS EL TIMER CADA VEZ
            this.timerMove = this.scene.time.now + this.enemyTime;
        }

        //Si el enemigo esta en el rango del jugador cambiamos el estado
        let distanceEnemyPlayer = Phaser.Math.Distance.Between(this.x, this.y, this.playerRef.x, this.playerRef.y);
        if (distanceEnemyPlayer < 100)
            this.attackState = true;

        //MOVEMOS AL ENEMIGO
        this.setVelocity(this.dir.x * 0.3, this.dir.y * 0.3);

    }
    //Calculos auxiliares del movimiento en reposo
    auxRest() {
        this.dir = new Phaser.Math.Vector2(0, 0); //Paramos al enemigo
        this.scene.time.delayedCall(500, this.rotateRest, [], this); //Lo giramos 
        this.scene.time.delayedCall(1000, this.enemyMove, [], this); //Movemos al enemigo
    }
    //Auxiliar para rest, gira arma y enemigo
    rotateRest() {
        if (this.nextX > this.x) {
            this.moveRotate((1));
            this.rotateWeapon((0 * Math.PI) / 180.0);
        }
        else {
            this.moveRotate((-1));
            this.rotateWeapon((180 * Math.PI) / 180.0);
        }
    }

    //METODO QUE CALCULA LO RELACIONADO AL MOVIMIENTO EN ESTADO ATAQUE
    attackEnemy(distanceBetweenPos) {
        //Si llega a la siguiente pos
        if (distanceBetweenPos < 4) {

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

        //MOVEMOS AL ENEMIGO
        this.setVelocity(this.dir.x * 0.6, this.dir.y * 0.6);
    }

}
