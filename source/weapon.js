//import Bullet from "./bullet.js";
//import Bullet from "./bullet.js";
import Bullet from "./bullet.js";

export default class Weapon extends Phaser.GameObjects.Container{
    constructor(scene, x, y, spriteWeapon, spriteBullet){
        super(scene, x, y);
        //al parecer necesito guardar el sprite aqui porque de otra forma no me lo detecta en otros metodos, ejem: shoot
        this.spriteBullet = spriteBullet;

        //imagen del arma
        this.image = scene.add.image(0, 0, spriteWeapon);
        this.image.setOrigin(0.15,0.5);
        this.add(this.image);
        //this.setScale(1.25);
        
        //hace falta pasarle a cuanta distancia esta la punta del cañon, para cada arma sera diferente aqsi que habra que pasarselo a la constructora
        //es que voy a pasar numeros magicos xd
        this.canyon = scene.add.image(20,0);
        this.add(this.canyon);
        //this.cadence, this.ammoRate, this.damage;
        this.tempMatrix = new Phaser.GameObjects.Components.TransformMatrix();
    }

    shoot(){
        this.canyon.getWorldTransformMatrix(this.tempMatrix, this.scene.TransformMatrix);

        var d = this.tempMatrix.decomposeMatrix();
        
       let disparo = new Bullet(this.scene, d.translateX, d.translateY, this.spriteBullet);
       disparo.setRotation(this.rotation);
       disparo.thrust(1);
       //disparo.applyForce({x: 0, y: 0});
       //disparo.rotation = this.rotation;
       //let disparo = new Bullet(this.scene, this.canyon.x, this.canyon.y);
    }

    rotateWeapon(angle){

        //si el angulo es mas de 45 y (45+90) el sprite deberia de ir debajo0 del de humanoide
        this.rotation = angle;
    }
}