import disparo from "../bulletsFolder/espadon_attack.js";
import disparoAlternativo from "../bulletsFolder/defaultBullet.js";

const WeaponConfig = {
    id: 0,
    spriteWeapon: "espadon",
    s: "shotgun",
    m: "semi", 
    cadence: 3000,
    dispersion: 0, 
    pellets: 1, 
    bulletForce: 0.2, 
    forceDispersion: 0,
    rafagas: 0, 
    rafagasCadence: 400,
    origenX: 0.5, 
    origenY: 1, 
    canyonX: 20, 
    canyonY: 0,
    cuerpoACuerpo: true, 
    rotationOffSet: Math.PI + Math.PI/6, 
    costeMunicionPorBala: 0,

    
    fixedDisp:{
        start: 0,
        end: 0
    },
    
    retroceso: 1,
    bullet: disparo,


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