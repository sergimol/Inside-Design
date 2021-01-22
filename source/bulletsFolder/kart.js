const BulletConfig = {

    sprite: "kart", 
    scale: 1,
    sizeX: 8,
    sizeY: 8,
    originX: 0,
    originY: 0, 
    mass: 30,
    label: 'bullet',
    airFriction: 0.,
    rebotes: 0, 
    fuerzaRebote: 0, 

    velocidadMinima: -1,
    damage: 15, 
    devulveBalas: false,
    destruyeBalas: true, 
    isSensor: true,
    pierce: Infinity,
    destroyOnWall: false, //si true, ignorara rebotes y si es sensor cuando choque con una pared se destruira
    balaHija: null,
    lifeTime: Infinity, //milisegundos

    form:"circle",
    customForm: {
        radius: 16
    },

    
    pushback: 0, //fuerza con la que empuja la bala al chocar con un objetivo

    //para la animacion
    
    key: "kart_anim",
    frameRate: 15,
    frames: {start: 0 , end:1 },//{start: 1 , end:1 }), //15
    repeat: -1,

    
    inertia: Infinity,
    angularVelocity: 1


}

export default BulletConfig