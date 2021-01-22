import config from "./config.js"

export default class Button extends Phaser.GameObjects.Image {
    constructor(scene, x, y, sprite, sprite2, label,scale) {
        super(scene, x, y, sprite);
        //this.image = scene.add.image(x, y, sprite);
        //this.scene.add(this);
        //  
        //this.updateBounds();
        //console.log(this)
        this.setScale(scale); 
        scene.add.existing(this);
        //this.displayWidth = 100;
        //this.displayHeight = 200;
        

        this.setInteractive()
            .on('pointerover', () => this.enterButtonHoverState(), this.alpha = 1)
            .on('pointerout', () => this.enterButtonRestState())
            .on('pointerup', () => {
                this.enterButtonHoverState();
                this.enterActiveState(label);
            });
        this.depth = config.depths.button;
        this.sprite = sprite;
        this.sprite2 = sprite2;
        this.label = label;

        

        this.escenaOrigen = this.scene.scene.get('main');
    }
    //Al pasar por encima se ilumina el boton
    enterButtonHoverState() {
        this.setTexture(this.sprite2);
    }

    enterButtonRestState() {
        this.setTexture(this.sprite);
    }

    enterActiveState() {
        if (this.label === 'play') {
            //if (this.escenaOrigen != null)
            //    this.escenaOrigen.scene.actualMusic.stop();
            this.scene.actualMusic.stop();
            if (this.scene.health != undefined)
                this.scene.scene.start('main', { health: this.scene.health, ammo: this.scene.ammo, weaponID: this.scene.weaponID, level: this.scene.level });
            else
                this.scene.scene.start('main', { health: config.player.baseHealth, ammo: config.player.baseAmmo, weaponID: config.player.baseWeaponID, level: 0, 
                    activePassives: config.player.startingPassives, actualACTIVE: 'none', upgraded: false, infiniteAmmo: false, maxHealth: config.player.baseHealth, velFactor: config.player.baseVelFactor });
        }
        else if (this.label === 'quit') {
            //this.scene.scene.stop('pause');
            //console.log(this.scene)
            //this.scene.actualMusic.stop();
            this.scene.scene.stop('main');
            this.scene.scene.start('sceneManager');
        }
        else if (this.label === 'resume') {
            this.scene.resumeGame();
        }
        else if (this.label === 'gdd') {
            this.scene.scene.stop();
            this.scene.scene.start('gdd');
        }
        else if (this.label === 'options') {
            console.log("Casi crack")
        }

        else if (this.label === 'backGDD') {
            this.scene.previousGDD();
        }
        else if (this.label === 'nextGDD') {
            this.scene.nextGDD();
        }
        else if (this.label === 'exitGDD') {
            this.scene.scene.stop('gdd');
            this.scene.scene.start('sceneManager');
        }

        else if (this.label === 'armasGDD') {
            this.scene.selectArrayGDD(this.scene.gddArmas);
        }
        else if (this.label === 'esteticasGDD') {
            this.scene.selectArrayGDD(this.scene.gddEsteticas);
        }
        else if (this.label === 'pasivasGDD') {
            this.scene.selectArrayGDD(this.scene.gddPasivas);
        }
        else if (this.label === 'activasGDD') {
            this.scene.selectArrayGDD(this.scene.gddActivas);
        }
        else if (this.label === 'temporalesGDD') {
            this.scene.selectArrayGDD(this.scene.gddTemporales);
        }
    }
}