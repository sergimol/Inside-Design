import Humanoid from "./humanoid.js";
import Puntero from "./puntero.js";
import granade__launcher from "./weaponsFolder/granade_launcher.js";
import defaultWeapon from "./weaponsFolder/defaultWeapon.js";
import escopeta_lanzable from "./weaponsFolder/escopeta_lanzable.js";
import config from "./config.js";
import Weapon from "./weapon.js";

import WeaponList from "./weaponList.js";
import Bullet from "./bullet.js";
import escudoActiva from "./bulletsFolder/escudoActiva.js"
import escudoMejoradoActiva from "./bulletsFolder/escudoMejoradoActiva.js";
import upgradedDash from "./bulletsFolder/upgradedDash.js";
import areaAttack from "./bulletsFolder/areaAttack.js";
import upgradedAreaAttack from "./bulletsFolder/upgradedAreaAttack.js";
import kart from "./bulletsFolder/kart.js";

export default class Player extends Humanoid {
  constructor(scene, x, y, sprite, health, ammo) {
    super(scene, x, y, sprite, health, config.player);
    this.body.label = 'player';

    this.spriteID = config.player.spriteID;
    //Arma
    this.weapon = new Weapon(scene, 0, 5, config.player.baseWeaponID);
    this.add(this.weapon);
    this.maxHealth = config.humanoid.health;

    //Atributos
    //this.body.mass = 900;
    this.body.frictionAir = config.player.frictionAir;
    this.depth = config.depths.player;
    this.healthDropBonus = 0;
    this.activeCooldown = 0;
    //Puntero
    this.puntero = new Puntero(scene, 0, 0);
    this.add(this.puntero);
    this.ammo = config.player.baseAmmo;
    this.hasInfiniteAmmo = false;
    this.velFactor = config.player.baseVelFactor;
    this.drunk = false;

    this.weaponId = 0;
    this.tempTimer = -1;
    this.currentTemp = -1;


    //this.add(sprite);
    /////////////


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

    //TEMPORAL PARA QUE LA GENTE PUEDA PROBAR ACTIVAS
    let a = Math.floor(Math.random() * 2);
    if(a === 0)
      this.actualACTIVE = 'dash';
    else
      this.actualACTIVE = 'shield';
    this.scene.setActiveImg(a);
    this.upgraded = false; //Será true cuando la activa esté mejorada
    let dashParticles = this.scene.add.particles('dashParticle');
    let dashUpgradedParticles = this.scene.add.particles('dashUpgradedParticle');

    this.dashEmitter = dashParticles.createEmitter({
      speed: 20,
      scale: { start: 3, end: 0 },
      lifespan: 300,
      blendMode: 'ADD'
    });
    this.upgradedDashEmitter = dashUpgradedParticles.createEmitter({
      speed: 20,
      scale: { start: 4, end: 0 },
      lifespan: 300,
      blendMode: 'ADD'
    })
    this.dashTime = config.player.dashTime;
    this.setMass(config.player.mass);
    this.inDash = false;
    this.shielded = false;
    this.shieldTime = 0;
    this.dashPos;
    this.dashDir = new Phaser.Math.Vector2(this.puntero.x - this.x, this.puntero.y - this.y);
    this.scene.input.on('pointerdown', function (pointer) {
      //Comprobamos que sea el click derecho
      if (pointer.rightButtonDown() && this.activeCooldown <= 0) {
        //DASH
        if (this.actualACTIVE === config.player.actives[0]) { //Dash

          if (this.dir.x === 0 && this.dir.y === 0)
            this.dashDir = new Phaser.Math.Vector2(this.puntero.x - this.x, this.puntero.y - this.y);
          else
            this.dashDir = new Phaser.Math.Vector2(this.dir.x, this.dir.y);

          this.dashDir.normalize();
          this.inDash = true;

          this.timerDash = this.scene.time.now + this.dashTime;

          if (this.upgraded) {
            this.upgradedDashEmitter.startFollow(this);
            this.upgradedDash = new Bullet(this.scene, this.x, this.y, upgradedDash, false);
            this.aspecto.setTint(0xf00f0f);
            this.upgradedDash.setVisible(false);
          }
          else {
            this.dashEmitter.startFollow(this);
            this.aspecto.setTint(config.player.dashTint);
          }
          let sound = this.scene.sound.add('dashSound');
          sound.play();

          this.activeCooldown = 50;

          this.dash();
        }
        //ESCUDO
        else if (this.actualACTIVE === config.player.actives[1]) { //Escudo
          if (!this.shielded) {
            if (!this.upgraded)
              this.shield = new Bullet(this.scene, this.x, this.y, escudoActiva, false);
            else {
              this.shield = new Bullet(this.scene, this.x, this.y, escudoMejoradoActiva, false);
              this.shield.aspecto.setTint(0x42e313);
            }
            this.shield.setAlpha(0.5);
            this.shield.depth = 4;
            this.shielded = true;
            this.shieldTime = 1500;
          }
        }
        //BOMBAS
        else if (this.actualACTIVE === config.player.actives[2]) {
          if (!this.upgraded)
            this.areaAttack = new Bullet(this.scene, this.x, this.y, areaAttack, false);
          else
            this.areaAttack = new Bullet(this.scene, this.x, this.y, upgradedAreaAttack, false);
          this.areaAttack.setVisible(false);
          this.areaTime = 10;
          this.activeCooldown = 250;
        }
      }
    }, this);



    //Carga de datos del hud
    this.scene.setHealth(this.health);
    this.scene.setBackground(this.maxHealth);
    this.scene.setAmmo(this.ammo);

    //Colisiones


    // Default: 1, Player: 2, Enemy: 4, PlayerBullet: 8, Enemy Bullet: 16, neutral bullet: 32, item:64
    //Aqui se asignan todas las colisiones
    this.body.collisionFilter = {
      'group': -3,
      'category': 2,
      'mask': 1 | 16 | 32 | 64, //mundo y balas enemigas
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



    this.isEntering = true;
    this.isLeaving = false;
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
    if (this.ammo >= this.weapon.ammoCostPerShoot() || this.hasInfiniteAmmo) {
      if (this.weapon.shoot(false, this) && !this.hasInfiniteAmmo) {
        this.ammo -= this.weapon.ammoCostPerShoot();
        this.scene.setAmmo(this.ammo);
      }
    }
    else
      this.weapon.shootAlternative(false, this);
  }

  playerMoverPuntero(pointer) {
    this.puntero.move(pointer, this);
    this.puntero.updateMiddle(this);
  }


  playerMove() {
    if (!this.inDash) {
      this.aspecto.setTint(config.player.baseTint);

      if (this.body.speed < this.velFactor) {

        this.applyForce({ x: this.dir.x * this.velFactor, y: this.dir.y * this.velFactor });
      }
      //this.body.setVelocityX(this.speed * dirX);
      //this.body.setVelocityY(this.speed * dirY);

      //Animacion
      if (this.dir.x === 0 && this.dir.y === 0) {

        this.emitter.stopFollow(this);
        this.aspecto.play('idle' + config.player.spriteKey[this.spriteID], true);
      }
      else {
        this.emitter.startFollow(this);
        this.aspecto.play('walk' + config.player.spriteKey[this.spriteID], true);
      }
    }


  }

  chooseIdea(type) {
    let id;
    if (type === 'passive') {
      //Número aleatorio
      do {
        id = Math.floor(Math.random() * config.player.passiveCount);
        id = 8;
      } while (this.activePassives[id])
      
      if(id === 7){
        this.wId = Math.floor(Math.random() * config.gdd.numeroArmas);
        this.scene.startDialog('weapon', id, this.wId);
      }
      else if(id === 8){
        this.tId = Math.floor(Math.random() * config.tileset.tileCount);
        this.scene.startDialog('tilemap', id, this.tId);
      }
      else if(id === 9){
        do {
          this.sId = Math.floor(Math.random() * config.player.numberAspectos);
        } while (this.sId <= 3)
        this.scene.startDialog('character', id, this.sId);
      }
      /*else if(id === 10){
        this.scene.startDialog('music', id);
      }*/
      else{
        this.scene.startDialog('passive', id, id);    
        this.activePassives[id] = true;
      }
    }
    else if (type === 'active') {
      id = Math.floor(Math.random() * config.player.activeCount);
      this.scene.startDialog('active', id, id);
    }
    else if (type === 'temporal') {
      id = Math.floor(Math.random() * config.gdd.numeroTemporales);
      this.scene.startDialog('temporal', id, id);
    }

  }

  changeActive(id) {
    this.actualACTIVE = config.player.actives[id];
    console.log(this.actualACTIVE);
    this.scene.setActiveImg(id);
  }

  upgradeActive() {
    this.upgraded = true;
  }

  //Método para añadir una pasiva aleatoria
  addPassive(id) {
    //Aplica la pasiva correspondiente
    switch (id) {
      //Aumenta la vida
      case (0):
        console.log('Me lo tanqueo')
        this.health += this.health / 2;
        this.maxHealth += this.maxHealth / 2;
        this.scene.setHealth(this.health);
        this.scene.setBackground(this.maxHealth);
        break;
      //Disminuye la vida
      case (1):
        console.log('Demasiado facil')
        this.maxHealth /= 2;
        if (this.maxHealth < this.health) {
          this.health = this.maxHealth;
          this.scene.setHealth(this.health);
        }
        this.scene.setBackground(this.maxHealth);
        break;
      //Munición infinita
      case (2):
        console.log('Rambo');
        this.hasInfiniteAmmo = true;
        this.scene.setAmmo(-1);
        break;
      //Botiquines
      case (3):
        console.log('Botiquines buena onda');
        this.healthDropBonus = 3;
        break;
      case (4):
        console.log('Botiquines mala onda');
        this.healthDropBonus = -2;
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
        this.changeWeapon(this.wId);
        this.scene.updateGdd("weapon", this.wId);
        break;
      case (8):
        console.log('Cambio de tilemap');
        this.changeTile(this.tId, false);
        break;
      case (9):
        console.log("Cambio solo apariecia");
        this.changeSpriteIdea(false, false, " ", this.sId);
        break;
    }

  }

  addTempPassive(id){
    switch(id){
      case 0:
        console.log('run pacifica');
        this.changeWeapon(14);////FALTA CONFIG)
        this.tempTimer = 1000;
        break;
      case 1:
        console.log('mario kart');
        this.kart = new Bullet(this.scene, this.x, this.y, kart, false);
        this.tempTimer = 1500;
        break;
      case 2:
        console.log('borracho');
        this.drunk = true;
        this.tempTimer = 1200;
        break;
    }
    this.currentTemp = id;
  }

  removeTempPassive() {
    switch(this.currentTemp){
      case 0:
        this.weapon = new Weapon(this.scene, 0, 5, this.lastWeaponConfig)
        break;
      case 1:
        this.kart.booleanoParaDestruirme = true;
        break;
      case 2:
        this.drunk = false;
        break;
    }
  }

  changeWeapon(wId) {
    this.weapon.destructora();
    this.weapon = new Weapon(this.scene, 0, 5, WeaponList[wId]);
    this.add(this.weapon);
    this.weaponId = wId;
  }

  changeTile(tId, isNewScene) {
    this.tileID = tId;
    switch (tId) {
      //Cuidao solo haces ejecutas la musica cuando salta como idea
      case (0):
        console.log('Outlaws from the West');
        this.scene.changeLayer(config.tileset.west);
        if (!isNewScene)
          this.changeMusic(config.music.west, isNewScene);
        this.spriteID = config.player.west;
        this.scene.changePlayerSprite(this.spriteID);
        break;

      case (1):
        console.log('Ray Tracing breakdance kill');
        this.scene.changeLayer(config.tileset.raytracing);
        if (!isNewScene)
          this.changeMusic(config.music.neon, isNewScene);
        break;

      case (2):
        console.log('La serie mas aburrida de la historia');
        this.scene.changeLayer(config.tileset.minecraft);
        break;

      case (3):
        console.log('Especial Navidad');
        this.scene.changeLayer(config.tileset.navidad);
        break;

      case (4):
        console.log('Mas de 1000 capitulos');
        this.scene.changeLayer(config.tileset.piratas);
        this.spriteID = config.player.pirata;
        this.scene.changePlayerSprite(this.spriteID);
        break;

      case (5):
        console.log('El mejor juego de la historia');
        this.scene.changeLayer(config.tileset.zelda);
        break;

      case (6):
        console.log('The Only Thing They Fear is You');
        this.scene.changeLayer(config.tileset.doom);
        if (!isNewScene)
          this.changeMusic(config.music.rock, isNewScene);
        this.spriteID = config.player.doom;
        this.scene.changePlayerSprite(this.spriteID);
        break;

      case (7):
        console.log('P.T.');
        this.scene.changeLayer(config.tileset.miedo);
        if (!isNewScene)
          this.changeMusic(config.music.horror, isNewScene);
        break;
    }
  }

  changeMusic(mId) {
    this.musicID = mId;
    switch (mId) {
      case (config.music.mainChip):
        console.log('Outlaws from the West');
        this.scene.changeMusic(config.music.mainChip);
        break;

      case (config.music.west):
        console.log('Outlaws from the West');
        this.scene.changeMusic(config.music.west);
        break;

      case (config.music.neon):
        console.log('Ray Tracing breakdance skill');
        this.scene.changeMusic(config.music.neon);
        break;

      case (config.music.old30s):
        console.log('La serie mas aburrida de la historia');
        this.scene.changeMusic(config.music.old30s);
        break;

      case (config.music.epic):
        console.log('Especial Navidad');
        this.scene.changeMusic(config.music.epic);
        break;

      case (config.music.horror):
        console.log('Mas de 1000 capitulos');
        this.scene.changeMusic(config.music.horror);
        break;

      case (config.music.berridos):
        console.log('El mejor juego de la historia');
        this.scene.changeMusic(config.music.berridos);
        break;

      case (config.music.rock):
        console.log('The Only Thing They Fear is You');
        this.scene.changeMusic(config.music.rock);
        break;

      case (config.music.piano):
        console.log('P.T.');
        this.scene.changeMusic(config.music.piano);
        break;
    }
  }

  giveAmmo(amount) {
    if (!this.hasInfiniteAmmo) {
      this.ammo += amount;
      this.scene.setAmmo(this.ammo);
    }
  }

  giveHealth(amount) {
    this.health += (amount + this.healthDropBonus);
    if (this.health > this.maxHealth)
      this.health = this.maxHealth;
    this.scene.setHealth(this.health);
  }

  addToState() {
    this.dialogState++;
  }


  preUpdate() {

    this.applyForce(this.forceSaved);
    this.forceSaved = { x: 0, y: 0 };

    //Right si se entra o se sale por la izquierda
    //Left si se entra o se sale por la derecha
    //Top si se entra o se sale por arriba
    //Down si se entra o se sale por abajo
    if (this.isEntering) {
      if (this.scene.EnterRoomDir === "Left")
        this.dir.x = 1;
      else if (this.scene.EnterRoomDir === "Right")
        this.dir.x = -1;
      else if (this.scene.EnterRoomDir === "Top")
        this.dir.y = 1;
      else if (this.scene.EnterRoomDir === "Bottom")
        this.dir.y = -1;
    }
    else if (this.isLeaving) {
      if (this.scene.ExitRoomDir === "Right")
        this.dir.x = 1;
      else if (this.scene.ExitRoomDir === "Left")
        this.dir.x = -1;
      else if (this.scene.ExitRoomDir === "Bottom")
        this.dir.y = 1;
      else if (this.scene.ExitRoomDir === "Top")
        this.dir.y = -1;
    }
    else {
      //Idle por defecto
      this.dir.x = 0;
      this.dir.y = 0;
      //Movimiento horizontal
      if (this.cursors.left.isDown || this.cursors.a.isDown){
        this.dir.x = -1;
      }
      else if (this.cursors.right.isDown || this.cursors.d.isDown)
        this.dir.x = 1;
      //Movimiento vertical        
      if (this.cursors.up.isDown || this.cursors.w.isDown)
        this.dir.y = -1;
      else if (this.cursors.down.isDown || this.cursors.s.isDown)
        this.dir.y = 1;

      if(this.drunk){
        this.dir.x *= -1;
        this.dir.y *= -1;
      }
    }
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
      if (pointer.leftButtonDown()) {
        this.shoot();
      }
    }
    else if (this.semiAutomaticaHasShoot === false) {
      this.semiAutomaticaHasShoot = true;
      this.shoot();
    }

    if (this.actualACTIVE !== 'none')
      this.handleActive();

    if(this.tempTimer >= 0)
      this.handleTemps();
    //Llamada al menu de pausa
    //console.log(this.cursors.escape.isDown)
  }

  changeSpriteIdea(fromTile, isNewScene, lastSpriteId, id) {

    //Si viene de cargar escena le mandamos el id anterior
    if (isNewScene)
      this.spriteID = lastSpriteId;
    //Si viene de nueva idea miramos si viene de una que desencadena de tile o no
    else {
      if (!fromTile) {        
        this.spriteID = id;
      }

    }
    this.scene.changePlayerSprite(this.spriteID);
  }

  //Maneja las actualizaciones de la activa 
  handleActive() {
    switch (this.actualACTIVE) {
      case 'dash':
        if (this.inDash && this.scene.time.now > this.timerDash) {
          this.inDash = false;
          if (this.upgraded) {
            this.upgradedDashEmitter.stopFollow(this);
            if(this.upgradedDash !== undefined)
              this.upgradedDash.booleanoParaDestruirme = true;
          }
          else
            this.dashEmitter.stopFollow(this);
        }
        break;
      case 'shield':
        if (this.shielded) {
          this.shieldTime--;
          //console.log(this.shield)
          if (this.shieldTime <= 0) {
            this.shielded = false;
            if(this.shield !== undefined)
              this.shield.booleanoParaDestruirme = true;
            this.activeCooldown = 500;
          }
          else {
            this.shield.x = this.x;
            this.shield.y = this.y;
          }
        }
        break;
      case 'area':
        if (this.areaTime <= 0) {
          if (this.areaAttack !== undefined)
            this.areaAttack.booleanoParaDestruirme = true;
        }
        else
          this.areaTime--;
        break;
    }

    if (this.activeCooldown > 0) {
      this.activeCooldown--;
      this.scene.setCooldownBar(this.activeCooldown);
    }
  }

  handleTemps(){
    this.tempTimer--;
    if(this.tempTimer === 0)
      this.removeTempPassive();
  }
}