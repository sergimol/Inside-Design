import Button from "../button.js";
import config from "../config.js"

const activasList = ['pasivas0', 'pasivas1'];
const pasivasList = ['pasivas0', 'pasivas1'];
const temporalesList = ['pasivas0', 'pasivas1'];
const armasList = ['armas0', 'armas1', 'armas2'];
const esteticasList = ['pasivas0', 'pasivas1'];
const characterList = ['pasivas0', 'pasivas1'];
const musicaList = ['pasivas0', 'pasivas1'];


export default class Game extends Phaser.Scene {
    constructor() {
        super({ key: "gdd" });
    }
    preload() {
        this.load.image('background', 'sprites/gdd/gddBackground.png');

        this.load.image('back', 'sprites/gdd/gddback.png');
        this.load.image('next', 'sprites/gdd/gddnext.png');
        this.load.image('exit', 'sprites/gdd/gddexit.png');


        this.load.image('activas', 'sprites/gdd/activasButton.png');
        this.load.image('pasivas', 'sprites/gdd/pasivasButton.png');
        this.load.image('temporales', 'sprites/gdd/pasivasTempButton.png');
        this.load.image('armas', 'sprites/gdd/armasButton.png');
        this.load.image('esteticas', 'sprites/gdd/ambientesButton.png');
        this.load.image('character', 'sprites/gdd/charactersButton.png');
        this.load.image('musica', 'sprites/gdd/musicaButton.png');



        //IMAGENES IDEAS
        this.load.image('armas0', 'sprites/gdd/armas1.png');
        this.load.image('armas1', 'sprites/gdd/armas2.png');
        this.load.image('armas2', 'sprites/gdd/armas3.png');

        this.load.image('pasivas0', 'sprites/gdd/pasivas1.png');
        this.load.image('pasivas1', 'sprites/gdd/pasivas2.png');
    }


    create() {
        const { ESC } = Phaser.Input.Keyboard.KeyCodes
        this.cursors = this.input.keyboard.addKeys({
            escape: ESC
        })
        this.input.keyboard.on('keydown_ESC', this.exitGDD, this);


        this.add.image(700, 400, 'background');


        this.backButton = new Button(this, 200, 100, 'back', 'back', 'backGDD',0.8)
        this.nextButton = new Button(this, 1200, 100, 'next', 'next', 'nextGDD',0.8)
        this.exitButton = new Button(this, 200, 700, 'exit', 'exit', 'exitGDD',0.8)


        this.activasButton = new Button(this, 1200, 230, 'activas', 'activas', 'activasGDD',0.8)
        this.pasivasButton = new Button(this, 1200, 330, 'pasivas', 'pasivas', 'pasivasGDD',0.8)
        this.temporalesButton = new Button(this, 1200, 430, 'temporales', 'temporales', 'temporalesGDD',0.8)
        this.armasButton = new Button(this, 1200, 530, 'armas', 'armas', 'armasGDD',0.8)
        this.esteticasButton = new Button(this, 1200, 630, 'esteticas', 'esteticas', 'esteticasGDD',0.8)
        this.characterButton = new Button(this, 1200, 730, 'character', 'character', 'characterGDD',0.8)
        this.musicaButton = new Button(this, 1200, 830, 'musica', 'musica', 'musicaGDD',0.8)

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
        this.scene.start('sceneManager');
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
        let image;
        switch (this.activeArray) {
            case this.gddActivas:
                console.log("Activas")
                break;
            case this.gddPasivas:
                //this.add.image(700, 400, armasList[this.contador]);
                console.log("Pasivas")
                break;

            case this.gddTemporales:
                console.log("PasivasTemp")
                break;
            case this.gddArmas:
                console.log("Armas")
                break;
            case this.gddEsteticas:
                console.log("Esteticas")
                break;
            case this.gddCharacter:
                console.log("Character")
                break;
            case this.gddMusica:
                console.log("Musica")
                break;

        }
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
        }
        else {
            this.disparosRealizados = 0;
            this.enemiesKilled = 0;

            //generar archivo del gdd
            this.gddActivas = [];
            let numIdeas = config.gdd.nueroActivas;

            for (let i = 0; i < numIdeas; i++)
                this.gddActivas.push(false);

            this.gddPasivas = [];
            numIdeas = config.gdd.numeroPasivas;

            for (let i = 0; i < numIdeas; i++)
                this.gddPasivas.push(false);

            this.gddArmas = [];
            numIdeas = config.gdd.numeroArmas;

            for (let i = 0; i < numIdeas; i++)
                this.gddArmas.push(false);

            this.gddEsteticas = [];
            numIdeas = config.gdd.numeroEsteticas;

            for (let i = 0; i < numIdeas; i++)
                this.gddEsteticas.push(false);


            this.gddTemporales = [];
            numIdeas = config.gdd.numeroTemporales;
            
            for (let i = 0; i < numIdeas; i++)
                this.gddTemporales.push(false);
        }
    }
}