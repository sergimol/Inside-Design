//import hijaConfig from "./defaultEnemyBullet.js";


const BulletConfig = {

    sprite: "enemybulletSwing", 
    scale: 0.7,
    sizeX: 8,
    sizeY: 8,
    originX: 4,
    originY: 4, 
    mass: 30,
    label: 'bullet',
    airFriction: 0,
    rebotes: 0, 
    fuerzaRebote: 0.8, 

    velocidadMinima: 0.3,
    damage: 2, 
    devulveBalas: false,
    destruyeBalas: false, 
    isSensor: false,
    pierce: 0,
    destroyOnWall: false, //si true, ignorara rebotes y si es sensor cuando choque con una pared se destruira
    balaHija: null,
    lifeTime: Infinity, //milisegundos

    form:"circle",
    customForm: {
        //circle x, y, radius
        radius: 16,
    },

    
    pushback: 0, //fuerza con la que empuja la bala al chocar con un objetivo

    //para la animacion
    
    key: "guillermoBullet_anims",
    frameRate: 1,
    frames: {start: 0 , end:0 },//{start: 1 , end:1 }), //15
    repeat: -1,

    
    inertia: Infinity,
    angularVelocity: 1


}

export default BulletConfig