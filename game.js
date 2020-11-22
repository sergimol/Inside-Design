import Player from "./player.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: "main" });
  }
  
  preload() {
    this.load.spritesheet('sky', './Sprites/character1.png', {frameWidth: 24, frameHeight: 24});
    this.load.image('hummus', './Sprites/BACKGROUND.png'); //nuevo
    this.load.image('platform', './Sprites/platform.png');

    //nuevo
    this.load.image('Wall', './Sprites/Wall.png');
    this.load.image('upWall', './Sprites/upWall.png');
    this.load.image('downWall', './Sprites/downWall.png');
    this.load.image('cobertura', './Sprites/Cobertura.png');


  }
  
  create() {

    //ANIMACIONES
    this.anims.create({
      key:'walk',
      frames: this.anims.generateFrameNumbers('sky', {start: 4, end: 15}),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key:'idle',
      frames: this.anims.generateFrameNumbers('sky', {start: 1, end: 3}),
      frameRate: 10,
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
