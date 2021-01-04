import disparo from "./../bulletsFolder/granade_shot.js";

const WeaponConfig = {
    spriteWeapon: "granade_launcher",
    s: "mono",
    m: "semi", 
    cadence: 500,
    dispersion: 3, 
    pellets: 1, 
    bulletForce: 1, 
    forceDispersion: 0,
    rafagas: 1, 
    rafagasCadence: 0,
    origenX: 0.15, 
    origenY: 0.5, 
    canyonX: 20, 
    canyonY: 0,
    cuerpoACuerpo: false, 
    rotationOffSet: 0, 
    costeMunicionPorBala: 3,
    bullet: disparo
}

export default WeaponConfig