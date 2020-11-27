import Weapon from "/source/weapon.js";
import Player from "/source/player.js";
import Puntero from "/source/puntero.js";
import Enemy from "/source/enemy.js";

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

    this.player;
    this.enemy;
    this.enemies;
  }
  
  create() {
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

    //Fondo
    this.add.image(700, 400, 'hummus');

    //Prototipo Musica
    let sound = this.sound.add('mainTheme');
    //sound.play(); 
    
    
    //DISPARO
    this.input.on('pointerdown', function (pointer) {
      console.log("help");
      this.bullet = this.physics.add.sprite(this.player.x, this.player.y, 'bullet');
      this.bullet.play('shot', true);
      this.bullet.setScale(4);
      //= bullets.getFirstDead();
      //this.bullet.anims('shot', true);
      this.bullet.rotation = this.angleToPointer;
      this.physics.moveToObject(this.bullet, this.player.puntero, 800);
      this.cameras.main.shake(200, 0.002); //tiempo que dura el shake, fuerza del shake

      this.bullets.add(this.bullet);

      let gunSound = this.sound.add('gunShootSound');
      gunSound.play();
    }, this);



    

        
    
    //Grupo de coberturas
    let cobers;
    this.cobers = this.physics.add.staticGroup();
    this.cobers.create(577, 591, 'cobertura');
    this.cobers.create(903, 310, 'cobertura');
    this.cobers.create(257, 246, 'cobertura');       

    //Muro Arriba
    let upWall;
    this.upWall = this.physics.add.staticGroup();
    this.upWall.create(700, 49, 'upWall');

    //Muro Arriba
    let UpWall;
    this.UpWall = this.physics.add.staticImage(700, 49, 'upWall');

    //Muro Abajo
    let DownWall;
    this.DownWall = this.physics.add.staticImage(700, 770, 'downWall');
    this.DownWall.setFlipY(true);

    //Muro 
    let wall;
    this.wall = this.physics.add.staticGroup();
    this.wall.create(30, 400, 'Wall');
    this.wall.create(1370, 400, 'Wall');

    

    //Personaje
    this.player = new Player(this, 100, 450), 'Player';
    //Fisicas personaje
    this.physics.add.collider(this.player, this.cobers);
    this.physics.add.collider(this.player, this.UpWall);
    this.physics.add.collider(this.player, this.DownWall);
    this.physics.add.collider(this.player, this.wall);

    //Camara
    this.cameras.main.startFollow(this.player.puntero.intermedio);

    //Enemy
    //this.enemy = new Enemy(this, 350,200, 'enemy');
    //this.physics.add.collider(this.enemy, this.cobers);
    
    
    //Enemies
    this.enemies = this.add.group();
    for(let i = 0; i<3; i++){
      
      const e = new Enemy(this, 400 + 20*i, 250, 'enemy');
      e.body.setCollideWorldBounds(true);
      e.setTint(0x9999ff);
      this.enemies.add(e);
    }
    this.physics.add.collider(this.bullets, this.enemies, this.handleBulletEnemyCollision);


    //Eliminar enemigos
    //this.physics.add.collider(this.bullets, this.enemies, this.handleBulletEnemyCollision, this);
    
    //puntero a tope
    //this.puntero = new Puntero(this, 400, 300);
  }//End of create

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
    /**
     * 
     if(!this.enemy.isDead){
       this.enemy.update();
      }
  */
    this.enemies.children.iterate((child)=>{
      if(!child.isDead){
        child.update();
      }
    });
    this.player.update(this.angleToPointer);
  }
}