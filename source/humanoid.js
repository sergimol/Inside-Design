import Weapon from "./weapon.js";

export default class Humanoid extends Phaser.GameObjects.Container { //Container
    constructor(scene, x, y, humanSprite) {
        //super(scene, x, y);
        //vamos a añadirle un sprite
        let aspecto = scene.add.sprite(0, 0, 'player');
        super(scene, x, y, aspecto);
        scene.add.existing(this);
        this.speed = 100;


        
         this.scene = scene;                             //Guardamos la escena en humanoide
         scene.add.existing(this);                       //Añadimos a la escena el objeto humanoide
         this.scene.physics.world.enableBody(this, 0);    //le añadimos físicas dinámicas
         this.isDead = false;                            //La entidad está viva
         this.depth = 3;                        //Layer de sprite en la que se renderiza, se renderiza por encima de todos lo que tengan numeros menores;
         //this.add(sprite);
         //this.sprite = humanSprite;
         //this.add(humanSprite);
         //scene.add.sprite(x, y, this.sprite);
         //this.Sprite.play('idle', true);
         //Escala
         //this.setScale(3);           //Tamaño sprite
         //this.body.setSize(14, 15);   //Collider
         //Atributos
         this.health = 0;
         
         //Para añadir hijos
         this.weapon = new Weapon(scene, x, y);
         this.add(this.weapon);      
        

    }//Fin constructora

/**
 * 
 die() {
     --this.health;
     console.log(this.health);
     if (this.health === 0) {
         this.isDead = true;
         this.weapon.destroy();
         this.container.destroy();
         //this.destroy();
         console.log('entity explode');
        }
    }
      */

    ////////////
    //MOVIMIENTO
    /**
     * 
     * @param {*} dirX 
     * @param {*} dirY 
     move(dirX, dirY) {
         this.setVelocityX(this.speed * dirX);
         this.setVelocityY(this.speed * dirY);
         //Animacion
         
         if (dirX === 0 && dirY === 0)
         this.Sprite.play('idle', true);
         else
         this.Sprite.play('walk', true);
         
         this.weapon.x = this.x;
         this.weapon.y = this.y + 5;
        }
        */
        /**
     * 
     * @param {*} dirX 
     moveRotate(dirX) {
         if (dirX > 0) {
             
             this.sprite.setFlipX(false)
             //this.weapon.setFlipY(false)
            }
            else {
                
                this.setFlipX(true)
                //this.weapon.setFlipY(true)
            }
            
        }
           */
/**
 * 
 stopMove() {
     console.log("PARATE BOLUDO");
     this.body.setVelocity(0, 0);
    }
   */
/**
 * 
 * @param {*} angle 
 rotateWeapon(angle) {
     this.weapon.rotateWeapon(angle);
     
     if (angle < 0) {
         this.weapon.depth = this.depth - 1;
        }
        else {
            this.weapon.depth = this.depth + 1;
        }
        
        
    }
       */
    

}

