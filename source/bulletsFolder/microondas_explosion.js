const BulletConfig = {

    sprite: "microondas_explosion", 
    scale: 1,
    //sizeX: 83,
    //sizeY: 83,
    originX: 0,
    originY: 0, 
    mass: 50,
    label: 'bullet',
    airFriction: 0.01,
    rebotes: 0, 
    fuerzaRebote: 0.8, 
    velocidadMinima: -1,
    damage: 400, 
    devulveBalas: false,
    destruyeBalas: false, 
    isSensor: true,
    pierce: Infinity,
    destroyOnWall: false, //si true, ignorara rebotes y si es sensor cuando choque con una pared se destruira
    balaHija: null,
    lifeTime: 2000, //milisegundos

    form:"circle",
    customForm: {
        //circle x, y, radius
        radius: (16 * 100),
    },
    

    cameraShake:{
        duration: 100, 
        intensity: 0.001, 
        force:true
    },

    pushback: 5, //fuerza con la que empuja la bala al chocar con un objetivo

    //para la animacion
    
        key: "microondas_explosion_anims",
        frameRate: 3,
        frames: {start: 0 , end:12 },//{start: 1 , end:1 }), //15
        repeat: 0,
    

    inertia: Infinity,
    angularVelocity: 1

}

export default BulletConfig