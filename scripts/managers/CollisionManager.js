/* Gestiona todas las colisiones: 
    Jugador - Enemigos
    BalasJugador - Enemigos
    BalasEnemigo  - Jugador
 */

export default class CollisionManager {
    constructor(scene, player, enemies, playerBullets, enemyBullets) {
            this.scene         = scene;
            this.player        = player;
            this.enemies       = enemies;
            this.playerBullets = playerBullets;
            this.enemyBullets  = enemyBullets;
    }

    // Configuramos todas las colisiones necesarias.
    // Se debe invocar en la escena del juego después de instancciar todos los grupos.
    setupCollisions() {
        // Player - Enemigos: si el jugador choca con un enemigo, se llama a handlePlayerEnemy.
        this.scene.physics.add.collider(
            this.player,
            this.enemies,
            this.handlePlayerEnemyCollision,  
            null,
            this 
        );
        // BalasJugador - Enemigos: cuando una bala del jugador toca a un enemigo, llamamos a handleBulletEnemy.
        // Usamos overlap porque la bala no “empuja” al enemigo, simplemente lo impacta.
        this.scene.physics.add.overlap(
            this.playerBullets,
            this.enemies,
            this.handleBulletEnemyCollision,
            null,
            this
        );

        // BalasEnemigo - Jugador: si una bala enemiga choca con el jugador, llamamos a handleEnemyBulletPlayer.
        this.scene.physics.add.overlap(
            this.enemyBullets,
            this.player,
            this.handleEnemyBulletPlayerCollision,
            null,
            this
        );
    }

    // Cuando el jugador choca con un enemigo.
    handlePlayerEnemyCollision(playerSprite, enemySprite) {
        // Desactivar o quitar el enemigo
        if (enemySprite.active) {
            // Reproducir animación de explosión:
            if (typeof enemySprite.morir === 'function') {
                enemySprite.recibirDanyo(enemySprite.vida); // mata de un golpe
            } else {
                enemySprite.disableBody(true, true);
            }
        }

        // Quitamos energía o matamos al jugador
        if (playerSprite.active) {
            // Supongamos que el Player.js maneja su propia vida:
            if (typeof playerSprite.takeDamage === 'function') {
            playerSprite.takeDamage(1); // 1 punto de vida, por ejemplo
            } else {
                // Si no existe ese método, simplemente desactivamos al jugador:
                playerSprite.disableBody(true, true);
            }
            // Si el jugador “muere”, podrías saltar a GameOver:
            if (!playerSprite.active) {
                this.scene.scene.start('GameOverScene');
            }
        }
    }

    // Cuando una bala del jugador impacta a un enemigo.
    handleBulletEnemyCollision(bulletSprite, enemySprite) {
        // Desactivar la bala
        if (bulletSprite.active) {
            bulletSprite.disableBody(true, true);
        }
        // Desactivar o dañar al enemigo
        if (enemySprite.active) {
            // Si tienes un método “takeDamage” en la clase Enemy, lo llamas:
            if (typeof enemySprite.takeDamage === 'function') {
                enemySprite.takeDamage(1);
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
                this.scene.uiManager.sumaScoreP1(10);
            }
        }
    }

    // Cuando una bala enemiga impacta al jugador.
    handleEnemyBulletPlayerCollision(bulletSprite, playerSprite) {
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

            //Si el jugador “muere”, vamos a GameOver
            if (!playerSprite.active) {
                this.scene.scene.start('GameOverScene');
            }

            // Efectos de VFX / sonido
            if (this.scene.vfxManager) {
                this.scene.vfxManager.playSmallExplosion(playerSprite.x, playerSprite.y);
            }
            if (this.scene.soundManager) {
            this.scene.soundManager.playMidExplosion();
            }
        }
    }
}