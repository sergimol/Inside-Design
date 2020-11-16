export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: "main" });
  }
  preload() {}

  create() {
    this.add.text(10, 10, "¡Hola, mundo!", { fontColor: 0xffff00 });
  }

  update(time, delta) {}
}
