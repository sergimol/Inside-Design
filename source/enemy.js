import Humanoid from "./humanoid.js";
export default class Enemy extends Humanoid {
    constructor(scene, x, y, Sprite) {
        super(scene, x, y, 'enemy');

        //Atributos
        this.speed = 50;
        this.health = 3;
        /////////////
        //Animaciones
        const anims = scene.anims;

        anims.create({
            key: 'enemyWalk',
            frames: anims.generateFrameNumbers(this.Sprite, { start: 4, end: 9 }), //15
            frameRate: 15,
            repeat: -1
        })
        anims.create({
            key: 'enemyIdle',
            frames: anims.generateFrameNumbers(this.Sprite, { start: 1, end: 3 }),
            frameRate: 7,
            repeat: -1
        })

        this.dirX = -1;
        this.dirY = 0;

        let newX = Math.floor(Math.random() * (30 + 30)) - 30;
        let newY = Math.floor(Math.random() * (30 + 30)) - 30;

        this.nextX = this.x + newX;
        this.nextY = this.y + newY;

        //this.scene.physics.moveTo(this, this.nextX, this.nextY, this.speed - 30);   

        //Timer para mover al enemigo aunque no llegue a la siguiente posicion
        this.minMoveTime = this.scene.time.addEvent({ delay: 1000, callback: this.enemyMove, callbackScope: this, loop: true });
        //this.scene.time.addEvent({ delay: 1000, callback: this.enemyMove, callbackScope: this, loop: true });
        this.attackState = false;

        this.timeEvent;
        this.enemyTime = 1;

    }//Fin constructora



    preUpdate(player) {

        //Calculamos la distancia entre la siguiente posicion y el enemigo
        let distanceEnemyPlayer = Phaser.Math.Distance.Between(this.x, this.y, player.x, player.y);

        //Comprobamos el estado con la distancia
        if (!this.attackState && distanceEnemyPlayer < 70)
            this.attackState = true;

        //ESTADO REPOSO
        if (!this.attackState) {
            let distanceBetweenPos = Phaser.Math.Distance.Between(this.x, this.y, this.nextX, this.nextY);
            if (distanceBetweenPos < 4) {

                this.stopMove();
                // if(this.scene.Phaser.time)
                //this.timeEvent = this.scene.time.delayedCall(1000, this.enemyMove, [], this);
                //this.enemyMove();

            }
            if (this.nextX > this.x) {
                this.moveRotate((1));
                this.rotateWeapon((0 * Math.PI) / 180.0);
            }
            else {
                this.moveRotate((-1));
                this.rotateWeapon((180 * Math.PI) / 180.0);
            }
            this.weapon.y = this.y + 7;
        }
        //ESTADO ATAQUE
        else {
            let distanceBetweenPos = Phaser.Math.Distance.Between(this.x, this.y, this.nextX, this.nextY);
            if (this.body.speed > 0) {
                //PARAR AL BICHO CUANDO LLEGA A LA POSICION
                //4 ES UN VALOR CERCANO A LA POS PORQUE SI IGUALAS POSICIONES HACE JAJA xd Y NO SE PARA
                if (distanceBetweenPos < 4) {
                    //Elegimos entre una posicion aleatoria y que se acerque al jugador
                    let wichMove;
                    wichMove = Math.floor(Math.random() * (6 - 1)) + 1;
                    if (wichMove < 5)
                        this.enemyMove();
                    else
                        this.enemyMoveToPlayer(player);

                }

            }

            this.rotateWeapon(Phaser.Math.Angle.Between(this.x, this.y, player.x, player.y));
            this.moveRotate((player.x - this.x));
            this.weapon.y = this.y + 5;
        }

        this.weapon.x = this.x;

        /*
        if(distanceEnemyPlayer < 200)
        {
            let distanceBetweenPos = Phaser.Math.Distance.Between(this.x, this.y, this.nextX, this.nextY);
            if (this.body.speed > 0)
            { 
                    //PARAR AL BICHO CUANDO LLEGA A LA POSICION
                    //4 ES UN VALOR CERCANO A LA POS PORQUE SI IGUALAS POSICIONES HACE JAJA xd Y NO SE PARA
                    if (distanceBetweenPos < 4)
                    {
                        //Elegimos entre una posicion aleatoria y que se acerque al jugador
                        let wichMove;
                        wichMove = Math.floor(Math.random() * (6 - 1)) + 1;
                        if(wichMove <  5)
                            this.enemyMove();
                        else
                            this.enemyMoveToPlayer(player);   
                    }

            }
            this.weapon.x = this.x;
            this.weapon.y = this.y + 20; 
            this.rotateWeapon(Phaser.Math.Angle.Between(this.x, this.y, player.x, player.y));
            this.moveRotate((player.x - this.x));
        }
        */



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
    enemyMoveToPlayer(player) {
        this.nextX = player.x;
        this.nextY = player.y;
        this.scene.physics.moveTo(this, this.nextX, this.nextY, this.speed);
    }

}





//EN GAME
/*
//preload
    this.enemy;
    this.enemies;
//create
    //ENEMY
    this.enemy = new Enemy(this, 250,200, 'enemy');
    this.physics.add.collider(this.enemy, worldLayer);
    //ENEMIES
    this.enemies = this.add.group();

    for(let i = 0; i<8; i++){
        const e = new Enemy(this, 220 + 20*i, 250, 'enemy');
        e.body.setCollideWorldBounds(true);
        e.setTint(0x9999ff);
        this.enemies.add(e);
    }
    //collisions
    this.physics.add.collider(this.bullet, this.enemies, this.handleBulletEnemyCollision, null, this);
//end create
    handleBulletEnemyCollision(b,e){
        console.log('enemy hit');
        e.explode();
    }
//update
if(!this.enemy.isDead)
this.enemy.update();
this.enemies.children.iterate((child)=>{
    if(!child.isDead)
    child.update();
})
*/