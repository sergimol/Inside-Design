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
        
        this.newNextPos();
                
        //Timer para mover al enemigo aunque no llegue a la siguiente posicion
       ////// this.minMoveTime = this.scene.time.addEvent({ delay: 1000, callback: this.enemyMove, callbackScope: this, loop: true });
        //this.scene.time.addEvent({ delay: 1000, callback: this.enemyMove, callbackScope: this, loop: true });
        //this.scene.time.addEvent({ delay: 3000, callback: this.restEnemyMove, callbackScope: this, loop: true });
        this.attackState = false;
        
        this.timeEvent;
        this.enemyTime = 1;
        this.playerRef = player; 

        //Primera posicionaw
        this.dir = new Phaser.Math.Vector2();
        this.enemyMove();
        this.miscojones = false;
    }//Fin constructorasd




    newNextPos(){
        let newX, newY;
        let wichMove = 0;
        if (!this.attackState) //reposo
        {
            newX = Math.floor(Math.random() * (30 + 30)) - 30;
            newY = Math.floor(Math.random() * (30 + 30)) - 30;
        }
        else //atake
        {
            wichMove = Math.floor(Math.random() * (6 - 1)) + 1;
            if (wichMove < 5)
            {
                newX = Math.floor(Math.random() * (30 + 30)) - 30;
                newY = Math.floor(Math.random() * (30 + 30)) - 30;
            }
        }
        //Creamos la nueva posicon
        if(wichMove < 5)
        {
            this.nextX = this.x + newX;
            this.nextY = this.y + newY;
        }
        else
        {
            this.nextX = this.playerRef.x;
            this.nextY = this.playerRef.y;
        }
    }

    
    preUpdate() {
       
        //Comprobamos el movimiento para asignar la animacion
        if(this.body.speed>0)
            this.aspecto.play('enemyWalk', true);
        else
            this.aspecto.play('enemyIdle', true);

        //Para calcular la distancia entre siguientes posiciones   
        let distanceBetweenPos = Phaser.Math.Distance.Between(this.x, this.y, this.nextX, this.nextY);
        //ESTADO REPOSO
        if (!this.attackState)
            this.restEnemy(distanceBetweenPos);

        //ESTADO ATAQUE
        else 
            this.attackEnemy(distanceBetweenPos);
                       
    }
    
    //Mueve el enemigo a una posicon aleatoria
    enemyMove() {   
        this.dir = new Phaser.Math.Vector2(this.nextX - this.x, this.nextY - this.y);
        this.dir.normalize();  
        this.miscojones = false;     
    }
    

    restEnemy(distanceBetweenPos)
    {
        //Si llega a la siguiente pos
        if (distanceBetweenPos < 4 && !this.miscojones) {
  
            this.newNextPos();
            this.restEnemyMove();
        }
        //Si el enemigo esta en el rango del jugador cambiamos el estado
        let distanceEnemyPlayer = Phaser.Math.Distance.Between(this.x, this.y, this.playerRef.x, this.playerRef.y);
        if(distanceEnemyPlayer < 70)
            this.attackState = true;

        this.setVelocity(this.dir.x * 0.3, this.dir.y * 0.3);
       
    }

    attackEnemy(distanceBetweenPos)
    {
        //Si llega a la siguiente pos
        if (distanceBetweenPos < 4) {
                
            console.log("me quiero morir");
            //Elegimos entre una posicion aleatoria y que se acerque al jugador
            this.newNextPos();
            this.enemyMove();
        }
            
        this.rotateWeapon(Phaser.Math.Angle.Between(this.x, this.y, this.playerRef.x, this.playerRef.y));
        this.moveRotate((this.playerRef.x - this.x));

        this.setVelocity(this.dir.x * 0.6, this.dir.y * 0.6);
    }

    restEnemyMove(){
        this.miscojones = true;
        this.dir=new Phaser.Math.Vector2(0,0);
        this.scene.time.delayedCall(500, this.rotateRest, [], this); 
        this.scene.time.delayedCall(1000, this.enemyMove, [], this);  
    }

    rotateRest()
    {
        if (this.nextX > this.x) {
            this.moveRotate((1));
            this.rotateWeapon((0 * Math.PI) / 180.0);
        }
        else {
            this.moveRotate((-1));
            this.rotateWeapon((180 * Math.PI) / 180.0);
        } 
    }
    
    
}
