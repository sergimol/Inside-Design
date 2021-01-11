import Weapon from "./source/weapon.js";
import Player from "./source/player.js";
import Puntero from "./source/puntero.js";
import Enemy from "./source/enemy.js";
import Item from "./source/item.js";
import Doors from "./source/doors.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: "main" });
  }
  init(data) {
    this.health = data.health,
      this.ammo = data.ammo;
      this.weaponID = data.weaponID;
  }


  preload() {
    this.load.spritesheet('player', './Sprites/Player.png', { frameWidth: 24, frameHeight: 24 });

    //Diego
    this.load.spritesheet('bullet', 'Sprites/newBullet.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('enemybullet', 'Sprites/enemyBullet.png', { frameWidth: 64, frameHeight: 64 });
    this.load.image('crosshair', 'Sprites/crosshair.png');
    this.load.image('granade_launcher', 'Sprites/granade_launcher.png');

    this.load.image('escopeta_lanzable', 'Sprites/escopeta_lanzable.png');

    this.load.spritesheet('granade__launcher_shoot', 'Sprites/granade_bullet.png', { frameWidth: 12, frameHeight: 12 });
    this.load.spritesheet('escopeta_lanzable_shoot', 'Sprites/escopeta_lanzable.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('granade_launcher_shoot_explosion', 'Sprites/granade_explosion.png', { frameWidth: 84, frameHeight: 83 });

    //Javi
    //Tiles de estéticas
    this.load.image('tiles', './Sprites/tiles/TilesetDEF.png');
    this.load.image('tileSala1', './Sprites/tiles/TilesetDEF.png');
    this.load.image('tilesCrash', './Sprites/tiles/TilesetDEFcrash.png');
    this.load.image('doorV', './Sprites/doorV.png');
    this.load.image('doorOpenV', './Sprites/doorOpenV.png');
    this.load.image('doorH', './Sprites/doorH.png');
    this.load.image('doorOpenH', './Sprites/doorOpenH.png');
    this.load.image('trigger', './Sprites/trigger.png');
    this.load.image('end', './Sprites/end.jpg');
    this.load.image('bulletAmmo', './Sprites/bulletAmmo.png');
    this.load.image('medkit', './Sprites/medkit.png');

    //TODAS LAS SALAS
    this.load.tilemapTiledJSON('dungeon', './Sprites/tiles/NivelBase.json');
    this.load.tilemapTiledJSON('sala1', './Sprites/tiles/Sala1.json');
    this.load.tilemapTiledJSON('sala2', './Sprites/tiles/Sala2.json');
    this.load.tilemapTiledJSON('sala3', './Sprites/tiles/Sala3.json');
    this.load.tilemapTiledJSON('sala4', './Sprites/tiles/Sala4.json');
    this.load.tilemapTiledJSON('sala5', './Sprites/tiles/Sala5.json');
    this.load.tilemapTiledJSON('sala6', './Sprites/tiles/Sala6.json');

    //nuevo
    this.load.audio('mainTheme', './audio/main_theme_v1.0.wav');
    this.load.audio('gunShootSound', './audio/gunShoot.wav');
    this.load.audio('gunShootSound2', './audio/gunShoot2.wav');
    this.load.audio('hitShootSound', './audio/hitShoot.wav');
    this.load.audio('deadSound', './audio/deadSound.wav');
    this.load.image('gunShoot', './Sprites/gunShootProt.png');
    this.load.image('bate', './Sprites/Bate3.png');
    this.load.image('swing', './Sprites/swing.png');
    this.load.image('walkParticle', './Sprites/walkParticulas.png');
    this.load.image('dashParticle', './Sprites/dashParticula.png')
    this.load.audio('dashSound', './audio/dashSound.wav');

  }

  create() {

    this.disparosRealizados = 0;
    this.enemiesKilled = 0;

    //localStorage.clear();
    this.loadFile();

    //ARRAY DE HABITACIONES
    this.arrayRooms = [];
    let numRoom = Phaser.Math.RND.between(1, 6);
    let nameRoom = 'sala' + numRoom.toString();

    //this.arrayRooms.push(this.make.tilemap({ key: 'sala1' }));
    this.map = this.make.tilemap({ key: nameRoom });
    this.loadTileMapRoom();


    /*
    this.map = this.make.tilemap({ key: 'dungeon' })
    this.tileset = this.map.addTilesetImage('TilesetBase', 'tiles', 16, 16, 1, 2);

    const groundLayer = this.map.createStaticLayer('Ground', this.tileset);
    const detailsLayer = this.map.createStaticLayer('Details', this.tileset);
    const wallsLayer = this.map.createStaticLayer('Walls', this.tileset);
    const wallstopLayer = this.map.createStaticLayer('WallsTop', this.tileset);
    const colsbottomLayer = this.map.createStaticLayer('ColsBottom', this.tileset);
    const boxbottomLayer = this.map.createStaticLayer('BoxBottom', this.tileset);
    const collidersLayer = this.map.createStaticLayer('Colliders', this.tileset);
    const colstopLayer = this.map.createStaticLayer('ColsTop', this.tileset);
    const boxtopLayer = this.map.createStaticLayer('BoxTop', this.tileset);

    const entityLayer = this.map.getObjectLayer('Entities').objects
    const DoorsentityLayer = this.map.getObjectLayer('Doors').objects
    // profundidad
    groundLayer.setDepth(0);
    detailsLayer.setDepth(0);
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
    this.matter.world.convertTilemapLayer(collidersLayer);
    this.matter.world.convertTilemapLayer(colsbottomLayer);
    this.matter.world.convertTilemapLayer(boxbottomLayer);
    this.matter.world.convertTilemapLayer(colstopLayer);
    this.matter.world.convertTilemapLayer(boxtopLayer);
    */

    //PUNTERO
    this.input.setDefaultCursor('url(Sprites/crosshair.png), pointer');

    this.angleToPointer;
    this.input.on('pointermove', function (pointer) {
      this.angleToPointer = Phaser.Math.Angle.Between(this.player.x, this.player.y, (pointer.x / this.cameras.main.zoom) + this.cameras.main.worldView.x, (pointer.y / this.cameras.main.zoom) + this.cameras.main.worldView.y);

    }, this);

    //Prototipo Musica
    let sound = this.sound.add('mainTheme');
    sound.setVolume(0.7);
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

    this.tilemapState = 0;
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
            this.scene.start('main', { health: this.player.health, ammo: this.player.ammo, weaponID: this.player.weapon.weaponID });
          }
        }
      }
    });
    this.doorSystem;
    this.pause = false;
    this.events.on('shutdown', this.shutdown, this);

    this.input.keyboard.on('keydown_ESC', this.pauseGame, this);
  }//End of create

  changeLayer() {
    switch (this.tilemapState) {
      case 0:
        this.tileset = this.map.addTilesetImage('TilesetBase', 'tiles', 16, 16, 1, 2);
        break;

      case 1:
        this.tileset = this.map.addTilesetImage('TilesetBase', 'tilesCrash', 16, 16, 1, 2);
        break;
    }
  }

  loadObjects(entityLayer, DoorsentityLayer) {
    this.doorSystem = new Doors(this, 'doorOpenV', 'doorV', 'doorOpenH', 'doorH');

    this.enemies = this.add.group();
    let doorNum = {}; //Guarda la cantidad de enemigos por sala
    var enemyCount = 0;
    let x = 0;

    for (const objeto of entityLayer) {
      // `objeto.name` u `objeto.type` nos llegan de las propiedades del
      // objeto en Tiled
      if (objeto.name === 'player') {
        this.player = new Player(this, objeto.x, objeto.y, 'player', this.health, this.ammo);
        this.player.changeWeapon(this.weaponID);
      }
      else if (objeto.name === 'enemy') {
        const e = new Enemy(this, objeto.x, objeto.y, 'player', this.player, objeto.properties[0].value - 1, this.doorSystem);
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
    this.tileset = this.map.addTilesetImage('TilesetBase', 'tileSala1', 16, 16, 1, 2);

    this.map.createBlankDynamicLayer('sala1', this.tileset);

    let groundLayer = this.map.createStaticLayer('Ground', this.tileset);
    let detailsLayer = this.map.createStaticLayer('Details', this.tileset);
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
    groundLayer.setDepth(0);
    detailsLayer.setDepth(0);
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
    this.matter.world.convertTilemapLayer(collidersLayer);
    this.matter.world.convertTilemapLayer(colsbottomLayer);
    this.matter.world.convertTilemapLayer(boxbottomLayer);
    this.matter.world.convertTilemapLayer(colstopLayer);
    this.matter.world.convertTilemapLayer(boxtopLayer);

    //CARGA DE OBJETOS NOSEQUE
    this.Bodies = Phaser.Physics.Matter.Matter.Bodies;
    this.door;
    this.endZone;
    this.finish = false;
    this.loadObjects(entityLayer, DoorsentityLayer);


  }
  saveFile() {
    var file = {
      disparos: this.disparosRealizados,
      enemigos: this.enemiesKilled
      //que tiene que gaurdar el file¿?
    }
    localStorage.setItem('insideDesignSaveFile', JSON.stringify(file));
  }

  loadFile() {
    var file = JSON.parse(localStorage.getItem('insideDesignSaveFile'));
    //cargar las cosas de file

    if (file !== null) {
      this.disparosRealizados = file.disparos;
      this.enemiesKilled = file.enemigos;
    }
    else {
      this.disparosRealizados = 0;
      this.enemiesKilled = 0;
    }
  }

  shutdown() {
    //  We need to clear keyboard events, or they'll stack up when the Menu is re-run
    this.input.keyboard.shutdown();
  }

  pauseGame(){
      this.scene.launch('pause');
      this.scene.pause('main');
  }
}