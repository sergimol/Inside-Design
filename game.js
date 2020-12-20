import Weapon from "./source/weapon.js";
import Player from "./source/player.js";
import Puntero from "./source/puntero.js";
import Enemy from "./source/enemy.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: "main" });
  }

  preload() {
    this.load.spritesheet('player', './Sprites/Player.png', {frameWidth: 24, frameHeight: 24});

    //Diego
    this.load.spritesheet('bullet', 'Sprites/newBullet.png', { frameWidth: 64, frameHeight: 64 });
    this.load.image('crosshair', 'Sprites/crosshair.png');

    //Javi
    //Tiles de estéticas
    this.load.image('tiles', './Sprites/tiles/TilesetDEF.png');
    this.load.image('tilesCrash', './Sprites/tiles/TilesetDEFcrash.png');


    this.load.tilemapTiledJSON('dungeon', './Sprites/tiles/NivelBase.json');

    //nuevo
    this.load.audio('mainTheme', './audio/main_theme_v1.0.wav');
    this.load.audio('gunShootSound', './audio/gunShoot.wav');
    this.load.audio('hitShootSound', './audio/hitShoot.wav');
    this.load.audio('deadSound', './audio/deadSound.wav');
    this.load.image('gunShoot', './Sprites/gunShootProt.png');

  }

  create() {
    this.map = this.make.tilemap({ key: 'dungeon' })
    this.tileset = this.map.addTilesetImage('TilesetBase', 'tiles', 16, 16, 1, 2);

    const groundLayer = this.map.createStaticLayer('Ground', this.tileset);
    const detailsLayer = this.map.createStaticLayer('Details', this.tileset);
    const wallsLayer = this.map.createStaticLayer('Walls', this.tileset);
    const colsbottomLayer = this.map.createStaticLayer('ColsBottom', this.tileset);
    const boxbottomLayer = this.map.createStaticLayer('BoxBottom', this.tileset);
    const collidersLayer = this.map.createStaticLayer('Colliders', this.tileset);
    const colstopLayer = this.map.createStaticLayer('ColsTop', this.tileset);
    const boxtopLayer = this.map.createStaticLayer('BoxTop', this.tileset);

    const entityLayer = this.map.getObjectLayer('Entities').objects

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

    //BULLET
    this.anims.create({
      key: 'shot',
      frames: this.anims.generateFrameNumbers('bullet', { start: 0, end: 3 }),
      frameRate: 8,
      repeat: -1
    })

    //BULLETS
    this.bullets = this.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;


    //PUNTERO
    this.input.setDefaultCursor('url(Sprites/crosshair.png), pointer');
    //this.sys.canvas.style.cursor = 'crosshair'

    //    this.puntero = new Puntero(this,400, 450);

    this.angleToPointer;
    this.input.on('pointermove', function (pointer) {
      this.angleToPointer = Phaser.Math.Angle.Between(this.player.x, this.player.y, (pointer.x / this.cameras.main.zoom) + this.cameras.main.worldView.x, (pointer.y / this.cameras.main.zoom) + this.cameras.main.worldView.y);

    }, this);

    //Prototipo Musica
    let sound = this.sound.add('mainTheme');
    sound.setVolume(0.7);
    sound.play(); 


    //CARGA DE OBJETOS
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
    },this);
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
        const e = new Enemy(this, objeto.x, objeto.y, 'player', this.player);
        this.enemies.add(e);
      }
    }
  }



  update() {
    this.changeLayer();

    //Jugador
    //Enemigos
    /*this.enemies.children.iterate((child)=>{
      if(!child.isDead){
        child.update(this.player);
      }
    });*/
    //console.log(this.angleToPointer);
  }
}