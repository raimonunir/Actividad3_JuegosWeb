
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
import { EnemyManager } from '../enemies/EnemyManager.js';
/* END-USER-IMPORTS */

export default class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// capaJugable
		const capaJugable = this.add.layer();

		// grupoEnemigos
		const grupoEnemigos = this.add.container(0, 0);
		capaJugable.add(grupoEnemigos);

		// disparos
		const disparos = this.add.container(-70.44221956458016, -61.11833469124678);
		capaJugable.add(disparos);

		this.grupoEnemigos = grupoEnemigos;
		this.disparos = disparos;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Container} */
	grupoEnemigos;
	/** @type {Phaser.GameObjects.Container} */
	disparos;

	/* START-USER-CODE */

	// Write more your code here

	create()
	{

		this.editorCreate();


		this.enemyManager = new EnemyManager(this);

        // Llama a oleadas tras ciertos segundos
        //this.time.delayedCall(1000, () => this.enemyManager.spawnEnemigos01());
        //this.time.delayedCall(6000, () => this.enemyManager.spawnEnemigos02());
        this.time.delayedCall(1000, () => this.enemyManager.spawnNivel01());
    }

    update(time, delta)
	{
        this.enemyManager.update(time, delta);
    }

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
