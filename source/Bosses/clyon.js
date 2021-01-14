import weapon1 from "./../weaponsFolder/machineGun.js";
import weapon2 from "./../weaponsFolder/escopeta.js";



const boss = {

    lvl: 1,

    sprite: "player",

    health: 3,
    speed: 50,
    depth: 3,
    idleMovTime: 1000,
    aggroMovTime: 500,
    cadenceTime: 1000,
    minDistance: 4,
    aggroDistance: 100,
    idleVelFactor: 0.1,
    aggroVelFactor: 0.4,

    rutina: [{
        time: 10000,
        acercarse: true,
        distanciaAcercarse:100,
        alejarse:true,
        distanciaAlejarse:95,
        strafe: true,
        starfeTime: 1000,
        aiming: false,
        shootCount: 3,
        shootRafagas:1,
        shootTime: 2000,
        changeWeapon: weapon1,
    },
    {
        time: 10000,
        acercarse: false,
        distanciaAcercarse:100,
        alejarse:true,
        distanciaAlejarse:200,
        strafe: false,
        strafeTime: 1000, 
        aiming: false,
        shootCount: 3,
        shootRafagas: 1,
        shootTime: 0,
        changeWeapon: weapon2,
    }]
}

export default boss;