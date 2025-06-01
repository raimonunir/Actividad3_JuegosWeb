export class UIManager{
    constructor(scene){
        this.scene=scene;
        this.gameObject;
        //Para el hi-score...
        this.hi_score=9000;
        this.hi_scoreTXT;
        
        //Para la puntuación del player...
        this.p1Score=0;
        this.p1ScoreTXT;

        //Sprites para las vidas que tiene el player
        this.vida1;
        this.vida2;
        

        this.tickTiempo=0;  //Esto lo necesitaré más adelante para hacer el efecto parpadeante cuando estamos muy tocados de vida
        
        //Para la barra de energía y el cuadro contenedor...
        this.energyBar;
        this.energyBarContainer;
        this.vidaEnPeligro=false;       //booleano para marcar a true cuando la vida caiga por debajo de cierto umbral (25 podría estar bien)
        this.puntosEnPeligro=25;           //Si la vida es igual o menor a este valor estaremos en peligro            

        //Tomamos la energía máxima y actual del player para determinar porcentajes y hacer así un "crop" al sprite de la barra de energía en sí.
        this.currentEnergy=this.scene.player.currentEnergy;
        this.maxEnergy = this.scene.player.maxEnergy;

        //Animación UI de GameOver
        this.scene.anims.create({
            key: 'gameOver',    
            frames: scene.anims.generateFrameNumbers('gameOver', { start: 0, end: 21 }),
            frameRate: 15,
            repeat: 0
        });
    }

    //Posicionamos el texto del score del player
    ponScores(){
        this.p1ScoreTXT = this.scene.add.bitmapText(2, 2, "blackOutlineFont", "P1-Score:"+this.p1Score);
        this.p1ScoreTXT.setFontSize(6);
        this.hi_scoreTXT = this.scene.add.bitmapText(135, 2, "redOutlineFont", "HI-Score:"+this.hi_score);
        this.hi_scoreTXT.setFontSize(6);
        
    }

    //Posicionamos el contenedor y la barrita de energía del player
    ponHealthBar(){
        this.energyBarContainer = this.scene.add.image(2,10,"energyBarContainer").setOrigin(0,0);   //Contenedor
        this.energyBar = this.scene.add.image(5,13,"energyBar").setOrigin(0,0);                     //Barra de energía (irá decreciendo conforme recibamos daño)
    }

    //Ponemos junto a la barra de energía los avioncitos que representan las vidas que tenemos
    ponVidas(){
        //Sé que esto es una manera muy cutre de mostrar las vidas pero vamos justillos de tiempo y prefiero dejarlo funcional aunque feo y no escalable
        this.vida1=this.scene.add.image(102,12,"vidaSprite").setOrigin(0,0);
        this.vida2=this.scene.add.image(116,12,"vidaSprite").setOrigin(0,0);
        this.refrescaVidas();
    }

    ocultaHealthBar(){
        this.energyBar.setVisible(false);
        this.energyBarContainer.setVisible(false);
    }

    refrescaVidas(){
        //Evaluamos las vidas del player
        const vidas = this.scene.player.vidas;

        if(vidas==0){
            this.vida1.setVisible(false);
            this.vida2.setVisible(false);
        }else if(vidas==1){
            this.vida2.setVisible(false);
            this.vida1.setVisible(true);
        }else{
            this.vida2.setVisible(true);
            this.vida1.setVisible(true);
        }
    }

    //sumamos puntos al score
    sumaScoreP1(score){
        this.p1Score+=score;
        //Vamos a intentar refrescar el texto
        this.p1ScoreTXT.setText("P1-Score:"+this.p1Score);

        if(this.p1Score>=this.hi_score){ //Si hemos alcanzado el hi-score también lo actualizamos
            this.hi_score=this.p1Score;
            this.hi_scoreTXT.setText("Hi-Score:"+this.hi_score);
        }
    }

    //Modificamos la barra de enrgía, bien porque Le pegamos un chupetón a la vida o porque la restauramos
    refrescaBarraEnergia(){    //no le pasamos ningún argumento ya que lo tomaremos del player

        const vidaTotal = this.scene.player.maxEnergy;
        const vidaActual = this.scene.player.currentEnergy;
        const porcentajeVida=(vidaActual*100)/vidaTotal;    //Qué porcentaje de vida tenemos?   Hacemos una regla de tres de toda la vida....
        
        if(vidaActual<=this.puntosEnPeligro){//evaluamos la vida del player para ver si estamos en peligro o no (tomando como comparación lo que hayamos establecido en puntosEnPeligro)
            this.vidaEnPeligro=true;
        }else{
            this.vidaEnPeligro=false;
        }

        console.log("La vida del player es:"+vidaActual);

        this.energyBar.setCrop(0,0,porcentajeVida,this.energyBar.height);
    }

    muestraSpriteGameOver(){
        const gameOverSprite = this.scene.add.sprite(120,100,"gameOverSprite");
        gameOverSprite.play("gameOver",true).once('animationcomplete',() => {    //Al completar la animación...
            this.scene.tweens.add({
                targets: gameOverSprite,
                duration:2000,
                x:gameOverSprite.x,
                onComplete:()=>{
                    //en cuanto termine el tween hacemos un fadeout
                    this.scene.cameras.main.fadeOut(1000, 0, 0, 0, () => {
                        this.scene.cameras.main.on('camerafadeoutcomplete', () => { //...y en cuanto termine el fadeOut
                            this.scene.soundManager.stopAllSounds();
                            this.scene.scene.start('BootScene');
                        }, this);
                    });
                }
            });
            
        });   

    }

    update(){   //recuerda que esto lo tienes que llamar de forma explícita desde la escena
        
        if(this.vidaEnPeligro==true){

            if(Phaser.Math.RoundTo(this.tickTiempo)%2===0){
                this.energyBarContainer.setTint(0xff0000);
            }else{
                this.energyBarContainer.clearTint();
            }

            this.tickTiempo+=this.scene.game.loop.delta;
        }else{
            this.energyBarContainer.clearTint();
        }
    }


}