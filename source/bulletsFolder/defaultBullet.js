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
    airFriction: 0.01,
    rebotes: 0, 
    fuerzaRebote: 0.8, 
    velocidadMinima: 1.0,
    damage: 2, 
    devulveBalas: false,
    destruyeBalas: false, 
    isSensor: false,
    balaHija: null,
    lifeTime: Infinity, //milisegundos

    //para la animacion
    frameRate: 2


}

export default BulletConfig