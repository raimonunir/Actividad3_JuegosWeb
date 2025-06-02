

import { TipoEnemigo } from '../enemies/EnemyType.js';


export class Enemy extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y, texture, frame)
    {
        super(scene, x, y, texture, frame);

        //this.scene = scene;
        this.scene = scene;
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setActive(true);
        this.setVisible(true);

         // Podemos clickar al enemigo para comprobar la animación de la explosión.
        this.setInteractive();

        this.on('pointerdown', () =>
        {
            this.recibirDanyo(999);
        });
    }

    velocidadX = 50;
    velocidadY = 40;
    distancia = 20;

    vida = 10;
    vidaMiniBoss = 50;
    vidaBoss = 100;
	/** @type {"normal"|"miniboss"|"boss"} */
	enemigoTipo = "normal";
    ignorarDescenso = false;

    anchoPantalla = 240;
    altoPantalla = 210;

    preUpdate(time, delta)
    {
        //console.log("Enemy.js - preUpdate()");
        super.preUpdate(time, delta);
        
        // El avión avanzará siempre hacia adelante.
        if (!this.ignorarDescenso && !this.apareciendo)
        {
            this.y += this.velocidadY * delta / 1000;
        }
		
        
        // Cuando el enemigo se salga de la pantalla por abajo, será destruido evitando gasto de memoria.
        if (this.scene && this.y > this.altoPantalla + this.height && !this.apareciendo)
        //if (this.y > this.scene.cameras.main.height - 200)
        {
            //console.log("Enemy.js - preUpdate() - destroy()");
            this.destroy();
            //this.morir();
        }
        
    }

    recibirDanyo(cantidad)
    {
        console.log("Enemy.js - recibirDanyo()");

        console.log("Vida antes de recibir daño: ", this.vida);
        this.vida -= cantidad;
        console.log("Vida tras el daño: ", this.vida);

        if (this.vida <= 0)
        {
            this.morir();
        }
    }

    morir()
    {
        //console.log("Enemy.js - morir()");

        
        // Creamos la explosión en la posición del enemigo.
        const explosion = this.scene.add.sprite(this.x, this.y, "ExplosionAtlas");
        explosion.play("Explosion");
        //this.anims.play("Explosion");

        explosion.once("animationcomplete", () =>
        {
            explosion.destroy();
        });

        // Destruimos el enemigo original
        this.destroy();
    }

    configurarTipo()
    {
        //console.log("Enemy.js - configurarTipo()");
		//console.log("Tipo de enemigo: ", this.enemigoTipo);

        switch (this.enemigoTipo)
        {
            case TipoEnemigo.MINIBOSS:
                this.tipoMiniBoss();
            break;
            case TipoEnemigo.BOSS:
                this.tipoBoss();
            break;
        }
    }

    tipoMiniBoss()
    {
		this.scaleX = 1.5;
		this.scaleY = 1.5;

        this.vida *= this.vidaMiniBoss;
    }
    
    tipoBoss()
    {
        // Hace que el avión no descienda en todo momento, ya que es un boss y se quedará hasta morir.
        this.ignorarDescenso = true;
        // Le damos la vuelta al sprite, porque el enemigo se mantendrá a la misma velocidad, entonces deben ir en la misma dirección. 
        this.flipY = 1;

		this.scaleX = 2;
		this.scaleY = 2;

        this.vida *= this.vidaBoss;
    }
}
