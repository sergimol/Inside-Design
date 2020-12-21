//import Bullet from "./bullet.js";
//import Bullet from "./bullet.js";
import Bullet from "./bullet.js";

export default class Weapon extends Phaser.GameObjects.Container{
    constructor(scene, x, y, spriteWeapon, spriteBullet, m, cadence, dispersion){
        super(scene, x, y);
        //al parecer necesito guardar el sprite aqui porque de otra forma no me lo detecta en otros metodos, ejem: shoot
        this.spriteBullet = spriteBullet;

        //Otros atributos

        //semiautomatica o automatica
        this.modo = m;
        //forma en la que dispara, mono, rafaga, shotgun, multi, //granadas, cohetes, son un tipo de bala no un tipo de arma etc¿?
        this.cadencia = cadence; //en milisegundos
        this.ultimoDisparoTiempo = 0;
        
        //dispersion del arma %
        this.dispersion = dispersion;



        //imagen del arma
        this.image = scene.add.image(0, 0, spriteWeapon);
        this.image.setOrigin(0.15, 0.5);
        this.add(this.image);
        //this.setScale(1.25);
        this.bulletCount = 1; 
        if (this.bulletCount >= 500) this.bulletCount = 1;

        //hace falta pasarle a cuanta distancia esta la punta del cañon, para cada arma sera diferente aqsi que habra que pasarselo a la constructora
        //es que voy a pasar numeros magicos xd
        this.canyon = scene.add.image(20, 0);
        this.add(this.canyon);
        //this.cadence, this.ammoRate, this.damage;
        this.tempMatrix = new Phaser.GameObjects.Components.TransformMatrix();
    }

    esAutomatica(){return (this.modo === "auto");}

    shoot(esEnemigo){
        let siguienteDisparo = this.scene.time.now;
        //console.log(this.ultimoDisparoTiempo);
        if (siguienteDisparo >= this.ultimoDisparoTiempo + this.cadencia){
            this.ultimoDisparoTiempo = siguienteDisparo;
            
            this.canyon.getWorldTransformMatrix(this.tempMatrix, this.scene.TransformMatrix);

            var d = this.tempMatrix.decomposeMatrix();
            
            //calcular dispersion
            let disp = Phaser.Math.Between(-this.dispersion, this.dispersion);

            //instanciar disparos
            let disparo = new Bullet(this.scene, d.translateX, d.translateY, this.spriteBullet);
            //colisiones del disparo
            //categorias:
            // Default: 1, Player: 2, Enemy: 3, PlayerBullet: 4, Enemy Bullet: 5
            //let categotyDefault = 1, categoryPlayer = 2, categoryEnemy = 3, categoryPlBullet = 4, categoryEnBullet = 5;
            let grupoBala, colisionHumanoide;
            //si en vez de esta categoria s epone un 0, no colisionara con ese objeto
            if (esEnemigo){
                grupoBala = 4;
                colisionHumanoide = 1
            }
            else{
                grupoBala = 3;
                colisionHumanoide = 2
            }


            //Aqui se asignan todas las colisiones
            disparo.body.collisionFilter = {
                'group' : -1,
                'category': grupoBala,
                'mask': -1 | colisionHumanoide,// & grupoBala,
                //'category': //aqui decimos cual es su grupito
                    //'group': grupoBala,  //asi no colisionan entre si si tienen este mismo valor en negativo, en positivo siempre colisionaran si tienen el mismo valor, con 0 npi, explotara supongo
                    //'collidesWith' : [3,grupoBala]
              };
            disparo.setRotation(this.rotation + (disp * Math.PI/200));
            disparo.thrust(0.2);
            
            //disparo.applyForce({x: 0, y: 0});
            //disparo.rotation = this.rotation;
            //let disparo = new Bullet(this.scene, this.canyon.x, this.canyon.y);
            this.scene.cameras.main.shake(100,0.0005);
            if (this.modo === "mono"){

            }
            return true;
        }
        else
            return false;
    }

    rotateWeapon(angle) {

        //si el angulo es mas de 45 y (45+90) el sprite deberia de ir debajo0 del de humanoide
        this.rotation = angle;
    }
}