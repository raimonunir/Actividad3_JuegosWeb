//import { EnemyType01 } from './EnemyType01.js';
import Avion01 from '../prefabs/Avion01.js';
import Avion02 from '../prefabs/Avion02.js';
import Avion03 from '../prefabs/Avion03.js';
import Avion04 from '../prefabs/Avion04.js';
import Avion05FB from '../prefabs/Avion05FB.js';
import AvionFB01 from '../prefabs/AvionFB01.js';

export class EnemyManager
{
    constructor(scene)
    {
        console.log("EnemyManager.js - constructor()");

        this.scene = scene;
        this.enemies = scene.physics.add.group(); // Agrupamos los Enemigos para actualizarlos y tenerlos a mano para colisiones.
        this.disparos = scene.physics.add.group(); // Agrupamos los Disparos para actualizarlos y tenerlos a mano para colisiones.
        this.torretas = scene.physics.add.group(); // Agrupamos las Torretas para actualizarlos y tenerlos a mano para colisiones.

        // Determinaremos la distancia que habrá entre los bordes de la pantalla y el Spawn.
        this.distanciaBorde = 50;
        this.inicioPantalla = 0;
        this.finalPantalla = 240;

        //this.spawnX = this.scene.cameras.main.width / 2;
        //this.spawnY = -50;
    }

    // AQUÍ CAMBIO!!!
    /*preUpload(time, delta)
    {
		super.preUpdate(time, delta);

		// Actualizaremos el UPDATE de las Balas que se encuentran en el grupo:
		this.disparos.getChildren().forEach(disparo =>
        {
            if (disparo.update) disparo.update();
        });
    }*/

    update(time, delta)
    {
        //console.log("EnemyManager.js - Update()");

        this.enemies.getChildren().forEach(enemy =>
        {
            if (enemy.update)
            {
                enemy.update(time, delta);
            }
        });

        // Actualizaremos el UPDATE de las Balas que se encuentran en el grupo:
		this.disparos.getChildren().forEach(disparo =>
        {
            if (disparo.update)
            {
                disparo.update(time, delta);
            }
        });
    }

    spawnEnemigo(tipo, x = null, y = null)
    {
        console.log("EnemyManager.js - spawnEnemy()");

        /*
        // Spawnearemos los enemigos en el rango de ancho de la pantalla -distanciaBorde a cada lado.
        const spawnX = Phaser.Math.Between(this.distanciaBorde, this.scene.cameras.main.width - this.distanciaBorde);
        // Spawnearemos los enemigos por encima de la pantalla.
        const spawnY = -50;
        */

        //const spawnX = x !== null ? x : Phaser.Math.Between(this.distanciaBorde, this.scene.scale.width - this.distanciaBorde);
        const spawnX = x !== null ? x : Phaser.Math.Between(this.inicioPantalla, this.finalPantalla);
        const spawnY = y !== null ? y : -50;

        //let prefabKey = "";

        let enemigo;

        switch (tipo)
        {
            case 1: //prefabKey = "Avion01"; break;
                enemigo = new Avion01(this.scene, spawnX, spawnY);
                enemigo.velocidadX = 20;
                enemigo.velocidadY = 20;
                enemigo.distancia = 20;
                enemigo.enemigoTipo = "normal";
            break;
            case 2: //prefabKey = "Avion02"; break;
                enemigo = new Avion02(this.scene, spawnX, spawnY);
                enemigo.velocidadX = 20;
                enemigo.velocidadY = 20;
                enemigo.distancia = 20;
                enemigo.enemigoTipo = "normal";
            break;
            case 3: //prefabKey = "Avion03"; break;
                enemigo = new Avion03(this.scene, spawnX, spawnY);
                enemigo.velocidadX = 20;
                enemigo.velocidadY = 20;
                enemigo.distancia = 20;
                enemigo.enemigoTipo = "normal";
            break;
            case 4: //prefabKey = "Avion04"; break;
                enemigo = new Avion04(this.scene, spawnX, spawnY);
                enemigo.velocidadX = 20;
                enemigo.velocidadY = 20;
                enemigo.distancia = 20;
                enemigo.enemigoTipo = "normal";
            break;
            case 5: //prefabKey = "Avion05FB"; break;
                enemigo = new Avion05FB(this.scene, spawnX, spawnY);
            break;
            case 6:
                enemigo = new AvionFB01(this.scene, spawnX, spawnY);
            break;
        }

        //const enemigo = this.scene.add.prefab(prefabKey, spawnX, spawnY);
        //this.scene.physics.add.existing(enemigo);
        this.enemies.add(enemigo);
        
        
        //console.log(`Spawneado Avión tipo ${tipo} en la posición x: ${spawnX}, y: ${spawnY}`);

        return enemigo;
    }

    /*spawnPosicionAleatoria()
    {
        // Spawnearemos los enemigos en el rango de ancho de la pantalla -distanciaBorde a cada lado.
        this.spawnX = Phaser.Math.Between(this.distanciaBorde, this.scene.cameras.main.width - this.distanciaBorde);
        // Spawnearemos los enemigos por encima de la pantalla.
        this.spawnY = -50;
    }*/

    spawnMultiples(cantidad, tipo, intervalo,  opciones = {}, x = null)
    {
        
        // Validaremos que 'x' sea un número y no tome x = [object Object] siendo las opciones.
        // Si no lo es, usaremos una posición aleatoria segura.
        const isXValida = typeof x === 'number';

        // Spawneamos una "cantidad" de enemigos del "tipo" que deseemos y con determinado "intervalo".
        for (let i = 0; i < cantidad; i++)
        {
            this.scene.time.delayedCall(i * intervalo, () =>
            {
                const posX = isXValida ? x : Phaser.Math.Between(this.distanciaBorde, this.finalPantalla - this.distanciaBorde);

                //this.spawnEnemigo(tipo, x);
                
                const enemigo = this.spawnEnemigo(tipo, posX);

                // Aplicar las opciones si existen
                if (opciones)
                {
                    if (opciones.velocidadX !== undefined) enemigo.velocidadX = opciones.velocidadX;
                    if (opciones.velocidadY !== undefined) enemigo.velocidadY = opciones.velocidadY;
                    if (opciones.distancia !== undefined) enemigo.distancia = opciones.distancia;
                    if (opciones.enemigoTipo !== undefined) enemigo.enemigoTipo = opciones.enemigoTipo;
                }
            });
        }
    }

    spawnNivel01()
    {
        //this.spawnPosicionAleatoria();
        /*this.spawnX = this.scene.cameras.main.width / 1.25;
        this.spawnEnemigos(5, 1, 1500);
        
        this.spawnX = this.scene.cameras.main.width / 5;
        this.spawnEnemigos(5, 1, 1500);*/
        /*0, 240
        const posDerecha = this.scene.cameras.main.width / 1.25;
        const posIzquierda = this.scene.cameras.main.width / 5;
        const posCentral = this.scene.cameras.main.width / 2;
        const posAleatoria = Phaser.Math.Between(this.distanciaBorde, this.scene.cameras.main.width - this.distanciaBorde);
        */
        const posDerecha = this.finalPantalla - this.distanciaBorde;
        const posIzquierda = this.inicioPantalla + this.distanciaBorde;
        const posCentral = this.finalPantalla / 2;
        const posAleatoria = Phaser.Math.Between(this.inicioPantalla, this.finalPantalla);
        
        
        
        //this.scene.time.delayedCall(1000, () => this.spawnMultiples(1, 4, 2000, {velocidadY: 30}));

        
        this.scene.time.delayedCall(1000, () => this.spawnMultiples(1, 6, 2000, {
            velocidadX: 50,
            velocidadY: 50,
            distancia: 100,
            enemigoTipo: "normal"
        }, posCentral));

        /*
        this.scene.time.delayedCall(1000, () => this.spawnMultiples(5, 1, 1500, {velocidadY: 60}, posDerecha));
        this.scene.time.delayedCall(1000, () => this.spawnMultiples(5, 1, 1500, {velocidadY: 60}, posIzquierda));

        //this.spawnMultiples(5, 1, 1500, derecha);
        //this.spawnMultiples(5, 1, 1500, izquierda);
        

        this.scene.time.delayedCall(9000, () =>
                            this.spawnMultiples(5, 2, 2000, {
                                                                        velocidadX: 100,
                                                                        velocidadY: 50,
                                                                        distancia: 100,
                                                                        enemigoTipo: "normal"
                                                                    }, posCentral));
        this.scene.time.delayedCall(10000, () =>
                            this.spawnMultiples(5, 2, 2000, {
                                                                        velocidadX: 100,
                                                                        velocidadY: 50,
                                                                        distancia: 100,
                                                                        enemigoTipo: "normal"
                                                                    }, posCentral));
        //this.spawnMultiples(3, 2, 2000, centro);
        //this.spawnMultiples(3, 2, 2100, centro);
        
        //this.scene.time.delayedCall(17000, () => this.spawnMultiples(2, 3, 2000, izquierda, {velocidadY: 80}));
        //this.scene.time.delayedCall(17000, () => this.spawnMultiples(2, 3, 2000, derecha, {velocidadY: 80}));
        //this.scene.time.delayedCall(17000, () => this.spawnMultiples(2, 3, 2000, centro, {velocidadY: 80}));
        
        // Disparadores de Jugadores. Tipo 4.
        this.scene.time.delayedCall(19000, () =>
                            this.spawnMultiples(3, 4, 2000, {
                                                                        velocidadX: 50,
                                                                        velocidadY: 60,
                                                                        distancia: 100,
                                                                        enemigoTipo: "normal"
                                                                    }));
        this.scene.time.delayedCall(20000, () => this.spawnMultiples(3, 4, 2000, {velocidadY: 60}));
        

        this.scene.time.delayedCall(25000, () => this.spawnMultiples(10, 1, 1500, {velocidadY: 70}, posAleatoria));
        
        this.scene.time.delayedCall(28000, () => this.spawnMultiples(6, 3, 2500, {velocidadY: 100}, posAleatoria));
        this.scene.time.delayedCall(28000, () => this.spawnMultiples(6, 3, 2500, {velocidadY: 100}, posAleatoria));

        
        this.scene.time.delayedCall(35000, () => this.spawnMultiples(5, 1, 1500, {velocidadY: 70}, posCentral));


        this.scene.time.delayedCall(35000, () =>
                            this.spawnMultiples(5, 2, 2000, {
                                                                        velocidadX: 50,
                                                                        velocidadY: 70,
                                                                        distancia: 50,
                                                                        enemigoTipo: "normal"
                                                                    }, posIzquierda));
        this.scene.time.delayedCall(35000, () =>
                            this.spawnMultiples(5, 2, 2000, {
                                                                        velocidadX: 50,
                                                                        velocidadY: 70,
                                                                        distancia: 50,
                                                                        enemigoTipo: "normal"
                                                                    }, posDerecha));



        // Disparadores de Jugadores. Tipo 4.
        this.scene.time.delayedCall(40000, () => 
                            this.spawnMultiples(3, 4, 2000, {velocidadY: 70}, posIzquierda));
        this.scene.time.delayedCall(40000, () => 
                            this.spawnMultiples(3, 4, 2000, {velocidadY: 70}, posDerecha));

        
        this.scene.time.delayedCall(45000, () => 
                            this.spawnMultiples(3, 4, 2000, {velocidadY: 30}, posCentral));

        
        this.scene.time.delayedCall(45000, () =>
                            this.spawnMultiples(5, 2, 2000, {
                                                                        velocidadX: 50,
                                                                        velocidadY: 70,
                                                                        distancia: 50,
                                                                        enemigoTipo: "normal"
                                                                    }));

                                                                    
        this.scene.time.delayedCall(45000, () =>
                            this.spawnMultiples(5, 2, 2000, {
                                                                        velocidadX: 50,
                                                                        velocidadY: 70,
                                                                        distancia: 50,
                                                                        enemigoTipo: "normal"
                                                                    }));

        this.scene.time.delayedCall(45000, () => 
                            this.spawnMultiples(3, 4, 2000, {velocidadY: 50}));
                            
                            

        this.scene.time.delayedCall(50000, () =>
                            this.spawnMultiples(5, 3, 3000, {
                                                                        velocidadX: 50,
                                                                        velocidadY: 70,
                                                                        distancia: 50,
                                                                        enemigoTipo: "normal"
                                                                    }));

                                                                    
        this.scene.time.delayedCall(50000, () =>
                            this.spawnMultiples(5, 3, 3000, {
                                                                        velocidadX: 50,
                                                                        velocidadY: 70,
                                                                        distancia: 50,
                                                                        enemigoTipo: "normal"
                                                                    }));

                            
        this.scene.time.delayedCall(55000, () =>
                            this.spawnMultiples(2, 4, 2000, {
                                                                        velocidadX: 50,
                                                                        velocidadY: 40,
                                                                        distancia: 50,
                                                                        enemigoTipo: "normal"
                                                                    }, posAleatoria));

                            
        this.scene.time.delayedCall(55000, () =>
                            this.spawnMultiples(2, 4, 2000, {
                                                                        velocidadX: 50,
                                                                        velocidadY: 40,
                                                                        distancia: 50,
                                                                        enemigoTipo: "normal"
                                                                    }, posAleatoria));

                            
        this.scene.time.delayedCall(60000, () =>
                            this.spawnMultiples(1, 4, 2000, {
                                                                        velocidadX: 50,
                                                                        velocidadY: 50,
                                                                        distancia: 50,
                                                                        enemigoTipo: "miniboss"
                                                                    }, posCentral));

                                    //120000                                    
        // Final Boss. Tipo 6.      1000 Al minuto se termina cada pantalla. Podrían ser oleadas hasta los 2min's que aparezca el boss.
        this.scene.time.delayedCall(1000, () => this.spawnMultiples(1, 6, 2000, {
                                                                        velocidadX: 50,
                                                                        velocidadY: 50,
                                                                        distancia: 100,
                                                                        enemigoTipo: "normal"
                                                                    }, posCentral));
        */
    }

    spawnEnemigos01()
    {
        // Spawneamos 5 enemigos del Tipo que deseemos y en diferentes posiciones.
        for (let i = 0; i < 5; i++)
        {
            this.scene.time.delayedCall(i * 1500, () =>
            {
                this.spawnEnemy(1);
            });
        }
    }

    
    spawnEnemigos02()
    {
        // Spawneamos 5 enemigos del Tipo que deseemos y en diferentes posiciones.
        for (let i = 0; i < 5; i++)
        {
            this.scene.time.delayedCall(i * 500, () =>
            {
                this.spawnEnemy(2);
            });
        }
    }


    oleada01()
    {
        // Spawnea 5 enemigos del tipo 2 en diferentes posiciones
        for (let i = 0; i < 5; i++)
        {
            this.scene.time.delayedCall(i * 500, () =>
            {
                this.spawnEnemy(2); // Avion02
            });
        }
    }

    oleada02()
    {
        
        const tipos = [1, 2, 3, 4];
        // Spawnea enemigos alternando tipos
        for (let i = 0; i < 6; i++)
        {
            //const tipo = i % 2 === 0 ? 1 : 2; // Alterna entre Avion01 y Avion02
            const tipo = Phaser.Math.RND.pick(tipos); // Alterna entre Avion01, Avion02, Avion03 y Avion04
            this.scene.time.delayedCall(i * 1000, () =>
            {
                this.spawnEnemy(tipo);
            });
        }
    }

    oleadaBoss01()
    {
        // Spawnea un solo jefe
        const boss = this.scene.add.prefab("EnemyBoss01", this.scene.cameras.main.centerX, -100);
        this.scene.physics.add.existing(boss);
        this.enemies.add(boss);
    }
}
