import Weapon from "./weapon.js";

export default class Humanoid extends Phaser.GameObjects.Sprite 
{ //Container
    constructor(scene, x, y, Sprite)
    {
        super(scene, x, y, Sprite);
        
        this.scene = scene;                             //Guardamos la escena en humanoide
        scene.add.existing(this);                       //Añadimos a la escena el objeto humanoide
        this.scene.physics.world.enableBody(this,0);    //le añadimos físicas dinámicas
        this.isDead = false;                            //La entidad está viva
        this.Sprite = Sprite;                           //Pasamos el sprite

        //this.play('idle', true);

        //Escala
        this.setScale(3);           //Tamaño sprite
        this.body.setSize(14,15);   //Collider
        //Atributos
        this.health;
        this.speed = 200;

        //Container
        this.container = scene.add.container(x,y);
        this.scene.add.existing(this.container);
        //Para añadir hijos
        this.weapon = new Weapon(scene, x+20, y+20);
        this.container.add(this.weapon);


    }//Fin constructora
        
    die(){
        if(!this.isDead){
            this.isDead = true;
            this.destroy();
            console.log('entity explode');
        }

    }
    ////////////
    //MOVIMIENTO
    move(dirX, dirY){
        this.body.setVelocityX(this.speed * dirX);
        this.body.setVelocityY(this.speed * dirY);
        //Animacion
        //if(dirX === 0 && dirY === 0)
         //   this.play('idle', true);
       // else
         //   this.play('walk', true);
    }
    moveRotate(dirX)
    {
        if(dirX > 0)
            this.setFlipX(false)
        else 
            this.setFlipX(true)
    }


}