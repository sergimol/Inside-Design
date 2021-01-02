import config from "./config.js";

export default class Humanoid extends Phaser.GameObjects.Container { //Container
    constructor(scene, x, y, humanSprite, depth) {
        super(scene, x, y);
        scene.add.existing(this);

        this.aspecto = scene.add.sprite(0, 0, humanSprite);
        this.aspecto.depth = depth;                        //Layer de sprite en la que se renderiza, se renderiza por encima de todos lo que tengan numeros menores;
        this.add(this.aspecto);

        //Atributos
        this.health = config.humanoid.health;
        this.isDead = false;                            //La entidad está viva
        this.speed = config.humanoid.speed;
        this.hitState = false; //para cambiar a la animacion de hit


        this.setSize(config.humanoid.size, config.humanoid.size);

        this.scene.matter.add.gameObject(this);
        this.scene.matter.body.setInertia(this.body, Infinity);

        this.scene.matter.world.on('collisionstart', (event) => {
            let wordBody = this.body;
            for (let i = 0; i < event.pairs.length; i++) {
                let bodyA = event.pairs[i].bodyA;
                let bodyB = event.pairs[i].bodyB;

                //TODO
                //#Issue esto ya no hace falta en ninguno de los sentidos
                if (bodyA === wordBody || bodyB === wordBody) {
                    if (bodyA === wordBody && bodyB.label === 'bullet') {
                        //this.damage();
                        //console.log("enemyHit");
                    }
                    else if (bodyA.label === 'bullet' && bodyB === wordBody) {
                        //this.damage();
                        //console.log("enemyHit");
                    }
                }
            }
        });

    }//Fin constructora

    damage(damagePoints) {
        

        this.hitState = true;
        this.health -= damagePoints;
        console.log(this.health);
        if(this.body.label === 'player' && !this.isDead)
            this.hud.setHealth(this.health);
        if (this.health <= 0) {

            let sound = this.scene.sound.add('deadSound');
            sound.setVolume(1.5);
            sound.play();

            this.isDead = true;
            this.hitState = false;
            
            this.weapon.setVisible(false);
            console.log('entityDep');
            this.aspecto.play('enemyDep', true);

            if(this.body.label === 'enemy'){
                this.scene.enemyCount--;
            }

        }
        else{
            //sonido hit
            let sound = this.scene.sound.add('hitShootSound');
            //sound.setVolume(0.1);
            sound.play();
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
            if (!this.weapon.esMelee()){
                this.weapon.image.setFlipY(false);
            }
        }
        else {
            //this.each(entity => entity.flipX = true)
            this.aspecto.setFlipX(true);
            
            if (!this.weapon.esMelee()){
            this.weapon.image.setFlipY(true);
            }
        }
    }


    stopMove() {
        //console.log("PARATE BOLUDO");
        //this.body.awsetVelocity(0, 0);
    }

    rotateWeapon(angle) {
        this.weapon.rotateWeapon(angle);
        if (this.weapon.rotation< 0)
            this.sendToBack(this.weapon);

        else
            this.bringToTop(this.weapon);
    }



}

