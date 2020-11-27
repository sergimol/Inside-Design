export default class Weapon extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'gunShoot');
        console.log("cum a abolo");
        this.setScale(20);

        this.cadence, this.ammoRate, this.damage;
    }
}