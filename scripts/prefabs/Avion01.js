
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
import { Enemy } from '../enemies/Enemy.js';
/* END-USER-IMPORTS */

export default class Avion01 extends Enemy {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "Avion01-sheet", frame ?? 0);

		this.flipY = true;
		scene.physics.add.existing(this, false);
		this.body.setSize(15, 13, false);
		this.play("Avion01-Sheet");

		/* START-USER-CTR-CODE */
		// Write your code here.
		//this.enemigoTipo = "normal";		// "normal", "miniboss" ó "boss".
		//this.configurarTipo();
		//console.log("Tipo de enemigo: ", this.enemigoTipo);
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
        //console.log("Avion01p.js - preUpdate()");
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
