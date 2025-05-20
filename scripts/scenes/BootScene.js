export default class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    //Toda la carga de recursos se hará en el preload
    preload() {
        const progress = this.add.graphics();   //Nos creamos una primitiva gráfica para la barra de progreso
        
        //Montamos un par de eventitos de control del loader
        
        //Uno para el progreso de carga de recursos ( de ahí el string "progress")...
        this.load.on('progress', value=>{
            progress.clear();   //Limpiamos
            progress.fillStyle(0xffffff, 1);            //Lo tintamos en blanco con opacidad 100%
            progress.fillRect(5,1000,600*value,16);     //Alteramos su ancho multiplicando por value. Lo de que el 600 esté "hardcodeado" no termino de verlo pero en el ejemplo venía así.
        });

        //Otro para cuando se ha completado toda la carga (Obviamente se rige con "complete")...
        this.load.on('complete', () =>
        {
            progress.destroy();                 //Borramos la barra de progreso
            
            this.scene.start("PreloadScene");     //Cargamos la siguiente escena
        });
    }

    create() {
        //this.scene.start('PreloadScene');
    }
}