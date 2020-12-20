export default class UI extends Phaser.Scene {
    constructor() {
        super({ key: 'UIScene', active: true });
    }

    /*
    preload(){
        //Carga de imagenes
        this.load.image('healthbar', 'Sprites/healthbar.png');
        this.load.image('hpbackground', 'Sprites/healthbackground.png');
    }
    */
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

        this.ammo = this.add.text(50, 50, '', { fontFamily: "Comic Sans", fontSize: 21 })
    }

    setHealth(playerHealth) {
        this.healthBar.scaleX *= playerHealth;
    }

    setAmmo(playerAmmo) {
        this.ammo.text = playerAmmo;
    }
}