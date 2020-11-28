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
        this.depth = 3;                        //Layer de sprite en la que se renderiza, se renderiza por encima de todos lo que tengan numeros menores;

        this.play('idle', true);

        //Escala
        this.setScale(3);           //Tamaño sprite
        this.body.setSize(14,15);   //Collider
        //Atributos
        this.health;
        this.speed = 200;

        //Container
        this.container = scene.add.container();
        this.scene.add.existing(this.container);
        //Para añadir hijos
        this.weapon = new Weapon(scene, x, y);
        this.container.add(this.weapon);
        //this.container.setDepth(4);


    }//Fin constructora
        
    die(){
        --this.health;
        console.log(this.health);
        if(this.health===0){
            this.isDead = true;
            this.weapon.destroy();
            this.container.destroy();
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
        if(dirX === 0 && dirY === 0)
            this.play('idle', true);
        else
            this.play('walk', true);

            this.weapon.x = this.x;
            this.weapon.y = this.y+ 20;
    }
    moveRotate(dirX){
        if(dirX > 0){

            this.setFlipX(false)
            this.weapon.setFlipY(false)
        }
        else {

            this.setFlipX(true)
            this.weapon.setFlipY(true)
        }
        
    }

    rotateWeapon(angle){
    this.weapon.rotateWeapon(angle);

    this.depth


     if (angle < (Math.Pi/4) && angle > (3*Math.PI/4)){
         this.container.setDepth(2);
    }
    else;
     this.weapon.depth = 4;
}


}

