import config from "./config.js"

export default class Button extends Phaser.GameObjects.Image {
    constructor(scene, x, y, sprite, sprite2, label, scale) {
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
            if (this.scene.actualMusic !== undefined)
                this.scene.actualMusic.stop();

            if (this.scene.health != undefined)
                this.scene.scene.start('main', { health: this.scene.health, ammo: this.scene.ammo, weaponID: this.scene.weaponID, level: this.scene.level });
            else
                this.scene.scene.start('main', {
                    health: config.player.baseHealth, ammo: config.player.baseAmmo, weaponID: config.player.baseWeaponID, level: 0,
                    activePassives: config.player.startingPassives, actualACTIVE: 'none', upgraded: false, infiniteAmmo: false, maxHealth: config.player.baseHealth, velFactor: config.player.baseVelFactor
                });
        }
        else if (this.label === 'quit') {
            let game = this.scene.scene.get('main');
            game.actualMusic.stop();
            this.scene.scene.stop('main');
            this.scene.scene.start('sceneManager');
        }
        else if (this.label === 'resume') {
            this.scene.resumeGame();
        }
        else if (this.label === 'gdd') {
            this.scene.scene.pause();
            this.scene.scene.launch('gdd');
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
            this.scene.scene.resume('sceneManager');
        }

        else if (this.label === 'activasGDD') {
            this.scene.selectArrayGDD(this.scene.gddActivas);
        }
        else if (this.label === 'pasivasGDD') {
            this.scene.selectArrayGDD(this.scene.gddPasivas);
        }
        else if (this.label === 'temporalesGDD') {
            this.scene.selectArrayGDD(this.scene.gddTemporales);
        }
        else if (this.label === 'armasGDD') {
            this.scene.selectArrayGDD(this.scene.gddArmas);
        }
        else if (this.label === 'esteticasGDD') {
            this.scene.selectArrayGDD(this.scene.gddEsteticas);
        }
        else if (this.label === 'characterGDD') {
            this.scene.selectArrayGDD(this.scene.gddCharacter);
        }
        else if (this.label === 'musicaGDD') {
            this.scene.selectArrayGDD(this.scene.gddMusica);
        }
        else if (this.label === 'localStorageReset') {
            localStorage.clear();
            console.log("a tomar por culo")
        }
        else if (this.label === 'endGame') {
            this.scene.time.delayedCall(200, this.fadeOut, [], this);
            this.scene.time.delayedCall(2000, this.endGame, [], this);
        }
    }

    fadeOut() {
        this.escenaOrigen.cameras.main.fadeOut(1000, 0, 0, 0);
        
    }
    endGame() {
        this.scene.scene.stop('main');
        this.escenaOrigen.cameras.main.fadeIn(1000, 0, 0, 0);
        this.scene.time.delayedCall(500, this.scene.endGame, [], this.scene);
    }
}