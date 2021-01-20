import weapon1 from "./../enemyWeaponFolder/cylon_rafaga_gun.js";
import weapon2 from "./../enemyWeaponFolder/cylon_rafaga_shotgun.js";



const boss = {

    lvl: 1,

    sprite: "player",

    health: 20,
    mass: 1600,
    speed: 50,
    depth: 3,
    idleMovTime: 1000,
    aggroMovTime: 500,
    cadenceTime: 1000,
    minDistance: 4,
    aggroDistance: 100,
    idleVelFactor: 0.1,
    aggroVelFactor: 0.8,
    angleAcercarse: 0, 
    weapon: weapon2,
    rutina: [{
        time: 10000,
        idle: false,
        acercarse: true,
        distanciaAcercarse:100,
        alejarse:true,
        distanciaAlejarse:95,
        strafe: false,
        starfeTime: 1000,
        aiming: false,
        shootCount: 3,
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
        changeWeapon: weapon1,
    },
    {
        time: 10000,
        idle: true,
        acercarse: false,
        distanciaAcercarse:100,
        alejarse:true,
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
        changeWeapon: weapon2,
    }]
}

export default boss;