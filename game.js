export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: "main" });
  }
  preload() {

    this.preload.image('phaser', "Sprites/character1.png");
  }

  create() {
    
    player = scene.add.sprite(100, 200, 'phaser');

    this.add.text(10, 10, "Estoy hecho un puto, amono", { fontColor: 0xffff00 });
    scene.load(player);
    
  }

  update(time, delta) {
    this.add.text(10, 10, " ", { fontColor: 0xffff00 });
  }
}
