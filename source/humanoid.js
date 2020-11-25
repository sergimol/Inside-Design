export default class Humanoid extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, Sprite)
    {
        super(scene, x, y, Sprite);
        
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setBounce(0.2);
        this.body.setCollideWorldBounds(true);
        this.setScale(3);
        this.body.onWorldBounds = true;
        this.body.setSize(14,15);

        this.play('idle', true);

        this.health;
        this.speed = 200;
    }
        
    moveLeft(){
        this.setFlipX(true)
        this.body.setVelocityX(-this.speed);
        this.play('walk', true);
    }

    moveRight(){
        this.setFlipX(false)
        this.body.setVelocityX(this.speed);
        this.play('walk', true);
    }

    moveUp(){
        this.body.setVelocityY(-this.speed);
        this.play('walk', true);
    }

    moveDown(){
        this.body.setVelocityY(this.speed);
        this.play('walk', true)
    }

    //Nuevo
    move(dirX, dirY){
        this.body.setVelocityX(this.speed * dirX);
        this.body.setVelocityY(this.speed * dirY);
        //Animacion
        if(dirX === 0 && dirY === 0)
            this.play('idle', true);
        else
            this.play('walk', true);
    }

    moveRotate(dirX)
    {
        if(dirX > 0)
            this.setFlipX(false)
        else 
            this.setFlipX(true)
    }

    stopX(){
        this.body.setVelocityX(0);
    }

    stopY(){
        this.body.setVelocityY(0);
    }

    setIdle(){
        this.play('idle', true);
    }
}