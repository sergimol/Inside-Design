export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: "main" });
  }
  
  preload() {
    this.load.spritesheet('sky', './Sprites/character1.png', {frameWidth: 24, frameHeight: 24});
    this.load.image('hummus', 'Sprites/hummardo.jpg');
    this.load.image('platform', 'Sprites/platform.png');
  }
  
  create() {

    let platforms;
    this.add.image(700, 400, 'hummus');

    //Grupo de plataformas
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 500, 'platform');
    this.platforms.create(900, 300, 'platform');
    this.platforms.create(700, 700, 'platform').setScale(3).refreshBody();
    this.player = this.physics.add.sprite(100, 450, 'sky');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true); //esto no esta funcionando profe
  
    //ANIMACIONES
    this.anims.create({
      key:'right',
      frames: this.anims.generateFrameNumbers('sky', {start: 4, end: 15}),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key:'left',
      frames: this.anims.generateFrameNumbers('sky', {start: 4, end: 15}),
      frameRate: 10,
      repeat: -1
    })

    this.physics.add.collider(this.player, this.platforms);
    this.player.setScale(5);

    //this.player.setVelocityX(-160);
    this.cursors = this.input.keyboard.createCursorKeys();

  }

  update() {
    
    if (this.cursors.left.isDown)
    {
      this.player.setFlipX(true)
      this.player.setVelocityX(-160);
      this.player.anims.play('right', true);
      
    }
    else if (this.cursors.right.isDown)
    {
      this.player.setFlipX(false);
      this.player.setVelocityX(160);
      this.player.anims.play('right', true);
      
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
  /*
  preload() {

    //this.load.spritesheet('phaser', 'Sprites/character1.png', 120, 144, 30);
    //Carga de recursos
    this.load.image('hummus', 'Sprites/hummardo.jpg');
    this.load.image('platform', 'Sprites/platform.png');
    this.load.spritesheet('player', './Sprites/character1.png', {frameWidth: 24, frameHeight: 24});

  }


  create() { 

    let platforms;

    this.add.text(10, 10, "Estoy hecho un puto, amono", { fontColor: 0xffff00 });
    //var phaser=this.add.sprite(400, 400, "phaser")
    //movida nueva
    this.add.image(700, 400, 'hummus');

    //Grupo de plataformas
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 500, 'platform');
    this.platforms.create(900, 300, 'platform');
    this.platforms.create(700, 700, 'platform').setScale(3).refreshBody();

    //Player
    this.player = this.physics.add.sprite(100, 450, 'player');
    this.player.setBounce(0.2);
    this.player.setColliderWorldBounds(true);

    
    this.anims.create({
      key:'right',
      frames: this.anims.generateFrameNumbers('dude', {start: 4, end: 15}),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key:'turn',
      frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 0}),
      frameRate: 20
    })
    this.anims.create({
      key:'left',
      frames: this.anims.generateFrameNumbers('dude', {start: 4, end: 15}),
      frameRate: 10,
      repeat: -1
    })
     
    //this.physics.add.collider(player, platforms);
    


    
  }
  */

}
