export default class Doors extends Phaser.GameObjects.Container {
    constructor(scene, spriteC, spriteO, salaN) {
        super(scene);
        this.scene.matter.add.gameObject(this);
        this.scene.add.existing(this);
        this.spriteClosed = spriteC;
        this.spriteOpened = spriteO;
        this.door;
        this.doors = {};  //var door = [salaNum]; Creo que no hace falta definir el tamaño
        this.salaNum = 1;
        this.contador = 0;
    }

    addDoor(x, y) {
        this.doors[this.contador] = this.scene.matter.add.image(x, y, this.spriteClosed);;
        this.doors[this.contador].depth = 0;
        this.doors[this.contador].setStatic(true);
        //console.log(this.doors[this.contador])
        ++this.contador;
    }
    openDoor() {
        // this.doors[7 - 7] ->this.doors[7 - 6]
        this.doors[this.salaNum - this.contador].setTexture(this.spriteOpened);
        this.doors[this.salaNum - this.contador].setCollisionCategory(null);
        --this.contador;
        
    }
    preUpdate(){
        if (this.scene.enemyCount === 0) {
            this.openDoor();
            this.scene.enemyCount = 3;
        }
    }
}