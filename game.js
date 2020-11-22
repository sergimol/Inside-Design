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

    //let platforms;
    this.add.image(700, 400, 'hummus');

    //Grupo de plataformas
    
    /*
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 500, 'platform');
    this.platforms.create(900, 300, 'platform');
    this.platforms.create(700, 700, 'platform').setScale(3).refreshBody();
    */
    this.player = this.physics.add.sprite(100, 450, 'sky');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true); //esto no esta funcionando profe
    
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




  
    //ANIMACIONES
    this.anims.create({
      key:'walk',
      frames: this.anims.generateFrameNumbers('sky', {start: 4, end: 15}),
      frameRate: 10,
      repeat: -1
    })


    //Collider y escala personaje
    //this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.player, this.cobers);
    this.physics.add.collider(this.player, this.UpWall);
    this.physics.add.collider(this.player, this.DownWall);
    this.physics.add.collider(this.player, this.wall);



    this.player.setScale(5);

    //this.player.setVelocityX(-160);
    this.cursors = this.input.keyboard.createCursorKeys();

    this.player.setSize(14,15);

  }

  update() {
    
    if (this.cursors.left.isDown)
    {
      this.player.setFlipX(true)
      this.player.setVelocityX(-160);
      this.player.anims.play('walk', true);
      
    }
    else if (this.cursors.right.isDown)
    {
      this.player.setFlipX(false);
      this.player.setVelocityX(160);
      this.player.anims.play('walk', true);
      
    }
    else
    {
       this.player.setVelocityX(0);
      
    }
    if (this.cursors.up.isDown)
    {
      this.player.setVelocityY(-160);
    }
    else if (this.cursors.down.isDown)
    {
      this.player.setVelocityY(160);
    }
    else {
      this.player.setVelocityY(0);
    }
    
  }
}
