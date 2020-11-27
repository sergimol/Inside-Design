import Humanoid from "/source/humanoid.js";
export default class Enemy extends Humanoid{
    constructor(scene, x, y, Sprite){
        super(scene, x, y, 'enemy');

        //Atributos
        this.speed = 100;

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

        
        let dir = Math.floor(Math.random()*4);
        switch(dir){
            case 0:
                this.body.setVelocity(0, -this.speed);  //up
                break;
            case 1:
                this.body.setVelocity(-this.speed, 0);  //left
                break;
            case 2:
                this.body.setVelocity(0, this.speed);   //down
                break;
            case 3:
                this.body.setVelocity(this.speed, 0);   //right
                break;
            default:
                break;
        }
    }//Fin constructora
    Update(){
        const {speed} = this;
        const enemyBlocked = this.body.blocked;
        if(enemyBlocked.down ||enemyBlocked.up ||enemyBlocked.right ||enemyBlocked.left){
            let possibleDirections = [];
            for(const direction in enemyBlocked){
                possibleDirections.push(direction);
            }
            const newDirection = possibleDirections[Math.floor(Math.random()*4)+1];
            switch(newDirection){
                case 'up':
                    this.body.setVelocity(0,-this.speed);
                    break;
                case 'left':
                    this.body.setVelocity(-this.speed,0);
                    break;
                case 'down':
                    this.body.setVelocity(0,this.speed);
                    break;
                case 'up':
                    this.body.setVelocity(this.speed,0);
                    break;
                case 'none':
                    this.body.setVelocity(0,0);
                    break;
                default:
                    break;
            }
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