
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
import { Enemy } from '../enemies/Enemy.js';
/* END-USER-IMPORTS */

export default class Avion04 extends Enemy {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "Avion04", frame ?? 0);

		scene.physics.add.existing(this, false);
		this.body.setOffset(6, 2);
		this.body.setCircle(10);
		this.play("Avion04");

		/* START-USER-CTR-CODE */
		// Write your code here.
		//this.enemigoTipo = "normal";		// "normal", "miniboss" ó "boss".
		//this.configurarTipo();


		//this.enemigoTipo = "normal";		// "normal", "miniboss" ó "boss".
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

	// Write your code here.

	preUpdate(time, delta)
	{
        //console.log("Avion04.js - preUpdate()");
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
