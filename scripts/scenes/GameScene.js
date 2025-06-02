//Hacemos un import de todos los managers

//Importamos enemigos y player
import Player from "./../player/Player.js"
import Bullet from "./../bullets/Bullet.js"
import { EnemyManager } from '../managers/EnemyManager.js';

//Importamos los distintos managers que necesitaremos
import { SoundManager } from "./../managers/SoundManager.js"
import { VFXsManager } from "../managers/VFXsManager.js";
import { UIManager } from "../managers/UIManager.js";
import { CollisionManager } from "./../managers/CollisionManager.js"

export default class GameScene extends Phaser.Scene
{
    constructor()
    {
        super('GameScene');
        
        this.distanciaRecorrida=0;
        this.aumentoDistancia=2;
    }

    preload()
    {
        //Hacemos carga de recursos que no hayamos cargado previamente en PreloadScene.js ni en BootScene.js
        
        //Vamos a tomar las dimensiones de la ventana de juego, que nos servirá más adelante
        this.gameWidth = this.sys.game.canvas.width
        this.gameHeight = this.sys.game.canvas.height
    }

    create()
    {
        // Inicializar jugador, enemigos, balas, etc.
        this.player = new Player(this,120,230); //120 x 240

        //Instanciamos los distintos managers
        this.soundManager = new SoundManager(this);
        this.vfxManager = new VFXsManager(this);
        this.uiManager = new UIManager(this);
        //Establecemos los límites dentro del canvas
        this.physics.world.setBounds(0,0,240,210,true,true);

        //this.projectiles = this.add.group();
        this.projectiles = this.physics.add.group(
        {
            classType: Bullet//,
            //runChildUpdate: true
        });
        
        
        this.enemyManager = new EnemyManager(this);

        this.collisionManager = new CollisionManager(
            this,
            this.player,       
            this.projectiles,         // el grupo PHYSICS de balas del jugador
            this.enemyManager.enemies, // el grupo PHYSICS de enemigos (todavía vacío)
            this.enemyManager.disparos,
            this.enemyManager.torretas
        );
        this.collisionManager.setupCollisions();

        this.time.delayedCall(1000, () => this.enemyManager.spawnNivel01());

        
        //console.warn("Player X", this.player.sprite.x);
        //console.warn("Enemy X", this.enemyManager.enemies[0].x);
        // Colisiones.
/*        this.collisionManager = new CollisionManager(
            this,
            this.player.sprite,
            this.enemyManager.enemies.list,
            this.projectiles
            //this.enemiesGroup
        );
        this.collisionManager.setupCollisions();
*/
        
        //this.collisionManager = new CollisionManager(this);
        //this.collisionManager.setupCollisions();

        this.setCamera();
        this.pintaUI();
        
        this.soundManager.playMainTheme();

        this.createTileMap();


        
        
		// collider
		//this.physics.add.collider(this.player.sprite, this.enemyManager.enemies, this.jugadorVSenemigos, undefined, this);

        
		//this.physics.add.collider(this.player.sprite, this.enemyManager.disparos, this.jugadorVSdisparos, undefined, this);
        
        this.physics.add.overlap(this.projectiles, this.enemyManager.torretas, this.disparosVSTorretas, null, this);
        
    }

    update()
    {
        // Lógica principal del juego
        
        //Aumentamos la distancia recorrida
        this.distanciaRecorrida+=this.aumentoDistancia;
        //console.log(this.distanciaRecorrida);
        //Llamamos al método update del player
        this.player.update();

        this.enemyManager.update();

        //Iteramos por los gameObjects contenidos en el grupo de disparos...
        for(var i=0;i<this.projectiles.getChildren().length;i++)
        {
            
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


        if(this.layerAgua01.y>256)
        {
            this.layerAgua01.y=this.gameHeight*-1;
        }

        if(this.layerAgua02.y>256)
        {
            this.layerAgua02.y=this.gameHeight*-1;
        }
        if(this.layerNubes01.y>256)
        {
            this.layerNubes01.y=this.gameHeight*-1;
        }

        if(this.layerNubes02.y>256)
        {
            this.layerNubes02.y=this.gameHeight*-1;
        }
        


    }

    setCamera()
    {
        this.mode = 1; // 0 = direct, 1 = physics
        
        this.cameras.main.setBounds(0, 0, 240, 210);
        //this.cameras.main.ignore(this.player);
        //this.cameras.main.startFollow(this.player.sprite, true);
        this.cameras.main.setZoom(4);
    
    }

    createTileMap()
    {
        console.log(this.cache.tilemap.get('map').data);
        this.map = this.make.tilemap({ key: 'map' });
        this.tiles = this.map.addTilesetImage('Tileset', 'tiles');
        this.layerAgua01 = this.map.createLayer("Agua2", this.tiles, 0, -480).setDepth(-2);
        this.layerAgua02 = this.map.createLayer("Agua", this.tiles, 0, -1160).setDepth(-2);
        this.layerNubes01 = this.map.createLayer("Nubes", this.tiles, 0, -480).setDepth(-1).setAlpha(0.95);
        this.layerNubes02 = this.map.createLayer("Nubes2", this.tiles, 0, -1160).setDepth(-1).setAlpha(0.95);
    }

    pintaUI()
    {
        this.uiManager.ponScores();
        this.uiManager.ponHealthBar();
        this.uiManager.ponVidas();
    }

    
    jugadorVSenemigos()
    {
        console.error("¡COLISIÓN!");
    }

    jugadorVSdisparos()
    {
        console.error("IMPACTO!");
    }
    
    //this.physics.add.overlap(this.projectiles, this.enemyManager.torretas, this.disparosVSTorretas, null, this);
    disparosVSTorretas(bullet, torreta)
    {
        console.error("TORRETA!");
        console.error("Vida de la Torreta antes del Impacto: ", torreta.vida);
        
        // Desactivar la bala
    if (bullet.active)
        {
            bullet.disableBody(true, true);
        }
    
        // Restaremos la vida correspondiente al daño de las Bullets.
        //torreta.vida -= bullet.danyo;
        torreta.vida -= 10;
    
        if (torreta.vida <= 0)
        {
            // VFX
            if (this.vfxManager)
            {
                this.vfxManager.playSmallExplosion(torreta.x, torreta.y);
            }
    
            // SFX
            if (this.soundManager)
            {
                this.soundManager.playSmallExplosion();
            }
    
            // Destruiremos el sprite y lo sustituiremos por la zona de torreta destruida.
            
            // Pararemos el timer de disparo que se le ha asignado a todas las armas.
            if (torreta.timerDisparo)
            {
                torreta.timerDisparo.remove(false);
            }
    
            torreta.destroy();
            this.uiManager.sumaScoreP1(100);
            console.warn("TORRETA DESTRUIDA");
            const quedan = this.enemyManager.torretas.countActive(true);
            if (quedan === 0) 
            {
                // Ya no hay ninguna torreta viva: pasar a escena de victoria
                console.warn("NO QUEDAN MAS TORRETAS; JEFE MUERTO, ESCENA WIN");
                
                this.scene.start('CreditsScene');
            }
        }
        else
        {
            // VFX
            if (this.vfxManager)
            {
                this.vfxManager.playSmallExplosion(torreta.x, torreta.y);
            }
            // SFX
            if (this.soundManager)
            {
                this.soundManager.playBulletImpact();
            }
        }
    }

    /*
    handlePlayerBulletTorretasCollision(bulletSprite, torretasEnemigo)
    {
        console.log("Colisión entre BalaJugador y Torreta");
        // Desactivar la bala
        if (bulletSprite.active)
        {
            bulletSprite.disableBody(true, true);
        }

        // Efectos de VFX
        if (this.scene.vfxManager)
        {
            this.scene.vfxManager.playSmallExplosion(torretasEnemigo.x, torretasEnemigo.y);
        }
        // Efectos de SFX
        if (this.scene.soundManager)
        {
            this.scene.soundManager.playBulletImpact();
        }
    }*/
}