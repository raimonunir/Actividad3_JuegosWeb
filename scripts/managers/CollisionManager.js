/* Gestiona todas las colisiones: 
    Jugador - Enemigos
    BalasJugador - Enemigos
    BalasEnemigo  - Jugador
 */

    export class CollisionManager
    {
        //constructor(scene)//, player, enemies, playerBullets = null, enemyBullets = null)
        //{
            /*
                this.scene         = scene;
                this.player        = player;
                this.enemies       = enemies;
                this.playerBullets = playerBullets;
                this.enemyBullets  = enemyBullets;
            */
            
                //console.warn("Player X constructor (creado y listo)", scene.player.sprite.x);
                //console.warn("Enemy X constructor (no creados aún)", enemies);
          //      this.scene         = scene;
            //    this.player        = scene.player.sprite;
              //  this.enemigos       = scene.enemyManager.enemies.list;
                //this.playerBullets = scene.playerBullets;
    
                //console.log("Colisión Jugador: ", this.player.body.enable);
                //console.log("Colisión Enemigos: ", this.enemigos.body.enable);
                //console.log("Colisión Bullets: ", this.playerBullets.body.enable);
                //this.enemyBullets  = enemyBullets;
        //}
        
    
        constructor(scene, playerInstance, playerProjectilesGroup, enemiesGroup, enemyBulletsGroup = null, torretas = null) {
            this.scene          = scene;
            this.playerInstance = playerInstance;              // Guardamos la instancia de Player completa
            this.playerSprite   = playerInstance.sprite;       // Y también el Phaser.Physics.Arcade.Sprite
            this.playerBullets  = playerProjectilesGroup;      // Grupo donde están las balas que dispara tu jugador
            this.enemigos       = enemiesGroup;                // Grupo con todos los enemigos (Physics Group)
            this.enemyBullets   = enemyBulletsGroup;           // Grupo con las balas enemigas
        }
    
    
        // Configuramos todas las colisiones necesarias.
        // Se debe invocar en la escena del juego después de instancciar todos los grupos.
        setupCollisions()
        {
            //console.warn("Player X setupCollisions", this.player.x);
            //console.warn("Enemy X", this.enemies);
            // Player - Enemigos: si el jugador choca con un enemigo, se llama a handlePlayerEnemy.
            this.scene.physics.add.collider(
                this.playerSprite,
                this.enemigos,
                this.handlePlayerEnemyCollision,  
                null,
                this 
            );
            
            //BalasJugador - Enemigos
            this.scene.physics.add.overlap(
                this.playerBullets,
                this.enemigos,
                this.handleBulletEnemyCollision,
                null,
                this
            );

            //if (this.enemyBullets) {
            this.scene.physics.add.overlap(
                this.enemyBullets,
                this.playerSprite,
                this.handleEnemyBulletPlayerCollision,
                null,
                this
            );
            //}

        
            this.scene.physics.add.overlap(
                this.playerBullets,
                this.torretas,
                this.handlePlayerBulletTorretasCollision,
                null,
                this
            );
    
            /*
            // BalasJugador - Enemigos: cuando una bala del jugador toca a un enemigo, llamamos a handleBulletEnemy.
            // Usamos overlap porque la bala no “empuja” al enemigo, simplemente lo impacta.
            this.scene.physics.add.overlap(
                this.playerBullets,
                this.enemies,
                this.handleBulletEnemyCollision,
                null,
                this
            );*/
            /*
            // BalasEnemigo - Jugador: si una bala enemiga choca con el jugador, llamamos a handleEnemyBulletPlayer.
            this.scene.physics.add.overlap(
                this.enemyBullets,
                this.player,
                this.handleEnemyBulletPlayerCollision,
                null,
                this
            );*/
        }
    
        // Cuando el jugador choca con un enemigo.
        handlePlayerEnemyCollision(playerSprite, enemySprite)
        {
            console.log("Colisión JUGADOR CHOCA ENEMIGO. COLLISIONMANAGEEEEEEEEEEEEEEEER");//, this.player.x);
            // Desactivar o quitar el enemigo
            if (enemySprite.active) {
                // Reproducir animación de explosión:
                if (typeof enemySprite.recibirDanyo === "function") {
                    //enemySprite.recibirDanyo(enemySprite.vida); // mata de un golpe
                    enemySprite.recibirDanyo(enemySprite.vida);
                } else {
                    //enemySprite.disableBody(true, true);
                }
            }
    
            // Quitamos energía o matamos al jugador
            
            if (this.playerInstance && typeof this.playerInstance.takeDamage === "function") {
                this.playerInstance.takeDamage(45); 
            } else {
                // Si no existe ese método, simplemente desactivamos al jugador:
                //playerSprite.disableBody(true, true);
            }
            // Si el jugador “muere”, podrías saltar a GameOver:
            if (!playerSprite.active) {
                //this.scene.scene.start('GameOverScene');
            }
            
        }
    
        // Cuando una bala del jugador impacta a un enemigo.
        handleBulletEnemyCollision(bulletSprite, enemySprite) {
            console.log("Colisión entre BalaJugador y Enemigo");
            // Desactivar la bala
            if (bulletSprite.active) {
                bulletSprite.disableBody(true, true);
            }
            // Desactivar o dañar al enemigo
            if (enemySprite.active) {
                if (typeof enemySprite.takeDamage === 'function') {
                    //enemySprite.takeDamage(1);
                    enemySprite.recibirDanyo(10);
                } else {
                     // Si no, eliminamos directamente:
                    enemySprite.disableBody(true, true);
                }
                // Efectos de VFX / sonido
                if (this.scene.vfxManager) {
                    this.scene.vfxManager.playSmallExplosion(enemySprite.x, enemySprite.y);
                }
                if (this.scene.soundManager) {
                    this.scene.soundManager.playBulletImpact();
                }
                // Sumar puntuación:
                if (this.scene.uiManager && typeof this.scene.uiManager.sumaScoreP1 === 'function') {
                    this.scene.uiManager.sumaScoreP1(100);
                }
            }
        }
        /*
        // Cuando una bala enemiga impacta al jugador.
        handleEnemyBulletPlayerCollision(bulletSprite, playerSprite) {
            console.log("Colisión entre BalaEnemigo y Jugador");
            // Desactivar la bala enemiga
            if (bulletSprite.active) {
                bulletSprite.disableBody(true, true);
            }
            // Restar vida al jugador
            if (playerSprite.active) {
                if (typeof playerSprite.takeDamage === 'function') {
                    playerSprite.takeDamage(1);
                } else {
                    playerSprite.disableBody(true, true);
                }
                // Efectos de VFX / sonido
                if (this.scene.vfxManager) {
                    this.scene.vfxManager.playSmallExplosion(playerSprite.x, playerSprite.y);
                }
                if (this.scene.soundManager) {
                this.scene.soundManager.playBulletImpact();
                //Si el jugador “muere”, vamos a GameOver
                if (!playerSprite.active) {
                    this.scene.scene.start('GameOverScene');
                }
                
                }
            }
        }*/
    
        handleEnemyBulletPlayerCollision(enemyBullet, playerSprite)
        {
            console.log("¡Bala enemiga impactó al jugador!");
            // Desactivar o destruir la bala enemiga
            if (enemyBullet.active)
            {
                enemyBullet.disableBody(true, true);
            }
            // Aplicar daño al jugador
            if (this.playerInstance && typeof this.playerInstance.takeDamage === "function")
            {
                //playerSprite.takeDamage(45);
                this.playerInstance.takeDamage(45);
            }
            else
            {
                    // Si no existe ese método, simplemente desactivamos al jugador:
                    //playerSprite.disableBody(true, true);
            }
             // Si muere el jugador, ir a GameOver
            if (!playerSprite.active)
            {
                    this.scene.scene.start("GameOverScene");
            }
            /* // VFX / SFX en el jugador
            if (this.scene.vfxManager &&typeof this.scene.vfxManager.vfxImpacto === "function") {
                this.scene.vfxManager.vfxImpacto(playerSprite.x, playerSprite.y);
            }
            if (this.scene.soundManager && typeof this.scene.soundManager.playMidExplosion === "function") {
                this.scene.soundManager.playMidExplosion();
            }*/
            
        }

        handlePlayerBulletTorretasCollision(bulletSprite, torretasEnemigo)
        {
            console.log("Colisión entre BalaJugador y Torreta");
            // Desactivar la bala
            if (bulletSprite.active)
            {
                bulletSprite.disableBody(true, true);
            }

            // Efectos de VFX
            if (this.scene.vfxManager)
            {
                this.scene.vfxManager.playSmallExplosion(torretasEnemigo.x, torretasEnemigo.y);
            }
            // Efectos de SFX
            if (this.scene.soundManager)
            {
                this.scene.soundManager.playBulletImpact();
            }
        }
    }