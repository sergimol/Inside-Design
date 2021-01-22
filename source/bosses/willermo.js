import weapon1 from "../enemyWeaponFolder/destructoraDeCodigo.js";
import weapon2 from "../enemyWeaponFolder/lanzadora_de_gatos_williDotInc.js";
import weapon3 from "../enemyWeaponFolder/martilloThisMunicion.js";



const boss = {

    lvl: 1,

    sprite: "player",

    health: 300,
    mass: 1600,
    speed: 50,
    depth: 3,
    idleMovTime: 1000,
    aggroMovTime: 500,
    cadenceTime: 1000,
    minDistance: 4,
    aggroDistance: 500,
    idleVelFactor: 0.1,
    aggroVelFactor: 1.6,
    angleAcercarse: 0, 
    weapon: weapon1,


    humanoide:{
        spriteScaleX:2,
        spriteScaleY:2,
        scaleX:11  *2,
        scaleY:16 * 2,
    },

    rutina: [{
        time: 1000,
        idle: false,
        acercarse: true,
        distanciaAcercarse:48,
        alejarse:false,
        distanciaAlejarse:95,
        strafe: false,
        starfeTime: 1000,
        aiming: true,
        shootCount: 2,
        shootRafagas:1,
        shootTime: 0,
        changeWeapon: null,
    },{
        time: 5000,
        idle: true,
        acercarse: true,
        distanciaAcercarse:100,
        alejarse:true,
        distanciaAlejarse:95,
        strafe: true,
        starfeTime: 1000,
        aiming: false,
        shootCount: 0,
        shootRafagas:1,
        shootTime: 2000,
        changeWeapon: weapon2,
    },
    {
        time: 10000,
        idle: false,
        acercarse: false,
        distanciaAcercarse:100,
        alejarse:false,
        distanciaAlejarse:200,
        strafe: false,
        strafeTime: 1000, 
        aiming: false,
        shootCount: 3,
        shootRafagas: 1,
        shootTime: 2000,
        changeWeapon: null,
    },{
        time: 5000,
        idle: true,
        acercarse: true,
        distanciaAcercarse:100,
        alejarse:true,
        distanciaAlejarse:95,
        strafe: true,
        starfeTime: 1000,
        aiming: false,
        shootCount: 0,
        shootRafagas:1,
        shootTime: 2000,
        changeWeapon: weapon1,
    },{
        time: 8000,
        idle: false,
        acercarse: true,
        distanciaAcercarse:48,
        alejarse:false,
        distanciaAlejarse:200,
        strafe: false,
        strafeTime: 1000, 
        aiming: false,
        shootCount: 8,
        shootRafagas: 1,
        shootTime: 0,
        changeWeapon: null,
    },{
        time: 1000,
        idle: true,
        acercarse: true,
        distanciaAcercarse:100,
        alejarse:true,
        distanciaAlejarse:95,
        strafe: true,
        starfeTime: 1000,
        aiming: false,
        shootCount: 0,
        shootRafagas:1,
        shootTime: 2000,
        changeWeapon: weapon3,
    }]
}

export default boss;