import hijaConfig from "./../bulletsFolder/defaultEnemyBullet.js";


const BulletConfig = {

    sprite: "enemybulletAmmo", 
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

    velocidadMinima: 1.0,
    damage: 1, 
    devulveBalas: false,
    destruyeBalas: false, 
    isSensor: false,
    pierce: 0,
    destroyOnWall: false, //si true, ignorara rebotes y si es sensor cuando choque con una pared se destruira
    balaHija: null,
    lifeTime: 500, //milisegundos
    dropAmmo:2,

    form:"rectangle",
    customForm: {
        //rectangle x, y widht, height
        width: 8,
        height: 8,
    },

    
    pushback: 5, //fuerza con la que empuja la bala al chocar con un objetivo

    
    balaHija: hijaConfig, //Todo a partir de aqui pertenece a la hija

    bulletPelletHija:6, //cantidad de veces que debe instanciar hija


    hijaFaction: true, //si es true, usara el filtro de la bala padre para ser enemiga o amiga, si es null sera neutra (ejemplo la explosion)
    dispersionHija: 0, //dispersion en porcetaje/2 que se le aplicara a la bala al instanciarse
    forceDispersionHija: 0, //
    hijaUsaAnguloPadre: 0, //1 utilizara el angulo del padre, 0 no,
    hijaOffsetAngulo: 0, //Math.Pi es lo que se le sumara al angulo en radianes al instanciarse la bala
    bulletForceHija: 0.5,

    
    fixedDisp:{
        start: Math.PI,
        end: -Math.PI
    },
    //para la animacion
    
    key: "defaultEnemyBulletAmmo_anims",
    frameRate: 15,
    frames: {start: 0 , end:3 },//{start: 1 , end:1 }), //15
    repeat: -1,

    
    inertia: Infinity,
    angularVelocity: 1


}

export default BulletConfig