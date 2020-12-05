import Humanoid from "./humanoid.js";

export default class Player extends Humanoid {
  constructor(scene, x, y, sprite) {
    super(scene, x, y, sprite);
    //Atributos
    let ammo, active;

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
      
    this.intermedio = scene.add.image(0, 0, "crosshair");
    this.add(this.intermedio);
    ///////
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
    
    //this.rotateWeapon(Phaser.Math.Angle.Between(this.x, this.y, this.puntero.x, this.puntero.y));
    //this.moveRotate(this.puntero.x - this.x);
    //updatea la posicion del punto medio (camara)
    //console.log(this.depth + " " + this.container.depth + " " + this.weapon.depth);
    
    
    
    
    
    
    
    playerMove(dirX, dirY) {
      this.body.setVelocityX(this.speed * dirX);
      this.body.setVelocityY(this.speed * dirY);
    }
    asignarIntermedio(puntero){
      
      
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
      let px
      let py
      this.playerMove(this.dirX, this.dirY);
      this.scene.input.on('pointermove', function (pointer){
         px = pointer.x;//(this.x + (this.x + pointer.x)/2) /2;
         py = pointer.y;//(this.y + (this.y + pointer.y)/2) /2;
      }, this.scene);
      this.intermedio.x = px;
      this.intermedio.y = py;
    }
      /*
      //Animacion
      if (dirX === 0 && dirY === 0)
      this.sprite.play('idle', true);
      else
      this.sprite.play('walk', true);
      
      //this.weapon.x = this.x;
      //this.weapon.y = this.y + 5;
    }
    /*
    
    
    /*
    
    
    
    //Container
    //this.contenedor = scene.add.container();
    //this.scene.add.existing(this.contenedor);
    //Para añadir hijos
    this.puntero = new Puntero(scene, x, y);
    this.puntero.depth = this.depth + 64;
    //this.contenedor.add(this.puntero);
    
    //Puntero hijo 
    //this.puntero = new Puntero(scene, x, y, 'crosshair');
    this.setScale(3);
  }//Fin constructora
  
  
  preUpdate(){
    
}*/}