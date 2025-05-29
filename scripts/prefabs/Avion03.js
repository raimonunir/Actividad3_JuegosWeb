
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
import { Enemy } from '../enemies/Enemy.js';
/* END-USER-IMPORTS */

export default class Avion03 extends Enemy {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "Avion03-sheet", frame ?? 0);

		scene.physics.add.existing(this, false);
		this.body.setOffset(6, 2);
		this.body.setCircle(10);
		this.play("Avion03");

		/* START-USER-CTR-CODE */
		// Write your code here.
		//this.enemigoTipo = "normal";		// "normal", "miniboss" ó "boss".
		//this.configurarTipo();

		this.ignorarDescenso = true;
		// Obtener el jugador de la escena.
        const jugador = scene.jugador;

        if (jugador)
		{
        	console.log("Jugador encontrado: ", this.jugador);
            // Calcular dirección desde el enemigo al jugador (en el momento del spawn)
            const direccionX = jugador.x - this.x;
            const direccionY = jugador.y - this.y;

            // Calcular módulo (distancia) para normalizar
            const distancia = Math.sqrt(direccionX * direccionX + direccionY * direccionY);

            // Normalizar y multiplicar por velocidad deseada
            const velocidad = 100; // píxeles por segundo
            this.body.setVelocity((direccionX / distancia) * velocidad, (direccionY / distancia) * velocidad);
        }
		else
		{
        	console.log("Jugador perdido: ", this.jugador);
		}

		//this.enemigoTipo = "normal";		// "normal", "miniboss" ó "boss".
		/* END-USER-CTR-CODE */
	}

	/** @type {number} */
	velocidadX = 20;
	/** @type {number} */
	velocidadY = 40;
	/** @type {number} */
	distancia = 20;
	/** @type {"normal"|"miniboss"|"boss"} */
	enemigoTipo = "normal";

	/* START-USER-CODE */
	// Write your code here.
	
	preUpdate(time, delta)
	{
        //console.log("Avion03.js - preUpdate()");
		super.preUpdate(time, delta);

		if (!this._iniciado)
		{
			this._iniciado = true;
			this.start();
		}
	}

	start()
	{
		// Se llama cuando todo está listo, incluso las propiedades del editor
		if (!this.enemigoTipo)
		{
			this.enemigoTipo = "normal";
		}

		this.configurarTipo();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
