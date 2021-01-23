import Button from "../button.js";
import config from "../config.js"

const activasList = ['activa0', 'activa1'];
const pasivasList = ['pasiva0', 'pasiva1', 'desbloquear', 'pasiva3', 'pasiva4', 'pasiva5', 'pasiva6'];
const temporalesList = ['pasivaTemp0', 'pasivaTemp1', 'pasivaTemp2'];
const armasList = ['armas0', 'armas1', 'armas2', 'armas3', 'armas4', 'armas5', 'armas6', 'armas7',
    'armas8', 'armas9', 'armas10', 'armas11', 'armas12', 'armas13', 'armas14', 'armas15', 'armas16', 'armas17', 'armas18', 'armas19'];
const esteticasList = ['ambiente0', 'ambiente1', 'ambiente2', 'ambiente3', 'ambiente4', 'ambiente5', 'ambiente6', 'ambiente7'];
const characterList = ['desbloquear', 'desbloquear', 'desbloquear', 'desbloquear', 'desbloquear', 'desbloquear', 'desbloquear', 'desbloquear', 'desbloquear', 'desbloquear'];
const musicaList = ['desbloquear', 'desbloquear', 'desbloquear', 'desbloquear', 'desbloquear', 'desbloquear', 'desbloquear', 'desbloquear', 'desbloquear'];


export default class Game extends Phaser.Scene {
    constructor() {
        super({ key: "gdd" });
    }
    preload() {
        this.load.image('background', '../../sprites/gdd/gddBackground.png');

        this.load.image('back', '../../sprites/gdd/gddback.png');
        this.load.image('next', '../../sprites/gdd/gddnext.png');
        this.load.image('exit', '../../sprites/gdd/gddexit.png');


        this.load.image('activas', '../../sprites/gdd/activasButton.png');
        this.load.image('pasivas', '../../sprites/gdd/pasivasButton.png');
        this.load.image('temporales', '../../sprites/gdd/pasivasTempButton.png');
        this.load.image('armas', '../../sprites/gdd/armasButton.png');
        this.load.image('esteticas', '../../sprites/gdd/ambientesButton.png');
        this.load.image('character', '../../sprites/gdd/charactersButton.png');
        this.load.image('musica', '../../sprites/gdd/musicaButton.png');



        //IMAGENES IDEAS
        this.load.image('desbloquear', '../../sprites/gdd/desbloqueable.jpg')
        this.load.image('sombra', '../../sprites/gdd/sombra.png')

        //PASIVAS
        //Me lo tanqueo
        this.load.image('pasiva0', '../../sprites/gdd/atributos/melotanqueo.jpg');
        //Demasiado facil
        this.load.image('pasiva1', '../../sprites/gdd/atributos/demasiadofacil.jpg');
        //Rambo
        //this.load.image('pasiva2', '/sprites/gdd/atributos/rambo.jpg');
        //Botiquines buena onda
        this.load.image('pasiva3', '../../sprites/gdd/atributos/buenaonda.jpg');
        //Botiquines mala onda
        this.load.image('pasiva4', '../../sprites/gdd/atributos/malaonda.jpg');
        //Sanic
        this.load.image('pasiva5', '../../sprites/gdd/atributos/sanic.jpg');
        //Cogo
        this.load.image('pasiva6', '../../sprites/gdd/atributos/cogo.jpg');

        //PASIVAS TEMPORALES
        //run pacifica
        this.load.image('pasivaTemp0', '../../sprites/gdd/temporales/runpacifica.jpg');
        //mario kart
        this.load.image('pasivaTemp1', '../../sprites/gdd/temporales/mariokart.jpg');
        //borracho
        this.load.image('pasivaTemp2', '../../sprites/gdd/temporales/estoytoperdio.jpg');

        //ARMAS
        //Arma Default
        this.load.image('armas0', '../../sprites/spritesarmas/pistolaBasica.png');
        //Escopeta Automatica
        this.load.image('armas1', '../../sprites/spritesarmas/escopeta.png');
        //Escopeta Peta
        this.load.image('armas2', '../../sprites/spritesarmas/escopeta.png');
        //Escopeta Rafagas
        this.load.image('armas3', '../../sprites/spritesarmas/escopeta.png');
        //Escopeta
        this.load.image('armas4', '../../sprites/spritesarmas/escopeta.png');
        //Lanza Granadas
        this.load.image('armas5', '../../sprites/spritesarmas/lanzagranadas.png');
        //Machine Gun
        this.load.image('armas6', '../../sprites/spritesarmas/miniGunRebote.png');
        //We are the World
        this.load.image('armas7', '../../sprites/spritesarmas/pistolaBasica.png');
        //Pistola
        this.load.image('armas8', '../../sprites/spritesarmas/pistolaBasica.png');
        //Pistola Laser
        this.load.image('armas9', '../../sprites/spritesarmas/pistolaLaser.png');
        //Rifle Automático
        this.load.image('armas10', '../../sprites/spritesarmas/rafagas.png');
        //Rifle Francotirador de Precision
        this.load.image('armas11', '../../sprites/spritesarmas/francotirador.png');
        //Rifle Francotirador
        this.load.image('armas12', '../../sprites/spritesarmas/francotirador.png');
        //Rifle Rafagas
        this.load.image('armas13', '../../sprites/spritesarmas/metralleta.png');
        //Rifle Rafagas
        this.load.image('armas14', '../../sprites/spritesarmas/metralleta.png');
        //Bate
        this.load.image('armas15', '../../sprites/spritesarmas/bate.png');
        //Katana
        this.load.image('armas16', '../../sprites/spritesarmas/katana.png');
        //espadon
        this.load.image('armas17', '../../sprites/spritesarmas/espadon.png');
        //Microondas
        this.load.image('armas18', '../../sprites/spritesarmas/microondas.png');
        //Lanzallamas
        this.load.image('armas19', '../../sprites/spritesarmas/lanzallamas.png');




        //AMBIENTES
        //Outlaws from the West
        this.load.image('ambiente0', '../../sprites/gdd/tiles/western.jpg');
        //Ray Tracing breakdance kill
        this.load.image('ambiente1', '../../sprites/gdd/tiles/raytracing.jpg');
        //La serie mas aburrida de la historia
        this.load.image('ambiente2', '../../sprites/gdd/tiles/laseriemas.jpg');
        //Especial Navidad
        this.load.image('ambiente3', '../../sprites/gdd/tiles/especialdenavidad.jpg');
        //Mas de 1000 capitulos
        this.load.image('ambiente4', '../../sprites/gdd/tiles/masdemil.jpg');
        //El mejor juego de la historia
        this.load.image('ambiente5', '../../sprites/gdd/tiles/elmejorjuego.jpg');
        //The Only Thing They Fear is You
        this.load.image('ambiente6', '../../sprites/gdd/tiles/ilegalenaustralia.jpg');
        //P.T.
        this.load.image('ambiente7', '../../sprites/gdd/tiles/miedo.jpg');

        //PERSONAJES
        //playerDef
        //playerWest
        //playerDoomGuy
        //playerPirata
        //playerCalvo
        //playerEllie
        //playerRuso
        //playerPayaso
        //playerCresta
        //playerHummus

        //MUSICA
        //mainChip
        //Outlaws from the West
        //Inside Neon
        //Old30s
        //Especial Navidad
        //Mas de 1000 capitulos
        //Animales 
        //BackToRock
        //Piano man


        this.image; //Imagen de la idea
    }


    create() {
        const { ESC } = Phaser.Input.Keyboard.KeyCodes
        this.cursors = this.input.keyboard.addKeys({
            escape: ESC
        })
        this.input.keyboard.on('keydown_ESC', this.exitGDD, this);


        this.add.image(700, 400, 'background');
        this.add.image(570, 430, 'sombra').setScale(0.63);
        this.add.image(550, 400, 'desbloquear').setScale(0.60);


        this.backButton = new Button(this, 200, 100, 'back', 'back', 'backGDD', config.button.gddMenu)
        this.nextButton = new Button(this, 1200, 100, 'next', 'next', 'nextGDD', config.button.gddMenu)
        this.exitButton = new Button(this, 200, 700, 'exit', 'exit', 'exitGDD', config.button.gddMenu)


        this.activasButton = new Button(this, 1200, 230, 'activas', 'activas', 'activasGDD', config.button.gddMenu)
        this.pasivasButton = new Button(this, 1200, 330, 'pasivas', 'pasivas', 'pasivasGDD', config.button.gddMenu)
        this.temporalesButton = new Button(this, 1200, 430, 'temporales', 'temporales', 'temporalesGDD', config.button.gddMenu)
        this.armasButton = new Button(this, 1200, 530, 'armas', 'armas', 'armasGDD', config.button.gddMenu)
        this.esteticasButton = new Button(this, 1200, 630, 'esteticas', 'esteticas', 'esteticasGDD', config.button.gddMenu)
        this.characterButton = new Button(this, 1200, 730, 'character', 'character', 'characterGDD', config.button.gddMenu)
        this.musicaButton = new Button(this, 1200, 830, 'musica', 'musica', 'musicaGDD', config.button.gddMenu)

        this.contador = 0;


        this.gddActivas = [];
        this.gddPasivas = [];
        this.gddTemporales = [];
        this.gddArmas = [];
        this.gddEsteticas = [];
        this.gddCharacter = [];
        this.gddMusica = [];

        this.loadFile();


        this.activeArray = [];
    }

    exitGDD() {
        console.log("exitGDD")
        this.scene.stop();
        this.scene.resume('sceneManager');
    }

    nextGDD(nombreArray) {
        if (this.contador < this.activeArray.length - 1)   //Dimension del array de armas, esteticas, pasivas...
            ++this.contador;
        this.showImage(this.activeArray);
    }
    previousGDD() {
        if (this.contador > 0)
            --this.contador;
        this.showImage(this.activeArray);
        console.log(this.contador)
    }

    selectArrayGDD(nombre) {
        this.activeArray = nombre;
        this.contador = 0;

        this.showImage(this.activeArray);
    }

    showImage() {
        this.image;
        if (this.activeArray[this.contador]) {
            switch (this.activeArray) {
                case this.gddActivas:
                    console.log("Activas")
                    this.image = this.add.image(700, 400, activasList[this.contador]);
                    break;
                case this.gddPasivas:
                    console.log("Pasivas")
                    this.image = this.add.image(700, 400, pasivasList[this.contador]);
                    break;

                case this.gddTemporales:
                    console.log("PasivasTemp")
                    this.image = this.add.image(700, 400, temporalesList[this.contador]);
                    break;
                case this.gddArmas:
                    console.log("Armas")
                    this.image = this.add.image(700, 400, armasList[this.contador]);
                    break;
                case this.gddEsteticas:
                    console.log("Esteticas")
                    this.image = this.add.image(700, 400, esteticasList[this.contador]);
                    break;
                case this.gddCharacter:
                    console.log("Character")
                    this.image = this.add.image(700, 400, characterList[this.contador]);
                    break;
                case this.gddMusica:
                    console.log("Musica")
                    this.image = this.add.image(700, 400, musicaList[this.contador]);
                    break;

            }
        } else {
            this.image = this.add.image(550, 400, 'desbloquear');
        }
        this.image.setScale(0.60);
    }













    loadFile() {
        var file = JSON.parse(localStorage.getItem('insideDesignSaveFile'));
        //cargar las cosas de file

        if (file !== null) {
            this.disparosRealizados = file.disparos;
            this.enemiesKilled = file.enemigos;

            this.gddActivas = file.gddActivas;
            this.gddPasivas = file.gddPasivas;
            this.gddTemporales = file.gddTemporales;
            this.gddArmas = file.gddArmas;
            this.gddEsteticas = file.gddEsteticas;
            this.gddCharacter = file.gddCharacter;
            this.gddMusica = file.gddMusica;
        }
        else {
            this.disparosRealizados = 0;
            this.enemiesKilled = 0;

            //generar archivo del gdd
            this.gddActivas = [];
            let numIdeas = config.gdd.numeroActivas;
            for (let i = 0; i < numIdeas; i++)
                this.gddActivas.push(false);


            this.gddPasivas = [];
            numIdeas = config.gdd.numeroPasivas;
            for (let i = 0; i < numIdeas; i++)
                this.gddPasivas.push(false);


            this.gddTemporales = [];
            numIdeas = config.gdd.numeroTemporales;
            for (let i = 0; i < numIdeas; i++)
                this.gddTemporales.push(false);


            this.gddArmas = [];
            numIdeas = config.gdd.numeroArmas;
            for (let i = 0; i < numIdeas; i++)
                this.gddArmas.push(false);


            this.gddEsteticas = [];
            numIdeas = config.gdd.numeroEsteticas;
            for (let i = 0; i < numIdeas; i++)
                this.gddEsteticas.push(false);


            this.gddCharacter = [];
            numIdeas = config.gdd.numeroCharacter;
            for (let i = 0; i < numIdeas; i++)
                this.gddCharacter.push(false);


            this.gddMusica = [];
            numIdeas = config.gdd.numeroMusica;
            for (let i = 0; i < numIdeas; i++)
                this.gddMusica.push(false);
        }
    }
}