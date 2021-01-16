import Weapon from "./source/weapon.js";
import Player from "./source/player.js";
import Puntero from "./source/puntero.js";
import Enemy from "./source/enemy.js";
import Item from "./source/item.js";
import Doors from "./source/doors.js";
import config from "./source/config.js"
import enemyConfig from "./source/enemiesFolder/defaultEnemy.js"
import dialogues from "./source/dialogues.js";

import Boss from "./source/boss.js";
import clyon from "./source/Bosses/clyon.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: "main" });
  }
  init(data) {
    this.health = data.health,
      this.ammo = data.ammo,
      this.weaponID = data.weaponID,
      this.level = data.level;
      this.tileID = data.tileID;
      this.musicID = data.musicID,
      this.lastSeekMusic = data.lastSeekMusic
      //this.playerAspectID = data.playerAspectID
  }


  preload() {
    this.load.spritesheet('player', './sprites/player.png', { frameWidth: 24, frameHeight: 24 });

    //Diego
    this.load.spritesheet('bullet', 'sprites/newBullet.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('enemybullet', 'sprites/enemyBullet.png', { frameWidth: 64, frameHeight: 64 });
    this.load.image('crosshair', 'sprites/crosshair.png');
    this.load.image('granade_launcher', 'sprites/granade_launcher.png');

    this.load.image('escopeta_lanzable', 'sprites/escopeta_lanzable.png');

    this.load.spritesheet('granade__launcher_shoot', 'sprites/granade_bullet.png', { frameWidth: 12, frameHeight: 12 });
    this.load.spritesheet('escopeta_lanzable_shoot', 'sprites/escopeta_lanzable.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('granade_launcher_shoot_explosion', 'sprites/granade_explosion.png', { frameWidth: 84, frameHeight: 83 });

    //Javi
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

    //nuevo
    this.load.audio('mainChiptuneSong', './audio/mainChiptune.mp3');
    this.load.audio('westernSong', './audio/western.mp3');
    this.load.audio('30sSong', './audio/30s.mp3');
    this.load.audio('neonRiderSong', './audio/neonRider.mp3');
    this.load.audio('epicSong', './audio/epic.mp3');
    this.load.audio('rockSong', './audio/rock.mp3');
    this.load.audio('horrorSong', './audio/horror.mp3');
    this.load.audio('pianoSong', './audio/piano.mp3');
    this.load.audio('berridosSong', './audio/berridos.mp3');

    this.load.audio('gunShootSound', './audio/gunShoot.wav');
    this.load.audio('gunShootSound2', './audio/gunShoot2.wav');
    this.load.audio('hitShootSound', './audio/hitShoot.wav');
    this.load.audio('deadSound', './audio/deadSound.wav');
    this.load.image('gunShoot', './sprites/gunShootProt.png');
    this.load.image('bate', './sprites/bate3.png');
    this.load.image('swing', './sprites/swing.png');
    this.load.image('walkParticle', './sprites/walkParticulas.png');
    this.load.image('dashParticle', './sprites/dashParticula.png')
    this.load.audio('dashSound', './audio/dashSound.wav');

    //Elementos de la UI
    //Armas
    this.load.image('gunshotsilhouette', 'sprites/gunshotSilueta.png');
    //Pasivas
    this.load.image('tanqueo', 'sprites/pixel_tank.png');
    //this.load.image('facil', 'Sprites/');
    this.load.image('rambo', 'sprites/rambo.png');
    //this.load.image('buenaonda', 'Sprites/');
    //this.load.image('malaonda', 'Sprites/');
    this.load.image('sanic', 'sprites/sanic.png');
    this.load.image('cogo', 'sprites/ferrari.png');
    //Activas
    this.load.image('dash', 'sprites/dash_1.png');
    this.load.image('shield', 'sprites/shield.png');
    this.load.image('bomb', 'sprites/bomb.png');
    //Dialogos
    this.load.image('dialogbox', 'sprites/dialogbox.png');
    //Carga de fuentes con bitmap
    this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');

  }

  create() {
    console.log("level: " + this.level)
    //variables que utilizara ela rchivo de guardado
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
    let numRoom = Phaser.Math.RND.between(1, 6);
    let nameRoom = 'sala' + numRoom.toString();

    //this.arrayRooms.push(this.make.tilemap({ key: 'sala1' }));
    this.map = this.make.tilemap({ key: 'sala1' });
    this.loadTileMapRoom();

    //PARA LA MUSICA
    

    //this.tempo = 1400;
    //this.compassTimer = this.time.now + this.tempo;
    //this.musicChange = false;
    //this.actualMusic = this.sound.add('mainChiptuneSong');
    //this.actualMusic.play();
    this.cumdebug = false;
    //this.setSceneMusic(this.musicID);

    //PUNTERO
    this.input.setDefaultCursor('url(Sprites/crosshair.png), pointer');

    this.angleToPointer;
    this.input.on('pointermove', function (pointer) {
      this.angleToPointer = Phaser.Math.Angle.Between(this.player.x, this.player.y, (pointer.x / this.cameras.main.zoom) + this.cameras.main.worldView.x, (pointer.y / this.cameras.main.zoom) + this.cameras.main.worldView.y);

    }, this);

    //Prototipo Musica
    //let sound = this.sound.add('mainTheme');
    //sound.setVolume(0.7);
    //sound.play();


    //CARGA DE OBJETOS
    //this.Bodies = Phaser.Physics.Matter.Matter.Bodies;
    //this.door;
    //this.endZone;
    //this.finish = false;
    //this.loadObjects(entityLayer, DoorsentityLayer);

    //Camara
    this.cameras.main.zoom = 3;
    this.cameras.main.startFollow(this.player.puntero.intermedio);

    this.cursors = this.input.keyboard.createCursorKeys();
    /*
    this.input.keyboard.on('keydown-SHIFT', function (event) {
      if (this.tilemapState == 0) this.tilemapState++;
      else this.tilemapState--;
      console.log(this.tilemapState);
    }, this);
    */

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
            this.cameras.main.fadeOut(3000);
            //this.time.delayedCall(3000, this.scene.start('sceneManager'), [], this);
            if (this.level != 0) {
              ++this.level;
              this.lastSeekMusic = this.actualMusic.seek;
              //this.actualMusic.destroy();
              this.scene.start('main', { health: this.player.health, ammo: this.player.ammo, weaponID: this.player.weapon.weaponID, level: this.level, 
                                tileID: this.player.tileID, musicID: this.player.musicID, lastSeekMusic: this.lastSeekMusic});
            }
            else {
              this.scene.start('theEnd');
            }
          }
        }
      }
    });
    this.doorSystem;
    this.pause = false;
    this.events.on('shutdown', this.shutdown, this);

    this.input.keyboard.on('keydown_ESC', this.pauseGame, this);//this.pauseGame
    this.input.keyboard.on('keydown_ENTER', this.advanceDialog, this);
  }//End of create

  changeLayer(tileState) {
    this.tileset = this.map.addTilesetImage('tileSetRayTracingEx', config.tileset.tileReference[tileState], 16, 16);
  }

  loadObjects(entityLayer, DoorsentityLayer, groundLayer) {
    this.doorSystem = new Doors(this, 'doorOpenV', 'doorV', 'doorOpenH', 'doorH');

    this.enemies = this.add.group();
    let doorNum = {}; //Guarda la cantidad de enemigos por sala
    var enemyCount = 0;
    let x = 0;

    for (const objeto of entityLayer) {
      // `objeto.name` u `objeto.type` nos llegan de las propiedades del
      // objeto en Tiled

      //TODO no hayq ue pasarle el sprite asi si no por config y para los cambios d sprite de jugador
      if (objeto.name === 'player') {
        this.player = new Player(this, objeto.x, objeto.y, "player", this.health, this.ammo);
        this.player.changeWeapon(this.weaponID);
        this.player.changeTile(this.tileID, true);
        //Creamos la musica si es la primera sala
        if(this.level === 0){
          this.musicID = config.music.mainChip;
          this.player.musicID = this.musicID;
          this.actualMusic = this.sound.add(config.music.songReference[this.musicID]);
          this.actualMusic.play();
        }
        //this.player.changeAnimacionesonoseque();
      }
      else if (objeto.name === 'enemy') {
        //const e = new Boss(this, objeto.x, objeto.y, this.player, 0, this.doorSystem, clyon);
        const e = new Enemy(this, objeto.x, objeto.y, this.player, 0, this.doorSystem, enemyConfig);
        this.enemies.add(e);

        if (doorNum[objeto.properties[0].value - 1] != x)
          enemyCount = 0;

        ++enemyCount;
        doorNum[objeto.properties[0].value - 1] = enemyCount;  //Deberia de incrementar en 1 el doorNum de la sala del enemigo

        x = doorNum[objeto.properties[0].value - 1];
      }
      else if (objeto.name === 'endLevel') {
        this.endZone = this.matter.add.image(0, 0, 'trigger');  //!SE QUE ESTO ESTÁ FEO AIUDA SELAION
        this.endZone.setExistingBody(this.Bodies.rectangle(objeto.x, objeto.y, 40, 40, { isSensor: true, label: 'endLevel' }));
      }
    }


    for (let i = 0; i < 20; i++) {

      let tileX = Phaser.Math.RND.between(0, this.map.width);
      let tileY = Phaser.Math.RND.between(0, this.map.height);

      if (this.map.hasTileAt(tileX, tileY, groundLayer)) {
        let e = new Enemy(this, tileX * this.map.tileWidth, tileY * this.map.tileHeight, this.player, 0, this.doorSystem, enemyConfig);
        this.enemies.add(e);


        if (doorNum[0] != x)
          enemyCount = 0;

        ++enemyCount;
        doorNum[0] = enemyCount;  //Deberia de incrementar en 1 el doorNum de la sala del enemigo

        x = doorNum[0];
      }
      else i--;

    }

    for (const objeto of DoorsentityLayer) {
      //Creamos una puerta con la posicion y el numero necesario de enemigos  y la rotacion que hacen falta matar para que se abra
      this.doorSystem.addDoor(objeto, doorNum[objeto.properties[0].value - 1], objeto.properties[0].value - 1, objeto.properties[1].value);
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
    let wallstopLayer = this.map.createStaticLayer('WallsTop', this.tileset);
    let colsbottomLayer = this.map.createStaticLayer('ColsBottom', this.tileset);
    let boxbottomLayer = this.map.createStaticLayer('BoxBottom', this.tileset);
    let collidersLayer = this.map.createStaticLayer('Colliders', this.tileset);
    let colstopLayer = this.map.createStaticLayer('ColsTop', this.tileset);
    let boxtopLayer = this.map.createStaticLayer('BoxTop', this.tileset);


    let entityLayer = this.map.getObjectLayer('Entities').objects
    let DoorsentityLayer = this.map.getObjectLayer('Doors').objects
    // profundidad
    enemiesLayer.setVisible(false);
    groundLayer.setDepth(0);
    detailsLayer.setDepth(0);
    reflexLayer.setDepth(0);
    wallsLayer.setDepth(1);
    colsbottomLayer.setDepth(2);
    boxbottomLayer.setDepth(2);
    //enemigos          ->3
    //jugador y balas   ->4
    wallstopLayer.setDepth(5);
    collidersLayer.setDepth(5);
    colstopLayer.setDepth(6);
    boxtopLayer.setDepth(6);

    // colisiones tilemap
    collidersLayer.setCollisionByProperty({ collide: true });
    colsbottomLayer.setCollisionByProperty({ collide: true });
    boxbottomLayer.setCollisionByProperty({ collide: true });
    colstopLayer.setCollisionByProperty({ collide: true });
    boxtopLayer.setCollisionByProperty({ collide: true });
    // físicas
    this.matter.world.convertTilemapLayer(collidersLayer, { label: "pared" });
    this.matter.world.convertTilemapLayer(colsbottomLayer);
    this.matter.world.convertTilemapLayer(boxbottomLayer);
    this.matter.world.convertTilemapLayer(colstopLayer);
    this.matter.world.convertTilemapLayer(boxtopLayer);

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
    this.dialogBox = this.add.image(config.ui.dialogBoxX, config.ui.dialogBoxY, 'dialogbox');
    this.dialogBox.setScale(0.3);
    this.dialogBox.setVisible(false);
    this.dialogBox.setScrollFactor(0);
    this.dialogBox.setDepth(7);

    this.dialog = this.add.text(config.ui.dialogX, config.ui.dialogY), '', {fontFamily: 'Rock Salt', fontSize: config.ui.dialogFontSize, color: '#ffffff'};
    this.dialog.setScale(0.5)
    this.dialog.setScrollFactor(0);
    this.dialog.setDepth(7);

    //Variables para el control de los diálogos
    this.dialogState = 0;
    this.onDialog = false;
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
      gddEsteticas: this.gddEsteticas
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

  update(){
    if(this.actualMusic.isPlaying){

      //Si queremos que se cambie al compas pues hay que descompentar este if
    // if(this.time.now >= this.compassTimer)
     // {
        this.compassTimer = this.time.now + this.tempo;
        //VALE A PARTIR DE AQUI, SI LO QUEREMOS HACER POR COMPASES
        //SE QUEDA EN EL UPDATE
        //SI NO, PUES LO PODEMOS SACAR A UN METODO
        //Y LA VARIABLE musicChange se funa en ese caso
        if(this.musicChange)
        {
          this.musicChange = false; 
          let seekNose = this.actualMusic.seek;
          this.actualMusic.destroy();
          this.actualMusic = this.sound.add(this.nextSong);
          this.actualMusic.play()
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

  /*addPassiveImg(id) {
    let img = this.add.image(config.ui.passivePosX + (this.passiveCount * config.ui.passiveOffset), config.ui.passivePosY, config.ui.passiveImgs[id]);
    img.setScale(0.3);
    this.passiveCount++;
  }*/

  //Hace visible el cuadro de diálogo y el primer texto de este
  startDialog(type, id) {
    this.dialogBox.setVisible(true);

    //Recoge el array con los diálogos      
    if (type === 'passive') {
      this.strings = dialogues.passives[id];
    }

    else if (type === 'active') {
      this.strings = dialogues.actives[id];
    }

    this.onDialog = true;
    this.dialogState = 0;
    this.dialog.text = this.strings[this.dialogState];
    this.pendingIdea = id;
    this.pendingType = type;
  }

  advanceDialog() {
    if (this.onDialog) {
      this.dialogState++;
      if (this.dialogState < this.strings.length)
        this.dialog.text = this.strings[this.dialogState];
      else
        this.endDialog()
    }
  }

  endDialog() {
    this.onDialog = false;
    this.dialogBox.setVisible(false);
    this.dialog.text = '';
    if(this.pendingType === 'passive')
      this.player.addPassive(this.pendingIdea);
    else if(this.pendingType === 'active')
      this.player.changeActive(this.pendingIdea);
  }

  //CAMBIAR MUSICA POR EL PLAYER
  changeMusic(next){ 
    this.nextSong = config.music.songReference[next];
    let seekNose = this.actualMusic.seek;
    this.actualMusic.destroy();
    this.actualMusic = this.sound.add(this.nextSong);
    this.actualMusic.play()
    this.actualMusic.setSeek(seekNose);
  
  }

  updateGdd(key, id){
  if (key === "weapon"){
      this.gddArmas[id] = true;
  }
  if (key === "pasiva"){
      this.gddPasivas[id] = true;
  }
  if (key === "activa"){
      this.gddActivas[id] = true;
  }
  if (key === "temporal"){
      this.gddTemporales[id] = true;
  }
  if (key === "estetica"){
      this.gddEsteticas[id] = true;
  }

  this.saveFile();
  }
}