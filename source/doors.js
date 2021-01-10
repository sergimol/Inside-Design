export default class Doors extends Phaser.GameObjects.Container {
    constructor(scene, spriteOV, spriteCV, spriteOH, spriteCH) {
        super(scene);
        //this.scene.matter.add.gameObject(this);
        this.scene.add.existing(this);
        this.spriteOpenedH = spriteOH;
        this.spriteClosedH = spriteCH;
        this.spriteOpenedV = spriteOV;
        this.spriteClosedV = spriteCV;

        this.doors = {};            //Guarda las puertas que se van añadiendo a la clase
        this.doorsTrigger = {};
        this.EnemyCountDoor = {};   //Guarda los enemigos que hay que matar para que se abra cada puerta
        this.contador = 0;          //Lleva el orden de las puertas que se abren, la puerta 1 es la primera





        this.scene.matter.world.on('collisionstart', (event) => {

            //  Loop through all of the collision pairs
            var pairs = event.pairs;

            for (var i = 0; i < pairs.length; i++) {
                var bodyA = pairs[i].bodyA;
                var bodyB = pairs[i].bodyB;

                //  We only want sensor collisions
                if (pairs[i].isSensor) {
                    var blockBody;
                    var playerBody;

                    if (bodyA.isSensor) {
                        blockBody = bodyB;
                        playerBody = bodyA;
                    }
                    else if (bodyB.isSensor) {
                        blockBody = bodyA;
                        playerBody = bodyB;
                    }

                    var color;
                    //console.log(blockBody.label)  
                    //#!Arreglar error undefined wtf
                    if (blockBody.label != null && blockBody.label === 'player') {
                        if (playerBody.label === 'left') {
                            color = 0xff0000;
                        }
                        else if (playerBody.label === 'right') {
                            color = 0x00ff00;
                        }
                        else if (playerBody.label === 'top') {
                            this.openTriggerDoor();
                        }
                        else if (playerBody.label === 'bottom') {
                            this.closeTriggerDoor();
                        }
                    }
                }
            }
        });
    }
    //Añado la puerta al array de puertas en la posición que le pase para que estén ordenadas (1,2,3...)
    addDoor(objeto, numDoor, objectNum, rotation) {
        var Bodies = Phaser.Physics.Matter.Matter.Bodies;

        if (objeto.name === 'door') {
            if (objeto.properties[1].value === "horizontal") {
                var door = this.scene.matter.add.image(objeto.x, objeto.y, this.spriteClosedH);
                door.label = 'horizontal';
            }
            else if (objeto.properties[1].value === "vertical") {
                var door = this.scene.matter.add.image(objeto.x, objeto.y, this.spriteClosedV);
                door.label = 'vertical';
            }
            this.doors[objectNum] = door;             //Guardo la puerta en el array de puertas

            this.EnemyCountDoor[objectNum] = numDoor;   //Guardo el numero de enemigos que hay que matar para que se abra la puerta
            this.doors[objectNum].setStatic(true);
            this.doors[objectNum].depth = 4;
        } else if (objeto.name === 'doorTrigger') {
            if (objeto.properties[2].value === "horizontal") {
                var door = this.scene.matter.add.image(objeto.x, objeto.y, this.spriteClosedH);
                door.label = 'horizontal';

                var rect = Bodies.rectangle(door.x, door.y, 16, 48);
                if (objeto.properties[1].value === 0) {
                    var zoneA = Bodies.rectangle(door.x - 32, door.y, 16, 48, { isSensor: true, label: 'top' });
                    var zoneB = Bodies.rectangle(door.x + 32, door.y, 16, 48, { isSensor: true, label: 'bottom' });
                } else if (objeto.properties[1].value === 1) {
                    var zoneA = Bodies.rectangle(door.x - 32, door.y, 16, 48, { isSensor: true, label: 'bottom' });
                    var zoneB = Bodies.rectangle(door.x + 32, door.y, 16, 48, { isSensor: true, label: 'top' });
                }
            }
            else if (objeto.properties[2].value === "vertical") {
                var door = this.scene.matter.add.image(objeto.x, objeto.y, this.spriteClosedV);
                door.label = 'vertical';

                var rect = Bodies.rectangle(door.x, door.y, 48, 16);

                if (objeto.properties[1].value === 0) {
                    var zoneA = Bodies.rectangle(door.x, door.y - 32, 48, 16, { isSensor: true, label: 'top' });
                    var zoneB = Bodies.rectangle(door.x, door.y + 32, 48, 16, { isSensor: true, label: 'bottom' });
                } else if (objeto.properties[1].value === 1) {
                    var zoneA = Bodies.rectangle(door.x, door.y - 32, 48, 16, { isSensor: true, label: 'bottom' });
                    var zoneB = Bodies.rectangle(door.x, door.y + 32, 48, 16, { isSensor: true, label: 'top' });
                }
            }

            var compoundBody = Phaser.Physics.Matter.Matter.Body.create({
                parts: [rect, zoneA, zoneB]
            })
            door.setExistingBody(compoundBody);
            this.doorsTrigger[objectNum] = door;
            this.doorsTrigger[objectNum].depth = 4;
            this.doorsTrigger[objectNum].setStatic(true);
        }
    }
    //Abro las puertas en orden (this.contador)
    openDoor() {
        if (this.EnemyCountDoor[this.contador] <= 0) {                //Si EnemyCountDoor === 0, la puerta se tiene que abrir
            if (this.doors[this.contador].label === "horizontal")
                this.doors[this.contador].setTexture(this.spriteOpenedH);
            else if (this.doors[this.contador].label === "vertical")
                this.doors[this.contador].setTexture(this.spriteOpenedV);

            this.doors[this.contador].setCollisionCategory(null);
            this.scene.player.addPassive();
            ++this.contador;
        }
    }
    openTriggerDoor() {
        if (this.doorsTrigger[this.contador - 1].label === "horizontal") {
            this.doorsTrigger[this.contador - 1].setTexture(this.spriteOpenedH);
        }
        else if (this.doorsTrigger[this.contador - 1].label === "vertical") {
            this.doorsTrigger[this.contador - 1].setTexture(this.spriteOpenedV);
        }

        console.log(this.doorsTrigger[this.contador - 1].body.parts[1])
        this.doorsTrigger[this.contador - 1].body.parts[1].isSensor = true;

        /*this.doorsTrigger[this.contador - 1].body.parts[1].collisionFilter = {
            'category': 8
        };*/
    }
    closeTriggerDoor() {
        if (this.doorsTrigger[this.contador - 1] != null) {
            if (this.doorsTrigger[this.contador - 1].label === "horizontal")
                this.doorsTrigger[this.contador - 1].setTexture(this.spriteClosedH);
            else if (this.doorsTrigger[this.contador - 1].label === "vertical")
                this.doorsTrigger[this.contador - 1].setTexture(this.spriteClosedV);

            this.doorsTrigger[this.contador - 1].body.parts[1].isSensor = false;
            /*this.doorsTrigger[this.contador - 1].body.parts[1].collisionFilter = {
                'category': 1
            };*/
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