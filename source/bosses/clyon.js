import weapon1 from "./../enemyWeaponFolder/cylon_rafaga_gun.js";
import weapon2 from "./../enemyWeaponFolder/cylon_rafaga_shotgun.js";
import weapon3 from "./../enemyWeaponFolder/cylon_ammo_gun.js";



const boss = {

    lvl: 1,

    sprite: "player",

    health: 3,
    mass: 1600,
    speed: 50,
    depth: 3,
    idleMovTime: 1000,
    aggroMovTime: 500,
    cadenceTime: 1000,
    minDistance: 4,
    aggroDistance: 500,
    idleVelFactor: 0.1,
    aggroVelFactor: 0.8,
    angleAcercarse: 0, 
    weapon: weapon2,

    //animaciones
    
    hitKey:'hitCleon',
    walkKey:'walkCleon',
    idleKey:'idleCleon',
    deadKey:'deathCleon',

    humanoide:{
        spriteScaleX:2,
        spriteScaleY:2,
        scaleX:11  *2,
        scaleY:16 * 2,
    },

    rutina: [{
        time: 8000,
        idle: false,
        acercarse: true,
        distanciaAcercarse:100,
        alejarse:true,
        distanciaAlejarse:95,
        strafe: false,
        starfeTime: 1000,
        aiming: true,
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
        aiming: true,
        shootCount: 0,
        shootRafagas:1,
        shootTime: 2000,
        changeWeapon: weapon1,
    },
    {
        time: 10000,
        idle: false,
        acercarse: true,
        distanciaAcercarse:100,
        alejarse:false,
        distanciaAlejarse:200,
        strafe: false,
        strafeTime: 1000, 
        aiming: true,
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
        aiming: true,
        shootCount: 0,
        shootRafagas:1,
        shootTime: 2000,
        changeWeapon: weapon2,
    },{
        time: 10000,
        idle: false,
        acercarse: true,
        distanciaAcercarse:100,
        alejarse:true,
        distanciaAlejarse:95,
        strafe: false,
        starfeTime: 1000,
        aiming: true,
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
        aiming: true,
        shootCount: 0,
        shootRafagas:1,
        shootTime: 2000,
        changeWeapon: weapon3,
    }]
}

export default boss;