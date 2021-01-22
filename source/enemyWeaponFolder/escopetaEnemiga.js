import disparo from "../bulletsFolder/defaultEnemyBullet.js";
import disparoAlternativo from "../bulletsFolder/defaultBullet.js";

const WeaponConfig = {
    id: 2,
    spriteWeapon: "escopeta",
    s: "shotgun",
    m: "semi", 
    cadence: 500,
    dispersion: 0, 
    pellets: 5, 
    bulletForce: 0.1, 
    forceDispersion: 0,
    rafagas: 0, 
    rafagasCadence: 200,
    origenX: 0.15, 
    origenY: 0.5, 
    canyonX: 20, 
    canyonY: 0,
    cuerpoACuerpo: false, 
    rotationOffSet: 0, 
    costeMunicionPorBala: 2,

    
    fixedDisp:{
        start:-Math.PI/6,
        end:Math.PI/6,
    },
    
    retroceso: 0,
    bullet: disparo,


    soundEffect:'shotgun',

    //disparo alternativo/sin ammo
    cadenciaAlternative:100,
    rafagasCadenceAlternative:100,
    rafagasAlternative:0,
    retrocesoAlternative:1,
    pelletsAlternative:1,
    dispersionAlternative:0,
    forceDispersionAlternative:0,
    bulletAlternative: disparoAlternativo,
    fixedDispAlternative:{
        start:0,
        end:0
    },
    bulletForceAlternative:0.13,
}

export default WeaponConfig