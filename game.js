export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: "main" });
  }
  preload() {}

  create() {
    this.add.text(10, 10, "Estoy hecho un puto, amono", { fontColor: 0xffff00 });
  }

  update(time, delta) {
    this.add.text(10, 10, " ", { fontColor: 0xffff00 });
  }
}
