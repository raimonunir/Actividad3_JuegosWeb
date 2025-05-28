//Hacemos un import de todos los managers

//Importamos enemigos y player
import Player from "./../player/Player.js"

//Importamos los distintos managers que necesitaremos
import {SoundManager} from "./../managers/SoundManager.js"
import { VFXsManager} from "../managers/VFXsManager.js";
import {UIManager} from "../managers/UIManager.js";
export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        
        this.distanciaRecorrida=0;
        this.aumentoDistancia=2;
    }

    preload() {
        //Hacemos carga de recursos que no hayamos cargado previamente en PreloadScene.js ni en BootScene.js
        
        //Vamos a tomar las dimensiones de la ventana de juego, que nos servirá más adelante
        this.gameWidth = this.sys.game.canvas.width
        this.gameHeight = this.sys.game.canvas.height
    }

    create() {
        //Instanciamos los distintos managers
        this.soundManager = new SoundManager(this);
        this.vfxManager = new VFXsManager(this);
        this.uiManager = new UIManager(this);
        //Establecemos los límites dentro del canvas
        this.physics.world.setBounds(0,0,240,210,true,true);   
        this.projectiles = this.add.group();
        // Inicializar jugador, enemigos, balas, etc.
        this.player = new Player(this,120,230); //120 x 240
        

        this.setCamera();
        this.pintaUI();
        
        this.soundManager.playMainTheme();

        this.createTileMap();



        
        
    }

    update() {
        // Lógica principal del juego
        
        //Aumentamos la distancia recorrida
        this.distanciaRecorrida+=this.aumentoDistancia;
        //console.log(this.distanciaRecorrida);
        //Llamamos al método update del player
        this.player.update();

        //Iteramos por los gameObjects contenidos en el grupo de disparos...
        for(var i=0;i<this.projectiles.getChildren().length;i++){
            
            var bullet = this.projectiles.getChildren()[i];     //Y cada instancia particular la almacenamos en bullet
            bullet.update();                                    //...para llamar a su método update()
        }
        /*
        this.textoDistancia.setText("LayerAgua01.y:"+Phaser.Math.RoundTo(this.layerAgua01.y));
        this.textoDistancia2.setText("LayerAgua02.y:"+Phaser.Math.RoundTo(this.layerAgua02.y));
        */
        this.layerAgua01.y+=0.15;
        this.layerAgua02.y+=0.15;
        this.layerNubes01.y+=0.50;
        this.layerNubes02.y+=0.50;


        if(this.layerAgua01.y>256){
            this.layerAgua01.y=this.gameHeight*-1;
        }

        if(this.layerAgua02.y>256){
            this.layerAgua02.y=this.gameHeight*-1;
        }
        if(this.layerNubes01.y>256){
            this.layerNubes01.y=this.gameHeight*-1;
        }

        if(this.layerNubes02.y>256){
            this.layerNubes02.y=this.gameHeight*-1;
        }
        


    }

    setCamera(){
        this.mode = 1; // 0 = direct, 1 = physics
        
        this.cameras.main.setBounds(0, 0, 240, 210);
        //this.cameras.main.ignore(this.player);
        //this.cameras.main.startFollow(this.player.sprite, true);
        this.cameras.main.setZoom(5);
    
    }

    createTileMap(){
        console.log(this.cache.tilemap.get('map').data);
        this.map = this.make.tilemap({ key: 'map' });
        this.tiles = this.map.addTilesetImage('Tileset', 'tiles');
        this.layerAgua01 = this.map.createLayer("Agua2", this.tiles, 0, -480).setDepth(-2);
        this.layerAgua02 = this.map.createLayer("Agua", this.tiles, 0, -1160).setDepth(-2);
        this.layerNubes01 = this.map.createLayer("Nubes", this.tiles, 0, -480).setDepth(-1).setAlpha(0.95);
        this.layerNubes02 = this.map.createLayer("Nubes2", this.tiles, 0, -1160).setDepth(-1).setAlpha(0.95);
       
    }

    pintaUI(){
        this.uiManager.ponScores();
    }
}