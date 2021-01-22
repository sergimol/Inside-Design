import Item from "./item.js";
import Weapon from "./weapon.js";
import config from "./config.js";


export default class Humanoid extends Phaser.GameObjects.Container { //Container
    constructor(scene, x, y, humanSprite, health, config) {
        super(scene, x, y);
        scene.add.existing(this);

        this.aspecto = scene.add.sprite(0, 0, humanSprite);
        this.aspecto.setScale(config.spriteScaleX, config.spriteScaleY)
        this.aspecto.depth = 3;                        //Layer de sprite en la que se renderiza, se renderiza por encima de todos lo que tengan numeros menores;
        this.add(this.aspecto);
      
        //Atributos
        this.health = health;//config.humanoid.health;

        this.isDead = false;                            //La entidad está viva
        this.hitState = false; //para cambiar a la animacion de hit
        //vector que acumula el empuje que s ele tiene que aplicar
        this.forceSaved = { x: 1, y: 0 };


        this.setSize(config.scaleX, config.scaleY);

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

        if (!this.isDead && !this.shielded) {
            this.hitState = true;
            this.health -= damagePoints;
            if (this.body.label === 'player')
                this.scene.setHealth(this.health);

            if (this.health <= 0) {

                let sound = this.scene.sound.add('deadSound');
                sound.setVolume(1.5);
                sound.play();

                this.isDead = true;
                this.hitState = false;

                this.weapon.setVisible(false);
                //console.log('entityDep');
                this.aspecto.play('deathEnemy'+ config.enemySprite.key[this.scene.actualEnemyID], true);

                if (this.body.label === 'enemy') {
                    this.scene.enemyCount--;
                    this.scene.enemiesKilled++;
                    this.scene.saveFile();
                    let numItems = Phaser.Math.RND.between(0, 4);
                    this.weapon.pararRafagasCola();
                    //console.log(numItems);
                    for (let n = 0; n < numItems; ++n) {
                        let chooseItem = Phaser.Math.RND.between(0, 4);
                        if (chooseItem < 4)
                            var item = new Item(this.scene, this.x, this.y, 'bulletAmmo', this.scene.player);
                        else
                            var item = new Item(this.scene, this.x, this.y, 'medkit', this.scene.player);
                    }
                    //Decrementa en 1 EnemyCountDoor de la sala en la que se encuentra el enemigo
                    --this.doorRef.EnemyCountDoor;    //El -1 es porque la puerta inicial es 1, pero el array empieza en 0
                    console.log(this.doorRef.EnemyCountDoor);

                    this.body.collisionFilter = {
                        'group': -2,
                        'category': 4,
                        'mask': 1, //mundo y balas jugador
                        //'group':2,  //asi no colisionan entre si si tienen este mismo valor en negativo, en positivo siempre colisionaran si tienen el mismo valor, con 0 npi, explotara supongo
                    };
                }
                else if (this.body.label === 'player') {
                    this.weapon.pararRafagasCola();
                    this.scene.setHealth(0);
                    this.scene.scene.launch('death');
                    this.scene.scene.pause('main');
                }
            }
            else {
                //sonido hit
                let sound = this.scene.sound.add('hitShootSound');
                //sound.setVolume(0.1);
                sound.play();
            }
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
            if (!this.weapon.esMelee()) {
                this.weapon.image.setFlipY(false);
            }
        }
        else {
            //this.each(entity => entity.flipX = true)
            this.aspecto.setFlipX(true);

            if (!this.weapon.esMelee()) {
                this.weapon.image.setFlipY(true);
            }
        }
    }

    changeWeapon(weaponConfig) {
        this.weapon.destructora();
        this.weapon = new Weapon(this.scene, 0, 5, weaponConfig);
        this.add(this.weapon);
      }


    stopMove() {
        //console.log("PARATE BOLUDO");
        //this.body.awsetVelocity(0, 0);
    }

    rotateWeapon(angle) {
        this.weapon.rotateWeapon(angle);
        if (this.weapon.rotation < 0)
            this.sendToBack(this.weapon);

        else
            this.bringToTop(this.weapon);
    }



}

