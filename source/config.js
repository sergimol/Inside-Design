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
        passiveCount: 16,
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
    },

    tileset: {
        west: 0,
        raytracing: 1,
        minecraft: 2,
        navidad: 3,
        piratas: 4,
        zelda: 5,
        doom: 6,
        miedo: 7,
        tileReference: ['tileSetWestEx', 'tileSetRayTracingEx', 'tileSetMinecraftEx', 'tileSetNavidadEx', 'tileSetPiratasEx',
                        'tileSetZeldaEx', 'tileSetDoomEx', 'tileSetMiedoEx']
    },

    music: {
        mainChip: 0,
        west: 1,
        old30s: 2,
        neon: 3,
        epic: 4,
        rock: 5,
        horror: 6,
        piano: 7,
        berridos: 8, 
        songReference: ['mainChiptuneSong', 'westernSong', '30sSong', 'neonRiderSong',
        'epicSong', 'rockSong', 'horrorSong', 'pianoSong', 'berridosSong']
    }
}

export default Config