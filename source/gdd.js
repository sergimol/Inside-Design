import Button from "./button.js";
import config from "./config.js"

const armasList = ['armas0', 'armas1', 'armas2'];
const esteticasList = ['pasivas0', 'pasivas1'];
const activasList = ['pasivas0', 'pasivas1'];
const pasivasList = ['pasivas0', 'pasivas1'];
const temporalesList = ['pasivas0', 'pasivas1'];


export default class Game extends Phaser.Scene {
    constructor() {
        super({ key: "gdd" });
    }
    preload() {
        this.load.image('background', 'Sprites/gdd/GDDBackground.png');
        this.load.image('gotele', 'Sprites/gdd/GDDgotele.png');

        this.load.image('back', 'Sprites/gdd/GDDback.png');
        this.load.image('next', 'Sprites/gdd/GDDnext.png');
        this.load.image('exit', 'Sprites/gdd/GDDexit.png');

        this.load.image('armas', 'Sprites/gdd/GDDarmas.png');
        this.load.image('esteticas', 'Sprites/gdd/GDDesteticas.png');
        this.load.image('pasivas', 'Sprites/gdd/GDDpasivas.png');
        this.load.image('activas', 'Sprites/gdd/GDDactivas.png');
        this.load.image('temporales', 'Sprites/gdd/GDDtemporales.png');

        //IMAGENES IDEAS
        this.load.image('armas0', 'Sprites/gdd/armas1.png');
        this.load.image('armas1', 'Sprites/gdd/armas2.png');
        this.load.image('armas2', 'Sprites/gdd/armas3.png');

        this.load.image('pasivas0', 'Sprites/gdd/pasivas1.png');
        this.load.image('pasivas1', 'Sprites/gdd/pasivas2.png');
    }


    create() {
        const { ESC } = Phaser.Input.Keyboard.KeyCodes
        this.cursors = this.input.keyboard.addKeys({
            escape: ESC
        })
        this.input.keyboard.on('keydown_ESC', this.exitGDD, this);


        this.add.image(700, 400, 'gotele');
        this.add.image(700, 400, 'background');


        this.backButton = new Button(this, 220, 220, 'back', 'back', 'backGDD')
        this.nextButton = new Button(this, 1150, 220, 'next', 'next', 'nextGDD')
        this.exitButton = new Button(this, 220, 550, 'exit', 'exit', 'exitGDD')

        this.armasButton = new Button(this, 1150, 400, 'armas', 'armas', 'armasGDD')
        this.esteticasButton = new Button(this, 1150, 470, 'esteticas', 'esteticas', 'esteticasGDD')
        this.pasivasButton = new Button(this, 1150, 540, 'pasivas', 'pasivas', 'pasivasGDD')
        this.activasButton = new Button(this, 1150, 610, 'activas', 'activas', 'activasGDD')
        this.temporalesButton = new Button(this, 1150, 680, 'temporales', 'temporales', 'temporalesGDD')

        this.contador = 0;

        this.gddArmas = [];
        this.gddEsteticas = [];
        this.gddPasivas = [];
        this.gddActivas = [];
        this.gddTemporales = [];
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
            case this.gddArmas:
                this.add.image(700, 400, armasList[this.contador]);
                break;
            case this.gddEsteticas:

                break;
            case this.gddPasivas:
                this.add.image(700, 400, pasivasList[this.contador]);
                break;
            case this.gddActivas:

                break;
            case this.gddTemporales:

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