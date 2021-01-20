import disparo from "../enemyBullets/willermo_bullet.js";
import disparoAlternativo from "../bulletsFolder/defaultBullet.js"; //no deberia de poder usarla el player asi que la voya a omitir

const WeaponConfig = {
    id: 0,
    spriteWeapon: "martilloThis",
    s: "mono",
    m: "semi", 
    cadence: 200,
    dispersion: 0, 
    pellets: 1, 
    bulletForce: 0.20, 
    forceDispersion: 0,
    rafagas: 0, 
    rafagasCadence: 50,
    origenX: 0.5, 
    origenY: 0.9, 
    canyonX: 0, 
    canyonY: 0,
    cuerpoACuerpo: true, 
    rotationOffSet: Math.PI/3, 
    costeMunicionPorBala: 0,

    
    fixedDisp:{
        start: 0,
        end:0
    },
    
    retroceso: 0,
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