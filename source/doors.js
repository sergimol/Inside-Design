export default class Doors extends Phaser.GameObjects.Container {
    constructor(scene, spriteOV, spriteCV, spriteOH, spriteCH) {
        super(scene);
        this.scene.matter.add.gameObject(this);
        this.scene.add.existing(this);
        this.spriteOpenedH = spriteOH;
        this.spriteClosedH = spriteCH;
        this.spriteOpenedV = spriteOV;
        this.spriteClosedV = spriteCV;

        this.doors;            //Guarda las puertas que se van añadiendo a la clase
        this.doorsTrigger;
        this.EnemyCountDoor;   //Guarda los enemigos que hay que matar para que se abra cada puerta

        this.isOpen = false;

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
                        if (playerBody.label === 'bottom') {
                            this.closeTriggerDoor();
                            this.scene.player.isEntering = false;
                        } else if (playerBody.label === 'exit') {
                            this.scene.player.isLeaving = true;
                        }
                    }
                }
            }
        });
    }
    //Añado la puerta al array de puertas en la posición que le pase para que estén ordenadas (1,2,3...)
    addDoor(objeto, numDoor) {
        if (objeto.name === 'door') {
            if (objeto.properties[0].value === "horizontal") {
                this.doors = this.scene.matter.add.image(objeto.x, objeto.y, this.spriteClosedH);
                this.doors.label = 'horizontal';
            }
            else if (objeto.properties[0].value === "vertical") {
                this.doors = this.scene.matter.add.image(objeto.x, objeto.y, this.spriteClosedV);
                this.doors.label = 'vertical';
            }

            this.EnemyCountDoor = numDoor;   //Guardo el numero de enemigos que hay que matar para que se abra la puerta
            this.doors.setStatic(true);
            this.doors.depth = 4;




        } else if (objeto.name === 'doorTrigger') {
            var zoneA;

            if (objeto.properties[0].value === "horizontal") {
                this.doorsTrigger = this.scene.matter.add.image(objeto.x, objeto.y, this.spriteOpenedH);
                var rect = this.scene.matter.add.rectangle(objeto.x, objeto.y, 16, 48, { isSensor: true });

                this.doorsTrigger.label = 'horizontal';
                //Añado trigger
                if (objeto.properties[1].value === 0)
                    zoneA = this.scene.matter.add.rectangle(this.doorsTrigger.x + 32, this.doorsTrigger.y, 16, 48, { isSensor: true, label: 'bottom' });
                else if (objeto.properties[1].value === 1)
                    zoneA = this.scene.matter.add.rectangle(this.doorsTrigger.x - 32, this.doorsTrigger.y, 16, 48, { isSensor: true, label: 'bottom' });
            }
            else if (objeto.properties[0].value === "vertical") {
                this.doorsTrigger = this.scene.matter.add.image(objeto.x, objeto.y, this.spriteOpenedV);
                var rect = this.scene.matter.add.rectangle(objeto.x, objeto.y, 48, 16, { isSensor: true });

                this.doorsTrigger.label = 'vertical';
                //Añado trigger
                if (objeto.properties[1].value === 0)
                    zoneA = this.scene.matter.add.rectangle(this.doorsTrigger.x, this.doorsTrigger.y + 32, 48, 16, { isSensor: true, label: 'bottom' });
                else if (objeto.properties[1].value === 1)
                    zoneA = this.scene.matter.add.rectangle(this.doorsTrigger.x, this.doorsTrigger.y - 32, 48, 16, { isSensor: true, label: 'bottom' });
            }

            //door.setExistingBody(zoneA);
            this.doorsTrigger.depth = 4;
            this.doorsTrigger.setExistingBody(rect);
            this.doorsTrigger.setStatic(true);
        }
    }

    roomDialog(){
        this.scene.player.chooseIdea('passive');
        this.scene.player.upgradeActive();
        this.isOpen = true;
    }

    //Abro las puertas
    openDoor() {
        if (this.doors.label === "horizontal") {
            this.doors.setTexture(this.spriteOpenedH);
            var rect = this.scene.matter.add.rectangle(this.doors.x, this.doors.y, 16, 48, { isSensor: true, label: 'exit' })
        }
        else if (this.doors.label === "vertical") {
            this.doors.setTexture(this.spriteOpenedV);
            var rect = this.scene.matter.add.rectangle(this.doors.x, this.doors.y, 48, 16, { isSensor: true, label: 'exit' })
        }
        this.doors.setExistingBody(rect);        
    }

    closeTriggerDoor() {
        if (this.doorsTrigger != null) {
            if (this.doorsTrigger.label === "horizontal") {
                this.doorsTrigger.setTexture(this.spriteClosedH);
                var rect = this.scene.matter.add.rectangle(this.doorsTrigger.x, this.doorsTrigger.y, 16, 48);
            }
            else if (this.doorsTrigger.label === "vertical") {
                this.doorsTrigger.setTexture(this.spriteClosedV);
                var rect = this.scene.matter.add.rectangle(this.doorsTrigger.x, this.doorsTrigger.y, 48, 16);
            }
            this.doorsTrigger.setExistingBody(rect);
            this.doorsTrigger.setStatic(true);
        }
    }

    preUpdate() {
        //Si EnemyCountDoor === 0, la puerta se tiene que abrir
        if(this.EnemyCountDoor <= 0 && !this.isOpen)
            this.roomDialog();
    }
}