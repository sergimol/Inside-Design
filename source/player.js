import Humanoid from "./humanoid.js";
import Puntero from "./puntero.js";

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


        
        
         //Container
         this.container = scene.add.container();
         this.scene.add.existing(this.container);
         //Para añadir hijos
         this.puntero = new Puntero(scene, x, y);
         this.container.add(this.puntero);
   
        //Puntero hijo 
        //this.puntero = new Puntero(scene, x, y, 'crosshair');

    }//Fin constructora

    update(angle){
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
       
         //updatear la posicion del puntero si el jugador se mueve
        /**
        
        Ideas

        calcular la distancia y despues de moverlo ponerlo, como primero s emueve el puntero en caso de moverse no habria problema
        moverlo junto al jugador, hay encontrar la manera de que si el jugador se mueve tmb lo haga le puntero, el problema es que el metodo move es de3 un game object con fisicas, el punteor no tiene fisicas
        */

       
       //this.puntero.x = this.x;
       //this.puntero.y = this.y;
       
       this.move(this.dirX, this.dirY);

       
       // asignar la posicion del puntero
       this.puntero.x = this.x - this.puntero.px;
       this.puntero.y = this.y - this.puntero.py;
       
         this.moveRotate(this.scene.puntero.x - this.x);
         this.weapon.rotateWeapon(angle);
         //updatea la posicion del punto medio (camara)
         this.puntero.updateMiddle(this);

       
    }
}