import Doors from "./source/doors.js";
import Enemy from "./source/enemy.js";
import configEnemy from "./source/enemiesFolder/defaultEnemy.js";
import Button from "./source/button.js";
import config from "./source/config.js"

export default class Game extends Phaser.Scene {
    constructor() {
        super({ key: "sceneManager" });
    }
    init(data) {
        this.health = data.health,
            this.ammo = data.ammo,
            this.weaponID = data.weaponID,
            this.level = data.level;
    }
    preload() {
        this.load.spritesheet('player', './sprites/player.png', { frameWidth: 24, frameHeight: 24 });

        //Diego
        this.load.spritesheet('bullet', './sprites/newBullet.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('enemybullet', './sprites/enemyBullet.png', { frameWidth: 64, frameHeight: 64 });
        this.load.image('crosshair', './sprites/crosshair.png');
        this.load.image('granade_launcher', './sprites/granade_launcher.png');

        this.load.image('escopeta_lanzable', './sprites/escopeta_lanzable.png');
        this.load.image('pistolaBasica', 'sprites/spritesarmas/pistolaBasica.png');

        this.load.spritesheet('granade__launcher_shoot', './sprites/granade_bullet.png', { frameWidth: 12, frameHeight: 12 });
        this.load.spritesheet('escopeta_lanzable_shoot', './sprites/escopeta_lanzable.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('granade_launcher_shoot_explosion', './sprites/granade_explosion.png', { frameWidth: 84, frameHeight: 83 });

        //Javi
        //Tiles de estéticas
        this.load.image('tileBase', './sprites/tiles/tileJavi.png');
        this.load.image('doorV', './sprites/doorV.png');
        this.load.image('doorOpenV', './sprites/doorOpenV.png');
        this.load.image('doorH', './sprites/doorH.png');
        this.load.image('doorOpenH', './sprites/doorOpenH.png');
        this.load.image('trigger', './sprites/trigger.png');
        this.load.image('end', './sprites/end.jpg');
        this.load.image('bulletAmmo', './sprites/bulletAmmo.png');
        this.load.image('medkit', './sprites/medkit.png');

        this.load.tilemapTiledJSON('menu', './sprites/tiles/menu.json');

        //nuevo
        this.load.audio('mainTheme', './audio/main_theme_v1.0.wav');
        this.load.audio('gunShootSound', './audio/gunShoot.wav');
        this.load.audio('gunShootSound2', './audio/gunShoot2.wav');
        this.load.audio('hitShootSound', './audio/hitShoot.wav');
        this.load.audio('deadSound', './audio/deadSound.wav');
        this.load.image('gunShoot', './sprites/gunShootProt.png');
        this.load.image('bate', './sprites/bate3.png');
        this.load.image('swing', './sprites/swing.png');
        this.load.image('walkParticle', './sprites/walkParticulas.png');
        this.load.image('dashParticle', './sprites/dashParticula.png')
        this.load.audio('dashSound', './audio/dashSound.wav');

        //Buttons
        this.load.image('playButton', './sprites/buttons/playButton.png');
        this.load.image('gddButton', './sprites/buttons/gddButton.png');
        this.load.image('optionsButton', './sprites/buttons/optionsButton.png');

        this.load.image('playButtonlight', './sprites/buttons/playButtonlight.png');
        this.load.image('gddButtonlight', './sprites/buttons/gddButtonlight.png');
        this.load.image('optionsButtonlight', './sprites/buttons/optionsButtonlight.png');

        this.load.audio('introSong', './audio/introSong.mp3');
    }

    create() {
        //this.point;
        localStorage.clear();
        this.map = this.make.tilemap({ key: 'menu' });
        this.loadTileMapRoom();

        //PUNTERO
        this.input.setDefaultCursor('url(sprites/crosshair.png), pointer');

        this.doorSystem;

        //Camara
        this.cameras.main.zoom = 3;
        this.cameras.main.startFollow(this.point);

        this.playButton = new Button(this, 220, 215, 'playButton', 'playButtonlight', 'play')
        this.gddButton = new Button(this, 220, 240, 'gddButton', 'gddButtonlight', 'gdd')
        this.optionsButton = new Button(this, 220, 265, 'optionsButton', 'optionsButtonlight', 'options')

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
                const e = new Enemy(this, objeto.x, objeto.y, this.point, objeto.properties[0].value - 1, this.doorSystem, configEnemy);
                this.enemies.add(e);

                if (doorNum[objeto.properties[0].value - 1] != x)
                    enemyCount = 0;

                ++enemyCount;
                doorNum[objeto.properties[0].value - 1] = enemyCount;  //Deberia de incrementar en 1 el doorNum de la sala del enemigo

                x = doorNum[objeto.properties[0].value - 1];
            }
        }

        for (const objeto of DoorsentityLayer) {
            //Creamos una puerta con la posicion y el numero necesario de enemigos  y la rotacion que hacen falta matar para que se abra
            this.doorSystem.addDoor(objeto, doorNum);
        }
    }

    //SE CARGA UNA HABITACION
    loadTileMapRoom() {
        this.tileset = this.map.addTilesetImage('TileJavi', 'tileBase', 16, 16);

        let backgroundLayer = this.map.createStaticLayer('Background', this.tileset);
        let groundLayer = this.map.createStaticLayer('Ground', this.tileset);
        let detailsLayer = this.map.createStaticLayer('Details', this.tileset);
        let wallsLayer = this.map.createStaticLayer('Walls', this.tileset);
        let collidersLayer = this.map.createStaticLayer('Colliders', this.tileset);

        let entityLayer = this.map.getObjectLayer('Entities').objects
        let DoorsentityLayer = this.map.getObjectLayer('Doors').objects

        // profundidad
        backgroundLayer.setDepth(config.depths.groundLayer);
        detailsLayer.setDepth(config.depths.detailsLayer);
        wallsLayer.setDepth(config.depths.wallsLayer);
        //enemigos          ->2
        //jugador y balas   ->3
        collidersLayer.setDepth(config.depths.collidersLayer);

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




        this.musicID = config.music.intro;
        //this.player.musicID = this.musicID;
        //this.playerSpriteID = config.player.def;
        //this.player.changeSpriteIdea(false, true, this.playerSpriteID, -1);
        if (this.actualMusic != null)
            this.actualMusic.stop();
        this.actualMusic = this.sound.add(config.music.songReference[this.musicID], { volume: 5 });
        this.actualMusic.play();
        this.actualMusic.loop = true;
    }

    shutdown() {
        //  We need to clear keyboard events, or they'll stack up when the Menu is re-run
        this.input.keyboard.shutdown();
    }
}