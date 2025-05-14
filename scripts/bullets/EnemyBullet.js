class EnemyBullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'enemyBullet');
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    update() {
        // Movimiento proyectil enemigo
    }
}