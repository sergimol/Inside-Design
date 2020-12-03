import Weapon from "./source/weapon.js";
import Player from "./source/player.js";
import Puntero from "./source/puntero.js";
import Enemy from "./source/enemy.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: "main" });
  }
  
  preload() {
    this.load.spritesheet('player', './Sprites/character1.png', {frameWidth: 24, frameHeight: 24});

    //Diego
    this.load.spritesheet('bullet', 'Sprites/bullet2.png', {frameWidth: 16, frameHeight: 16});
    this.load.image('crosshair', 'Sprites/crosshair.png');

    //nuevo
    this.load.audio('mainTheme','./audio/main_theme_v1.0.wav');
    this.load.audio('gunShootSound', './audio/gunShoot.wav');
    this.load.image('gunShoot', './Sprites/gunShootProt.png');

    //Javi
    this.load.image('tiles', './Sprites/tiles/TilesetDEF.png');
    this.load.tilemapTiledJSON('dungeon','./Sprites/tiles/Nivel_0.json');
    
    this.player;
    this.enemy;
    this.enemies;
  }
  
  create() {
    const map = this.make.tilemap({key:'dungeon'})
    const tileset = map.addTilesetImage('Tilemap','tiles');

    const groundLayer = map.createStaticLayer('Ground', tileset);
    const detailsLayer = map.createStaticLayer('Details', tileset);
    const wallsLayer = map.createStaticLayer('Walls', tileset);
    const collidersLayer = map.createStaticLayer('Colliders', tileset);
    const colsLayer = map.createStaticLayer('Cols', tileset);
    const boxLayer = map.createStaticLayer('Box', tileset);

    collidersLayer.setCollisionByProperty({collisions: true});

    const debugGraphics = this.add.graphics().setAlpha(0.7);
    collidersLayer.renderDebug(debugGraphics,{
      tileColor:null,
      collidingTileColor: new Phaser.Display.Color(243,234,48,255),
      faceColor: new Phaser.Display.Color(40,39,37,255)
    })

    //BULLET
    this.anims.create({
      key:'shot',
      frames: this.anims.generateFrameNumbers('bullet', {start: 0, end: 2}),
      frameRate: 8,
      repeat: -1
    })
    
    //WEAPON
    let gun = this.add.image('gunShootProt');
    //BULLETS
    this.bullets = this.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;

    //PUNTERO
    this.angleToPointer;
    this.input.on('pointermove', function (pointer){
    this.angleToPointer = Phaser.Math.Angle.Between(this.player.x, this.player.y, pointer.x + this.cameras.main.worldView.x, pointer.y + this.cameras.main.worldView.y);
    }, this);
    //this.bullets.rotation = this.angleToPointer;

    //Prototipo Musica
    let sound = this.sound.add('mainTheme');
    //sound.play(); 

    //DISPARO
    this.input.on('pointerdown', function (pointer) {
      console.log("help");
      this.bullet = this.physics.add.sprite(this.player.x, this.player.y, 'bullet');
      this.bullet.play('shot', true);
      //this.bullet.setScale(4);
      //= bullets.getFirstDead();
      //this.bullet.anims('shot', true);
      this.bullet.rotation = this.angleToPointer;
      this.physics.moveToObject(this.bullet, this.player.puntero, 300);
      this.cameras.main.shake(200, 0.002); //tiempo que dura el shake, fuerza del shake

      this.physics.add.collider(this.bullet, collidersLayer, this.destroyBullet);
      this.bullets.add(this.bullet);

      let gunSound = this.sound.add('gunShootSound');
      gunSound.play();
    }, this);

    //Personaje
    this.player = new Player(this, 400, 450), 'Player';
    //Fisicas personaje
    this.physics.add.collider(this.player, collidersLayer);

    //Camara
    this.cameras.main.startFollow(this.player.puntero.intermedio);
    this.cameras.main.zoom = 3;
    //Enemies
    this.enemies = this.add.group();
    for(let i = 0; i<3; i++){
      const e = new Enemy(this, 400 + 20*i, 250, 'enemy');
      e.body.setCollideWorldBounds(true);
      e.setTint(0x9999ff);
      this.enemies.add(e);
    }
    this.physics.add.collider(this.enemies, collidersLayer);
    this.physics.add.collider(this.bullets, this.enemies, this.handleBulletEnemyCollision);

  }//End of create

  destroyBullet(b){
    console.log('bullet hit');
    b.destroy();
  }
  handleBulletEnemyCollision(b,e){
    console.log('enemy hit');
    e.die();
    //esto no es la manera correcta ni pa tras xd
    b.destroy();
  }

  update() {

    this.input.on('pointermove', function(pointer){
      this.player.puntero.move(pointer, this, this.player);
    }, this)
    
    //Jugador
    this.player.update();
    //Enemigos
    this.enemies.children.iterate((child)=>{
      if(!child.isDead){
        child.update(this.player);
      }
    });
  }
}