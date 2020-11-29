export default class Weapon extends Phaser.GameObjects.Image{
    constructor(scene, x, y){
        super(scene, x, y, 'gunShoot');
        console.log("cum a abolo");
        this.setScale(2.5);
        this.setOrigin(0.15,0.5);
        
        this.cadence, this.ammoRate, this.damage;
    }
    rotateWeapon(angle){

        //si el angulo es mas de 45 y (45+90) el sprite deberia de ir debajo0 del de humanoide
        this.rotation = angle;
    }
}