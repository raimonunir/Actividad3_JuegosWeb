export class SoundManager {
    constructor(scene) {
        this.scene = scene;

        this.playerShootSFX = this.scene.sound.add("playerShoot");
        this.enemyShootSFX = this.scene.sound.add("enemyShoot");
        this.mainThemeSFX = this.scene.sound.add("mainTheme",{volume: 0.4});
        this.smallExplosion = this.scene.sound.add("smallExplosion");
        this.midExplosion = this.scene.sound.add("midExplosion");
        this.bigExplosion = this.scene.sound.add("bigExplosion");
        this.bulletImpact = this.scene.sound.add("bulletImpact");

        this.musicVolumeValue = 0.4;
        this.sFXVolume = 1.0;
        this.getItem = this.scene.sound.add("getItem");
        this.gameOver = this.scene.sound.add("gameOverTheme");
        this.victory = this.scene.sound.add("victoryTheme");
    }

    stopAllSounds(){
        this.scene.sound.removeAll();
        
        /*
        this.scene.sound.stopByKey('playerShoot');
        this.scene.sound.stopByKey('enemyShoot');
        this.scene.sound.stopByKey('mainTheme');
        this.scene.sound.stopByKey('smallExplosion');
        this.scene.sound.stopByKey('midExplosion');
        this.scene.sound.stopByKey('bigExplosion');
        this.scene.sound.stopByKey('bulletImpact');
        this.scene.sound.stopByKey('getItem');
        this.scene.sound.stopByKey('gameOverTheme');
        this.scene.sound.stopByKey('victoryTheme');

        this.mainThemeSFX.destroy();
        this.playerShootSFX.destroy();
        this.enemyShootSFX = "";
        
        this.smallExplosion = "";
        this.midExplosion = "";
        this.bigExplosion = "";
        this.bulletImpact = "";
        this.getItem = "";
        this.gameOver = "";
        this.victory = "";
        */
    }


    //Suena el tema principal
    playMainTheme(){
        if(this.mainThemeSFX.isPlaying){
            //No hacemos nada
        }else{
            //Si no está sonando llamamos al método play(). También le establecemos el volumen para que no tralle demasiado. Esto estaría bien ponerlo como una opción a cambiar
            this.mainThemeSFX.setVolume(this.musicVolumeValue);
            this.mainThemeSFX.loop=true;      //Queremos que esto esté sonando en bucle hasta que lo paremos nosotros              
            this.mainThemeSFX.play();
        }
    }

    stopMainTheme(){
        this.mainThemeSFX.stop();
    }


    updateMusicVolume(newVolume) {
        this.musicVolumeValue = newVolume;
        this.mainThemeSFX.setVolume(newVolume);
        console.log("MusicVolume: "+this.musicVolumeValue);
    }

    updateSFXVolume(newVolume){
        this.sFXVolume = newVolume;
        this.playerShootSFX.setVolume(newVolume);
        this.midExplosion.setVolume(newVolume);
        this.bulletImpact.setVolume(newVolume);
    }

    stopMainTheme(){
        if(this.mainThemeSFX.isPlaying){
            this.mainThemeSFX.stop();
        }
    }

    playGameOverTheme(){
        if(this.gameOver.isPlaying){
            //No hacemos nada
        }else{
            //Si no está sonando llamamos al método play(). También le establecemos el volumen para que no tralle demasiado. Esto estaría bien ponerlo como una opción a cambiar
            this.gameOver.setVolume(0.4);
            this.gameOver.loop=false;      //Sólo debería sonar una vez
            this.gameOver.play();
        }
    }

    playVictoryTheme(){
        if(this.victory.isPlaying){
            //No hacemos nada
        }else{
            //Si no está sonando llamamos al método play(). También le establecemos el volumen para que no tralle demasiado. Esto estaría bien ponerlo como una opción a cambiar
            this.victory.setVolume(0.4);
            this.victory.loop=false;      //Sólo debería sonar una vez
            this.victory.play();
        }
    }

    // Suena el disparo del player
    playPlayerShoot() { 
        this.playerShootSFX.play();
    }

    // Suena el disparo del enemigo
    playEnemyShoot() { 
        this.enemyShootSFX.play();
    }

    // Suena la explosión media
    playSmallExplosion() { 
        this.smallExplosion.play();
    }

    // Suena la explosión media
    playMidExplosion() { 
        this.midExplosion.play();
    }

    // Suena la explosión grande
    playBigExplosion() { 
        this.bigExplosion.play();
    }

    // Suena el impacto de balas sobre el player o los enemigos
    playBulletImpact() { 
        this.bulletImpact.play();
    }

    // Suena el efecto de conseguir un powerup
    playGetItem() { 
        this.getItem.play();
    }
}
