import Enemy from "./enemy.js";



export default class Boss extends Enemy {
constructor(scene, x, y, player, doorN, doorS, config){
    super(scene, x , y, player, doorN, doorS, config)
    this.config = config;

    this.aiming = false;
    this.shootCount = 0;
    this.shootRafagas = 0;
    this.shootTime = 0;

    this.timerTryShoot = 0;
    this.timerKeepShooting = 0;
    this.changeWeapon(config.weapon);
}


//ahora mismo en esencia un boss es una enemigo que no te puede disparar
preUpdate() {

    this.applyForce(this.forceSaved);
    this.forceSaved = { x: 0, y: 0 };

    this.checkHitState();
    this.moveEnemy();
    this.nextMove();

    this.tryShoot();
    //this.weapon.shoot(true,this);
    
 

    this.changeBehavior();

}

//intentara disparar bajo las condiciones que hemos creado
tryShoot(){
    if (this.scene.time.now >= this.timerTryShoot){
        
        this.timerTryShoot = this.scene.time.now + this.arrayBehaviors[this.arrayBehaviorNumber].time / this.shootCount;
        
        if(this.shootCount >= 0){
            this.timerKeepShooting = this.scene.time.now + this.shootTime;
            this.shootCount--;
            if(!this.aiming){
                let angulo = Phaser.Math.Angle.Between(this.x, this.y, this.playerRef.x, this.playerRef.y);
                this.weapon.rotateWeapon(angulo);
            }
            this.weapon.shoot(true,this);
            for(let i = 0 ; i < this.shootRafagas; i++){
                
                
            }
        }
    }

    if(this.scene.time.now < this.timerKeepShooting){
        
        this.weapon.shoot(true,this);
    }


}


//lo extarigo porque quiero que tmb haga un cambio de arma y cambio en los momentos de atacar
changeBehavior(){

    if(this.scene.time.now >= this.timerNextBehaviour){

        this.Idle = this.arrayBehaviors[this.arrayBehaviorNumber].idle;
        
        this.timerKeepShooting = 0;
        this.timerNextBehaviour = this.scene.time.now + this.arrayBehaviors[this.arrayBehaviorNumber].time;
        

        this.shootCount = this.arrayBehaviors[this.arrayBehaviorNumber].shootCount + 1;
        this.shootRafagas = this.arrayBehaviors[this.arrayBehaviorNumber].shootRafagas;
        this.shootTime = this.arrayBehaviors[this.arrayBehaviorNumber].shootTime;

        this.timerTryShoot = this.scene.time.now + this.arrayBehaviors[this.arrayBehaviorNumber].time / this.shootCount;

        this.aiming = this.arrayBehaviors[this.arrayBehaviorNumber].aiming;
        
        
        this.acercarse = this.arrayBehaviors[this.arrayBehaviorNumber].acercarse;
        this.acercarseDistancia = this.arrayBehaviors[this.arrayBehaviorNumber].distanciaAcercarse;
        
        this.alejarse = this.arrayBehaviors[this.arrayBehaviorNumber].alejarse;
        this.alejarseDistancia = this.arrayBehaviors[this.arrayBehaviorNumber].distanciaAlejarse;
        
        this.strafe = this.arrayBehaviors[this.arrayBehaviorNumber].strafe;
        this.strafeTime = this.arrayBehaviors[this.arrayBehaviorNumber].strafeTime;


        //cambiamos el arma
        if (this.arrayBehaviors[this.arrayBehaviorNumber].changeWeapon !== null)
        this.changeWeapon(this.arrayBehaviors[this.arrayBehaviorNumber].changeWeapon);
        
        this.arrayBehaviorNumber++;
        if (this.arrayBehaviorNumber >= this.arrayBehaviors.length) this.arrayBehaviorNumber = 0;
    }

}

nextMove(){

    if (!this.Idle){

            let distanciaentrejugador = Phaser.Math.Distance.Between(this.x, this.y, this.playerRef.x, this.playerRef.y);
            
            if ( !this.attackState && distanciaentrejugador <= this.config.aggroDistance) {
                this.attackState = true;
                this.changeBehavior();
            }
            //Para calcular la distancia entre siguientes posiciones   
            //ESTADO REPOSO
            
            if (!this.attackState) {
                if (this.scene.time.now > this.timerMove) {
                    this.dir = { x: 0, y: 0 };
                    this.auxRest();
                    //AQUI INICILIZAMOS EL TIMER CADA VEZ
                    this.timerMove = this.scene.time.now + this.enemyTime + 700;
                }
            }
            
        //ESTADO ATAQUE
        //rotacion del arma aqui no, el arma no debera de moverla durante un ataque por eso tengo que caparla
        else {
            //Movimiento
            let vectorAux = new Phaser.Math.Vector2(0, 0);
            let angulo = Phaser.Math.Angle.Between(this.x, this.y, this.playerRef.x, this.playerRef.y);
            
            if (this.aiming){
                this.weapon.rotateWeapon(angulo);
            }
            this.moveRotate(this.playerRef.x - this.x);
            //console.log(this.dir)
            
            
            if (this.acercarse && distanciaentrejugador >= this.acercarseDistancia) {
                
                vectorAux.add(new Phaser.Math.Vector2(this.playerRef.x - this.x, this.playerRef.y - this.y).rotate(this.angleAcercarse));
                //vectorAux.rotate(this.angleAcercarse);//todo
                //this.dir.normalize();
            }
            //else  if (this.dir === {x:0,y:0}) this.dir = {x:0, y:0}; //esta en 0,0 para asegurarse de que
            
            
            if (this.alejarse && distanciaentrejugador < this.alejarseDistancia) {
                
                vectorAux.add(new Phaser.Math.Vector2(-this.playerRef.x + this.x, -this.playerRef.y + this.y));
                //this.dir.normalize();
            } //else if (this.dir === {x:0,y:0}) this.dir = {x:0, y:0};
            
            
            if (this.strafe) {
                let vectorStrafe = new Phaser.Math.Vector2(this.playerRef.x - this.x, this.playerRef.y - this.y);
                vectorStrafe.rotate(this.strafeAngle);
                vectorAux.add(vectorStrafe);
                //this.dir.normalize();
            }
            
            vectorAux.normalize();
            this.dir = vectorAux;
            
            //cambiar la direccion de rotacion del strafe
            if (this.scene.time.now > this.timerStrafe) {
                //Disparamos y reactivamos el timer de disparo con un aleatorio
                
                this.strafeAngle = -this.strafeAngle;
                this.timerStrafe = this.scene.time.now + (this.strafeTime * Math.random());
                
            }
        }
    }
}

}

