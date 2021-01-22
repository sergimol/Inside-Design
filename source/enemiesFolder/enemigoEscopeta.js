import defaultWeapon from "./../enemyWeaponFolder/escopetaEnemiga.js";

const enemy = {

    lvl: 1,

    sprite: "player",

    weapon: defaultWeapon,
    health: 50,
    mass: 800,
    speed: 50,
    depth: 3,
    idleMovTime: 1000,
    aggroMovTime: 500,
    cadenceTime: 1000,
    minDistance: 4,
    aggroDistance: 500,
    idleVelFactor: 0.1,
    aggroVelFactor: 0.4,
    angleAcercarse:Math.PI / 6,

    humanoide:{
        spriteScaleX:1,
        spriteScaleY:1,
        scaleX:11,
        scaleY:16,
    },
    rutina: [{
        time: 10000,
        idle:false,
        acercarse: true,
        distanciaAcercarse:150,
        alejarse:false,
        distanciaAlejarse:95,
        strafe: false,
        starfeTime: 1000
    }/**
    {
        time: 10000,
        idle: false,
        acercarse: false,
        distanciaAcercarse:100,
        alejarse:true,
        distanciaAlejarse:200,
        strafe: false,
        strafeTime: 1000
    }
        */,
]
}

export default enemy;