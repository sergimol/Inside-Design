import Weapon from "./weapon.js";

export default class Humanoid extends Phaser.GameObjects.Container { //Container
    constructor(scene, x, y, humanSprite) {
        super(scene, x, y);
        scene.add.existing(this);

        this.aspecto = scene.add.sprite(0, 0, humanSprite);
        this.aspecto.depth = 3;                        //Layer de sprite en la que se renderiza, se renderiza por encima de todos lo que tengan numeros menores;
        this.add(this.aspecto);

        //Atributos
        this.health = 0;
        this.isDead = false;                            //La entidad está viva
        this.speed = 100;

        //Para añadir hijos
        this.weapon = new Weapon(scene, 0, 5, "gunShoot", "bullet", "auto", 200);
        this.add(this.weapon);
        this.setSize(16, 16);

        this.scene.matter.add.gameObject(this);
        this.scene.matter.body.setInertia(this.body, Infinity);

        this.scene.matter.world.on('collisionstart', (event) => {
            let wordBody = this.body;
            for (let i = 0; i < event.pairs.length; i++) {
                let bodyA = event.pairs[i].bodyA;
                let bodyB = event.pairs[i].bodyB;

                if (bodyA === wordBody || bodyB === wordBody) {
                    if (bodyA === wordBody && bodyB.label === 'bullet') {
                        this.damage();
                        console.log("enemyHit");
                    }
                    else if (bodyA.label === 'bullet' && bodyB === wordBody) {
                        this.damage();
                        console.log("enemyHit");
                    }
                }
            }
        });

    }//Fin constructora

    damage() {
        --this.health;
        console.log(this.health);
        if (this.health === 0) {
            this.isDead = true;
            this.weapon.destroy();
            this.setActive(false);      //.setVisible(false)
            console.log('entity explode');
        }
    }


    ////////////
    //MOVIMIENTO

    //@param {*} dirX 
    // @param {*} dirY

    moveRotate(dirX) {
        if (dirX > 0) {
            //this.each(entity => entity.flipX = false)
            this.aspecto.setFlipX(false);
            this.weapon.image.setFlipY(false);
        }
        else {
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

