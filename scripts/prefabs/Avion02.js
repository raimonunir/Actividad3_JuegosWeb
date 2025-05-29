
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
import { Enemy } from '../enemies/Enemy.js';
/* END-USER-IMPORTS */

export default class Avion02 extends Enemy {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "Avion02-p1", frame);

		scene.physics.add.existing(this, false);
		this.body.setOffset(6, 2);
		this.body.setCircle(10);
		this.play("Avion02p");

		/* START-USER-CTR-CODE */
		// Write your code here.
		//this.enemigoTipo = "normal";		// "normal", "miniboss" ó "boss".
		/*if (this.enemigoTipo == null)
		{
			this.enemigoTipo = "normal";
		}*/
		//this.enemigoTipo ??= "normal";
		//this.configurarTipo();
		//console.log("Tipo de enemigo: ", this.enemigoTipo);

		this.body.velocity.x = this.velocidadX;

		this.inicioX = x;
		this.inicioY = y;

		/* END-USER-CTR-CODE */
	}

	/** @type {number} */
	velocidadX = 50;
	/** @type {number} */
	velocidadY = 20;
	/** @type {number} */
	distancia = 20;
	/** @type {"normal"|"miniboss"|"boss"} */
	enemigoTipo = "normal";

	/* START-USER-CODE */
	/*create()
	{
		console.log("He entrado.");
		//this.configurarTipo();
	}*/


	// Write your code here.

	preUpdate(time, delta)
	{
        //console.log("Avion02.js - preUpdate()");
		super.preUpdate(time, delta);

		if (!this._iniciado)
		{
			this._iniciado = true;
			this.start();
    	}

		this.movimientoHorizontal();
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

	// Movimiento izquierda y derehca.
    movimientoHorizontal()
    {
		//console.log("Avion02p.js - movimientoHorizontal()");

		// El momento en que el enemigo ya no exista, no intentará ejecutar el movimiento y no dará fallo.
		if (!this.body)
		{
			// El enemigo ya no existe
        	//console.log("Avion02p.js - movimientoHorizontal() - this.body");
			return;
		}

        if (this.body.velocity.x > 0 && this.x > this.inicioX + this.distancia)
        {
			//console.log("Avion02p.js - movimientoHorizontal() - DENTRO IF");
            this.body.velocity.x = this.velocidadX * -1;

        }
        else if (this.body.velocity.x < 0 && this.x < this.inicioX - this.distancia)
        {
			//console.log("Avion02p.js - movimientoHorizontal() - DENTRO ELSE IF");
            this.body.velocity.x = this.velocidadX;
        }

        // Hacemos que la animación vaya en la dirección correcta.
        this.flipX = this.body.velocity.x < 0;
    }

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
