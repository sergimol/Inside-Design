export default class Weapon extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'gunshot');

        this.cadence, this.ammoRate, this.damage;
    }
}