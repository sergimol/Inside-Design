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
        this.healthBar.fillStyle(0xf91010, 1);
        this.healthBar.fillRect(0, 0, 1, 1);

        //Posición de las barras
        this.healthBar.x = 50;
        this.healthBar.y = 30;
        this.healthBackground.x = 50;
        this.healthBackground.y = 30;
        //Escala de las barras
        this.healthBar.scaleY = 15;
        this.healthBackground.scaleY = 15;

        this.weapon = this.add.image(70, 85, 'gunshotsilhouette');
        this.weapon.scale = 3;        

        //Contador de munición
        //Creación de texto con bitmap 
        //this.ammo = this.add.bitmapText(50, 50, 'inversionz', '')
        
        //creacion de texto con webfont
        WebFont.load({
            google:{
                families: [ 'Permanent Marker']
            }
        })
        this.ammo = this.add.text(110, 65, '', {fontFamily: 'Permanent Marker', fontSize: 38, color: '#ffffff'});
    }

    //Cambia el tamaño de la barra de vida en función de la salud del jugador
    setHealth(playerHealth) {
        this.healthBar.scaleX = playerHealth * 20;
    }

    setBackground(playerMaxHP){
        this.healthBackground.scaleX = playerMaxHP * 20;
    }

    //Actualiza el contador de munición
    setAmmo(playerAmmo) {
        this.ammo.text = playerAmmo;
    }
}