
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
import { Enemy } from '../enemies/Enemy.js';
/* END-USER-IMPORTS */

export default class AvionFB01 extends Enemy {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "AvionFB01", frame ?? 0);

		scene.physics.add.existing(this, false);
		this.body.setSize(224, 128, false);
		this.play("AvionFB01");

		/* START-USER-CTR-CODE */
		// Write your code here.
		this.configurarTipo();
		this.flipY = 0;

		//this.scaleX = 3;
		//this.scaleY = 3;

		// Tomamos la vida del ENEMY y la Multiplica * X = ¿x?
        this.vida *= 5;

		// Creamos un grupo para almacenar los disparos.
		this.disparos = this.scene.add.group();
		// Crear armas como sprites independientes
		this.armas = [];

		this.armaVida = 30;
		// Armas laterales disparando al Sur.
		const armaIzq_Sur = scene.physics.add.sprite(this.x - 0, this.y, 'Torreta Sur', 0);
		armaIzq_Sur.vida = this.armaVida;
		armaIzq_Sur.setImmovable(true);
		armaIzq_Sur.tipoArma = "Metralleta";
		armaIzq_Sur.direccionDisparo = "Sur";
		this.armas.push(armaIzq_Sur);

		const armaDer_Sur = scene.physics.add.sprite(this.x + 0, this.y, 'Torreta Sur', 0);
		armaDer_Sur.vida = this.armaVida;
		armaDer_Sur.setImmovable(true);
		armaDer_Sur.tipoArma = "Metralleta";
		armaDer_Sur.direccionDisparo = "Sur";
		this.armas.push(armaDer_Sur);
		
		// Armas de las Alas disparando a cada lado "SurEste y SurOeste".
		const armaIzqCen_SurOeste = scene.physics.add.sprite(this.x - 0, this.y, 'Torreta SurOeste', 0);
		armaIzqCen_SurOeste.vida = this.armaVida;
		armaIzqCen_SurOeste.setImmovable(true);
		armaIzqCen_SurOeste.tipoArma = "Metralleta";
		armaIzqCen_SurOeste.direccionDisparo = "SurOeste";
		this.armas.push(armaIzqCen_SurOeste);

		const armaDerCen_SurEste = scene.physics.add.sprite(this.x + 0, this.y, 'Torreta SurEste', 0);
		armaDerCen_SurEste.vida = this.armaVida;
		armaDerCen_SurEste.setImmovable(true);
		armaDerCen_SurEste.tipoArma = "Metralleta";
		armaDerCen_SurEste.direccionDisparo = "SurEste";
		this.armas.push(armaDerCen_SurEste);

		// Armas centrales disparando al Sur.
		const armaCenSup_Sur = scene.physics.add.sprite(this.x - 0, this.y, 'Torreta Sur', 0);
		armaCenSup_Sur.vida = this.armaVida;
		armaCenSup_Sur.setImmovable(true);
		armaCenSup_Sur.tipoArma = "Canyon";
		armaCenSup_Sur.direccionDisparo = "Sur";
		this.armas.push(armaCenSup_Sur);

		const armaCenInf_Sur = scene.physics.add.sprite(this.x + 0, this.y, 'Torreta Sur', 0);
		armaCenInf_Sur.vida = this.armaVida;
		armaCenInf_Sur.setImmovable(true);
		armaCenInf_Sur.tipoArma = "Metralleta";
		armaCenInf_Sur.direccionDisparo = "Sur";
		this.armas.push(armaCenInf_Sur);

		// Armas centrales superiores disparando al SurEste y SurOeste.
		const armaCenSup_SurEste = scene.physics.add.sprite(this.x - 0, this.y, 'Torreta SurEste', 0);
		armaCenSup_SurEste.vida = this.armaVida;
		armaCenSup_SurEste.setImmovable(true);
		armaCenSup_SurEste.tipoArma = "Metralleta";
		armaCenSup_SurEste.direccionDisparo = "SurEste";
		this.armas.push(armaCenSup_SurEste);

		const armaCenInf_SurOeste = scene.physics.add.sprite(this.x + 0, this.y, 'Torreta SurOeste', 0);
		armaCenInf_SurOeste.vida = this.armaVida;
		armaCenInf_SurOeste.setImmovable(true);
		armaCenInf_SurOeste.tipoArma = "Metralleta";
		armaCenInf_SurOeste.direccionDisparo = "SurOeste";
		this.armas.push(armaCenInf_SurOeste);
		
		// Lanzaderas cemtrañes superiores.
		const lanzaderaDerecha = scene.physics.add.sprite(this.x - 0, this.y, 'Torreta Sur', 0);
		lanzaderaDerecha.vida = this.armaVida;
		lanzaderaDerecha.setImmovable(true);
		lanzaderaDerecha.tipoArma = "Lanzadera";
		lanzaderaDerecha.direccionDisparo = "Sur";
		this.armas.push(lanzaderaDerecha);

		const lanzaderaIzquierda = scene.physics.add.sprite(this.x + 0, this.y, 'Torreta Sur', 0);
		lanzaderaIzquierda.vida = this.armaVida;
		lanzaderaIzquierda.setImmovable(true);
		lanzaderaIzquierda.tipoArma = "Lanzadera";
		lanzaderaIzquierda.direccionDisparo = "Sur";
		this.armas.push(lanzaderaIzquierda);

		this.configuracionArmas =
		{
			Metralleta:
			{
				delay: 300,
				sprite: 'Disparo01', //'Disparo_Metralleta',
				velocidad: 300
			},
			Canyon:
			{
				delay: 3000,
				sprite: 'Disparo01', //'Disparo_Canyon',
				velocidad: 150
			},
			Lanzadera:
			{
				delay: 1500,
				sprite: 'Disparo01', //'Misil',
				velocidad: 100
			}
		};

		this.iniciarAparicion();

		//this.body.velocity.x = this.velocidadX;

		this.movimientoActivo = false;
		this.inicioX = x;
		this.inicioY = y;

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
			const armaEscalaX = this.scaleX * 1;
			const armaEscalaY = this.scaleY * 1;


			// Desfase o Desplazamiento de la Posición relativa según la Escalada del Avión.
			// Armas Laterales Izquierda y Derecha / Disparo al Sur.
			this.offsetX = 95 * this.scaleX;
			this.offsetY = -10 * this.scaleY;
			// Arma Izquierda  / Disparo al Sur.
			this.armas[0].setPosition(this.x - this.offsetX, this.y + this.offsetY);
    		this.armas[0].setScale(armaEscalaX, armaEscalaY);
        	//console.log("Posición Avion OffSetX: ", this.armas[0].setScale(armaEscalaX, armaEscalaY));
			// Arma Derecha  / Disparo al Sur.
			this.armas[1].setPosition(this.x + this.offsetX, this.y + this.offsetY);
    		this.armas[1].setScale(armaEscalaX, armaEscalaY);

			
			// Armas Laterales Izquierda y Derecha / Disparo al Sur.
			this.offsetX = 65 * this.scaleX;
			this.offsetY = -10 * this.scaleY;
			// Arma Izquierda  / Disparo al Sur.
			this.armas[2].setPosition(this.x - this.offsetX, this.y + this.offsetY);
    		this.armas[2].setScale(armaEscalaX, armaEscalaY);
        	//console.log("Posición Avion OffSetX: ", this.armas[0].setScale(armaEscalaX, armaEscalaY));
			// Arma Derecha  / Disparo al Sur.
			this.armas[3].setPosition(this.x + this.offsetX, this.y + this.offsetY);
    		this.armas[3].setScale(armaEscalaX, armaEscalaY);


			// Armas Centrales Superior e Inferior  / Disparo al Sur.
			this.offsetX = 0 * this.scaleX;
			this.offsetY = 5 * this.scaleY;
			// Arma Central  Superior / Disparo al Sur.
			this.armas[4].setPosition(this.x - this.offsetX, this.y + this.offsetY);
    		this.armas[4].setScale(armaEscalaX, armaEscalaY);

			this.offsetX = 0 * this.scaleX;
			this.offsetY = 25 * this.scaleY;
			// Arma Central  Inferior / Disparo al Sur.
			this.armas[5].setPosition(this.x + this.offsetX, this.y + this.offsetY);
    		this.armas[5].setScale(armaEscalaX, armaEscalaY);


			// Armas Centrales Superiores / Disparo al SurEste y SurOeste.
			this.offsetX = 0 * this.scaleX;
			this.offsetY = -10 * this.scaleY;
			// Arma Central  Superior / Disparo al Sur.
			this.armas[6].setPosition(this.x - this.offsetX, this.y + this.offsetY);
    		this.armas[6].setScale(armaEscalaX, armaEscalaY);

			this.offsetX = 0 * this.scaleX;
			this.offsetY = -10 * this.scaleY;
			// Arma Central  Inferior / Disparo al Sur.
			this.armas[7].setPosition(this.x + this.offsetX, this.y + this.offsetY);
    		this.armas[7].setScale(armaEscalaX, armaEscalaY);
			

			this.offsetX = 35 * this.scaleX;
			this.offsetY = -10 * this.scaleY;
			// Lanzaderas Central  Superior / Disparo al Sur.
			this.armas[8].setPosition(this.x - this.offsetX, this.y + this.offsetY);
    		this.armas[8].setScale(armaEscalaX, armaEscalaY);

			this.armas[9].setPosition(this.x + this.offsetX, this.y + this.offsetY);
    		this.armas[9].setScale(armaEscalaX, armaEscalaY);

			//this.body.checkCollision.none = true;
			if (this.armas[0].body)
			{
    			this.armas[0].body.checkCollision.none = true;
			}
		}

		// Actualizaremos el UPDATE de las Balas que se encuentran en el grupo:
		this.disparos.getChildren().forEach(disparo =>
		{
			if (disparo.update) disparo.update();
		});
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
		this.setScale(10);

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
			scale: 1,
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
				// Tomaremos una configuración de arma y si no hay nada especificado, serán Metralletas.
				const config = this.configuracionArmas[arma.tipoArma] || this.configuracionArmas["Metralleta"];

				arma.disparoTimer = this.scene.time.addEvent(
					{
					delay: config.delay, //1000, // Un disparo cada 1 segundo (ajustable)
					callback: () =>
					{
						if (!arma.active) return; // Si el arma ha sido destruida, no hace nada
						this.dispararBalaDesdeArma(arma, config);
					},
					loop: true
				});
			}
		}
	}

	dispararBalaDesdeArma(arma, config)
	{
		//const disparo = this.scene.physics.add.sprite(arma.x, arma.y, 'Disparo01', 0);
		//disparo.setVelocityY(200); // Velocidad hacia abajo, puedes ajustar o hacerla dependiente del arma
		const disparo = this.scene.physics.add.sprite(arma.x, arma.y, config.sprite || 'Disparo01', 0);
		
		let velX = 0;
		let velY = config.velocidad;
		
		// Agregamos una manera de diferenciar la dirección hacia donde disparará cada arma...
		switch (arma.direccionDisparo)
		{
			case "Sur":
				//disparo.setVelocityY(200); // Hacia abajo
				velX = 0;
				velY = config.velocidad;
				disparo.angle = 0;
			break;
			case "Oeste":
				//disparo.setVelocityX(-200); // Hacia la izquierda
				velX = -config.velocidad;
				velY = 0;
				disparo.angle = 0;
			break;
			case "Este":
				//disparo.setVelocityX(200); // Hacia la derecha
				velX = config.velocidad;
				velY = 0;
				disparo.angle = 0;
			break;
			case "SurOeste":
				//disparo.setVelocityY(200); // Hacia abajo
				//disparo.setVelocityX(-100); // Hacia la izquierda
				velX = -config.velocidad / 2;
				velY = config.velocidad;
				disparo.angle = 45;
			break;
			case "SurEste":
				//disparo.setVelocityY(200); // Hacia abajo
				//disparo.setVelocityX(100); // Hacia la derecha
				velX = config.velocidad / 2;
				velY = config.velocidad;
				disparo.angle = -45;
			break;
			default:
				//disparo.setVelocityY(200); // Valor por defecto
				velX = 0;
				velY = config.velocidad;
				disparo.angle = 0;
			break;
		}
		// Aplicaremos la velocidad y la dirección en cada caso.
		disparo.setVelocity(velX, velY);


		/*
		// Añadir comportamiento específico para Canyon
		if (arma.tipoArma === "Canyon")
		{
			disparo.elapsed = 0;
			disparo.update = function ()
			{
				this.elapsed += this.scene.game.loop.delta;
				if (this.elapsed >= 500 && !this.explotado)
				{
					this.explotado = true;
					this.explotar?.(); // si tiene método explotar
				}
			};

			disparo.explotar = function ()
			{
				// Aquí defines qué pasa al explotar: partículas, daño, animación, etc.
				console.log("💥 ¡Explosión de Canyon!");
				this.destroy(); // O lo que necesites
			};
		}
		*/
		/*
		// Añadiremos un Update personalizado a la bala para destruirlas si se salen fuera de pantalla.
		disparo.update = () =>
		{
			//if (disparo.y > this.scene.cameras.main.height + disparo.height)
			if (disparo.y > this.scene.cameras.main.height + disparo.height ||
			disparo.y < -disparo.height ||
			disparo.x < -disparo.width ||
			disparo.x > this.scene.cameras.main.width + disparo.width)
			{
				disparo.destroy();
			}
		};
		*/



		if (arma.tipoArma === "Lanzadera")
		{
			const config = this.configuracionArmas["Lanzadera"];
			const misil = this.scene.physics.add.sprite(arma.x, arma.y, config.sprite);

			/*if (!this.scene.jugador)
			{
				console.warn('Jugador no encontrado.');
				return;
			}*/
			
			if (!this.scene.player)
			{
				console.warn('Jugador no encontrado.');
				return;
			}
			else
			{
				//console.log("Jugador encontrado: ", this.scene.player);
			}

			/*
			// Obtenemos la posición del jugador en este mismo instante para dirigir los misiles.
			const jugador = this.scene.jugador;
			const objetivoX = jugador.x;
			const objetivoY = jugador.y;
			*/

			const jugador = this.scene.player;
			console.log("Jugador X: ", jugador.x);
			const objetivoX = jugador.x;
			console.log("Jugador Y: ", jugador.y);
			const objetivoY = jugador.y;

			// Calculamos la dirección hacia el jugador...
			const direccionX = objetivoX - arma.x;
			const direccionY = objetivoY - arma.y;
			const magnitud = Math.sqrt(direccionX * direccionX + direccionY * direccionY);
			const dirX = direccionX / magnitud;
			const dirY = direccionY / magnitud;

			// Aplicamos la velocidad al misil...
			misil.body.velocity.x = dirX * config.velocidad;
			misil.body.velocity.y = dirY * config.velocidad;
		}


		//*
		if (arma.tipoArma === "Canyon")
		{
			disparo.elapsed = 0;
			disparo.explotado = false;

			disparo.explotar = function ()
			{
				console.log("El Disparo de Cañón ha explotado en pedazos.");
				//this.explotar();
				this.destroy();
			};

			disparo.update = function ()
			{
				// Incrementar tiempo para explosión
				this.elapsed += this.scene.game.loop.delta;

				if (this.elapsed >= 750 && !this.explotado)
				{
					this.explotado = true;
					this.explotar?.();
					return; // Para que no se destruya justo después
				}

				// Comprobar si sale de la pantalla
				if (this.y > this.scene.cameras.main.height + this.height ||
					this.y < -this.height ||
					this.x < -this.width ||
					this.x > this.scene.cameras.main.width + this.width)
				{
					this.destroy();
				}
			};
		}
		else
		{
			// Para las otras balas normales
			disparo.update = function ()
			{
				if (this.y > this.scene.cameras.main.height + this.height ||
					this.y < -this.height ||
					this.x < -this.width ||
					this.x > this.scene.cameras.main.width + this.width)
				{
					this.destroy();
				}
			};
		}
		//*/

		// Agregaremos las balas a un grupo para gestionar mejor las colisiones y destrucciones.
		this.disparos.add(disparo);
	}

	//*
	explotar()
	{
		console.log("HE EXPLOTADO Y ENTRADO.");
		this.explotado = true;
		this.setActive(false);
		this.setVisible(false);

		// Crea 12 balas nuevas en las direcciones del reloj.
		const anguloRango = Phaser.Math.DEG_TO_RAD * 30; // 360 / 12
		for (let i = 0; i < 12; i++)
		{
			const angulo = i * anguloRango;
			const vx = Math.cos(angulo);
			const vy = Math.sin(angulo);

			// Llama a un método para crear una nueva bala desde el EnemyManager
			this.scene.enemyManager.createBullet(this.x, this.y, vx, vy,
			{
				tipoMunicion: "MiniCanyon",
				speed: 150
			});
		}

		// Destruye esta bala (o devuélvela a un pool si usas uno)
		this.destroy();
	}
	//*/

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
