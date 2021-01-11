import Doors from "./source/doors.js";
import Enemy from "./source/enemy.js";
import Button from "./source/button.js";

export default class Game extends Phaser.Scene {
    constructor() {
        super({ key: "sceneManager" });
    }
    init(data) {
        this.health = data.health,
            this.ammo = data.ammo;
            this.weapom = data.weapon;
    }
    preload() {
        this.load.spritesheet('player', './Sprites/Player.png', { frameWidth: 24, frameHeight: 24 });

        //Diego
        this.load.spritesheet('bullet', 'Sprites/newBullet.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('enemybullet', 'Sprites/enemyBullet.png', { frameWidth: 64, frameHeight: 64 });
        this.load.image('crosshair', 'Sprites/crosshair.png');
        this.load.image('granade_launcher', 'Sprites/granade_launcher.png');

        this.load.image('escopeta_lanzable', 'Sprites/escopeta_lanzable.png');

        this.load.spritesheet('granade__launcher_shoot', 'Sprites/granade_bullet.png', { frameWidth: 12, frameHeight: 12 });
        this.load.spritesheet('escopeta_lanzable_shoot', 'Sprites/escopeta_lanzable.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('granade_launcher_shoot_explosion', 'Sprites/granade_explosion.png', { frameWidth: 84, frameHeight: 83 });

        //Javi
        //Tiles de estéticas
        //this.load.image('tiles', './Sprites/tiles/TilesetDEF.png');
        this.load.image('TileJavi', './Sprites/tiles/TileJavi.png');
        //this.load.image('tilesCrash', './Sprites/tiles/TilesetDEFcrash.png');
        this.load.image('doorV', './Sprites/doorV.png');
        this.load.image('doorOpenV', './Sprites/doorOpenV.png');
        this.load.image('doorH', './Sprites/doorH.png');
        this.load.image('doorOpenH', './Sprites/doorOpenH.png');
        this.load.image('trigger', './Sprites/trigger.png');
        this.load.image('end', './Sprites/end.jpg');
        this.load.image('bulletAmmo', './Sprites/bulletAmmo.png');
        this.load.image('medkit', './Sprites/medkit.png');

        //this.load.tilemapTiledJSON('dungeon', './Sprites/tiles/NivelBase.json');
        this.load.tilemapTiledJSON('menu', './Sprites/tiles/menu.json');

        //nuevo
        this.load.audio('mainTheme', './audio/main_theme_v1.0.wav');
        this.load.audio('gunShootSound', './audio/gunShoot.wav');
        this.load.audio('gunShootSound2', './audio/gunShoot2.wav');
        this.load.audio('hitShootSound', './audio/hitShoot.wav');
        this.load.audio('deadSound', './audio/deadSound.wav');
        this.load.image('gunShoot', './Sprites/gunShootProt.png');
        this.load.image('bate', './Sprites/Bate3.png');
        this.load.image('swing', './Sprites/swing.png');
        this.load.image('walkParticle', './Sprites/walkParticulas.png');
        this.load.image('dashParticle', './Sprites/dashParticula.png')
        this.load.audio('dashSound', './audio/dashSound.wav');

        //Buttons
        this.load.image('playButton', './Sprites/playButton.png');
        this.load.image('gddButton', './Sprites/gddButton.png');
        this.load.image('optionsButton', './Sprites/optionsButton.png');

        this.load.image('playButtonlight', './Sprites/playButtonlight.png');
        this.load.image('gddButtonlight', './Sprites/gddButtonlight.png');
        this.load.image('optionsButtonlight', './Sprites/optionsButtonlight.png');
    }

    create() {
        this.point;
        this.map = this.make.tilemap({ key: 'menu' });
        this.loadTileMapRoom();

        //PUNTERO
        this.input.setDefaultCursor('url(Sprites/crosshair.png), pointer');

        //this.angleToPointer;
        //this.input.on('pointermove', function (pointer) {
        //    this.angleToPointer = Phaser.Math.Angle.Between(this.player.x, this.player.y, (pointer.x / this.cameras.main.zoom) + this.cameras.main.worldView.x, (pointer.y / this.cameras.main.zoom) + this.cameras.main.worldView.y);
        //    this.point = pointer;
        //}, this);

        this.doorSystem;

        //Camara
        this.cameras.main.zoom = 3;
        this.cameras.main.startFollow(this.point);

        //this.cursors = this.input.keyboard.createCursorKeys();

        //this.tilemapState = 0;




        //this.add.text(10, 10, 'Press 1 to play, 2 for -nothing- or 3 for -nothing-', { font: '16px Courier', fill: '#00ff00' });

        //this.input.keyboard.once('keyup-ONE', function () {
        //    if (this.health != undefined)
        //        this.scene.start('main', { health: this.health, ammo: this.ammo });
        //    else
        //        this.scene.start('main', { health: 10, ammo: 100 });
        //
        //}, this);

        /*this.input.keyboard.once('keyup-TWO', function () {

            this.scene.start('demo', { id: 1, image: 'babar-phaleon-coco.png' });

        }, this);

        this.input.keyboard.once('keyup-THREE', function () {

            this.scene.start('demo', { id: 2, image: 'babar-pym-wait.png' });

        }, this);*/

        this.playButton = new Button(this, 220, 215, 'playButton', 'playButtonlight', 'play')
        this.gddButton = new Button(this, 220, 240, 'gddButton', 'gddButtonlight', 'play')
        this.optionsButton = new Button(this, 220, 265, 'optionsButton', 'optionsButtonlight', 'play')



        this.events.on('shutdown', this.shutdown, this);
    }



    loadObjects(entityLayer, DoorsentityLayer) {
        this.doorSystem = new Doors(this, 'doorOpenV', 'doorV', 'doorOpenH', 'doorH');

        this.enemies = this.add.group();
        let doorNum = {}; //Guarda la cantidad de enemigos por sala
        var enemyCount = 0;
        let x = 0;

        for (const objeto of entityLayer) {
            // `objeto.name` u `objeto.type` nos llegan de las propiedades del
            // objeto en Tiled
            if (objeto.name === 'player') {
                this.point = objeto;
            }
            else if (objeto.name === 'enemy') {
                const e = new Enemy(this, objeto.x, objeto.y, 'player', this.point, objeto.properties[0].value - 1, this.doorSystem);
                this.enemies.add(e);

                if (doorNum[objeto.properties[0].value - 1] != x)
                    enemyCount = 0;

                ++enemyCount;
                doorNum[objeto.properties[0].value - 1] = enemyCount;  //Deberia de incrementar en 1 el doorNum de la sala del enemigo

                x = doorNum[objeto.properties[0].value - 1];
            }
            else if (objeto.name === 'endLevel') {
                this.endZone = this.matter.add.image(0, 0, 'trigger');  //!SE QUE ESTO ESTÁ FEO AIUDA SELAION
                this.endZone.setExistingBody(this.Bodies.rectangle(objeto.x, objeto.y, 40, 40, { isSensor: true, label: 'endLevel' }));
            }
        }

        for (const objeto of DoorsentityLayer) {
            //Creamos una puerta con la posicion y el numero necesario de enemigos  y la rotacion que hacen falta matar para que se abra
            this.doorSystem.addDoor(objeto, doorNum[objeto.properties[0].value - 1], objeto.properties[0].value - 1, objeto.properties[1].value);
        }
    }

    //SE CARGA UNA HABITACION
    loadTileMapRoom() {

        //this.arrayRooms[this.arrayRooms.length - 1].createBlankLayer();
        //this.make.tilemap({ key: 'sala1' })
        this.tileset = this.map.addTilesetImage('TileJavi', 'TileJavi', 16, 16);

        this.map.createBlankDynamicLayer('menu', this.tileset);

        let backgroundLayer = this.map.createStaticLayer('Background', this.tileset);
        let groundLayer = this.map.createStaticLayer('Ground', this.tileset);
        let detailsLayer = this.map.createStaticLayer('Details', this.tileset);
        let wallsLayer = this.map.createStaticLayer('Walls', this.tileset);
        let collidersLayer = this.map.createStaticLayer('Colliders', this.tileset);

        let entityLayer = this.map.getObjectLayer('Entities').objects
        let DoorsentityLayer = this.map.getObjectLayer('Doors').objects
        // profundidad
        backgroundLayer.setDepth(0);
        groundLayer.setDepth(0);
        detailsLayer.setDepth(0);
        wallsLayer.setDepth(1);
        //enemigos          ->3
        //jugador y balas   ->4
        collidersLayer.setDepth(5);

        // colisiones tilemap
        collidersLayer.setCollisionByProperty({ collide: true });

        // físicas
        this.matter.world.convertTilemapLayer(collidersLayer);

        //CARGA DE OBJETOS NOSEQUE
        this.Bodies = Phaser.Physics.Matter.Matter.Bodies;
        this.door;
        this.endZone;
        this.finish = false;
        this.loadObjects(entityLayer, DoorsentityLayer);
    }

    shutdown() {
        //  We need to clear keyboard events, or they'll stack up when the Menu is re-run
        this.input.keyboard.shutdown();
    }
}