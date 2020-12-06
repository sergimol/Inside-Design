import Humanoid from "./humanoid.js";
import Puntero from "./puntero.js";

export default class Player extends Humanoid {
  constructor(scene, x, y, sprite) {
    super(scene, x, y, sprite);

    //Atributos
    let ammo, active;
    //Puntero
    this.puntero = new Puntero(scene,0,0);
    this.add(this.puntero);
    

    //this.add(sprite);
    /////////////
    //Animaciones
    const anims = scene.anims;

    anims.create({
      key: 'walk',
      frames: anims.generateFrameNumbers(sprite, { start: 4, end: 9 }), //15
      frameRate: 15,
      repeat: -1
    })
    anims.create({
      key: 'idle',
      frames: anims.generateFrameNumbers(sprite, { start: 1, end: 3 }),
      frameRate: 7,
      repeat: -1
    })
    
    //INPUT
    const { LEFT, RIGHT, UP, DOWN, W, A, S, D } = Phaser.Input.Keyboard.KeyCodes
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
  }

  
  //updatear la posicion del puntero si el jugador se mueve
    /**
     
     Ideas
     
     calcular la distancia y despues de moverlo ponerlo, como primero s emueve el puntero en caso de moverse no habria problema
     moverlo junto al jugador, hay encontrar la manera de que si el jugador se mueve tmb lo haga le puntero, el problema es que el metodo move es de3 un game object con fisicas, el punteor no tiene fisicas
     */
    
    
    
    // asignar la posicion del puntero
    
    
    
    
    
    
    playerMoverPuntero(pointer){
      this.puntero.move(pointer,this);
      this.puntero.updateMiddle(this);
    }
    
    
    playerMove(dirX, dirY) {
      this.body.setVelocityX(this.speed * dirX);
      this.body.setVelocityY(this.speed * dirY);
      //Animacion
      if (dirX === 0 && dirY === 0)
      this.aspecto.play('idle', true);
      else
      this.aspecto.play('walk', true);
    }

    
    preUpdate() {
      //Idle por defecto
      this.dirX = 0;
      this.dirY = 0;
      //Movimiento horizontal
      if (this.cursors.left.isDown || this.cursors.a.isDown) {
        this.dirX = -1;
        console.log("something");
      }
      else if (this.cursors.right.isDown || this.cursors.d.isDown)
      this.dirX = 1;
      //Movimiento vertical        
      if (this.cursors.up.isDown || this.cursors.w.isDown)
      this.dirY = -1;
      else if (this.cursors.down.isDown || this.cursors.s.isDown)
      this.dirY = 1;
      this.playerMove(this.dirX, this.dirY);
      this.puntero.moverconjugador(this);
      this.puntero.updateMiddle(this);      

      //esto no deberia de ir aqui
      this.scene.input.on('pointermove', function (pointer){
        //this.angleToPointer = Phaser.Math.Angle.Between(this.player.x, this.player.y, (pointer.x/this.cameras.main.zoom) + this.cameras.main.worldView.x, (pointer.y/this.cameras.main.zoom) + this.cameras.main.worldView.y);
  this.playerMoverPuntero(pointer);
        //this.player.
        //      this.puntero.x = (pointer.x/this.cameras.main.zoom) + this.cameras.main.worldView.x;
    //    this.puntero.y = (pointer.y/this.cameras.main.zoom)  + this.cameras.main.worldView.y;
        
      }, this);

      //this.rotateWeapon(Phaser.Math.Angle.Between(this.x, this.y, px, py));
    }   
}