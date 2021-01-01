import defaultBulletConfig from './bulletsFolder/defaultBullet.js';



//import Bullet from "./bullet.js";
//import Bullet from "./bullet.js";
import Bullet from "./bullet.js";

export default class Weapon extends Phaser.GameObjects.Container{
    constructor(scene, x, y, config){

        super(scene, x, y);

        //Otros atributos
        this.rafagas = config.rafagas; //cantidad de veces que se llama al metodo de disparar
        this.rafagasCadence = config.rafagasCadence; //intervalo de tiempo entre que se puede disparar una rafaga y otra
        this.cuerpoACuerpo = config.cuerpoACuerpo; //booleano 
        this.origenX = config.origenX;
        this.origenY = config.origenY;

        //semiautomatica o automatica
        this.modo = config.m;
        //forma en la que dispara, mono, rafaga, shotgun, multi, //granadas, cohetes, son un tipo de bala no un tipo de arma etc¿?
        this.style = config.s;
        this.cadencia = config.cadence; //en milisegundos
        this.ultimoDisparoTiempo = 0;
        this.ultimaRafagaTiempo = 0;
        
        //dispersion del arma %
        this.dispersion = config.dispersion;
        this.pellets = config.pellets;
        this.bulletForce = config.bulletForce;
        this.forceDispersion = config.forceDispersion; // %

        //auxiliares
        this.hasShooted = false; //booleano que indica si ah disparado anteriormente o no, se usa para el giro de la imagen en las armas a meele
        this.rotationOffSet = config.rotationOffSet;

        //imagen del arma
        this.image = scene.add.image(0, 0, config.spriteWeapon);
        this.image.setOrigin(config.origenX, config.origenY);
        this.add(this.image);
        this.image.rotation = this.rotationOffSet;

        //coste de municon de uyna bala
        this.costeMunicionPorBala = config.costeMunicionPorBala;

        
        
        //this.setScale(1.25);
        //this.bulletCount = 1; 
        //if (this.bulletCount >= 500) this.bulletCount = 1;

        //hace falta pasarle a cuanta distancia esta la punta del cañon, para cada arma sera diferente aqsi que habra que pasarselo a la constructora
        //es que voy a pasar numeros magicos xd
        this.canyon = scene.add.image(config.canyonX, config.canyonY);
        this.add(this.canyon);
        //this.cadence, this.ammoRate, this.damage;
        this.tempMatrix = new Phaser.GameObjects.Components.TransformMatrix();
    }

    esAutomatica(){return (this.modo === "auto");}
    esMelee(){return this.cuerpoACuerpo;}

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
                         if (this.cuerpoACuerpo){
                             if (this.hasShooted){
                                    this.hasShooted = false;
                                    this.image.setFlipY(false);
                                    this.image.setOrigin(this.origenX, this.origenY);
                                    this.image.rotation = this.rotationOffSet;
                                 
                                 //console.log("hombro izquierdo");
                                }
                                else{ 
                                    this.hasShooted = true;
                                    this.image.setFlipY(true);
                                    this.image.setOrigin(this.origenX, 1 - this.origenY);
                                    this.image.rotation = - this.rotationOffSet;
                                }
                            }

                            
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
                let disparo = new Bullet(this.scene, d.translateX, d.translateY, defaultBulletConfig);
                //colisiones del disparo
                
                //si en vez de esta categoria s epone un 0, no colisionara con ese objeto
                if (esEnemigo){
                    // Default: 1, Player: 2, Enemy: 4, PlayerBullet: 8, Enemy Bullet: 16
                    //Aqui se asignan todas las colisiones
                    if (this.cuerpoACuerpo){
                        
                        disparo.body.collisionFilter = {
                            'group' : -5, 
                            
                            'category': 16,
                            'mask':2 | 8, //POR SI CHOCA CON el swing de un arma a meele del jugador
                        };
                        //disparo.body.isSensor = true;
                    }
                    else{

                        disparo.body.collisionFilter = {
                            'group' : -5, 
                            
                            'category': 16,
                            'mask': 1 | 2 | 8, //POR SI CHOCA CON el swing de un arma a meele del jugador
                        };
                    }
                }
                else{
                    // Default: 1, Player: 2, Enemy: 4, PlayerBullet: 8, Enemy Bullet: 16
                    //Aqui se asignan todas las colisiones

                    if (this.cuerpoACuerpo){
                        disparo.body.collisionFilter = {
                            'group' : -4, //hara siempre la regla category/mask
                            
                            'category': 8,
                            'mask':4 | 16, //PORa que detecte la colision del jugador tmb
                        };
                        //disparo.body.isSensor = true;
                    }
                    else{

                        disparo.body.collisionFilter = {
                            'group' : -4, //hara siempre la regla category/mask
                            
                            'category': 8,
                            'mask': 1 | 4,
                        };
                    }

                }
            

                this.scene.matter.body.setAngle(disparo.body, (this.rotation + (disp * Math.PI/200)));
                //disparo.setRotation(this.rotation + (disp * Math.PI/200));
                disparo.thrust(this.bulletForce + (dispForce * this.bulletForce/100));
    }

    rotateWeapon(angle) {

        this.rotation = angle;
        //si el angulo es mas de 45 y (45+90) el sprite deberia de ir debajo0 del de humanoide
        /**
         * 
         if (this.hasShooted){
             this.image.rotation = angle - this.rotationOffSet;
            }else{
                this.image.rotation = angle + this.rotationOffSet; //sumarle un offset rotation dependiendo del arma
                
            }
            */
    }


    ammoCostPerShoot(){

        return(this.costeMunicionPorBala * this.rafagas)
    }
}