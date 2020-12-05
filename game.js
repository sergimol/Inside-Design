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
    this.load.image('hummus', './Sprites/BACKGROUND.png'); //nuevo
    this.load.image('platform', './Sprites/platform.png');

    //Diego
    this.load.spritesheet('bullet', 'Sprites/bullet2.png', {frameWidth: 16, frameHeight: 16});
    this.load.image('crosshair', 'Sprites/crosshair.png');

    //nuevo
    this.load.image('Wall', './Sprites/Wall.png');
    this.load.image('upWall', './Sprites/upWall.png');
    this.load.image('downWall', './Sprites/downWall.png');
    this.load.image('cobertura', './Sprites/Cobertura.png');
    this.load.audio('mainTheme','./audio/main_theme_v1.0.wav');
    this.load.audio('gunShootSound', './audio/gunShoot.wav');
    this.load.image('gunShoot', './Sprites/gunShootProt.png');

    //this.player;
    //this.enemy;
    //this.enemies;
  }
  
  create() {
    //BULLET
    this.anims.create({
      key:'shot',
      frames: this.anims.generateFrameNumbers('bullet', {start: 0, end: 2}),
      frameRate: 8,
      repeat: -1
    })
    /*
    //WEAPON
    let gun = this.add.image('gunShootProt');
    //BULLETS
    this.bullets = this.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    
    */
    //PUNTERO
    /**
     * 
     this.angleToPointer;
     this.input.on('pointermove', function (pointer){
       this.angleToPointer = Phaser.Math.Angle.Between(this.player.x, this.player.y, pointer.x + this.cameras.main.worldView.x, pointer.y + this.cameras.main.worldView.y);
      }, this);
 */
    //this.bullets.rotation = this.angleToPointer;
    /**
     * 
     this.input.on('pointerdown', function (pointer){
       console.log("shoot");
       this.player.shoot();
       /**
        * 
        this.bullet = this.physics.add.sprite(this.player.x, this.player.y, 'bullet');
        this.bullet.setScale(4);
        //= bullets.getFirstDead();
        //this.bullet.anims('shot', true);
        this.bullet.rotation = this.angleToPointer;
        this.physics.moveToObject(this.bullet, this.player.puntero, 800);
        
        this.bullets.add(this.bullet);
        
        
      }, this);
      //Fondo
      this.add.image(700, 400, 'hummus');
      
      //Prototipo Musica
      let sound = this.sound.add('mainTheme');
      sound.play(); 
      
      
      */
      //Colliders
      //this.physics.scene.enable(this.platforms);
      //this.platforms = this.add.physicsGroup();
      this.platforms = this.physics.add.staticGroup();
      //Coberturas
      this.platforms.create(577, 591, 'cobertura');
      this.platforms.create(903, 310, 'cobertura');
      this.platforms.create(257, 246, 'cobertura');
      //Muro Arriba
      this.platforms.create(700, 49, 'upWall');
      //Muro Abajo
      this.platforms.create(700, 770, 'downWall').setFlipY(true);
      //this.platforms.setFlipY(true);
      //Muros laterales 
      this.platforms.create(30, 400, 'Wall');
      this.platforms.create(1370, 400, 'Wall');
      
      //DISPARO
      
      
      //Personaje
      this.player = new Player(this, 400, 450, 'Player');
      //Fisicas personaje
      this.physics.add.collider(this.player, this.platforms);
      
      //Camara

      //this.cameras.main.startFollow(this.player.puntero.intermedio);
      
      //Enemies
      /*
     
      this.enemies = this.add.group();
      
      for(let i = 0; i<3; i++){
        const e = new Enemy(this, 400 + 20*i, 250, 'enemy');
        e.body.setCollideWorldBounds(true);
        e.setTint(0x9999ff);
        this.enemies.add(e);
      }
*/
    //this.physics.add.collider(this.player.weapon.bullets, this.platforms, this.destroyBullet);
    //this.physics.add.collider(this.enemies, this.platforms);
    //this.physics.add.collider(this.player.weapon.bullets, this.enemies, this.handleBulletEnemyCollision);

  }//End of create

  destroyBullet(b){
    console.log('bullet hit');
    b.destroy();
  }
  handleBulletEnemyCollision(e,b){
    console.log('enemy hit');
    e.die();
    //esto no es la manera correcta ni pa tras xd
    //esto tiene que estar mal ajajajaj
    b.destroy();
    //b.setActive(false);
  }

  update() {
/**
 * 
 this.input.on('pointermove', function(pointer){
   this.player.puntero.move(pointer, this, this.player);
  }, this)
  */
 //Jugador
 this.player.update();
 /**
  * 
  //Enemigos
  this.enemies.children.iterate((child)=>{
    if(!child.isDead){
      child.update(this.player);
    }
  });
  */
  //console.log(this.angleToPointer);
  }
}