
const BulletConfig = {

    sprite: "enemybullet", 
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
    
    key: "defaultBullet_anims",
    frameRate: 15,
    frames: {start: 0 , end:2 },//{start: 1 , end:1 }), //15
    repeat: -1,

    
    inertia: Infinity,
    angularVelocity: 1


}

export default BulletConfig