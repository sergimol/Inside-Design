export default class Doors extends Phaser.GameObjects.Container {
    constructor(scene, spriteOV, spriteCV, spriteOH, spriteCH) {
        super(scene);
        this.scene.matter.add.gameObject(this);
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
                        if (playerBody.label === 'bottom')
                            this.closeTriggerDoor();
                    }
                }
            }
        });
    }
    //Añado la puerta al array de puertas en la posición que le pase para que estén ordenadas (1,2,3...)
    addDoor(objeto, numDoor, objectNum, rotation) {
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
            var zoneA;

            if (objeto.properties[2].value === "horizontal") {
                var door = this.scene.matter.add.image(objeto.x, objeto.y, this.spriteOpenedH);
                var rect = this.scene.matter.add.rectangle(objeto.x, objeto.y, 16, 48, { isSensor: true });

                door.label = 'horizontal';
                if (objeto.properties[1].value === 0)
                    zoneA = this.scene.matter.add.rectangle(door.x + 32, door.y, 16, 48, { isSensor: true, label: 'bottom' });
                else if (objeto.properties[1].value === 1)
                    zoneA = this.scene.matter.add.rectangle(door.x - 32, door.y, 16, 48, { isSensor: true, label: 'bottom' });
            }
            else if (objeto.properties[2].value === "vertical") {
                var door = this.scene.matter.add.image(objeto.x, objeto.y, this.spriteOpenedV);
                var rect = this.scene.matter.add.rectangle(objeto.x, objeto.y, 48, 16, { isSensor: true });

                door.label = 'vertical';
                if (objeto.properties[1].value === 0)
                    zoneA = this.scene.matter.add.rectangle(door.x, door.y + 32, 48, 16, { isSensor: true, label: 'bottom' });
                else if (objeto.properties[1].value === 1)
                    zoneA = this.scene.matter.add.rectangle(door.x, door.y - 32, 48, 16, { isSensor: true, label: 'bottom' });
            }

            //door.setExistingBody(zoneA);
            this.doorsTrigger[objectNum] = door;
            this.doorsTrigger[objectNum].depth = 4;
            door.setExistingBody(rect);
            door.setStatic(true);
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
            this.scene.player.chooseIdea('passive');
            ++this.contador;
        }
    }

    closeTriggerDoor() {
        if (this.doorsTrigger[this.contador] != null) {
            if (this.doorsTrigger[this.contador].label === "horizontal") {
                this.doorsTrigger[this.contador].setTexture(this.spriteClosedH);
                var rect = this.scene.matter.add.rectangle(this.doorsTrigger[this.contador].x, this.doorsTrigger[this.contador].y, 16, 48);
            }
            else if (this.doorsTrigger[this.contador - 1].label === "vertical") {
                this.doorsTrigger[this.contador].setTexture(this.spriteClosedV);
                var rect = zoneA = this.scene.matter.add.rectangle(this.doorsTrigger[this.contador].x, this.doorsTrigger[this.contador].y, 48, 16);
            }
            this.doorsTrigger[this.contador].setExistingBody(rect);
            this.doorsTrigger[this.contador].setStatic(true);
        }
    }

    preUpdate() {
        this.openDoor();
    }
}