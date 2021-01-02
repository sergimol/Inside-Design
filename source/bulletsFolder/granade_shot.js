import hijaConfig from "./granade_explosion.js";


const BulletConfig = {

    sprite: "granade__launcher_shoot", 
    scale: 3/4,
    sizeX: 12 * 3/4,
    sizeY: 12* 3/4,
    originX: 0,
    originY: 0, 
    mass: 50,
    label: 'bullet',
    airFriction: 0.01,
    rebotes: 0, 
    fuerzaRebote: 0.8, 
    velocidadMinima: 1.0,
    damage: 2, 
    devulveBalas: false,
    destruyeBalas: false, 
    isSensor: false,
    balaHija: hijaConfig,
    lifeTime: Infinity, //milisegundos

    //para la animacion
    
    key: "granade_shot_anims",
    frameRate: 1,
    frames: {start: 0 , end:0 },//{start: 1 , end:1 }), //15
    repeat: -1
    


}

export default BulletConfig