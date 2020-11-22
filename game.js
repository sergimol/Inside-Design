import Player from "./player.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: "main" });
  }
  
  preload() {
    this.load.spritesheet('sky', './Sprites/character1.png', {frameWidth: 24, frameHeight: 24});
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


  }
  
  create() {
    
    //BULLET



this.bullets = this.add.group();
this.bullets.enableBody = true;
this.bullets.physicsBodyType = Phaser.Physics.ARCADE;

this.bullets.createMultiple(50, 'bullet');
var angleToPointer;
this.input.on('pointermove', function (pointer){
  angleToPointer = Phaser.Math.Angle.Between(this.player.x, this.player.y, pointer.x, pointer.y);
  
}, this);
this.bullets.rotation = angleToPointer;



this.input.on('pointerdown', function (pointer) {

  console.log("help");
            this.bullet = this.physics.add.sprite(this.player.x, this.player.y, 'bullet');
            this.bullet.play('shot', true);
            this.bullet.setScale(4);
            //= bullets.getFirstDead();
            //this.bullet.anims('shot', true);
              this.bullet.rotation = angleToPointer;
              this.physics.moveToObject(this.bullet, pointer, 400);
              //if (this.bullet.)
            //this.physics.arcade.moveToPointer(bullet, 300);
        

}, this);

    //ANIMACIONES
    this.anims.create({
      key:'walk',
      frames: this.anims.generateFrameNumbers('sky', {start: 4, end: 15}),
      frameRate: 15,
      repeat: -1
    })
      
    this.anims.create({
      key:'shot',
      frames: this.anims.generateFrameNumbers('bullet', {start: 0, end: 2}),
      frameRate: 8,
      repeat: -1
    })
    this.anims.create({
      key:'idle',
      frames: this.anims.generateFrameNumbers('sky', {start: 1, end: 3}),
      frameRate: 7,
      repeat: -1
    })

    //Fondo
    this.add.image(700, 400, 'hummus');

    //Personaje
    this.player = new Player(this, 100, 450);       
    
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

    //Collider personaje
    //this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.player, this.cobers);
    this.physics.add.collider(this.player, this.UpWall);
    this.physics.add.collider(this.player, this.DownWall);
    this.physics.add.collider(this.player, this.wall);



    

    

    this.physics.add.collider(this.player, this.platforms);
    this.cursors = this.input.keyboard.createCursorKeys();

    this.cameras.main.startFollow(this.player);

  
//puntero
this.puntero = this.add.sprite(400, 300, 'crosshair');
this.input.on('pointermove', function (pointer) {

      this.puntero.x += pointer.movementX - this.player.x;
      this.puntero.y += pointer.movementY - this.player.y;


      // Force the sprite to stay on screen
      this.puntero.x = pointer.x;//Phaser.Math.Wrap(sprite.x, 0, this.renderer.width);
      this.puntero.y = pointer.y;//Phaser.Math.Wrap(sprite.y, 0, this.renderer.height);

      if (this.puntero.movementX > 0) { sprite.setRotation(0.1); }
      else if (pointer.movementX < 0) { sprite.setRotation(-0.1); }
      else { this.puntero.setRotation(0); }

      //updateLockText(true);
  
}, this);
  }

  update() {
    if(!(this.cursors.left.isDown || this.cursors.right.isDown) && !(this.cursors.up.isDown ||this.cursors.down.isDown)){
      this.player.setIdle();
      this.player.stopX();
      this.player.stopY();
    }
    else {
      //Movimiento horizontal
      if (this.cursors.left.isDown)
        this.player.moveLeft();
      else if (this.cursors.right.isDown)
        this.player.moveRight();      
      else
        this.player.stopX();
      //Movimiento vertical        
      if (this.cursors.up.isDown)
        this.player.moveUp();
      else if (this.cursors.down.isDown)
        this.player.moveDown();
      else
        this.player.stopY();
    }
  }
}
