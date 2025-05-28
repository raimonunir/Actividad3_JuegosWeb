export class SoundManager {
    constructor(scene) {
        this.scene = scene;

        this.playerShootSFX = this.scene.sound.add("playerShoot");
        this.mainThemeSFX = this.scene.sound.add("mainTheme");
        this.midExplosion = this.scene.sound.add("midExplosion");
        this.bulletImpact = this.scene.sound.add("bulletImpact");
    }

    //Suena el tema principal
    playMainTheme(){
        if(this.mainThemeSFX.isPlaying){
            //No hacemos nada
        }else{
            //Si no está sonando llamamos al método play(). También le establecemos el volumen para que no tralle demasiado. Esto estaría bien ponerlo como una opción a cambiar
            this.mainThemeSFX.setVolume(0.4);
            this.mainThemeSFX.loop=true;      //Queremos que esto esté sonando en bucle hasta que lo paremos nosotros              
            this.mainThemeSFX.play();
        }
    }

    // Suena el disparo del player
    playPlayerShoot() { 
        this.playerShootSFX.play();
    }

    // Suena la explosión media
    playMidExplosion() { 
        this.midExplosion.play();
    }

    // Suena el impacto de balas sobre el player o los enemigos
    playBulletImpact() { 
        this.bulletImpact.play();
    }
}