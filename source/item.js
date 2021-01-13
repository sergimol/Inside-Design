export default class Item extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, sprite, playerref) {
        super(scene, x, y, sprite);
        this.depth = 3;
        this.setSize(4, 4);
        this.scene.matter.add.gameObject(this);
        this.scene.add.existing(this);

        this.body.label = sprite;

        //Referencia al player
        this.playerRef = playerref;

        //Constantes
        this.fuerza = 0.000002;
       // this.setFrictionAir(0.03);

       
       
       // Default: 1, Player: 2, Enemy: 4, PlayerBullet: 8, Enemy Bullet: 16, Neutral Bullet: 32, item: 64
        this.body.collisionFilter = {
            'group' : 64, 
            
            'category': 64,
            'mask':2 | 1, //choca con player y escenario
        };

        this.scene.matter.world.on('collisionstart', (event) => {
            let wordBody = this.body;
            for (let i = 0; i < event.pairs.length; i++) {
                let bodyA = event.pairs[i].bodyA;
                let bodyB = event.pairs[i].bodyB;

                if (bodyA === wordBody || bodyB === wordBody) {
                    if (bodyA.label === 'player') {
                        if (this.body.label === 'bulletAmmo')
                            bodyA.gameObject.giveAmmo(5);
                        else if (this.body.label === 'medkit')
                            if (bodyA.gameObject.health < bodyA.gameObject.maxHealth)
                                bodyA.gameObject.damage(-3);
                        this.eliminaItem();
                    } else if (bodyB.label === 'player') {
                        if (this.body.label === 'bulletAmmo')
                            bodyB.gameObject.giveAmmo(5);
                        else if (this.body.label === 'medkit')
                            if (bodyB.gameObject.health < bodyB.gameObject.maxHealth)
                                bodyB.gameObject.damage(-3);
                        this.eliminaItem();
                    }
                }
            }
        });
    }
    actualizaPos() {
        if (Phaser.Math.Distance.Between(this.x, this.y, this.playerRef.x, this.playerRef.y) < 50) {
            let angle = Phaser.Math.Angle.Between(this.x, this.y, this.playerRef.x, this.playerRef.y);
            this.scene.matter.body.setAngle(this.body, angle);
            this.thrust(this.fuerza);
        }
    }
    eliminaItem() {
        this.destroy();
    }

    preUpdate() {
        this.actualizaPos();
    }
}