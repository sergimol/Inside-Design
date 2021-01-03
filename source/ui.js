import config from "./config.js";

export default class UI extends Phaser.Scene {
    constructor() {
        super({ key: 'UIScene', active: true });
    }

    
    preload(){
        //Carga de imagenes
        //this.load.image('healthbar', 'Sprites/healthbar.png');
        //this.load.image('hpbackground', 'Sprites/healthbackground.png');
        this.load.image('gunshotsilhouette', 'Sprites/gunshotSilueta.png');
        //Carga de fuentes con bitmap
        //this.load.bitmapFont('inversionz', 'Sprites/fonts/inversionz_0.png', 'Sprites/fonts/inversionz.fnt')
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

        //Posición de las barras
        this.healthBar.x = config.ui.barPosX;
        this.healthBar.y = config.ui.barPosY;
        this.healthBackground.x = config.ui.barPosX;
        this.healthBackground.y = config.ui.barPosY;
        //Escala de las barras
        this.healthBar.scaleY = config.ui.barScaleY;
        this.healthBackground.scaleY = config.ui.barScaleY;

        this.weapon = this.add.image(config.ui.weaponPosX, config.ui.weaponPosY, 'gunshotsilhouette');
        this.weapon.scale = config.ui.weaponScl;        

        //Contador de munición
        //Creación de texto con bitmap
        
        //creacion de texto con webfont
        WebFont.load({
            google:{
                families: [ 'Permanent Marker']
            }
        })
        this.ammo = this.add.text(config.ui.ammoPosX, config.ui.ammoPosY, '', {fontFamily: 'Permanent Marker', fontSize: config.ui.ammoFontSize, color: '#ffffff'});
    }

    //Cambia el tamaño de la barra de vida en función de la salud del jugador
    setHealth(playerHealth) {
        this.healthBar.scaleX = playerHealth * config.ui.barScaleX;
    }

    setBackground(playerMaxHP){
        this.healthBackground.scaleX = playerMaxHP * config.ui.barScaleX;
    }

    //Actualiza el contador de munición
    setAmmo(playerAmmo) {
        this.ammo.text = playerAmmo;
    }
}