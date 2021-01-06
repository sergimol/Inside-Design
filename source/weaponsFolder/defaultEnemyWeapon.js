import disparo from "./../bulletsFolder/defaultEnemyBullet.js";

const WeaponConfig = {
    spriteWeapon: "gunShoot",
    s: "mono",
    m: "semi", 
    cadence: 300,
    dispersion: 20, 
    pellets: 1, 
    bulletForce: 0.3, 
    forceDispersion: 30,
    rafagas: 1, 
    rafagasCadence: 200,
    origenX: 0.15, 
    origenY: 0.5, 
    canyonX: 20, 
    canyonY: 0,
    cuerpoACuerpo: false, 
    rotationOffSet: 0, 
    costeMunicionPorBala: 1,
    retroceso: -1,
    bullet: disparo
}

export default WeaponConfig