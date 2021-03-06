import disparo from "../bulletsFolder/fuego.js";
import disparoAlternativo from "../bulletsFolder/defaultBullet.js";

const WeaponConfig = {
    id: 6,
    spriteWeapon: "lanzallamas",
    s: "mono",
    m: "auto", 
    cadence: 100,
    dispersion: 3, 
    pellets: 1, 
    bulletForce: 0.3, 
    forceDispersion: 0,
    rafagas: 0, 
    rafagasCadence: 200,
    origenX: 0.15, 
    origenY: 0.5, 
    canyonX: 20, 
    canyonY: 0,
    cuerpoACuerpo: false, 
    rotationOffSet: 0, 
    costeMunicionPorBala: 1,

    
    fixedDisp:{
        start: 0,
        end:0
    },
    
    retroceso: -1,
    bullet: disparo,

    
    soundEffect:'gas',

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