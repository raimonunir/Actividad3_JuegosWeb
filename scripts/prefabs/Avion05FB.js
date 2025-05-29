
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
import { Enemy } from '../enemies/Enemy.js';
/* END-USER-IMPORTS */

export default class Avion05FB extends Enemy {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "Avion05FBa", frame);

		scene.physics.add.existing(this, false);
		this.body.setOffset(4, 2);
		this.body.setCircle(12);

		/* START-USER-CTR-CODE */
		// Write your code here.
		//this.enemigoTipo = "normal";		// "normal", "miniboss" ó "boss".
		this.configurarTipo();
		this.flipY = 0;

		this.scaleX = 3;
		this.scaleY = 3;

		// Tomamos la vida del ENEMY y la Multiplica * X = ¿x?
        this.vida *= 5;


		// Crear armas como sprites independientes
		this.armas = [];

		this.armaVida = 30;
		//
		const armaIzq = scene.physics.add.sprite(this.x - 0, this.y, 'ArmaTorreta01-Fill', 0);
		armaIzq.vida = this.armaVida;
		armaIzq.setImmovable(true);
		this.armas.push(armaIzq);

		const armaDer = scene.physics.add.sprite(this.x + 0, this.y, 'ArmaTorreta01-Fill', 0);
		armaDer.vida = this.armaVida;
		armaDer.setImmovable(true);
		this.armas.push(armaDer);

		//
		const armaIzqTF = scene.physics.add.sprite(this.x - 0, this.y, 'ArmaTorreta01-Fill', 1);
		armaIzqTF.vida = this.armaVida;
		armaIzqTF.setImmovable(true);
		this.armas.push(armaIzqTF);

		const armaDerTF = scene.physics.add.sprite(this.x + 0, this.y, 'ArmaTorreta01-Fill', 1);
		armaDerTF.vida = this.armaVida;
		armaDerTF.setImmovable(true);
		this.armas.push(armaDerTF);

		this.iniciarAparicion();

		//this.body.velocity.x = this.velocidadX;

		this.movimientoActivo = false;
		this.inicioX = x;
		this.inicioY = y;

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
	enemigoTipo = "boss";

	/* START-USER-CODE */

	// Write your code here.

	movimientoActivo = false;

	offsetX = 0;
	offsetY = 0;

	
	/*start()
	{
		// Se llama cuando todo está listo, incluso las propiedades del editor
		if (!this.enemigoTipo)
		{
			this.enemigoTipo = "normal";
		}

		this.configurarTipo();
	}*/

	preUpdate(time, delta)
	{
		super.preUpdate(time, delta);

		/*if (!this._iniciado)
		{
			this._iniciado = true;
			this.start();
		}*/

		//console.log("Movimiento Activo? ", this.movimientoActivo);
		if (this.movimientoActivo)
		{
        	//console.log("Se puede mover.");
			this.movimientoHorizontal();
		}


		// Actualizar la posición de las armas
		if (this.armas.length > 0)
		{

			// Calculamos la escala y le aplicamos una modificación a gusto.
			const armaEscalaX = this.scaleX * 0.5;
			const armaEscalaY = this.scaleY * 0.5;


			// Desfase o Desplazamiento de la Posición relativa según la Escalada del Avión.
			this.offsetX = 4 * this.scaleX;
			this.offsetY = -5.5 * this.scaleY;


			// Arma Izquierda
			this.armas[0].setPosition(this.x - this.offsetX, this.y + this.offsetY);
    		this.armas[0].setScale(armaEscalaX, armaEscalaY);
        	//console.log("Posición Avion OffSetX: ", this.armas[0].setScale(armaEscalaX, armaEscalaY));

			// Arma Derecha
			this.armas[1].setPosition(this.x + this.offsetX, this.y + this.offsetY);
    		this.armas[1].setScale(armaEscalaX, armaEscalaY);


			this.offsetX = 10 * this.scaleX;
			this.offsetY = -2 * this.scaleY;

			// Arma Izquierda Secundaria
			this.armas[2].setPosition(this.x - this.offsetX, this.y + this.offsetY);
    		this.armas[2].setScale(armaEscalaX, armaEscalaY);

			// Arma Derecha Secundaria
			this.armas[3].setPosition(this.x + this.offsetX, this.y + this.offsetY);
    		this.armas[3].setScale(armaEscalaX, armaEscalaY);

			//this.body.checkCollision.none = true;
			if (this.armas[0].body)
			{
    			this.armas[0].body.checkCollision.none = true;
			}
		}
	}


	movimientoHorizontal()
    {
		//console.log("Avion05.js - movimientoHorizontal()");

		// El momento en que el enemigo ya no exista, no intentará ejecutar el movimiento y no dará fallo.
		if (!this.body)
		{
			// El enemigo ya no existe
        	//console.log("Avion05.js - movimientoHorizontal() - this.body");
			return;
		}

        if (this.body.velocity.x > 0 && this.x > this.inicioX + this.distancia)
        {
			//console.log("Avion05.js - movimientoHorizontal() - DENTRO IF");
            this.body.velocity.x = this.velocidadX * -1;

        }
        else if (this.body.velocity.x < 0 && this.x < this.inicioX - this.distancia)
        {
			//console.log("Avion05.js - movimientoHorizontal() - DENTRO ELSE IF");
            this.body.velocity.x = this.velocidadX;
        }

        // Hacemos que la animación vaya en la dirección correcta.
        //this.flipX = this.body.velocity.x < 0;
    }


    // Ahora se deberá de situar en mitad de la parte superior con una bonita animación:
	iniciarAparicion()
	{
		// Evitar que se destruya al aparecer por debajo de la pantalla.
    	this.apareciendo = true;
        // 1.- Desactivará las colisiones para no chocar con el jugador cuando aparezca.
		this.body.checkCollision.none = true;
		this.colisionesArmas(false);

        // 2.- Aumentaremos el tamaño del jefe para que de la sensación de sobrevolar cerca de la cámara y pasarnos por encima.
		this.setScale(30);

        // 3.- Spawneará en la mitad inferior de la pantalla y no en la superior.
		this.x = this.scene.cameras.main.centerX;
		//this.y = this.scene.cameras.main.height + this.height;
		this.y = this.scene.cameras.main.height + (this.height * this.scaleY);
		//this.y = this.scene.cameras.main.height + this.displayHeight;


        // 4.- Animación desde abajo hasta arriba mediante un Tween (abreviatura de in-betweening)
        // 4.1.- Avanzará desde abajo hasta arriba, a la parte central superior.
        // 4.2.- En ese trasncurso, antes de llegar, estará haciéndose cada vez más pequeño.
		/*
		// Animación Tween de subida + escala
		this.scene.tweens.add(
		{
			targets: this,
			// Altura en la que se quedará el boss.
			y: 75,
			// Escala en la que se quedará el boss.
			scale: 5,
			// Tipo de Efecto ease que se aplicará.
			ease: 'Power1',
			//ease: 'Power1.easeIn',
			//ease: 'Back',
			// Duración de la animación.
			duration: 5000,

        	// 5.- Una vez situado en su posición activaremos lo necesario.
			onComplete: () =>
			{
        		// 5.1.- Activaremos colisiones.
				this.body.checkCollision.none = false;
				// Ya pasó la zona de destrucción. xD
    			this.apareciendo = false;
        		// 5.2.- Activaremos la IA (Que dispare y se mueva.)
				this.activarIA();
			}
		});
		*/

		// Animación Tween de subida con escala.
		this.scene.tweens.add(
		{
			targets: this,
			// Altura en la que se quedará el boss.
			y: 100,
			// Escala en la que se quedará el boss.
			scale: 5,
			// Tipo de Efecto ease que se aplicará.
			ease: 'Power1',
			// Duración de la animación.
			duration: 4000,

			// Una vez completada la primera animación, realizar una segunda para mejor efecto.
			onComplete: () =>
			{
				// Segunda Animación Tween, baja un poco, sube y da rebote.
				this.scene.tweens.add(
				{
					targets: this,
					// Altura en la que se quedará el boss.
					y: 75,
					// Tipo de Efecto ease que se aplicará.
					ease: 'Back.easeInOut',
					duration: 2000,

        			// 5.- Una vez situado en su posición activaremos lo necesario.
					onComplete: () =>
					{
        				// 5.1.- Activaremos colisiones.
						this.body.checkCollision.none = false;
						// Activamos las colisiones de las armas.
						this.colisionesArmas(true);
						// Ya pasó la zona de destrucción. xD
						this.apareciendo = false;
        				// 5.2.- Activaremos la IA (Que dispare y se mueva.)
						this.activarIA();
					}
				});
			}
		});

	}

	colisionesArmas(activo)
	{
		for (const arma of this.armas)
		{
			if (arma.body)
			{
				arma.body.checkCollision.none = !activo;
			}
		}
	}

	activarIA()
	{
    	console.log("IA del Jefe Final Activada.");

		this.body.velocity.x = this.velocidadX;
		this.movimientoActivo = true;
		//console.log("activarIA Movimiento Activo ", this.movimientoActivo);
		
		this.iniciarDisparoArmas();
	}


	iniciarDisparoArmas()
	{
		for (const arma of this.armas)
		{
			if (!arma.disparoTimer)
			{
				arma.disparoTimer = this.scene.time.addEvent(
					{
					delay: 1000, // Un disparo cada 1 segundo (ajustable)
					callback: () =>
					{
						if (!arma.active) return; // Si el arma ha sido destruida, no hace nada
						this.dispararBalaDesdeArma(arma);
					},
					loop: true
				});
			}
		}
	}

	dispararBalaDesdeArma(arma)
	{
		const bala = this.scene.physics.add.sprite(arma.x, arma.y, 'Disparo01', 0);
		bala.setVelocityY(200); // Velocidad hacia abajo, puedes ajustar o hacerla dependiente del arma
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
