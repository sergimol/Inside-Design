const Config = {
    //Configuración base de los humanoides
    humanoid: {
        health: 10,
        speed: 100,
        size: 16
    },

    gdd:{
        numeroArmas:13,
        numeroEsteticas:0,
        numeroPasivas:0,
        nueroActivas:0,
        numeroTemporales:0
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
        passiveCount: 9,
        weaponCount: 3,
        activeCount: 3,
        actives: [
            'dash',
            'shield',
            'bomb'
        ],
        spriteKey: [
            'playerDef',
            'playerWest',
            'playerDoomGuy',
            'playerPirata',
            'playerCalvo',
            'playerEllie',
            'playerRuso',
            'playerPayaso',
            'playerCresta',
            'playerHummus',
        ],
        def: 0,
        west: 1,
        doom: 2,
        pirata: 3,
        calvo: 4,
        ellie: 5,
        ruso: 6,
        payaso: 7,
        cresta: 8,
        hummus: 9,
        numberAspectos: 10,

        spriteID: 0
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
        barPosX: 480,
        barPosY: 280,
        barScaleX: 10,
        barScaleY: 11,
        weaponPosX: 490,
        weaponPosY: 305,
        weaponScl: 1,
        ammoPosX: 505,
        ammoPosY: 300,
        healthPosX: 485,
        healthPosY: 281,
        ammoFontSize: 33,
        healthFontSize: 36,
        passivePosX: 505,
        passivePosY: 320,
        passiveOffset: 40,
        //passiveImgs: ['tanqueo', 'facil', 'rambo', 'buenaonda', 'malaonda', 'sanic', 'cogo'], 
        activePosX: 900,
        activePosY: 285,
        activeImgs: ['dash', 'shield', 'bomb'],
        dialogBoxX: 700,
        dialogBoxY: 470,
        dialogX: 590,
        dialogY: 450,
        dialogFontSize: 30
    },

    tileset: {
        tileCount: 8,
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
    },

    items: {
        healthDrop: 3,
        ammoDrop: 5
    }

    
}

export default Config