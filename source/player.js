import Humanoid from "./source/humanoid.js";

export default class Player extends Humanoid{
    constructor(scene, x, y, Sprite){
        super(scene, x, y, 'player');

        //Atributos
        let ammo, active;

        /////////////
        //Animaciones
        const anims = scene.anims;

        anims.create({
            key:'walk',
            frames: anims.generateFrameNumbers(this.Sprite, {start: 4, end: 9}), //15
            frameRate: 15,
            repeat: -1
        })
        anims.create({
        key:'idle',
        frames: anims.generateFrameNumbers(this.Sprite, {start: 1, end: 3}),
        frameRate: 7,
        repeat: -1
        })

        ///////
        //INPUT
        const {LEFT,RIGHT,UP,DOWN,W,A,S,D} = Phaser.Input.Keyboard.KeyCodes
        this.cursors = scene.input.keyboard.addKeys({
            left: LEFT,
            right: RIGHT,
            up: UP,
            down: DOWN,
            w: W,
            a: A,
            s: S,
            d: D
        })
    }//Fin constructora

    update(){
        //Idle por defecto
        this.dirX = 0;
        this.dirY = 0;
       //Movimiento horizontal
       if (this.cursors.left.isDown || this.cursors.a.isDown)
         this.dirX = -1;
       else if (this.cursors.right.isDown|| this.cursors.d.isDown)
         this.dirX = 1;
       //Movimiento vertical        
       if (this.cursors.up.isDown|| this.cursors.w.isDown)
         this.dirY = -1;
       else if (this.cursors.down.isDown|| this.cursors.s.isDown)
         this.dirY = 1;
       
       this.move(this.dirX, this.dirY);
       this.moveRotate(this.scene.puntero.x - this.x);
    }
}