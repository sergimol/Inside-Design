import Humanoid from "./humanoid.js";
import Puntero from "./puntero.js";
import Weapon from "./weapon.js";
export default class Player extends Humanoid {
  constructor(scene, x, y, sprite, depth) {
    super(scene, x, y, sprite);
    this.body.label = 'player';

    //Arma
    
    this.weapon = new Weapon(scene, 0, 5, "bate", "swing", "mono", "semi", 300, 0, 1, 0.6, 0, 1, 80, 0, 1, 0, 0, true, -0.5, 0,
    //la parte de bullet del arma
    1, 64, 64, 0.5, 0.5, 30, 'bullet', 0.3, 0, 0.8, 0.3, 1, true, false);
    this.add(this.weapon);

    //Atributos
    this.depth = 4;
    let active;
    //Puntero
    this.puntero = new Puntero(scene, 0, 0);
    this.add(this.puntero);
    this.ammo = 100;

    //this.add(sprite);
    /////////////
    //Animaciones
    const anims = scene.anims;

    anims.create({
      key: 'walk',
      frames: anims.generateFrameNumbers(sprite, { start: 4, end: 8 }), //15
      frameRate: 15,
      repeat: -1
    })
    anims.create({
      key: 'idle',
      frames: anims.generateFrameNumbers(sprite, { start: 1, end: 3 }),
      frameRate: 7,
      repeat: -1
    })

    //INPUT
    const { LEFT, RIGHT, UP, DOWN, W, A, S, D } = Phaser.Input.Keyboard.KeyCodes
    this.cursors = scene.input.keyboard.addKeys({
      left: LEFT,
      right: RIGHT,
      up: UP,
      down: DOWN,
      w: W,
      a: A,
      s: S,
      d: D
    })
    this.angleToPointer = 0;
    //en la constructora es preferible a tener 2 millones de veces esta llamada al input, de hay el console log de overComplication, solo es para recordarnoslo ejeje
    this.scene.input.on('pointermove', function (pointer) {
      this.playerMoverPuntero(pointer);
      //this.player.
      //      this.puntero.x = (pointer.x/this.cameras.main.zoom) + this.cameras.main.worldView.x;
      //    this.puntero.y = (pointer.y/this.cameras.main.zoom)  + this.cameras.main.worldView.y;
      this.angleToPointer = Phaser.Math.Angle.Between(this.x, this.y, (pointer.x / this.scene.cameras.main.zoom) + this.scene.cameras.main.worldView.x, (pointer.y / this.scene.cameras.main.zoom) + this.scene.cameras.main.worldView.y);

    }, this);


    this.dir = new Phaser.Math.Vector2();
    this.dir.normalize();


    this.semiAutomaticaHasShoot = true;
    this.scene.input.on('pointerdown', function (pointer) {
      if (pointer.leftButtonDown())
        this.semiAutomaticaHasShoot = false;
    }, this);



    //PRUEBAS ACTIVA
    this.setMass(50);
    this.inDash = false;
    this.dashDir = new Phaser.Math.Vector2(this.puntero.x - this.x,  this.puntero.y - this.y);
    this.scene.input.keyboard.on('keydown-SHIFT', function (event){
        this.scene.matter.body.setAngle(this.body, (this.rotation + (1 * Math.PI/200)));
        this.thrust(50);
        //this.dashDir = new Phaser.Math.Vector2(this.puntero.x - this.x,  this.puntero.y - this.y);
        //this.dashDir.normalize();
        //this.inDash = true;
  }, this);

    //Carga de datos del hud
    this.hud = this.scene.scene.get('UIScene');
    this.hud.setHealth(this.health);
    this.hud.setBackground(this.health);
    this.hud.setAmmo(this.ammo);


    //Colisiones


    // Default: 1, Player: 2, Enemy: 4, PlayerBullet: 8, Enemy Bullet: 16
    //Aqui se asignan todas las colisiones
    this.body.collisionFilter = {
      'group': -3,
      'category': 2,
      'mask': 1 | 16, //mundo y balas enemigas
      //'group':1 ,  //asi no colisionan entre si estan en la misma categoria si tienen este mismo valor en negativo, en positivo siempre colisionaran si tienen el mismo valor, con 0 npi, explotara supongo
    };

    //PRUEBA PARTICULAS
    let particles = this.scene.add.particles('walkParticle');

    this.emitter = particles.createEmitter({
        speed: 20,
        scale: { start: 1.5, end: 1 },
        gravityY: 100,
        frequency: 150,
        lifespan: 300,
        blendMode: 'ADD'
    });

    this.emitter.startFollow(this);
    
  }


  //updatear la posicion del puntero si el jugador se mueve
  /**
   
   Ideas
   
   calcular la distancia y despues de moverlo ponerlo, como primero s emueve el puntero en caso de moverse no habria problema
   moverlo junto al jugador, hay encontrar la manera de que si el jugador se mueve tmb lo haga le puntero, el problema es que el metodo move es de3 un game object con fisicas, el punteor no tiene fisicas
   */



  // asignar la posicion del puntero



  dash(){
    this.setVelocity(this.dashDir.x * 2, this.dashDir.y *2);
  }

  shoot() {
    if (this.ammo > this.weapon.ammoCostPerShoot()) {
      if (this.weapon.shoot(false)) {
        this.ammo -= this.weapon.ammoCostPerShoot();
        this.hud.setAmmo(this.ammo);
      }
    }
  }

  playerMoverPuntero(pointer) {
    this.puntero.move(pointer, this);
    this.puntero.updateMiddle(this);
  }


  playerMove(dirX, dirY) {
    if(!this.inDash){
      this.setVelocity(this.dir.x * 1.5, this.dir.y * 1.5);
      //this.body.setVelocityX(this.speed * dirX);
      //this.body.setVelocityY(this.speed * dirY);
      
      //Animacion
      if (this.dir.x === 0 && this.dir.y === 0){
        
        this.emitter.stopFollow(this);
        this.aspecto.play('idle', true);
      }
      else{
        this.emitter.startFollow(this); 
        this.aspecto.play('walk', true);
      }
    }
    else
      this.dash();

  }


  preUpdate() {



    this.speed
    //Idle por defecto
    this.dir.x = 0;
    this.dir.y = 0;
    //Movimiento horizontal
    if (this.cursors.left.isDown || this.cursors.a.isDown)
      this.dir.x = -1;
    else if (this.cursors.right.isDown || this.cursors.d.isDown)
      this.dir.x = 1;
    //Movimiento vertical        
    if (this.cursors.up.isDown || this.cursors.w.isDown)
      this.dir.y = -1;
    else if (this.cursors.down.isDown || this.cursors.s.isDown)
      this.dir.y = 1;

    this.dir.normalize();
    this.playerMove(this.dir.x, this.dir.y);
    this.puntero.moverconjugador(this);
    this.puntero.updateMiddle(this);

    //esto no deberia de ir aqui

    this.moveRotate(this.puntero.x - this.x);
    this.rotateWeapon(this.angleToPointer);
    //this.rotateWeapon(Phaser.Math.Angle.Between(this.x, this.y, px, py));


    if (this.weapon.esAutomatica()) {
      var pointer = this.scene.input.activePointer;
      if (pointer.isDown) {
        this.shoot();
      }
    }
    else if (this.semiAutomaticaHasShoot === false){
      this.semiAutomaticaHasShoot = true;
      this.shoot();
    }


  }
}