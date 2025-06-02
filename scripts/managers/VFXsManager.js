export class VFXsManager{
    constructor(scene){
        this.scene=scene;
        this.gameObject;

        //Animación para la explosión pequeña
        this.scene.anims.create({
            key: 'SmallExplosion',    
            frames: this.scene.anims.generateFrameNumbers('VFXExplosionSmall', { start: 0, end: 7 }),
            frameRate: 50,
            repeat: 0
        });
    }

    //Reproducimos el efectito ese de recibir daño
    playSmallExplosion(x,y){
        //const smallExplosion = this.scene.physics.add.sprite(x,y,"");
        // Evitar que la física realice una colisión indeseada.
        const smallExplosion = this.scene.add.sprite(x,y,"VFXExplosionSmall");
        smallExplosion.play("SmallExplosion",true).once('animationcomplete',() => {    //Una vez que se reproduzca destruímos el gameObject
            smallExplosion.destroy();
        });
    }
}