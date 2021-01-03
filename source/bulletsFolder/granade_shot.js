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
    rebotes: Infinity, 
    fuerzaRebote: 0.5, 
    velocidadMinima: 1.0,
    damage: 2, 
    devulveBalas: false,
    destruyeBalas: false, 
    isSensor: false,

    lifeTime: Infinity, //milisegundos

    balaHija: hijaConfig,

    bulletPelletHija:2, //cantidad de veces que debe instanciar hija


    hijaFaction: null, //si es true, usara el filtro de la bala padre para ser enemiga o amiga, si es null sera neutra (ejemplo la explosion)
    dispersionHija: 0,
    forceDispersionHija: 0,
    hijaUsaAnguloPadre: 0, //1 utilizara el angulo del padre, 0 no,
    hijaOffsetAngulo: 0, //Math.Pi es lo que se le sumara al angulo en radianes al instanciarse la bala
    bulletForceHija: 0,

    pushback: 0, //fuerza con la que empuja la bala al chocar con un objetivo

    //para la animacion
    
    key: "granade_shot_anims",
    frameRate: 1,
    frames: {start: 0 , end:0 },//{start: 1 , end:1 }), //15
    repeat: -1,
    
    inertia: 2700, //2700 es el valor default
    angularVelocity: Math.random()


}

export default BulletConfig