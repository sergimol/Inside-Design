export default class Doors extends Phaser.GameObjects.Container {
    constructor(scene, spriteO) {
        super(scene);
        //this.scene.matter.add.gameObject(this);
        this.scene.add.existing(this);
        this.spriteOpened = spriteO;

        this.doors = {};            //Guarda las puertas que se van añadiendo a la clase
        this.EnemyCountDoor = {};   //Guarda los enemigos que hay que matar para que se abra cada puerta
        this.contador = 0;          //Lleva el orden de las puertas que se abren, la puerta 1 es la primera
    }
    //Añado la puerta al array de puertas en la posición que le pase para que estén ordenadas (1,2,3...)
    addDoor(objeto, numDoor, objectNum) {
        this.doors[objectNum] = objeto;             //Guardo la puerta en el array de puertas
        this.EnemyCountDoor[objectNum] = numDoor;   //Guardo el numero de enemigos que hay que matar para que se abra la puerta

        this.doors[objectNum].setStatic(true);
        this.doors[objectNum].depth = 0;
    }
    //Abro las puertas en orden (this.contador)
    openDoor() {
        //console.log(this.doors[this.contador].properties)
        if ( this.EnemyCountDoor[this.contador] <= 0) {                //Si EnemyCountDoor === 0, la puerta se tiene que abrir
            this.doors[this.contador].setTexture(this.spriteOpened);
            this.doors[this.contador].setCollisionCategory(null);
            ++this.contador;
        }
    }

    preUpdate() {
       this.openDoor();
    }
}
/*
-Recorrer objetos y contar enemigos
    Si estan en la sala 1 aumentar 1 el array de EnemyCountDoor en la posicion 1
-Recorrer puertas
    Dar valor a su EnemyCountDoor con el array

Desde openDoor
    Comprobar el valor de EnemyCountDoor y cuando llegue a 0 abrir

Desde Humanoid
    Cuando muere un enemigo, decrementar en 1 el EnemyCountDoor de la posición de su atributo de sala
*/