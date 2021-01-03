import hijaConfig from "./defaultEnemyBullet.js";


const BulletConfig = {

    sprite: "granade_launcher_shoot_explosion", 
    scale: 1,
    sizeX: 83,
    sizeY: 83,
    originX: 0,
    originY: 0, 
    mass: 10,
    label: 'bullet',
    airFriction: 0.01,
    rebotes: 0, 
    fuerzaRebote: 0.8, 
    velocidadMinima: -1,
    damage: 10, 
    devulveBalas: false,
    destruyeBalas: false, 
    isSensor: true,
    balaHija: null,
    lifeTime: 500, //milisegundos

    //para la animacion
    
        key: "granade_shot_explosion_anims",
        frameRate: 18,
        frames: {start: 0 , end:9 },//{start: 1 , end:1 }), //15
        repeat: 0,
    

        inertia: Infinity,
        angularVelocity: 1

}

export default BulletConfig