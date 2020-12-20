import Weapon from "./weapon.js";

export default class Humanoid extends Phaser.GameObjects.Container { //Container
    constructor(scene, x, y, humanSprite) {
        super(scene, x, y);
        this.aspecto = scene.add.sprite(0, 0, humanSprite);
        scene.add.existing(this);
        this.speed = 100;
        //this.scene.physics.world.enableBody(this, 0);    //le añadimos físicas dinámicas
        this.isDead = false;                            //La entidad está viva
        this.aspecto.depth = 3;                        //Layer de sprite en la que se renderiza, se renderiza por encima de todos lo que tengan numeros menores;
        this.add(this.aspecto);
        //this.Sprite.play('idle', true);
        //Atributos
        this.health = 0;

        //Para añadir hijos
        this.weapon = new Weapon(scene, 0, 5, "gunShoot", "bullet", "auto", 100, 20);
        this.add(this.weapon);
        this.setSize(16, 16);
        this.scene.matter.add.gameObject(this);
        this.scene.matter.body.setInertia(this.body, Infinity);
    }//Fin constructora

    damage() {
        --this.health;
        console.log(thisdws.health);
        if (this.health === 0) {
            this.isDead = true;
            this.weapon.destroy();
            //this.destroy();
            console.log('entity explode');
        }
    }


    ////////////
    //MOVIMIENTO

    //@param {*} dirX 
    // @param {*} dirY

    moveRotate(dirX) {
        if (dirX > 0){
            //this.each(entity => entity.flipX = false)
            this.aspecto.setFlipX(false);
            this.weapon.image.setFlipY(false);
        }
        else{
            //this.each(entity => entity.flipX = true)
            this.aspecto.setFlipX(true);    
            this.weapon.image.setFlipY(true);
        }
    }


    stopMove() {
        //console.log("PARATE BOLUDO");
        //this.body.awsetVelocity(0, 0);
    }

    rotateWeapon(angle) {
        this.weapon.rotateWeapon(angle);

        if (angle < 0)
            this.sendToBack(this.weapon);

        else
            this.bringToTop(this.weapon);
    }



}

