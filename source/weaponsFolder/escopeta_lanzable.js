import disparo from "./../bulletsFolder/escopeta_lanzable_shoot.js";

const WeaponConfig = {
    spriteWeapon: "escopeta_lanzable",
    s: "mono",
    m: "semi", 
    cadence: 300,
    dispersion: 20, 
    pellets: 1, 
    bulletForce: 1, 
    forceDispersion: 30,
    rafagas: 1, 
    rafagasCadence: 200,
    origenX: 0.15, 
    origenY: 0.5, 
    canyonX: 20, 
    canyonY: 0,
    cuerpoACuerpo: true, 
    rotationOffSet: 1, 
    costeMunicionPorBala: 1,
    
    retroceso: 2,
    bullet: disparo
}

export default WeaponConfig