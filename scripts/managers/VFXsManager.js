export class VFXsManager{
    constructor(scene){
        this.scene=scene;
        this.gameObject;

        this.shadowVFX;
    }

    //Función para poner la sombra al player (o a los enemigos). Este vfx lo dejaremos inactivo y sólo lo activaremos cuando detectemos un overlapping con las nubes... a ver qué tal sale
    //Recibe como argumento el gameObject al que enchufarle la sombra
    vfxImpacto(x,y){
        console.log("El objeto a ponerle sombra es:");
        console.log(objeto);
        this.shadowVFX = objeto.postFX.addShadow(objeto.sprite.x,objeto,sprite.y);
        this.shadowVFX.padding=1;
    }
}