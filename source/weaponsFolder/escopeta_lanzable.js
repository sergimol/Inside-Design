import disparo from "./../bulletsFolder/escopeta_lanzable_shoot.js";
import disparoAlternativo from "./../bulletsFolder/defaultBullet.js";

const WeaponConfig = {
    id: 1,
    spriteWeapon: "escopeta_lanzable",
    s: "mono",
    m: "semi", 
    cadence: 300,
    dispersion: 20, 
    pellets: 1, 
    bulletForce: 1, 
    forceDispersion: 30,
    rafagas: 0, 
    rafagasCadence: 200,
    origenX: 0.15, 
    origenY: 0.5, 
    canyonX: 20, 
    canyonY: 0,
    cuerpoACuerpo: true, 
    rotationOffSet: 1, 
    costeMunicionPorBala: 1,
    
    fixedDisp:{
        start: 0,
        end:0
    },
    
    retroceso: 2,
    bullet: disparo,

    
    //disparo alternativo/sin ammo
    cadenciaAlternative:100,
    rafagasCadenceAlternative:100,
    rafagasAlternative:1,
    retrocesoAlternative:1,
    pelletsAlternative:1,
    dispersionAlternative:0,
    forceDispersionAlternative:0,
    bulletAlternative: disparoAlternativo,
    fixedDispAlternative:{
        start:0,
        end:0
    },
    bulletForceAlternative:0.3,
}

export default WeaponConfig