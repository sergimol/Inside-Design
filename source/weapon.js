//import Bullet from "./bullet.js";
//import Bullet from "./bullet.js";
import Bullet from "./bullet.js";

export default class Weapon extends Phaser.GameObjects.Container{
    constructor(scene, x, y, spriteWeapon,
                spriteBullet, s, m, cadence,
                dispersion, pellets, bulletForce, forceDispersion,
                rafagas, rafagasCadence){

        super(scene, x, y);
        //al parecer necesito guardar el sprite aqui porque de otra forma no me lo detecta en otros metodos, ejem: shoot
        this.spriteBullet = spriteBullet;

        //Otros atributos
        this.rafagas = rafagas; //cantidad de veces que se llama al metodo de disparar
        this.rafagasCadence = rafagasCadence; //intervalo de tiempo entre que se puede disparar una rafaga y otra

        //semiautomatica o automatica
        this.modo = m;
        //forma en la que dispara, mono, rafaga, shotgun, multi, //granadas, cohetes, son un tipo de bala no un tipo de arma etc¿?
        this.style = s;
        this.cadencia = cadence; //en milisegundos
        this.ultimoDisparoTiempo = 0;
        this.ultimaRafagaTiempo = 0;
        
        //dispersion del arma %
        this.dispersion = dispersion;
        this.pellets = pellets;
        this.bulletForce = bulletForce;
        this.forceDispersion = forceDispersion; // %



        //imagen del arma
        this.image = scene.add.image(0, 0, spriteWeapon);
        this.image.setOrigin(0.15, 0.5);
        this.add(this.image);
        //this.setScale(1.25);
        //this.bulletCount = 1; 
        //if (this.bulletCount >= 500) this.bulletCount = 1;

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
            
            

            ////////////
           
                //console.log(this.ultimoDisparoTiempo);
                this.c = 0;
                this.scene.time.addEvent({
                    delay: this.rafagasCadence,
                    callback: () => {
                        this.dispararRafagas(esEnemigo);
                    },
                    repeat: this.rafagas - 1}
                );
            
            return true;    
        }
        else return false;
            
    }

    dispararRafagas(esEnemigo){
            this.scene.cameras.main.shake(100,0.0005);
            if (this.style === "mono"){
                
            let sound = this.scene.sound.add('gunShootSound2');
            sound.setVolume(0.1);
            sound.play();
                this.instanciarBala(esEnemigo);
            }
            else if (this.style === "shotgun"){
                
            let sound = this.scene.sound.add('gunShootSound2');
            sound.setVolume(0.1);
            sound.play();
                for (let i = 0; i < this.pellets; ++i){
                    this.instanciarBala(esEnemigo);
                }
            } 
        
    }


    instanciarBala(esEnemigo){
        
        
            this.canyon.getWorldTransformMatrix(this.tempMatrix, this.scene.TransformMatrix);

                var d = this.tempMatrix.decomposeMatrix();
             
                //calcular dispersion
                let disp = Phaser.Math.Between(-this.dispersion, this.dispersion);
                let dispForce = Phaser.Math.Between(-this.forceDispersion, this.forceDispersion);

                //instanciar disparos
                let disparo = new Bullet(this.scene, d.translateX, d.translateY, this.spriteBullet, 0.7, 8, 8, 4, 4, 30, 'bullet', 0.3, 0, 0.8, 0.3);
                //colisiones del disparo
                
                //si en vez de esta categoria s epone un 0, no colisionara con ese objeto
                if (esEnemigo){
                    // Default: 1, Player: 2, Enemy: 4, PlayerBullet: 8, Enemy Bullet: 16
                    //Aqui se asignan todas las colisiones
                    disparo.body.collisionFilter = {
                        'group' : 0, //hara siempre la regla category/mask
                        
                        'category': 16,
                        'mask': 1 | 2,
                    };
                }
                else{
                    // Default: 1, Player: 2, Enemy: 4, PlayerBullet: 8, Enemy Bullet: 16
                    //Aqui se asignan todas las colisiones
                    disparo.body.collisionFilter = {
                        'group' : 0, //hara siempre la regla category/mask
                        
                        'category': 8,
                        'mask': 1 | 4,
                    };
                }
            

                this.scene.matter.body.setAngle(disparo.body, (this.rotation + (disp * Math.PI/200)));
                //disparo.setRotation(this.rotation + (disp * Math.PI/200));
                disparo.thrust(this.bulletForce + (dispForce * this.bulletForce/100));
    }

    rotateWeapon(angle) {

        //si el angulo es mas de 45 y (45+90) el sprite deberia de ir debajo0 del de humanoide
        this.rotation = angle;
    }
}