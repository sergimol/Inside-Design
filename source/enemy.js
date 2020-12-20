import Humanoid from "./humanoid.js";
export default class Enemy extends Humanoid {
    constructor(scene, x, y, sprite, player) {
        super(scene, x, y, sprite);

        //Atributos
        this.speed = 50;
        this.health = 3;

        /////////////
        //Animaciones
        const anims = scene.anims;
        anims.create({
            key: 'enemyWalk',
            frames: anims.generateFrameNumbers(sprite, { start: 4, end: 9 }), //15
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
            frames: anims.generateFrameNumbers(sprite, { start: 16, end: 19 }),
            frameRate: 7,
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

    }//Fin constructorasd


    //PREUPDATE
    preUpdate() {

        //Comprobamos el movimiento para asignar la animacion
        if (this.isDead == false) {
            if (this.body.speed > 0)
                this.aspecto.play('enemyWalk', true);
            else
                this.aspecto.play('enemyIdle', true);
        }
        else {
            if (this.body.speed <= 0)
                this.setCollisionCategory(null)
            this.setActive(false);
            console.log("estoy mimido");
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
                this.weapon.shoot(this.x, this.y);
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
        if (distanceEnemyPlayer < 70)
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
