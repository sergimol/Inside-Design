import hijaConfig from "./defaultEnemyBullet.js";


const BulletConfig = {

    sprite: "bullet", 
    scale: 0.7,
    sizeX: 8,
    sizeY: 8,
    originX: 4,
    originY: 4, 
    mass: 30,
    label: 'bullet',
    airFriction: 0.005,
    rebotes: 0, 
    fuerzaRebote: 0.8, 

    velocidadMinima: 1.0,
    damage: 3, 
    devulveBalas: false,
    destruyeBalas: false, 
    isSensor: false,
    pierce: 0,
    destroyOnWall: false, //si true, ignorara rebotes y si es sensor cuando choque con una pared se destruira
    balaHija: null,
    lifeTime: Infinity, //milisegundos

    form:"rectangle",
    customForm: {
        //rectangle x, y widht, height
        width: 8,
        height: 8,
    },

    
    pushback: 0, //fuerza con la que empuja la bala al chocar con un objetivo

    //para la animacion
    
    key: "defaultBullet_anims",
    frameRate: 15,
    frames: {start: 0 , end:2 },//{start: 1 , end:1 }), //15
    repeat: -1,

    
    inertia: Infinity,
    angularVelocity: 1


}

export default BulletConfig