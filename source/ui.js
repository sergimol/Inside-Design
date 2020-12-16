export default class UI extends Phaser.Scene{
    constructor (){
        super({ key: 'UIScene', active: true});
    }

    /*
    preload(){
        //Carga de imagenes
        this.load.image('healthbar', 'Sprites/healthbar.png');
        this.load.image('hpbackground', 'Sprites/healthbackground.png');
    }
    */
    create(){
        this.healthBar = this.add.graphics();
        this.healthBar.fillStyle(0xf91010, 1);
        this.healthBar.fillRect(0, 0, 200, 50);
        this.healthBar.x = 50;
        this.healthBar.y = 20;
    }
}