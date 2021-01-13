import config from "./config.js";
import dialogues from "./dialogues.js";

export default class UI extends Phaser.Scene {
    constructor() {
        super({ key: 'UIScene'});
    }

    init(data) {
        this.health = data.health,
            this.ammo = data.ammo;
    }
    preload(){
        //Carga de imagenes
            //Armas
        this.load.image('gunshotsilhouette', 'Sprites/gunshotSilueta.png');
            //Pasivas
        this.load.image('tanqueo', 'Sprites/pixel-tank.png');
        //this.load.image('facil', 'Sprites/');
        this.load.image('rambo', 'Sprites/rambo.png');
        //this.load.image('buenaonda', 'Sprites/');
        //this.load.image('malaonda', 'Sprites/');
        this.load.image('sanic', 'Sprites/sanic.png');
        this.load.image('cogo', 'Sprites/ferrari.png');
            //Activas
        this.load.image('dash', 'Sprites/dash-1.png');
            //Dialogos
        this.load.image('dialogbox', 'Sprites/dialogbox.png');
        //Carga de fuentes con bitmap
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    }
    
    create() {
        //Barra de fondo
        this.healthBackground = this.add.graphics();
        this.healthBackground.fillStyle(0x000000, 0.5);
        this.healthBackground.fillRect(0, 0, 1, 1);
        //Barra de vida
        this.healthBar = this.add.graphics();
        this.healthBar.fillStyle(config.ui.healthBarColor, 1);
        this.healthBar.fillRect(0, 0, 1, 1);

        this.passiveCount = 0;

        //Posición de las barras
        this.healthBar.x = config.ui.barPosX;
        this.healthBar.y = config.ui.barPosY;
        this.healthBackground.x = config.ui.barPosX - 5;
        this.healthBackground.y = config.ui.barPosY - 5;
        //Escala de las barras
        this.healthBar.scaleY = config.ui.barScaleY;
        this.healthBackground.scaleY = config.ui.barScaleY + 10;

        this.weapon = this.add.image(config.ui.weaponPosX, config.ui.weaponPosY, 'gunshotsilhouette');
        this.weapon.scale = config.ui.weaponScl;        

        //Contador de munición
        
        //creacion de texto con webfont
        WebFont.load({
            google:{
                families: [ 'Permanent Marker']
            }
        })
        this.ammo = this.add.text(config.ui.ammoPosX, config.ui.ammoPosY, '', {fontFamily: 'Permanent Marker', fontSize: config.ui.ammoFontSize, color: '#ffffff'});        
        
        //Activa
        this.activeImg = this.add.image(config.ui.activePosX, config.ui.activePosY, config.ui.activeImgs[0]);

        //Dialogo
        this.dialogBox = this.add.image(800, 600, 'dialogbox');
        this.dialogBox.setVisible(false);

        this.dialog = this.add.text(500, 600);

        //Variables para el control de los diálogos
        this.dialogState = 0;
        this.onDialog = false;
        this.strings;

        this.input.keyboard.on('keydown_ENTER', this.advanceDialog, this);
    }

    //Cambia el tamaño de la barra de vida en función de la salud del jugador
    setHealth(playerHealth) {
        this.healthBar.scaleX = playerHealth * config.ui.barScaleX;
    }

    setBackground(playerMaxHP){
        this.healthBackground.scaleX = playerMaxHP * config.ui.barScaleX + 10;
    }

    //Actualiza el contador de munición
    setAmmo(playerAmmo) {
        if(playerAmmo > -1)
            this.ammo.text = playerAmmo;
        else
            this.ammo.text = '∞';
    }

    setPassiveImg(id){
        this.activeImg.destroy();
        this.activeImg = this.add.image(config.ui.activePosX, config.ui.activePosY, config.ui.activeImgs[id]);
    }

    addPassiveImg(id){
        this.add.image(config.ui.passivePosX + (this.passiveCount * config.ui.passiveOffset), config.ui.passivePosY, config.ui.passiveImgs[id]);
        this.passiveCount++;
    }

    removePassiveImg(){
        
    }

    //Hace visible el cuadro de diálogo y el primer texto de este
    startDialog(type, id){
        //Pausa el juego
        //this.scene.pause('main');
        this.dialogBox.setVisible(true);
        
        //Recoge el array con los diálogos      
        if(type === 'passive'){
            this.strings = dialogues.passives[id];
        }

        else if(type === 'active'){
            this.strings = dialogues.actives[id];
        }
        
        this.onDialog = true;
        this.dialogState = 0;
        this.dialog.text = this.strings[this.dialogState];
    }

    advanceDialog(){
        if(this.onDialog){
            this.dialogState++;
            if(this.dialogState < this.strings.length)
                this.dialog.text = this.strings[this.dialogState];
            else
                this.endDialog()
        }
    }
    
    endDialog(){
        this.onDialog = false;
        this.dialogBox.setVisible(false);
        this.dialog.text = '';
        //this.scene.resume('main');
    }
}