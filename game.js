import Player from "./source/player.js";
import Enemy from "./source/enemy.js";
import Doors from "./source/doors.js";
import config from "./source/config.js"
import listEnemies from "./source/enemyList.js"
import dialogues from "./source/dialogues.js";

import Boss from "./source/boss.js";
import clyon from "./source/bosses/clyon.js";
import willermo from "./source/bosses/willermo.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: "main" });
  }
  init(data) {
    console.log("deberias de empezar a jugar-1")
    this.health = data.health,
      this.ammo = data.ammo,
      this.weaponID = data.weaponID,
      this.level = data.level;
    this.tileID = data.tileID;
    this.musicID = data.musicID,
      this.lastSeekMusic = data.lastSeekMusic
    this.playerSpriteID = data.playerSpriteID;
    this.activePassives = data.activePassives;
    this.actualACTIVE = data.actualACTIVE;
    this.upgraded = data.upgraded;
    this.hasInfiniteAmmo = data.infiniteAmmo;
    this.maxHealth = data.maxHealth;
    this.velFactor = data.velFactor;
    this.enemySpriteID = data.enemySpriteID
    this.videoPlay = data.videoPlay;
  }


  preload() {
    //Loading video

    //Sprites Player
    this.load.spritesheet('playerDef', './sprites/spritespersonajes/playerdefinitivo.png', { frameWidth: 24, frameHeight: 24 });
    this.load.spritesheet('playerWest', './sprites/spritespersonajes/arthurmorgan.png', { frameWidth: 24, frameHeight: 24 });
    this.load.spritesheet('playerCalvo', './sprites/spritespersonajes/calvo.png', { frameWidth: 24, frameHeight: 24 });
    this.load.spritesheet('playerDoomGuy', './sprites/spritespersonajes/doomguy.png', { frameWidth: 24, frameHeight: 24 });
    this.load.spritesheet('playerEllie', './sprites/spritespersonajes/ellie.png', { frameWidth: 24, frameHeight: 24 });
    this.load.spritesheet('playerRuso', './sprites/spritespersonajes/ruso.png', { frameWidth: 24, frameHeight: 24 });
    this.load.spritesheet('playerPayaso', './sprites/spritespersonajes/payaso.png', { frameWidth: 24, frameHeight: 24 });
    this.load.spritesheet('playerCresta', './sprites/spritespersonajes/cresta.png', { frameWidth: 24, frameHeight: 24 });
    this.load.spritesheet('playerHummus', './sprites/spritespersonajes/hummus.png', { frameWidth: 24, frameHeight: 24 });
    this.load.spritesheet('playerPirata', './sprites/spritespersonajes/pirata.png', { frameWidth: 24, frameHeight: 24 });

    //Publishers
    this.load.spritesheet('cleon', './sprites/spritespersonajes/cleon.png', { frameWidth: 24, frameHeight: 24 });
    this.load.spritesheet('guille', './sprites/spritespersonajes/guille.png', { frameWidth: 24, frameHeight: 24 });

    //Enemigos
    //Enemigos
    this.load.spritesheet('enemyDef', './sprites/spritespersonajes/enemigo.png', { frameWidth: 24, frameHeight: 24 });
    this.load.spritesheet('enemyDemon', './sprites/spritespersonajes/demonio.png', { frameWidth: 24, frameHeight: 24 });
    this.load.spritesheet('enemyPirata', './sprites/spritespersonajes/enemigopirata.png', { frameWidth: 24, frameHeight: 24 });
    this.load.spritesheet('enemyWest', './sprites/spritespersonajes/enemigowest.png', { frameWidth: 24, frameHeight: 24 });

    //Arma
    this.load.spritesheet('bullet', 'sprites/newBullet.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('enemybullet', 'sprites/enemyBullet.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('enemybulletAmmo', 'sprites/enemyBulletAmmo.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('enemybulletSwing', 'sprites/enemyBulletSwing.png', { frameWidth: 64, frameHeight: 64 });

    //Puntero
    this.load.image('crosshair', 'sprites/crosshair.png');

    //Armas
    this.load.image('escopeta_lanzable', 'sprites/escopeta_lanzable.png');
    this.load.image('escopeta', 'sprites/spritesarmas/escopeta.png');
    this.load.image('escopetaRebote', 'sprites/spritesarmas/escopetaRebote.png');
    this.load.image('espadon', 'sprites/spritesarmas/Espadon.png');
    this.load.image('francotirador', 'sprites/spritesarmas/francotirador.png');
    this.load.image('katana', 'sprites/spritesarmas/katana.png');
    this.load.image('lanzagranadas', 'sprites/spritesarmas/lanzagranadas.png');
    this.load.image('lanzallamas', 'sprites/spritesarmas/lanzallamas.png');
    this.load.image('martilloThis', 'sprites/spritesarmas/martilloThis.png');
    this.load.image('metralleta', 'sprites/spritesarmas/metralleta.png');
    this.load.image('metralletaRebote', 'sprites/spritesarmas/metralletaRebote.png');
    this.load.image('microondas', 'sprites/spritesarmas/microondas.png');
    this.load.image('miniGun', 'sprites/spritesarmas/miniGun.png');
    this.load.image('miniGunRebote', 'sprites/spritesarmas/miniGunRebote.png');
    this.load.image('pistolaBasica', 'sprites/spritesarmas/pistolaBasica.png');
    this.load.image('pistolaBasicaRebote', 'sprites/spritesarmas/pistolaBasicaRebote.png');
    this.load.image('pistolaLaser', 'sprites/spritesarmas/pistolaLaser.png');
    this.load.image('rafagas', 'sprites/spritesarmas/rafagas.png');
    this.load.image('rafagasRebote', 'sprites/spritesarmas/rafagasRebote.png');
    this.load.image('granade_launcher', 'sprites/granade_launcher.png');
    this.load.image('bate', 'sprites/bate.png');

    this.load.spritesheet('granade__launcher_shoot', 'sprites/granade_bullet.png', { frameWidth: 12, frameHeight: 12 });
    this.load.spritesheet('escopeta_lanzable_shoot', 'sprites/escopeta_lanzable.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('granade_launcher_shoot_explosion', 'sprites/granade_explosion.png', { frameWidth: 84, frameHeight: 83 });
    this.load.spritesheet('microondas_shoot', 'sprites/spritesarmas/microondas.png', { frameWidth: 24, frameHeight: 24 });
    this.load.spritesheet('microondas_explosion', 'sprites/explosionMicroondas.png', { frameWidth: (93 * 5), frameHeight: (97 * 5) });
    this.load.spritesheet('area_attack', 'sprites/area_attack.png', { frameWidth: 185, frameHeight: 200 });
    this.load.spritesheet('kart', 'sprites/spritespersonajes/kart.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('flor', 'sprites/spritespersonajes/flor.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('fuego', 'sprites/fire.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('area_attack', 'sprites/area_attack.png', { frameWidth: (185), frameHeight: (200) });

    this.load.spritesheet('bate_attack', 'sprites/swing.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('katana_attack', 'sprites/tajo.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('espadon_attack', 'sprites/tajo_Espadon.png', { frameWidth: 64, frameHeight: 64 });
    //Tiles de estéticas
    this.load.image('tileBase', './sprites/tiles/tileJavi.png');
    this.load.image('tileSetBaseEx', './sprites/tiles/tileSetBaseEx.png');
    this.load.image('tileSetDoomEx', './sprites/tiles/tileSetDoomEx.png');
    this.load.image('tileSetMiedoEx', './sprites/tiles/tileSetMiedoEx.png');
    this.load.image('tileSetMinecraftEx', './sprites/tiles/tileSetMinecraftEx.png');
    this.load.image('tileSetNavidadEx', './sprites/tiles/tileSetNavidadEx.png');
    this.load.image('tileSetPiratasEx', './sprites/tiles/tileSetPiratasEx.png');
    this.load.image('tileSetRayTracingEx', './sprites/tiles/tileSetRayTracingEx.png');
    this.load.image('tileSetWestEx', './sprites/tiles/tileSetWestEx.png');
    this.load.image('tileSetZeldaEx', './sprites/tiles/tileSetZeldaEx.png');

    this.load.image('doorV', './sprites/doorV.png');
    this.load.image('doorOpenV', './sprites/doorOpenV.png');
    this.load.image('doorH', './sprites/doorH.png');
    this.load.image('doorOpenH', './sprites/doorOpenH.png');
    this.load.image('trigger', './sprites/trigger.png');
    this.load.image('end', './sprites/end.jpg');
    this.load.image('bulletAmmo', './sprites/bulletAmmo.png');
    this.load.image('medkit', './sprites/medkit.png');

    //TODAS LAS SALAS
    this.load.tilemapTiledJSON('dungeon', './sprites/tiles/nivelBase.json');
    this.load.tilemapTiledJSON('sala1', './sprites/tiles/sala1.json');
    this.load.tilemapTiledJSON('sala2', './sprites/tiles/sala2.json');
    this.load.tilemapTiledJSON('sala3', './sprites/tiles/sala3.json');
    this.load.tilemapTiledJSON('sala4', './sprites/tiles/sala4.json');
    this.load.tilemapTiledJSON('sala5', './sprites/tiles/sala5.json');
    this.load.tilemapTiledJSON('sala6', './sprites/tiles/sala6.json');
    this.load.tilemapTiledJSON('sala7', './sprites/tiles/sala7.json');
    this.load.tilemapTiledJSON('sala8', './sprites/tiles/sala8.json');
    this.load.tilemapTiledJSON('sala9', './sprites/tiles/sala9.json');
    this.load.tilemapTiledJSON('sala10', './sprites/tiles/sala10.json');
    this.load.tilemapTiledJSON('sala11', './sprites/tiles/sala11.json');
    this.load.tilemapTiledJSON('sala12', './sprites/tiles/sala12.json');
    this.load.tilemapTiledJSON('sala13', './sprites/tiles/sala13.json');
    this.load.tilemapTiledJSON('sala14', './sprites/tiles/sala14.json');

    //BSO
    this.load.audio('mainChiptuneSong', './audio/mainChiptune.mp3');
    this.load.audio('westernSong', './audio/western.mp3');
    this.load.audio('30sSong', './audio/30s.mp3');
    this.load.audio('neonRiderSong', './audio/neonRider.mp3');
    this.load.audio('epicSong', './audio/epic.mp3');
    this.load.audio('rockSong', './audio/rock.mp3');
    this.load.audio('horrorSong', './audio/horror.mp3');
    this.load.audio('pianoSong', './audio/piano.mp3');
    this.load.audio('berridosSong', './audio/berridos.mp3');

    //FX
    this.load.audio('gunShootSound', './audio/gunShoot.wav');
    this.load.audio('gunShootSound2', './audio/gunShoot2.wav');
    this.load.audio('hitShootSound', './audio/hitShoot.wav');
    this.load.audio('deadSound', './audio/deadSound.wav');
    this.load.image('gunShoot', './sprites/gunShootProt.png');
    this.load.image('bate', './sprites/bate3.png');
    this.load.image('swing', './sprites/swing.png');
    this.load.image('walkParticle', './sprites/walkParticulas.png');
    this.load.image('dashParticle', './sprites/dashParticula.png');
    this.load.image('dashUpgradedParticle', './sprites/dashParticulaMejorada.png');
    this.load.audio('dashSound', './audio/dashSound.wav');
    this.load.audio('microondas', './audio/microondas.wav');
    this.load.audio('shotgun', './audio/shotgun.wav');
    this.load.audio('metralleta', './audio/metralleta.wav');
    this.load.audio('francotirador', './audio/fracotirador.wav');
    this.load.audio('minigun', './audio/minigun.wav');
    this.load.audio('gas', './audio/gas.mp3');
    this.load.audio('granadasBlop', './audio/granadasBlop.wav');
    this.load.audio('swing', './audio/swingDuro.wav');
    this.load.audio('swingDuro', './audio/swingDuro.wav');
    this.load.audio('katana', './audio/katana.mp3');

    //Elementos de la UI
    //Armas//
    this.load.image('gunshotsilhouette', 'sprites/gunshotSilueta.png');
    //Pasivas//
    this.load.image('tanqueo', 'sprites/pixel_tank.png');
    //this.load.image('facil', 'Sprites/');
    this.load.image('rambo', 'sprites/rambo.png');
    //this.load.image('buenaonda', 'Sprites/');
    //this.load.image('malaonda', 'Sprites/');
    this.load.image('sanic', 'sprites/sanic.png');
    this.load.image('cogo', 'sprites/ferrari.png');
    //Activas//
    this.load.image('dash', 'sprites/dash_1.png');
    this.load.image('shield', 'sprites/shield.png');
    this.load.image('bomb', 'sprites/bomb.png');
    //Dialogos//
    this.load.image('dialogoAndres', 'sprites/dialogoAndres.png');
    this.load.image('dialogoDiego', 'sprites/dialogoDiego.png');
    this.load.image('dialogoJavi', 'sprites/dialogoJavi.png');
    this.load.image('dialogoSergio', 'sprites/dialogoSergio.png');
    //Carga de fuentes con bitmap//
    this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');

    //Video
    this.load.video('filtrocinta', './sprites/video/filtrocintabien.mp4');
    console.log("deberias de empezar a jugar0")
  }

  create() {
    console.log("deberias de empezar a jugar1")
    //cleon
    this.anims.create({
      key: 'walkCleon',
      frames: this.anims.generateFrameNumbers('cleon', { start: 4, end: 8 }), //15
      frameRate: 15,
      repeat: -1
    })
    this.anims.create({
      key: 'idleCleon',
      frames: this.anims.generateFrameNumbers('cleon', { start: 1, end: 3 }),
      frameRate: 7,
      repeat: -1
    })
    this.anims.create({
      key: 'deathCleon',
      frames: this.anims.generateFrameNumbers('cleon', { start: 16, end: 28 }),
      frameRate: 14,
      repeat: 0
    })
    this.anims.create({
      key: 'hitCleon',
      frames: this.anims.generateFrameNumbers('cleon', { start: 9, end: 14 }),
      frameRate: 60,
      repeat: 0
    })

    //wily
    this.anims.create({
      key: 'walkGuille',
      frames: this.anims.generateFrameNumbers('guille', { start: 4, end: 8 }), //15
      frameRate: 15,
      repeat: -1
    })
    this.anims.create({
      key: 'idleGuille',
      frames: this.anims.generateFrameNumbers('guille', { start: 1, end: 3 }),
      frameRate: 7,
      repeat: -1
    })
    this.anims.create({
      key: 'deathGuille',
      frames: this.anims.generateFrameNumbers('guille', { start: 16, end: 28 }),
      frameRate: 14,
      repeat: 0
    })
    this.anims.create({
      key: 'hitGuille',
      frames: this.anims.generateFrameNumbers('guille', { start: 9, end: 14 }),
      frameRate: 60,
      repeat: 0
    })


    //Auxiliar para el video 

    if (this.videoPlay) {
      this.putVideoOnScreen();
    }
    else
      this.videoPlaying = false;

    //variables que utilizara el archivo de guardado
    //estadisticas y gdd
    this.disparosRealizados = 0;
    this.enemiesKilled = 0;

    this.gddActivas = [];
    this.gddPasivas = [];
    this.gddTemporales = [];
    this.gddArmas = [];
    this.gddEsteticas = [];

    //creacion de texto con webfont
    WebFont.load({
      google: {
        families: ['Permanent Marker', 'Rock Salt', 'Beth Ellen']
      }
    })

    //localStorage.clear();
    this.loadFile();

    //ARRAY DE HABITACIONES
    this.arrayRooms = [];
    let numRoom = Phaser.Math.RND.between(config.room.numRoomsIni, config.room.numRoomsTotal);

    //Cargado de salas
    if (this.level != config.room.bossRoomLevel) {
      while (numRoom === config.room.bossRoom) {
        console.log("No puedes cargar la room del boss")
        numRoom = Phaser.Math.RND.between(config.room.numRoomsIni, config.room.numRoomsTotal);
      }
    } else if (this.level === config.room.bossRoomLevel)
      numRoom = config.room.bossRoom;

    let nameRoom = 'sala' + numRoom.toString(); //

    this.map = this.make.tilemap({ key: nameRoom });

    console.log("level: " + this.level)
    console.log("Sala cargada: " + nameRoom)

    this.loadTileMapRoom();
    this.EnterRoomDir = this.map.properties[0].value;
    this.ExitRoomDir = this.map.properties[1].value;
    //PARA LA MUSICA

    //PUNTERO
    this.input.setDefaultCursor('url(sprites/crosshair.png), pointer');

    this.angleToPointer;
    this.input.on('pointermove', function (pointer) {
      this.angleToPointer = Phaser.Math.Angle.Between(this.player.x, this.player.y, (pointer.x / this.cameras.main.zoom) + this.cameras.main.worldView.x, (pointer.y / this.cameras.main.zoom) + this.cameras.main.worldView.y);

    }, this);

    //Camara

    this.cameras.main.startFollow(this.player.puntero.intermedio);
    this.cameras.main.zoom = 3;

    this.cursors = this.input.keyboard.createCursorKeys();

    this.matter.world.on('collisionstart', (event) => {

      //  Loop through all of the collision pairs
      let pairs = event.pairs;

      for (let i = 0; i < pairs.length; i++) {
        let bodyA = pairs[i].bodyA;
        let bodyB = pairs[i].bodyB;

        //  We only want sensor collisions
        if (pairs[i].isSensor) {
          let blockBody;
          let playerBody;

          if (bodyA.isSensor) {
            blockBody = bodyB;
            playerBody = bodyA;
          }
          else if (bodyB.isSensor) {
            blockBody = bodyA;
            playerBody = bodyB;
          }
          if (playerBody.label === 'endLevel') {

            //this.time.delayedCall(3000, this.scene.start('sceneManager'), [], this);
            if (blockBody.label === 'player') {
              this.cameras.main.fadeOut(3000);
              if (this.level != config.room.bossRoomLevel) {

                ++this.level;
                this.lastSeekMusic = this.actualMusic.seek;
                this.scene.start('main', {
                  health: this.player.health, ammo: this.player.ammo, weaponID: this.player.weaponId, level: this.level,
                  tileID: this.player.tileID, musicID: this.player.musicID, lastSeekMusic: this.lastSeekMusic, playerSpriteID: this.player.spriteID,
                  activePassives: this.player.activePassives, actualACTIVE: this.player.actualACTIVE, upgraded: this.player.upgraded,
                  infiniteAmmo: this.player.hasInfiniteAmmo, maxHealth: this.player.maxHealth, velFactor: this.player.velFactor,
                  enemySpriteID: this.actualEnemyID, videoPlay: this.videoPlaying
                });
              }
              else {
                //Se acaba la escena de juego y se reproduce la canción de creditos
                this.actualMusic.stop();
                this.actualMusic = this.sound.add(config.music.songReference[config.music.intro], { volume: config.musicVolume.intro });
                this.actualMusic.play();
                if (this.video != undefined)
                  this.video.stop();
                this.scene.start('endGame');
              }
            }
          }
        }
      }
    });
    this.doorSystem;
    this.pause = false;
    this.events.on('shutdown', this.shutdown, this);

    this.input.keyboard.on('keydown_ESC', this.pauseGame, this);//this.pauseGame
    this.input.keyboard.on('keydown_SPACE', this.advanceDialog, this);

  }//End of create

  changeLayer(tileState) {
    this.tileset = this.map.addTilesetImage('tileSetRayTracingEx', config.tileset.tileReference[tileState], 16, 16);
  }

  loadObjects(entityLayer, DoorsentityLayer, groundLayer) {
    this.doorSystem = new Doors(this, 'doorOpenV', 'doorV', 'doorOpenH', 'doorH');

    this.enemies = this.add.group();
    let doorNum; //Guarda la cantidad de enemigos por sala
    var enemyCount = 0;
    let x = 0;

    for (const objeto of entityLayer) {
      // `objeto.name` u `objeto.type` nos llegan de las propiedades del
      // objeto en Tiled

      //TODO no hayq ue pasarle el sprite asi si no por config y para los cambios d sprite de jugador
      if (objeto.name === 'player') {
        this.player = new Player(this, objeto.x, objeto.y, "player", this.health, this.ammo,
          this.activePassives, this.actualACTIVE, this.upgraded, this.hasInfiniteAmmo, this.maxHealth, this.velFactor);
        this.player.changeWeapon(this.weaponID);
        this.player.changeTile(this.tileID, true);

        //Creamos la musica si es la primera sala
        if (this.level === 0) {
          this.musicID = config.music.mainChip;
          this.player.musicID = this.musicID;
          this.playerSpriteID = config.player.def;
          this.actualEnemyID = config.enemySprite.def;
          this.changeEnemySprite(this.actualEnemyID);
          this.player.changeSpriteIdea(false, true, this.playerSpriteID, -1);
          if (this.actualMusic != null)
            this.actualMusic.stop();
          this.actualMusic = this.sound.add(config.music.songReference[this.musicID], { volume: config.musicVolume.general });
          this.actualMusic.play();
          this.actualMusic.loop = true;

        }
        else {
          this.player.changeSpriteIdea(false, true, this.playerSpriteID, -1);
          this.changeEnemySprite(this.enemySpriteID);
        }
        //this.player.changeAnimacionesonoseque();

        //Spawnear el numero de enemigos
        //for (let i = 0; i < 10;) {
        for (let i = 0; i < objeto.properties[0].value;) {

          let tileX = Phaser.Math.RND.between(0, this.map.width);
          let tileY = Phaser.Math.RND.between(0, this.map.height);

          if (this.map.hasTileAt(tileX, tileY, groundLayer)) {
            //let e = new Boss(this, tileX * this.map.tileWidth, tileY * this.map.tileHeight, this.player, 0, this.doorSystem, clyon);
            //hacer random para elegir entre 3 enemigos de acuerdo a 0 - 3, 3- 6, 6 - 9
            let y = Math.floor(((this.level + 1) / 3));
            if (y > 2) y = 2;

            let tipo = Phaser.Math.RND.between(Math.floor(((this.level + 1) / 7)), y);
            let e = new Enemy(this, tileX * this.map.tileWidth, tileY * this.map.tileHeight, this.player, 0, this.doorSystem, listEnemies[tipo]);
            this.enemies.add(e);


            if (doorNum != x)
              enemyCount = 0;

            ++enemyCount;
            doorNum = enemyCount;  //Deberia de incrementar en 1 el doorNum de la sala del enemigo

            x = doorNum;
            i++;
          }

        }

      }
      else if (objeto.name === 'enemy') {
        //const e = new Boss(this, objeto.x, objeto.y, this.player, 0, this.doorSystem, clyon);
        let e = new Enemy(this, objeto.x, objeto.y, this.player, 0, this.doorSystem, listEnemies[0], false);
        this.enemies.add(e);

        if (doorNum != x)
          enemyCount = 0;

        ++enemyCount;
        doorNum = enemyCount;  //Deberia de incrementar en 1 el doorNum de la sala del enemigo

        x = doorNum;
      }
      else if (objeto.name === 'endLevel') {
        this.endZone = this.matter.add.rectangle(objeto.x, objeto.y, 70, 70, { isSensor: true, label: 'endLevel' });
      }
      else if (objeto.name === 'boss') {
        let e;
        switch (objeto.properties[1].value) {
          case ("cylon"):
            e = new Boss(this, objeto.x, objeto.y, this.player, 0, this.doorSystem, clyon);
            break;
          case ("willermo"):
            e = new Boss(this, objeto.x, objeto.y, this.player, 0, this.doorSystem, willermo);
            break;
        }

        //const e = new Enemy(this, objeto.x, objeto.y, this.player, 0, this.doorSystem, enemyConfig);
        this.enemies.add(e);

        if (doorNum != x)
          enemyCount = 0;

        ++enemyCount;
        doorNum = enemyCount;  //Deberia de incrementar en 1 el doorNum de la sala del enemigo

        x = doorNum;
      }
    }




    for (const objeto of DoorsentityLayer) {
      //Creamos una puerta con la posicion y el numero necesario de enemigos  y la rotacion que hacen falta matar para que se abra
      this.doorSystem.addDoor(objeto, doorNum);
    }
  }

  /* this.scene.stop('UIScene');
       this.cameras.main.startFollow(this.finish);
       if (this.fadeCamera.fadeEffect.alpha >= 1)
       {
       this.fadeCamera.fadeEffect.alpha = 0;
       this.fadeCamera.fade(2000);
       }*/
  /*end() {
    console.log("se queda");
    this.finish = this.add.image(3000, 3000, 'end');
    this.cameras.main.fadeIn(3000);
    this.scene.stop('UIScene');
    this.cameras.main.startFollow(this.finish);
  }*/


  //SE CARGA UNA HABITACION
  loadTileMapRoom() {

    //this.arrayRooms[this.arrayRooms.length - 1].createBlankLayer();
    //this.make.tilemap({ key: 'sala1' })
    this.tileset = this.map.addTilesetImage('tileSetRayTracingEx', 'tileSetBaseEx', 16, 16);

    //this.map.createBlankDynamicLayer('sala1', this.tileset);

    let groundLayer = this.map.createStaticLayer('Ground', this.tileset);
    let enemiesLayer = this.map.createStaticLayer('Enemies', this.tileset);
    let detailsLayer = this.map.createStaticLayer('Details', this.tileset);
    let reflexLayer = this.map.createStaticLayer('Reflex', this.tileset);
    let wallsLayer = this.map.createStaticLayer('Walls', this.tileset);
    let collidersLayer = this.map.createStaticLayer('Colliders', this.tileset);


    let entityLayer = this.map.getObjectLayer('Entities').objects
    let DoorsentityLayer = this.map.getObjectLayer('Doors').objects
    // profundidad
    enemiesLayer.setVisible(false);
    groundLayer.setDepth(config.depths.groundLayer);
    detailsLayer.setDepth(config.depths.detailsLayer);
    reflexLayer.setDepth(config.depths.reflexLayer);
    wallsLayer.setDepth(config.depths.wallsLayer);
    //enemigos          ->2
    //jugador y balas   ->3
    collidersLayer.setDepth(config.depths.collidersLayer);

    // colisiones tilemap
    collidersLayer.setCollisionByProperty({ collide: true });
    // físicas
    this.matter.world.convertTilemapLayer(collidersLayer, { label: "pared" });

    //CARGA DE OBJETOS NOSEQUE
    this.Bodies = Phaser.Physics.Matter.Matter.Bodies;
    this.door;
    this.endZone;
    this.finish = false;

    //UI
    //Barra de fondo
    this.healthBackground = this.add.graphics();
    this.healthBackground.fillStyle(0xababab, 0.5);
    this.healthBackground.fillRect(0, 0, 1, 1);
    this.healthBackground.setScrollFactor(0);
    this.healthBackground.setDepth(7);
    //Barra de vida
    this.healthBar = this.add.graphics();
    this.healthBar.fillStyle(config.ui.healthBarColor, 1);
    this.healthBar.fillRect(0, 0, 1, 1);
    this.healthBar.setScrollFactor(0);
    this.healthBar.setDepth(7);

    this.passiveCount = 0;

    //Posición de las barras
    this.healthBar.x = config.ui.barPosX;
    this.healthBar.y = config.ui.barPosY;
    this.healthBackground.x = config.ui.barPosX - 3;
    this.healthBackground.y = config.ui.barPosY - 3;
    //Escala de las barras
    this.healthBar.scaleY = config.ui.barScaleY;
    this.healthBackground.scaleY = config.ui.barScaleY + 6;


    this.cooldownBar = this.add.graphics();
    this.cooldownBar.fillStyle(0x00ff00, 1);
    this.cooldownBar.fillRect(0, 0, 1, 1);
    this.cooldownBar.setScrollFactor(0);
    this.cooldownBar.setDepth(7);
    this.cooldownBar.x = config.ui.cooldownPosX;
    this.cooldownBar.y = config.ui.cooldownPosY;
    this.cooldownBar.scaleX = 0;
    this.cooldownBar.scaleY = 5;

    this.weaponImg = this.add.image(config.ui.weaponPosX, config.ui.weaponPosY, 'gunshotsilhouette');
    this.weaponImg.scale = config.ui.weaponScl;
    this.weaponImg.setScrollFactor(0);
    this.weaponImg.setDepth(7);

    //Contador de munición
    this.ammoCounter = this.add.text(config.ui.ammoPosX, config.ui.ammoPosY, '0', { fontFamily: 'Beth Ellen', fontSize: config.ui.ammoFontSize, color: '#ffffff' });
    this.ammoCounter.setScrollFactor(0);
    this.ammoCounter.setScale(0.3);
    this.ammoCounter.setDepth(7);

    //Contador de vida 
    this.healthCounter = this.add.text(config.ui.healthPosX, config.ui.healthPosY, '0', { fontFamily: 'Beth Ellen', fontSize: config.ui.healthFontSize, color: '#ffffff' });
    this.healthCounter.setScrollFactor(0);
    this.healthCounter.setScale(0.25);
    this.healthCounter.setDepth(7);

    //Activa
    this.activeImg = this.add.image(config.ui.activePosX, config.ui.activePosY);
    this.activeImg.setScrollFactor(0);
    this.activeImg.setScale(0.5);
    this.activeImg.setDepth(7);

    //Dialogo
    this.dialogBox = this.add.image(config.ui.dialogBoxX, config.ui.dialogBoxY, 'dialogoSergio');
    this.dialogBox.setScale(0.3);
    this.dialogBox.setVisible(false);
    this.dialogBox.setScrollFactor(0);
    this.dialogBox.setDepth(7);

    this.dialog = this.add.text(config.ui.dialogX, config.ui.dialogY), '', { fontFamily: 'Rock Salt', fontSize: config.ui.dialogFontSize, color: "#ffffff" };
    this.dialog.setScale(0.5)
    this.dialog.setScrollFactor(0);
    this.dialog.setDepth(7);
    this.dialog.setTint(0x000000);

    //Variables para el control de los diálogos
    this.dialogState = 0;
    this.onDialog = false;
    this.talkedLast = -1;
    this.strings;

    this.loadObjects(entityLayer, DoorsentityLayer, enemiesLayer);
  }

  saveFile() {
    var file = {
      disparos: this.disparosRealizados,
      enemigos: this.enemiesKilled,
      //que tiene que gaurdar el file¿?

      gddActivas: this.gddActivas,
      gddPasivas: this.gddPasivas,
      gddTemporales: this.gddTemporales,
      gddArmas: this.gddArmas,
      gddEsteticas: this.gddEsteticas,
      gddCharacter: this.gddCharacter,
      gddMusica: this.gddMusica
    }
    localStorage.setItem('insideDesignSaveFile', JSON.stringify(file));
  }

  loadFile() {
    var file = JSON.parse(localStorage.getItem('insideDesignSaveFile'));
    //cargar las cosas de file

    if (file !== null) {
      this.disparosRealizados = file.disparos;
      this.enemiesKilled = file.enemigos;


      this.gddActivas = file.gddActivas;
      this.gddPasivas = file.gddPasivas;
      this.gddTemporales = file.gddTemporales;
      this.gddArmas = file.gddArmas;
      this.gddEsteticas = file.gddEsteticas;
      this.gddCharacter = file.gddCharacter;
      this.gddMusica = file.gddMusica
    }
    else {
      this.disparosRealizados = 0;
      this.enemiesKilled = 0;

      //generar archivo del gdd
      this.gddActivas = [];
      let numIdeas = config.gdd.nueroActivas;
      for (let i = 0; i < numIdeas; i++)
        this.gddActivas.push(false);

      this.gddPasivas = [];
      numIdeas = config.gdd.numeroPasivas;
      for (let i = 0; i < numIdeas; i++)
        this.gddPasivas.push(false);

      this.gddArmas = [];
      numIdeas = config.gdd.numeroArmas;
      for (let i = 0; i < numIdeas; i++)
        this.gddArmas.push(false);

      this.gddEsteticas = [];
      numIdeas = config.gdd.numeroEsteticas;
      for (let i = 0; i < numIdeas; i++)
        this.gddEsteticas.push(false);


      this.gddTemporales = [];
      numIdeas = config.gdd.numeroTemporales;
      for (let i = 0; i < numIdeas; i++)
        this.gddTemporales.push(false);

      this.gddCharacter = [];
      numIdeas = config.gdd.numeroCharacters;
      for (let i = 0; i < numIdeas; i++)
        this.gddCharacter.push(false);

      this.gddMusica = [];
      numIdeas = config.gdd.numeroMusicas;
      for (let i = 0; i < numIdeas; i++)
        this.gddMusica.push(false);
    }
  }



  shutdown() {
    //  We need to clear keyboard events, or they'll stack up when the Menu is re-run
    this.input.keyboard.shutdown();
  }

  pauseGame() {
    console.log("pausa")
    this.scene.launch('pause');
    this.scene.pause('UIScene');
    this.scene.pause('main');
  }

  update() {
    if (this.actualMusic.isPlaying) {

      //Si queremos que se cambie al compas pues hay que descompentar este if
      // if(this.time.now >= this.compassTimer)
      // {
      this.compassTimer = this.time.now + this.tempo;
      //VALE A PARTIR DE AQUI, SI LO QUEREMOS HACER POR COMPASES
      //SE QUEDA EN EL UPDATE
      //SI NO, PUES LO PODEMOS SACAR A UN METODO
      //Y LA VARIABLE musicChange se funa en ese caso
      if (this.musicChange) {
        this.musicChange = false;
        let seekNose = this.actualMusic.seek;
        this.actualMusic.destroy();
        this.actualMusic = this.sound.add(this.nextSong);
        this.actualMusic.play();
        this.actualMusic.loop = true;
        this.actualMusic.setSeek(seekNose);
      }
      // }
    }

  }

  //Métodos del HUD
  setHealth(playerHealth) {
    this.healthBar.scaleX = playerHealth * config.ui.barScaleX;
    this.healthCounter.text = playerHealth;
  }

  setBackground(playerMaxHP) {
    this.healthBackground.scaleX = playerMaxHP * config.ui.barScaleX + 6;
  }

  //Actualiza el contador de munición
  setAmmo(playerAmmo) {
    if (playerAmmo > -1)
      this.ammoCounter.text = playerAmmo;
    else
      this.ammoCounter.text = '∞';
  }

  setActiveImg(id) {
    this.activeImg.setTexture(config.ui.activeImgs[id]);
  }

  setCooldownBar(time) {
    this.cooldownBar.scaleX = time / 3;// * config.ui.barScaleX;
  }

  chooseTalker() {
    let talkId;
    do {
      talkId = Math.floor(Math.random() * 4);
    } while (talkId === this.talkedLast);

    this.dialogBox.setTexture(config.ui.dialogBoxes[talkId]);
    this.talkedLast = talkId;
  }

  //Hace visible el cuadro de diálogo y el primer texto de este
  startDialog(type, id, auxId) {
    this.chooseTalker();
    this.dialogBox.setVisible(true);

    //Recoge el array con los diálogos 
    switch (type) {
      case 'passive':
        this.strings = dialogues.passives[auxId];
        break;
      case 'active':
        this.strings = dialogues.actives[auxId];
        break;
      case 'weapon':
        this.strings = dialogues.weapons[auxId];
        break;
      case 'tilemap':
        this.strings = dialogues.tilemap[auxId];
        break;
      case 'character':
        this.strings = dialogues.character[auxId];
        break;
      case 'temporal':
        this.strings = dialogues.temps[auxId];
        break;
      case 'music':
        this.strings = dialogues.music[auxId];
        break;
      case 'upgrade':
        if (this.player.actualACTIVE === 'dash')
          this.strings = dialogues.upgrade[0];
        else if (this.player.actualACTIVE === 'shield')
          this.strings = dialogues.upgrade[1];
        else if (this.player.actualACTIVE === 'area')
          this.strings = dialogues.upgrade[2];
    }

    this.onDialog = true;
    this.dialogState = 0;
    this.dialog.text = this.strings[this.dialogState];
    this.pendingIdea = id;
    this.pendingIdeaId = auxId;
    this.pendingType = type;
  }

  advanceDialog() {
    if (this.onDialog) {
      this.dialogState++;
      if (this.dialogState < this.strings.length) {
        this.chooseTalker();
        this.dialog.text = this.strings[this.dialogState];
      }
      else
        this.endDialog();
    }
  }

  endDialog() {
    this.onDialog = false;
    this.dialogBox.setVisible(false);
    this.dialog.text = '';

    ///CREO QUE ESTO NO SIRVE PARA NADA PERO NO LO QUERIA BORRAR
    if (this.pendingType === 'active')
      this.player.changeActive(this.pendingIdea);
    else if (this.pendingType === 'temporal')
      this.player.addTempPassive(this.pendingIdea);
    else if (this.pendingType === 'upgrade')
      this.player.upgradeActive();
    else
      this.player.addPassive(this.pendingIdea);

    if (this.pendingType !== 'temporal')
      this.doorSystem.openDoor();
    this.updateGdd();
  }

  //CAMBIAR MUSICA POR EL PLAYER
  changeMusic(next) {
    this.nextSong = config.music.songReference[next];
    let seekNose = this.actualMusic.seek;
    this.actualMusic.destroy();
    this.actualMusic = this.sound.add(this.nextSong);
    this.actualMusic.play()
    this.actualMusic.loop = true;
    this.actualMusic.setSeek(seekNose);

  }

  updateGdd() {
    if (this.pendingType === "weapon") {
      this.gddArmas[this.pendingIdeaId] = true;
    }
    else if (this.pendingType === "passive") {
      this.gddPasivas[this.pendingIdeaId] = true;
    }
    else if (this.pendingType === "active") {
      this.gddActivas[this.pendingIdeaId] = true;
    }
    else if (this.pendingType === "temporal") {
      this.gddTemporales[this.pendingIdeaId] = true;
    }
    else if (this.pendingType === "tilemap") {
      this.gddEsteticas[this.pendingIdeaId] = true;
    }
    else if (this.pendingType === "character") {
      this.gddCharacter[this.pendingIdeaId] = true;
    }
    else if (this.pendingType === "music")
      this.gddMusica[this.pendingIdeaId] = true;

    this.saveFile();
  }

  changePlayerSprite(id) {

    this.anims.create({
      key: 'walk' + config.player.spriteKey[id],
      frames: this.anims.generateFrameNumbers(config.player.spriteKey[id], { start: 4, end: 8 }), //15
      frameRate: 15,
      repeat: -1
    })
    this.anims.create({
      key: 'idle' + config.player.spriteKey[id],
      frames: this.anims.generateFrameNumbers(config.player.spriteKey[id], { start: 1, end: 3 }),
      frameRate: 7,
      repeat: -1
    })
    this.anims.create({
      key: 'death' + config.player.spriteKey[id],
      frames: this.anims.generateFrameNumbers(config.player.spriteKey[id], { start: 13, end: 28 }),
      frameRate: 14,
      repeat: 0
    })
    this.anims.create({
      key: 'hit' + config.player.spriteKey[id],
      frames: this.anims.generateFrameNumbers(config.player.spriteKey[id], { start: 9, end: 14 }),
      frameRate: 60,
      repeat: 0
    })

    // }
  }

  changeEnemySprite(id) {

    this.actualEnemyID = id;

    this.anims.create({
      key: 'walkEnemy' + config.enemySprite.key[id],
      frames: this.anims.generateFrameNumbers(config.enemySprite.key[id], { start: 4, end: 8 }), //15
      frameRate: 15,
      repeat: -1
    })
    this.anims.create({
      key: 'idleEnemy' + config.enemySprite.key[id],
      frames: this.anims.generateFrameNumbers(config.enemySprite.key[id], { start: 1, end: 3 }),
      frameRate: 7,
      repeat: -1
    })
    this.anims.create({
      key: 'deathEnemy' + config.enemySprite.key[id],
      frames: this.anims.generateFrameNumbers(config.enemySprite.key[id], { start: 14, end: 28 }),
      frameRate: 14,
      repeat: 0
    })
    this.anims.create({
      key: 'hitEnemy' + config.enemySprite.key[id],
      frames: this.anims.generateFrameNumbers(config.enemySprite.key[id], { start: 4, end: 14 }),
      frameRate: 60,
      repeat: 0
    })

  }

  putVideoOnScreen() {
    this.videoPlaying = true;
    this.video = this.add.video(700, 400, 'filtrocinta');
    this.video.depth = 10;
    this.video.setAlpha(0.3);
    this.video.play();
    this.video.setLoop(true);
    this.video.setScrollFactor(0);
  }
}