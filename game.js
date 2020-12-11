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
    this.load.spritesheet('bullet', 'Sprites/newBullet.png', {frameWidth: 64, frameHeight: 64});
    this.load.image('crosshair', 'Sprites/crosshair.png');

    //Javi
    this.load.image('tiles', './Sprites/tiles/TilesetDEF.png');
    this.load.tilemapTiledJSON('dungeon','./Sprites/tiles/NivelBase.json');

    //nuevo
    this.load.audio('mainTheme','./audio/main_theme_v1.0.wav');
    this.load.audio('gunShootSound', './audio/gunShoot.wav');
    this.load.image('gunShoot', './Sprites/gunShootProt.png');
    
  }
  
  create() {
    // colisiones tilemap
    const map = this.make.tilemap({key:'dungeon'})
    const tileset = map.addTilesetImage('TilesetBase','tiles');

    const groundLayer = map.createStaticLayer('Ground', tileset);
    const detailsLayer = map.createStaticLayer('Details', tileset);
    const wallsLayer = map.createStaticLayer('Walls', tileset);
    const collidersLayer = map.createStaticLayer('Colliders', tileset);
    const colsLayer = map.createStaticLayer('Cols', tileset);
    const boxLayer = map.createStaticLayer('Box', tileset);

    collidersLayer.setCollisionByProperty({collide: true});
    colsLayer.setCollisionByProperty({collide: true});
    boxLayer.setCollisionByProperty({collide: true});

    this.matter.world.convertTilemapLayer(collidersLayer);
    this.matter.world.convertTilemapLayer(colsLayer);
    this.matter.world.convertTilemapLayer(boxLayer);



    //BULLET
    this.anims.create({
      key:'shot',
      frames: this.anims.generateFrameNumbers('bullet', {start: 0, end: 3}),
      frameRate: 8,
      repeat: -1
    })
    
    //WEAPON
    //let gun = this.add.image('gunShootProt');
    this.cameras.main.zoom = 3;
    //this.cameras.roundPixels = true; ->No arregla las estrias del tilemap
    //BULLETS
    this.bullets = this.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    
    
    //PUNTERO
    this.input.setDefaultCursor('url(Sprites/crosshair.png), pointer');
    //this.sys.canvas.style.cursor = 'crosshair'

//    this.puntero = new Puntero(this,400, 450);
    
     this.angleToPointer;
     this.input.on('pointermove', function (pointer){
        this.angleToPointer = Phaser.Math.Angle.Between(this.player.x, this.player.y, (pointer.x/this.cameras.main.zoom) + this.cameras.main.worldView.x, (pointer.y/this.cameras.main.zoom) + this.cameras.main.worldView.y);
  //this.player.
        //      this.puntero.x = (pointer.x/this.cameras.main.zoom) + this.cameras.main.worldView.x;
    //    this.puntero.y = (pointer.y/this.cameras.main.zoom)  + this.cameras.main.worldView.y;
        
      }, this);

    //this.bullets.rotation = this.angleToPointer;
    /*
     this.input.on('pointerdown', function (pointer){
        console.log("shoot");
        //this.player.shoot();
       
        
        this.bullet = this.physics.add.sprite(this.player.x, this.player.y, 'bullet');
        this.bullet.setScale(0.6);
        //= bullets.getFirstDead();
        this.bullet.play('shot', true);
        this.bullet.rotation = this.angleToPointer;
        //this.physics.moveToObject(this.bullet, this.puntero, 400);
        this.physics.moveTo(this.bullet, pointer.x, pointer.y, 400);
        
        this.bullets.add(this.bullet);

        //sonido
        let sound = this.sound.add('gunShootSound');
        sound.play(); 
        //shake
        this.cameras.main.shake(200, 0.0005);
        
        
      }, this);
      */
      //Prototipo Musica
      //let sound = this.sound.add('mainTheme');
      //sound.play(); 
       
       
      //DISPARO
      
      
      //Personaje
      this.player = new Player(this, 600, 450, 'player');
      //Fisicas personaje
      //this.scene.world.this.player, collidersLayer);
      //this.physics.add.collider(this.player, colsLayer);
      //this.physics.add.collider(this.player, boxLayer);
      
      //Camara

      this.cameras.main.startFollow(this.player.puntero.intermedio);
      
      //Enemies        
      /**
       * 
       this.enemies = this.add.group();
       
       for(let i = 0; i<3; i++){
         const e = new Enemy(this, 600 + 20*i, 650, 'player', this.player);
         //e.body.setCollideWorldBounds(true);
         this.enemies.add(e);
        }
  */
      //this.physics.add.collider(this.enemies, collidersLayer);
      //this.physics.add.collider(this.enemies, colsLayer);
      //this.physics.add.collider(this.enemies, boxLayer);
      //this.physics.add.collider(this.bullets, this.enemies, this.handleBulletEnemyCollision);

  }//End of create

  destroyBullet(b){
    console.log('bullet hit');
    b.destroy();
  }
  handleBulletEnemyCollision(e,b){
    console.log('enemy hit');
    //e.die();
    //esto no es la manera correcta ni pa tras xd
    //esto tiene que estar mal ajajajaj
    b.destroy();
    //b.setActive(false);
  }


  update() {  
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