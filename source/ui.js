export default class UI extends Phaser.Scene {
    constructor() {
        super({ key: 'UIScene', active: true });
    }

    
    preload(){
        //Carga de imagenes
        this.load.image('healthbar', 'Sprites/healthbar.png');
        this.load.image('hpbackground', 'Sprites/healthbackground.png');
        //Carga de fuentes con bitmap
        //this.load.bitmapFont('inversionz', 'Sprites/fonts/inversionz_0.png', 'Sprites/fonts/inversionz.fnt')
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    }
    
    create() {
        //Barra de vida
        this.healthBar = this.add.graphics();
        this.healthBar.fillStyle(0xf91010, 1);
        this.healthBar.fillRect(0, 0, 1, 1);
        //Posición 
        this.healthBar.x = 50;
        this.healthBar.y = 40;
        //Escala
        this.healthBar.scaleX = 10;
        this.healthBar.scaleY = 10;

        //Contador de munición
        //Creación de texto con bitmap 
        //this.ammo = this.add.bitmapText(50, 50, 'inversionz', '')
        
        //creacion de texto con webfont
        WebFont.load({
            google:{
                families: [ 'Permanent Marker']
            }
        })
        this.ammo = this.add.text(50, 60, '', {fontFamily: 'Permanent Marker', fontSize: 21, color: '#ffffff'});
    }

    //Asigna la barra de vida en función de la salud del jugador
    setHealth(playerHealth) {
        this.healthBar.scaleX = playerHealth * 10;
    }

    //Actualiza el contador de munición
    setAmmo(playerAmmo) {
        this.ammo.text = playerAmmo;
    }
}