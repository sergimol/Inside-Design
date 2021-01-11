import hijaConfig from "./granade_explosion.js";


const BulletConfig = {

    sprite: "granade__launcher_shoot", 
    scale: 3/4,
    //sizeX: 12 * 3/4,
    //sizeY: 12* 3/4,
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
    pierce: 0,
    destroyOnWall: false, //si true, ignorara rebotes y si es sensor cuando choque con una pared se destruira
    
//aqui va toda la informacion sobre la forma del proyerctil
//formas posibles circle, rectangle, polygon, trapezoid, fromVertices
//(cada forma requerira una configurarion customForm distinca)
    form:"circle",
    customForm: {
        //circle x, y, radius
        radius: 6* 3/4,
    },
    
    inertia: 2700, //2700 es el valor default
    angularVelocityMultiply: 2, //multiplicara un valor aleatorio de entre 0 y 1 
    angularVelocitySuma: -1, //samara la valor aleatorio multiplicado
    angularVelocityResultadoMultiply: 1, //multiplicara el resultado de todo lo anterior
    lifeTime: Infinity, //milisegundos
    pushback: 0, //fuerza con la que empuja la bala al chocar con un objetivo

    balaHija: hijaConfig, //Todo a partir de aqui pertenece a la hija

    bulletPelletHija:1, //cantidad de veces que debe instanciar hija


    hijaFaction: null, //si es true, usara el filtro de la bala padre para ser enemiga o amiga, si es null sera neutra (ejemplo la explosion)
    dispersionHija: 0, //dispersion en porcetaje/2 que se le aplicara a la bala al instanciarse
    forceDispersionHija: 0, //
    hijaUsaAnguloPadre: 0, //1 utilizara el angulo del padre, 0 no,
    hijaOffsetAngulo: 0, //Math.Pi es lo que se le sumara al angulo en radianes al instanciarse la bala
    bulletForceHija: 0,

    
    fixedDisp:{
        start: Math.PI,
        end: -Math.PI
    },

    //para la animacion
    
    key: "granade_shot_anims",
    frameRate: 1,
    frames: {start: 0 , end:0 },//{start: 1 , end:1 }), //15
    repeat: -1


}

export default BulletConfig