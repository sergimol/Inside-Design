import Humanoid from "./humanoid.js";
export default class Enemy extends Humanoid{
    constructor(scene, x, y, Sprite){
        super(scene, x, y, 'enemy');

        //Atributos
        this.speed = 100;
        this.health = 3;
        /////////////
        //Animaciones
        /*const anims = scene.anims;

        anims.create({
            key:'walk',
            frames: anims.generateFrameNumbers(this.Sprite, {start: 4, end: 9}), //15
            frameRate: 15,
            repeat: -1
        })
        anims.create({
        key:'idle',
        frames: anims.generateFrameNumbers(this.Sprite, {start: 1, end: 3}),
        frameRate: 7,
        repeat: -1
        })*/

        this.dirX = -1;
        this.dirY = 0;

        let newX = Math.floor(Math.random() * (60 + 60)) - 60;
        let newY = Math.floor(Math.random() * (60 + 60)) - 60;

        this.nextX = this.x + newX;
        this.nextY = this.y + newY;

        this.scene.physics.moveTo(this, this.nextX, this.nextY, this.speed);   
    }//Fin constructora

    decidirMov(){
        const {speed} = this;
        const enemyBlocked = this.body.blocked;
        if(enemyBlocked.down ||enemyBlocked.up ||enemyBlocked.right ||enemyBlocked.left){
            console.log("colision");
            let possibleDirections = [];
            for(const direction in enemyBlocked){
                possibleDirections.push(direction);
            }
            const newDirection = possibleDirections[Math.floor(Math.random()*4)+1];
            switch(newDirection){
                case 'up':
                    this.dirX = 0;
                    this.dirY = -1;
                    break;
                case 'left':
                    this.dirX = -1;
                    this.dirY = 0;
                    break;
                case 'down':
                    this.dirX = 0;
                    this.dirY = 1;
                    break;
                case 'right':
                    this.dirX = 1;
                    this.dirY = 0;
                    break;
                case 'none':
                    this.dirX = 0;
                    this.dirY = 0;
                default:
                    break;
            }
        }
    }
        
    update(player){
        //this.decidirMov();
        //this.move(this.dirX, this.dirY);
        //this.enemyMove();
        
        let distance = Phaser.Math.Distance.Between(this.x, this.y, this.nextX, this.nextY);

        if (this.body.speed > 0)
        {
            //PARAR AL BICHO CUANDO LLEGA A LA POSICION
            //4 ES UN VALOR CERCANO A LA POS PORQUE SI IGUALAS POSICIONES HACE JAJA xd Y NO SE PARA
            if (distance < 4)
            {
                this.enemyMove();
            }
        }
        this.weapon.x = this.x;
        this.weapon.y = this.y + 20; 
        this.rotateWeapon(Phaser.Math.Angle.Between(this.x, this.y, player.x, player.y));
        this.moveRotate((player.x - this.x));

    }

    enemyMove()
    {
        //this.stopMove();
        //Calculamos unos margenes para la siguiente posicion
        let newX, newY;
        newX = Math.floor(Math.random() * (60 + 60)) - 60;
        newY = Math.floor(Math.random() * (60 + 60)) - 60;
        //Creamos la nueva posicon
        this.nextX = this.x + newX;
        this.nextY = this.y +newY;
        //Movemos al enemigo a la siguiente posicion
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