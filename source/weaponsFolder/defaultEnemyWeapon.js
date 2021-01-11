import disparo from "./../bulletsFolder/defaultEnemyBullet.js";

const WeaponConfig = {
    id: 0,
    spriteWeapon: "gunShoot",
    s: "mono",
    m: "semi", 
    cadence: 300,
    dispersion: 20, 
    pellets: 1, 
    bulletForce: 0.3, 
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
    bullet: disparo


}

export default WeaponConfig