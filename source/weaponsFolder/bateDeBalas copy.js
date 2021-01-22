import disparo from "./../bulletsFolder/defaultBullet.js";
import disparoAlternativo from "./../bulletsFolder/defaultBullet.js";

const WeaponConfig = {
    id: 0,
    spriteWeapon: "pistolaBasica",
    s: "mono",
    m: "semi", 
    cadence: 150,
    dispersion: 10, 
    pellets: 1, 
    bulletForce: 0.6, 
    forceDispersion: 30,
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