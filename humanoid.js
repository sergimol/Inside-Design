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

        let health;
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