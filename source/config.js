
const Config = {
    //Configuración base de los humanoides
    humanoid: {
        health: 10,
        speed: 100,
        size: 16
    },

    gdd:{
        numeroEsteticas:8,
        numeroArmas:18,
        numeroPasivas:7,
        nueroActivas:3,
        numeroTemporales:3,
        numeroCharacters:10 ,
        numeroMusicas: 9
    },

    //Configuración específica del jugador
    player: {
        
        spriteScaleX:1,
        spriteScaleY:1,
        scaleX:11,
        scaleY:16,
        depth: 4,
        baseAmmo: 200,
        baseHealth:10,
        baseWeaponID:0,
        dashTime: 50,
        mass: 800,
        dashTint: 0x00ff1e,
        baseTint: 0xffffff,
        baseVelFactor: 1.5,
        passiveCount: 14,
        weaponCount: 17,
        activeCount: 3,
        actives: [
            'dash',
            'shield',
            'area'
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
        pirata: 3,/*
        calvo: 4,
        ellie: 5,
        ruso: 6,
        payaso: 7,
        cresta: 8,
        hummus: 9,*/
        numberAspectos: 10,

        spriteID: 0,
        frictionAir: 0.25,
        startingPassives: [false, false, false, false, false, false, false, false, false, false]
    },
    
    //Configuración base de las armas
    weapon:{
        shakeDur: 100,
        shakeInt: 0.0005,
        shotVolume: 0.1,
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
        activePosX: 875,
        activePosY: 285,
        activeImgs: ['dash', 'shield', 'bomb'],
        dialogBoxX: 700,
        dialogBoxY: 400,
        dialogX: 590,
        dialogY: 475,
        dialogFontSize: 30,
        cooldownPosX: 850,
        cooldownPosY: 300,
        dialogBoxes: ['dialogoAndres', 'dialogoDiego', 'dialogoJavi', 'dialogoSergio']
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
        musicNumber: 9,
        mainChip: 0,
        west: 1,
        rock: 2,
        horror: 3,
        neon: 4,
        old30s: 5,
        epic: 6,
        piano: 7,
        berridos: 8, 
        intro: 9, 
        songReference: ['mainChiptuneSong', 'westernSong', 'rockSong', 'horrorSong',
        'neonRiderSong', '30sSong', 'epicSong', 'pianoSong', 'berridosSong','introSong']
    },

    items: {
        healthDrop: 3,
        ammoDrop: 5
    },

    enemySprite:
    {
        key: [
            'enemyDef',
            'enemyWest',
            'enemyDemon',
            'enemyPirata',
        ],
        def: 0,
        west: 1,
        doom: 2,
        pirata: 3,
    },

    room:{
        numRoomsIni: 1,     //Sala inicial
        numRoomsTotal: 14,  //Salas totales
        bossRoom:2,         //Sala del boss (de Tiled)
        bossRoomLevel: 9,   //Sala en la que debería de aparecer el boss
    },

    depths:{
        groundLayer:0,
        detailsLayer:0,
        reflexLayer:0,
        wallsLayer:1,
        enemy:2,
        player:3,
        doorlayer:4,
        collidersLayer:5,
        bullets:5,
        buttonBackground:6,
        button:7,
        
    },
    cameraSettings:{
        zoom : 3,
        //shake:
    },
    button:{
        mainMenu: 0.25,
        gddMenu:0.8,
        endMenu:0.6,
    },
    musicVolume:{
        intro: 0.5,   //2
        general: 0.5, //1 
    }
}

export default Config