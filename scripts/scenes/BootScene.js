export default class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
        this.textoCarga;
        this.tuit;
    }

    //Toda la carga de recursos se hará en el preload
    preload() {
        const progress = this.add.graphics();   //Nos creamos una primitiva gráfica para la barra de progreso
        
        this.textoCarga = this.add.text(5,195*5,"Cargando recursos...");

        //this.tuin=

        
        var valorAnterior=0;

        //Uno para el progreso de carga de recursos ( de ahí el string "progress")...
        this.load.on('progress', value=>{   //value va a ir desde cero a uno
            progress.clear();   //Limpiamos
            progress.fillStyle(0xffffff, 1);            //Lo tintamos en blanco con opacidad 100%
            progress.fillRect(5,200*5,(240*5*valorAnterior)-10,16);     //Alteramos su ancho (que será el del with del juego) multiplicando por value y esto hace la magia de que la barra vaya "creciendo"
            //console.log("Valor anterior:"+valorAnterior+" Nuevo valor:"+value);
            valorAnterior=value;
            this.tweens.add({
                
                targets:this.textoCarga,
                alpha:0.5,
                duration:500,
                yoyo:-1,
                onComplete: (tween, target, param) => {
                    progress.clear();   //Limpiamos
                    progress.fillRect(5,200*5,(240*5*value)-10,16); 
                },
                
            });
            
        });

        //Otro para cuando se ha completado toda la carga (Obviamente se rige con "complete")...
        this.load.on('complete', () =>
        {
            
            
            this.tweens.add({
                
                targets:progress,
                fillStyle:"0x00ff00",
                duration:1000,
                
                onStart: (tween, target, param) => {
                    this.textoCarga.setText("Carga completa");
                    progress.clear();   //Limpiamos
                    progress.fillStyle(0x33ff33, 1);            //Lo tintamos en blanco con opacidad 100%
                    progress.fillRect(5,200*5,(240*5*1)-10,16);     
                },
                onComplete: (tween, target, param) => {
                    
                    this.scene.start("PreloadScene");     //Cargamos la siguiente escena      
                },
                
            });
            
        });

        //Cargamos los distintos assets que vamos a necesitar (sprites, spritesheets, sonidos y música)
        
        this.textoCarga.setText("Cargando spritesheets...");

        //** SPRITESHEETS **/
        this.load.spritesheet('playerAnims', 'assets/spritesheets/player/playerAnims.png', { frameWidth: 48, frameHeight: 48 });                //Anims del player
        this.load.spritesheet('playerBullets', 'assets/spritesheets/bullets/PlayerBullets.png', { frameWidth: 32, frameHeight: 32 });           //Anims para los disparos del player
        this.load.spritesheet('VFXExplosionSmall', 'assets/spritesheets/VFXs/VFXSmallExplosion.png',{frameWidth:16, frameHeight: 16});          //Anims de las explosiones pequeñas
        this.load.spritesheet('gameOver', 'assets/spritesheets/UI/gameOverAnim.png',{frameWidth:240, frameHeight: 210});                        //Anims de GameOver
        


        this.textoCarga.setText("Cargando sprites individuales...");

        //** SPRITES **/
        this.load.image('energyBar', 'assets/images/energyBar.png');                        //Sprite para la barra de energía
        this.load.image('energyBarContainer', 'assets/images/energyBarContainer.png');      //Sprite para el contenedor de la barra de energía
        this.load.image('vidaSprite', 'assets/images/lifeSprite.png');                      //Sprite para la vida del player
        this.load.image('gameOverSprite', 'assets/images/gameOverSprite.png');                      //Sprite para la vida del player

        this.textoCarga.setText("Cargando sonidos...");

        //** SONIDOS **/
        
        this.load.audio('mainTheme', 'assets/audio/themes/CAWunused.mp3');          //Tema principal
        this.load.audio('gameOverTheme', 'assets/audio/themes/CAWGameOver.mp3');         //Tema para el GameOver
        this.load.audio('victoryTheme', 'assets/audio/themes/CAWVictory.mp3');          //Tema de victoria para el ending
        this.load.audio('playerShoot', 'assets/audio/SFXs/playerShoot.wav');        //Disparo del player
        this.load.audio('midExplosion', 'assets/audio/SFXs/midExplosion.wav');      //Explosión media
        this.load.audio('bulletImpact', 'assets/audio/SFXs/bulletImpact.wav');      //Impacto de bala sobre el player o un enemigo
        this.load.audio('smallExplosion', 'assets/audio/SFXs/SmallExplosion.wav');  //Explosión pequeña
        this.load.audio('midExplosion', 'assets/audio/SFXs/MidExplosion.wav');      //Explosión mediana
        this.load.audio('bigExplosion', 'assets/audio/SFXs/BigExplosion.wav');    //Impacto de bala sobre el player o un enemigo
        this.load.audio('getItem', 'assets/audio/SFXs/getItem.wav');                //Cogemos un powerup o iniciamos el juego desde el menú principal (sirve para las dos cosas)
        this.load.audio('enemyShoot', 'assets/audio/SFXs/enemyShot.wav');            //Impacto de bala sobre el player o un enemigo

        this.textoCarga.setText("Cargando mapa de tiles...");

        //** TILEMAP **/
        this.load.image("tiles","assets/tilemap/Tileset.png");
        this.load.tilemapTiledJSON("map","assets/tilemap/unir1943.json");


        this.textoCarga.setText("Cargando fuentes...");

        //** FUENTES **/    //Creadas con el software BMPFont, con mucho ensayo y error a partir de la fuente "Emulogic"
        this.load.bitmapFont('blackOutlineFont', 'assets/fonts/fuenteOutLineNegro.png', 'assets/fonts/fuenteOutLineNegro.fnt');
        this.load.bitmapFont('redOutlineFont', 'assets/fonts/fuenteOutLineRojo.png', 'assets/fonts/fuenteOutLineRojo.fnt');

    }

    create() {
        //this.textoCarga = this.add.text(5,195*5,"Cargando recursos...");
        //this.textoCarga.setText("Podemos alterar el texto sin problemas");
        
        
    }

    update() {

    }

}