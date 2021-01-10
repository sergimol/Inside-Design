import Humanoid from "./humanoid.js";
import Puntero from "./puntero.js";
import Weapon from "./weapon.js";
import granade__launcher from "./weaponsFolder/granade_launcher.js";
import defaultWeapon from "./weaponsFolder/defaultWeapon.js";
import escopeta_lanzable from "./weaponsFolder/escopeta_lanzable.js";
import config from "./config.js";

export default class Player extends Humanoid {
  constructor(scene, x, y, sprite, health, ammo) {
    super(scene, x, y, sprite, health);
    this.body.label = 'player';

    //Arma

    this.weapon = new Weapon(scene, 0, 5, granade__launcher)
    this.add(this.weapon);
    this.maxHealth = config.humanoid.health;

    //Atributos
    //this.body.mass = 900;
    this.body.frictionAir = 0.25;
    this.depth = 4;
    let active;
    //Puntero
    this.puntero = new Puntero(scene, 0, 0);
    this.add(this.puntero);
    this.ammo = ammo;//config.player.baseAmmo;
    this.hasInfiniteAmmo = false;
    this.velFactor = config.player.baseVelFactor

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
    const { LEFT, RIGHT, UP, DOWN, W, A, S, D, ENTER, ESC } = Phaser.Input.Keyboard.KeyCodes
    this.cursors = scene.input.keyboard.addKeys({
      left: LEFT,
      right: RIGHT,
      up: UP,
      down: DOWN,
      w: W,
      a: A,
      s: S,
      d: D,
      enter: ENTER,
      escape: ESC
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
    const actives = {
      NONE: 'none',
      DASH: 'dash',
      SHIELD: 'shield',
      BOMB: 'bomb'
    };
    this.actualACTIVE = actives.DASH;
    let dashParticles = this.scene.add.particles('dashParticle');

    this.dashEmitter = dashParticles.createEmitter({
      speed: 20,
      scale: { start: 3, end: 0 },
      lifespan: 300,
      blendMode: 'ADD'
    });
    this.dashTime = config.player.dashTime;
    this.setMass(config.player.mass);
    this.inDash = false;
    this.dashPos;
    this.dashDir = new Phaser.Math.Vector2(this.puntero.x - this.x, this.puntero.y - this.y);
    this.scene.input.on('pointerdown', function (pointer) {
      //Comprobamos que sea el click derecho
      if (pointer.rightButtonDown()) {
        //DASH
        if (this.actualACTIVE === actives.DASH) {

          if (this.dir.x === 0 && this.dir.y === 0)
            this.dashDir = new Phaser.Math.Vector2(this.puntero.x - this.x, this.puntero.y - this.y);
          else
            this.dashDir = new Phaser.Math.Vector2(this.dir.x, this.dir.y);

          this.dashDir.normalize();
          this.inDash = true;

          this.timerDash = this.scene.time.now + this.dashTime;
          this.dashEmitter.startFollow(this);
          this.aspecto.setTint(config.player.dashTint);
          let sound = this.scene.sound.add('dashSound');
          sound.play();

          if (this.inDash)
            this.dash();
        }
        //ESCUDO
        else if (this.actualACTIVE === actives.SHIELD) {

        }
        //BOMBAS
        else if (this.actualACTIVE === actives.BOMB) {

        }
      }
    }, this);



    //Carga de datos del hud
    this.hud = this.scene.scene.get('UIScene');
    this.hud.setHealth(this.health);
    this.hud.setBackground(this.maxHealth);
    this.hud.setAmmo(this.ammo);

    //Pasivas
    //this.scene.input.keyboard.on('keydown_SPACE', this.addPassive, this);

    //Colisiones


    // Default: 1, Player: 2, Enemy: 4, PlayerBullet: 8, Enemy Bullet: 16
    //Aqui se asignan todas las colisiones
    this.body.collisionFilter = {
      'group': -3,
      'category': 2,
      'mask': 1 | 16 | 32, //mundo y balas enemigas
      //'group':1 ,  //asi no colisionan entre si estan en la misma categoria si tienen este mismo valor en negativo, en positivo siempre colisionaran si tienen el mismo valor, con 0 npi, explotara supongo
    };

    //PRUEBA PARTICULAS
    let particles = this.scene.add.particles('walkParticle');

    this.emitter = particles.createEmitter({
      speed: 20,
      scale: { start: 0.5, end: 0 },
      gravityY: 100,
      frequency: 150,
      lifespan: 300,
      blendMode: 'ADD'
    });

    this.emitter.startFollow(this);

    //Array de booleanos para saber si una pasiva está activada o no
    this.activePassives = [];
    for (let i = 0; i < config.player.passiveCount; i++)
      this.activePassives[i] = false;

  }//End of create


  //updatear la posicion del puntero si el jugador se mueve.
  /**
   
   Ideas
   
   calcular la distancia y despues de moverlo ponerlo, como primero s emueve el puntero en caso de moverse no habria problema
   moverlo junto al jugador, hay encontrar la manera de que si el jugador se mueve tmb lo haga le puntero, el problema es que el metodo move es de3 un game object con fisicas, el punteor no tiene fisicas
   */



  // asignar la posicion del puntero



  dash() {
    this.applyForce({ x: this.dashDir.x * 20, y: this.dashDir.y * 20 });

  }



  shoot() {
    if (this.ammo > this.weapon.ammoCostPerShoot() || this.hasInfiniteAmmo) {
      if (this.weapon.shoot(false, this) && !this.hasInfiniteAmmo) {
        this.ammo -= this.weapon.ammoCostPerShoot();
        this.hud.setAmmo(this.ammo);
      }
    }
  }

  playerMoverPuntero(pointer) {
    this.puntero.move(pointer, this);
    this.puntero.updateMiddle(this);
  }


  playerMove() {
    if (!this.inDash) {
      this.aspecto.setTint(config.player.baseTint);
      this.dashEmitter.stopFollow(this);
      if (this.body.speed < this.velFactor) {

        this.applyForce({ x: this.dir.x * this.velFactor, y: this.dir.y * this.velFactor });
      }
      //this.body.setVelocityX(this.speed * dirX);
      //this.body.setVelocityY(this.speed * dirY);

      //Animacion
      if (this.dir.x === 0 && this.dir.y === 0) {

        this.emitter.stopFollow(this);
        this.aspecto.play('idle', true);
      }
      else {
        this.emitter.startFollow(this);
        this.aspecto.play('walk', true);
      }
    }


  }

  //Método para añadir una pasiva aleatoria
  addPassive() {
    //Elige una pasiv
    let id;

    do {
      id = Math.floor(Math.random() * config.player.passiveCount);
    } while (this.activePassives[id])

    this.hud.startDialog('passive', id);
    if (id !== 7) { //Distinto de 7 porque el cambio de arma no tiene indicador en el hud ni tiene que ser controlado por los booleanos
      this.activePassives[id] = true;
      if (id !== 3 && id !== 4 && id !== 1)  //temporal (no tienen imagenes)
        this.hud.addPassiveImg(id);
    }

    //Aplica la pasiva correspondiente
    switch (id) {
      //Aumenta la vida
      case (0):
        console.log('Me lo tanqueo')
        this.health += this.health / 2;
        this.maxHealth += this.maxHealth / 2;
        this.hud.setHealth(this.health);
        this.hud.setBackground(this.maxHealth);
        break;
      //Disminuye la vida
      case (1):
        console.log('Demasiado facil')
        this.maxHealth /= 2;
        if (this.maxHealth < this.health) {
          this.health = this.maxHealth;
          this.hud.setHealth(this.health);
        }
        this.hud.setBackground(this.maxHealth);
        break;
      //Munición infinita
      case (2):
        console.log('Rambo');
        this.hasInfiniteAmmo = true;
        this.hud.setAmmo(-1);
        break;
      //Botiquines
      case (3):
        console.log('Botiquines buena onda');
        ///////////////////////////////////
        break;
      case (4):
        console.log('Botiquines mala onda');
        ///////////////////////////////////
        break;
      case (5):
        console.log('Sanic');
        this.velFactor *= 2;
        break;
      case (6):
        console.log('Cogo');
        this.velFactor /= 2;
        break;
      //Cambio de arma
      case (7):
        console.log('Cambio de arma');
        id = Math.floor(Math.random() * config.player.weaponCount);
        this.changeWeapon(id);
        break;
    }

  }

  removePassive(id) {
    this.activePassives[id] = false;

  }

  changeWeapon(id) {
    this.weapon.destructora();
    switch (id) {
      case (0):
        this.weapon = new Weapon(this.scene, 0, 5, defaultWeapon);
        break;
      case (1):
        this.weapon = new Weapon(this.scene, 0, 5, granade__launcher);
        break;
      case (2):
        this.weapon = new Weapon(this.scene, 0, 5, escopeta_lanzable);
        break;
    }
    this.add(this.weapon);
  }

  giveAmmo(amount) {
    this.ammo += amount;
    if (!this.hasInfiniteAmmo)
      this.hud.setAmmo(this.ammo);
  }

  addToState() {
    this.dialogState++;
  }


  preUpdate() {

    this.applyForce(this.forceSaved);
    this.forceSaved = { x: 0, y: 0 };

    if (this.scene.time.now > this.timerDash) {
      this.inDash = false;
    }
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
    this.playerMove();
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
    else if (this.semiAutomaticaHasShoot === false) {
      this.semiAutomaticaHasShoot = true;
      this.shoot();
    }

    //Llamada al menu de pausa
    //console.log(this.cursors.escape.isDown)
  }
}