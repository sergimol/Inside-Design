export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: "main" });
  }
  preload() {
    this.load.spritesheet('phaser', 'Sprites/character1.png', 120, 144, 30);
    
  }

  create() { 
    
    this.add.text(10, 10, "Estoy hecho un puto, amono", { fontColor: 0xffff00 });
    var phaser=this.add.sprite(400, 400, "phaser")
    
  }

  update(time, delta) {
    this.add.text(10, 10, " ", { fontColor: 0xffff00 });
  }
}
