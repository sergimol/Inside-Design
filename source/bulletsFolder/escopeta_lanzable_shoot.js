import hijaConfig from "./defaultBullet.js";


const BulletConfig = {

    sprite: "escopeta_lanzable_shoot", 
    scale: 1,
    sizeX: 16,
    sizeY: 8,
    originX: 0,
    originY: 0, 
    mass: 50,
    label: 'bullet',
    airFriction: 0.01,
    rebotes: Infinity, 
    fuerzaRebote: 0.5, 
    velocidadMinima: 1.0,
    damage: 1, 
    devulveBalas: false,
    destruyeBalas: false, 
    isSensor: false,
    
    
    inertia: 2700, //2700 es el valor default
    angularVelocity: Math.random() * 3/4,
    lifeTime: Infinity, //milisegundos
    pushback: 0.2, //fuerza con la que empuja la bala al chocar con un objetivo

    balaHija: hijaConfig, //Todo a partir de aqui pertenece a la hija

    bulletPelletHija:8, //cantidad de veces que debe instanciar hija


    hijaFaction: true, //si es true, usara el filtro de la bala padre para ser enemiga o amiga, si es null sera neutra (ejemplo la explosion)
    dispersionHija: 50, //dispersion en porcetaje/2 que se le aplicara a la bala al instanciarse
    forceDispersionHija: 10, //
    hijaUsaAnguloPadre: 1, //1 utilizara el angulo del padre, 0 no,
    hijaOffsetAngulo: Math.PI, //Math.Pi es lo que se le sumara al angulo en radianes al instanciarse la bala
    bulletForceHija: 0.5,


    //para la animacion
    
    key: "granade_shot_anims",
    frameRate: 1,
    frames: {start: 0 , end:0 },//{start: 1 , end:1 }), //15
    repeat: -1


}

export default BulletConfig