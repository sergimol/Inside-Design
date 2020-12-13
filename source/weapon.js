//import Bullet from "./bullet.js";
//import Bullet from "./bullet.js";
import Bullet from "./bullet.js";

export default class Weapon extends Phaser.GameObjects.Container{
    constructor(scene, x, y){
        super(scene, x, y);

        //imagen del arma
        this.image = scene.add.image(0, 0, 'gunShoot');
        this.image.setOrigin(0.15,0.5);
        this.add(this.image);
        //this.setScale(1.25);
        
        //hace falta pasarle a cuanta distancia esta la punta del cañon, para cada arma sera diferente aqsi que habra que pasarselo a la constructora
        //es que voy a pasar numeros magicos xd
        this.canyon = scene.add.image(20,0,"crosshair");
        this.add(this.canyon);
        //this.cadence, this.ammoRate, this.damage;
    }

    shoot(x,y){
        
       let disparo = new Bullet(this.scene, x + this.canyon.x, y + this.canyonsd.y);
       //let disparo = new Bullet(this.scene, this.canyon.x, this.canyon.y);
    }



    rotateWeapon(angle){

        //si el angulo es mas de 45 y (45+90) el sprite deberia de ir debajo0 del de humanoide
        this.rotation = angle;
    }
}