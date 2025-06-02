
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
import { Enemy } from '../enemies/Enemy.js';
/* END-USER-IMPORTS */

export default class Avion04 extends Enemy {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "Avion04-sheet", frame ?? 0);

		this.flipY = true;
		scene.physics.add.existing(this, false);
		this.body.setSize(31, 26, false);
		this.play("Avion04-Sheet");

		/* START-USER-CTR-CODE */
		// Write your code here.
		//this.enemigoTipo = "normal";		// "normal", "miniboss" ó "boss".
		//this.configurarTipo();
		this.delay = 500;
		this.velDisparo = 150;

		//this.enemigoTipo = "normal";		// "normal", "miniboss" ó "boss".
		/* END-USER-CTR-CODE */
	}

	/** @type {number} */
	velocidadX = 20;
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
		
		//const disparo = this.scene.physics.add.sprite(arma.x, arma.y, config.sprite || 'Disparo01', 0);
	}

	start()
	{
		// Se llama cuando todo está listo, incluso las propiedades del editor
		if (!this.enemigoTipo)
		{
			this.enemigoTipo = "normal";
		}

		this.configurarTipo();

		//this.iniciarDisparo();
		this.dispararAlJugador();
	}

	iniciarDisparo()
	{
		// Lanza un disparo cada "this.delay" milisegundos
		this.scene.time.addEvent({
			delay: this.delay,
			callback: this.dispararAlJugador,
			callbackScope: this,
			loop: true
		});
	}


	dispararAlJugador()
	{
		
		if (!this.scene.player)
		{
			console.warn('Jugador no encontrado.');
			return;
		}
		//else
		//{
			//console.log("Jugador encontrado: ", this.scene.player);
		//}
		
		if (!this.disparoTimer)
		{
			this.disparoTimer = this.scene.time.addEvent(
				{
				delay: this.delay, //1000, // Un disparo cada 1 segundo (ajustable)
				callback: () =>
				{
					if (!this.active) return; // Si el enemigo ha sido destruido, no hacer nada.
					this.dispararBalaDesdeEnemigo();
				},
				loop: true
			});
		}
	}

	dispararBalaDesdeEnemigo()
	{
		// Creamos el disparo con físicas.
		const disparo = this.scene.physics.add.sprite(this.x, this.y, 'Disparo01', 0);

		// Agregamos el disparo a la pool y luego lo redireccionamos.
		this.scene.enemyManager.disparos.add(disparo);

		disparo.setActive(true);
		disparo.setVisible(true);
		// Desactivamos la gravedad por si acaso-
		disparo.body.setAllowGravity(false);

		// Obtenemos la posición del jugador.
		const jugador = this.scene.player.sprite;
		const objetivoX = jugador.x;
		const objetivoY = jugador.y;
		//console.log("Jugador X: ", objetivoX);

		// Calculamos la dirección hacia el jugador...
		const direccionX = objetivoX - this.x;
		const direccionY = objetivoY - this.y;
		const magnitud = Math.sqrt(direccionX * direccionX + direccionY * direccionY);
		const dirX = direccionX / magnitud;
		const dirY = direccionY / magnitud;

		// Aplicamos la velocidad al disparo...
		//disparo.body.velocity.x = dirX * this.velDisparo;
		//disparo.body.velocity.y = dirY * this.velDisparo;
		// Aplicamos la velocidad al disparo...
		disparo.setVelocity(dirX * this.velDisparo, dirY * this.velDisparo);
		
		this.scene.add.existing(disparo); // Asegura que está en el mundo, no dentro del enemigo
		
		// Le damos tiempo de vida al disparo para destruirlo sin necesidad de que salga de pantalla:
		this.scene.time.delayedCall(3000, () =>
		{
			if (disparo.active)
			{
				//console.warn("Avion 4 Disparo PUFFF!!!");
				disparo.destroy();
			}
		});
	}
	/* END-USER-CODE */
}



/* END OF COMPILED CODE */

// You can write more code here
