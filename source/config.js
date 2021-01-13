const Config = {
    //Configuración base de los humanoides
    humanoid: {
        health: 10,
        speed: 100,
        size: 16
    },

    //Configuración específica del jugador
    player: {
        depth: 4,
        baseAmmo: 100,
        dashTime: 50,
        mass: 800,
        dashTint: 0x00ff1e,
        baseTint: 0xffffff,
        baseVelFactor: 1.5,
        passiveCount: 8,
        weaponCount: 3
    },
    
    //Configuración base de las armas
    weapon:{
        shakeDur: 100,
        shakeInt: 0.0005,
        shotVolume: 0.1
    },
    
    //Configuración de la UI
    ui: {
        healthBarColor: 0xf91010,
        barPosX: 50,
        barPosY: 30,
        barScaleX: 20,
        barScaleY: 15,
        weaponPosX: 70,
        weaponPosY: 85,
        weaponScl: 3,
        ammoPosX: 110,
        ammoPosY: 65,
        ammoFontSize: 35,
        passivePosX: 50,
        passivePosY: 130,
        passiveOffset: 40,
        passiveImgs: ['tanqueo', 'facil', 'rambo', 'buenaonda', 'malaonda', 'sanic', 'cogo'], 
        activePosX: 1300,
        activePosY: 50,
        activeImgs: ['dash', 'escudo', 'area']
    }
}

export default Config