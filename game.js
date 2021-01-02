import Weapon from "./source/weapon.js";
import Player from "./source/player.js";
import Puntero from "./source/puntero.js";
import Enemy from "./source/enemy.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: "main" });
  }

  preload() {
    this.load.spritesheet('player', './Sprites/Player.png', { frameWidth: 24, frameHeight: 24 });

    //Diego
    this.load.spritesheet('bullet', 'Sprites/newBullet.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('enemybullet', 'Sprites/enemyBullet.png', { frameWidth: 64, frameHeight: 64 });
    this.load.image('crosshair', 'Sprites/crosshair.png');
    this.load.image('granade_launcher', 'Sprites/granade_launcher.png');
    
    this.load.spritesheet('granade__launcher_shoot', 'Sprites/granade_bullet.png', { frameWidth: 12, frameHeight: 12 });
    this.load.spritesheet('granade_launcher_shoot_explosion', 'Sprites/granade_explosion.png', { frameWidth: 83, frameHeight: 83 });

    //Javi
    //Tiles de estéticas
    this.load.image('tiles', './Sprites/tiles/TilesetDEF.png');
    this.load.image('tilesCrash', './Sprites/tiles/TilesetDEFcrash.png');
    this.load.image('door', './Sprites/door.png');
    this.load.image('doorOpen', './Sprites/doorOpen.png');
    this.load.image('trigger', './Sprites/trigger.png');
    this.load.image('end', './Sprites/end.jpg');

    this.load.tilemapTiledJSON('dungeon', './Sprites/tiles/NivelBase.json');

    //nuevo
    this.load.audio('mainTheme', './audio/main_theme_v1.0.wav');
    this.load.audio('gunShootSound', './audio/gunShoot.wav');
    this.load.audio('gunShootSound2', './audio/gunShoot2.wav');
    this.load.audio('hitShootSound', './audio/hitShoot.wav');
    this.load.audio('deadSound', './audio/deadSound.wav');
    this.load.image('gunShoot', './Sprites/gunShootProt.png');
    this.load.image('bate', './Sprites/Bate3.png');
    this.load.image('swing', './Sprites/swing.png');

  }

  create() {
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


    //PUNTERO
    this.input.setDefaultCursor('url(Sprites/crosshair.png), pointer');

    this.angleToPointer;
    this.input.on('pointermove', function (pointer) {
      this.angleToPointer = Phaser.Math.Angle.Between(this.player.x, this.player.y, (pointer.x / this.cameras.main.zoom) + this.cameras.main.worldView.x, (pointer.y / this.cameras.main.zoom) + this.cameras.main.worldView.y);

    }, this);

    //Prototipo Musica
    let sound = this.sound.add('mainTheme');
    sound.setVolume(0.7);
    sound.play();


    //CARGA DE OBJETOS
    this.enemyCount = 0;
    this.Bodies = Phaser.Physics.Matter.Matter.Bodies;
    this.door;
    this.endZone;
    this.finish = false;
    this.loadObjects(this.map);

    //Camara
    this.cameras.main.zoom = 3;
    this.cameras.main.startFollow(this.player.puntero.intermedio);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.tilemapState = 0;
    this.input.keyboard.on('keydown-SHIFT', function (event) {
      if (this.tilemapState == 0) this.tilemapState++;
      else this.tilemapState--;
      console.log(this.tilemapState);
    }, this);

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
            console.log("El rap de fernanflo")
            this.cameras.main.fadeOut(3000);
            this.time.delayedCall(3000, this.end, [], this);
          }
        }
      }

    });

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

  loadObjects(map) {
    this.enemies = this.add.group();

    for (const objeto of map.getObjectLayer('Entities').objects) {
      // `objeto.name` u `objeto.type` nos llegan de las propiedades del
      // objeto en Tiled
      if (objeto.name === 'player') {
        this.player = new Player(this, objeto.x, objeto.y, 'player')
      }
      else if (objeto.name === 'enemy') {
        this.enemyCount++;
        const e = new Enemy(this, objeto.x, objeto.y, 'player', this.player);
        this.enemies.add(e);
      }
      else if (objeto.name === 'door') {
        this.door = this.matter.add.image(0, 0, 'door');
        this.door.setExistingBody(this.Bodies.rectangle(objeto.x, objeto.y, 50, 30));
        this.door.depth = 0;
        this.door.setStatic(true);
      }
      else if (objeto.name === 'endLevel') {
        this.endZone = this.matter.add.image(0, 0, 'trigger');  //!SE QUE ESTO ESTÁ FEO AIUDA SELAION
        this.endZone.setExistingBody(this.Bodies.rectangle(objeto.x, objeto.y, 40, 40, { isSensor: true, label: 'endLevel' }));
        //!NO BORRAR MESSIrve
        /* this.endZone = this.Bodies.rectangle(objeto.x,objeto.y,0,0,{ isSensor: true, label: 'left' });
         this.endZone.depth = 0;
         this.cameras.main.startFollow(this.endZone);
         console.log(objeto.x);
         console.log(objeto.y);
         console.log(this.player.x);
         console.log(this.player.y);*/
        //this.endZone = Phaser.Physics.Matter.Matter.Body.create({});
        //this.endZone.setExistingBody(this.Bodies.rectangle(objeto.x, objeto.y,50,30,{ isSensor: false, label: 'endLevel' } ));
        //= this.Bodies.rectangle(objeto.x, objeto.y, 50, 50, { isSensor: false, label: 'endLevel' } );

      }
    }
  }

  /* this.scene.stop('UIScene');
       this.cameras.main.startFollow(this.finish);
       if (this.fadeCamera.fadeEffect.alpha >= 1)
       {
       this.fadeCamera.fadeEffect.alpha = 0;
       this.fadeCamera.fade(2000);
       }*/
  end() {
    console.log("se queda");
    this.finish = this.add.image(3000, 3000, 'end');
    this.cameras.main.fadeIn(3000);
    this.scene.stop('UIScene');
    this.cameras.main.startFollow(this.finish);
  }
  update() {
    this.changeLayer();
    if (this.enemyCount === 0) {
      this.door.setTexture('doorOpen');
      this.door.setCollisionCategory(null);
    }
  }
}