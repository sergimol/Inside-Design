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

        //Cambiar color "placeholder"
        this.aspecto.setTint(0x9999ff);
        
        let newX = Math.floor(Math.random() * (30 + 30)) - 30;
        let newY = Math.floor(Math.random() * (30 + 30)) - 30;
        
        this.nextX = this.x + newX;
        this.nextY = this.y + newY;
                
        //Timer para mover al enemigo aunque no llegue a la siguiente posicion
        this.minMoveTime = this.scene.time.addEvent({ delay: 1000, callback: this.enemyMove, callbackScope: this, loop: true });
        //this.scene.time.addEvent({ delay: 1000, callback: this.enemyMove, callbackScope: this, loop: true });
        this.attackState = false;
        
        this.timeEvent;
        this.enemyTime = 1;
        this.playerRef = player; 
 
    }//Fin constructora




    preUpdate() {

        //Comprobamos el movimiento para asignar la animacion
        if(this.body.speed>0)
            this.aspecto.play('enemyWalk', true);
        else
            this.aspecto.play('enemyIdle', true);

        //Para calcular la distancia entre siguientes posiciones   
        let distanceBetweenPos = Phaser.Math.Distance.Between(this.x, this.y, this.nextX, this.nextY);
        //ESTADO REPOSO
        if (!this.attackState){
            //Si llega a la siguiente pos
            if (distanceBetweenPos < 4) {
                    
                this.stopMove();

                if (this.nextX > this.x) {
                    this.moveRotate((1));
                    this.rotateWeapon((0 * Math.PI) / 180.0);
                }
                else {
                    this.moveRotate((-1));
                    this.rotateWeapon((180 * Math.PI) / 180.0);
                }  
            }
            //Si el enemigo esta en el rango del jugador cambiamos el estado
            let distanceEnemyPlayer = Phaser.Math.Distance.Between(this.x, this.y, this.playerRef.x, this.playerRef.y);
            if(distanceEnemyPlayer < 70)
                this.attackState = true;
        }
        //ESTADO ATAQUE
        else {
        
            //Si llega a la siguiente pos
            if (distanceBetweenPos < 4) {
                
                //Elegimos entre una posicion aleatoria y que se acerque al jugador
                let wichMove;
                wichMove = Math.floor(Math.random() * (6 - 1)) + 1;
                if (wichMove < 5)
                this.enemyMove();
                else
                this.enemyMoveToPlayer();
            }
                
            this.rotateWeapon(Phaser.Math.Angle.Between(this.x, this.y, this.playerRef.x, this.playerRef.y));
            this.moveRotate((this.playerRef.x - this.x));
        }
          
    }
    
    //Mueve el enemigo a una posicon aleatoria
    enemyMove() {
        
        let newX, newY;
        if (!this.attackState) //reposo
        {
            newX = Math.floor(Math.random() * (30 + 30)) - 30;
            newY = Math.floor(Math.random() * (30 + 30)) - 30;
        }
        else //atake
        {
            newX = Math.floor(Math.random() * (60 + 60)) - 60;
            newY = Math.floor(Math.random() * (60 + 60)) - 60;
        }
        //Creamos la nueva posicon
        this.nextX = this.x + newX;
        this.nextY = this.y + newY;
        
        //Movemos al enemigo a la siguiente posicion
        if (!this.attackState)
            this.scene.physics.moveTo(this, this.nextX, this.nextY, this.speed - 30);
        else
            this.scene.physics.moveTo(this, this.nextX, this.nextY, this.speed);
        
    }
    
    //Mueve el enemigo hacia la posicion del jugador
    enemyMoveToPlayer() {
        this.nextX = this.playerRef.x;
        this.nextY = this.playerRef.y;
        this.scene.physics.moveTo(this, this.nextX, this.nextY, this.speed);
    }
    
    
}
