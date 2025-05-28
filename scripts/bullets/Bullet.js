export default class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        //Pillamos la x y la y del player a través de la escena
        var x=scene.player.sprite.x;
        var y=scene.player.sprite.y-12;

        super(scene, x, y, 'bullet');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.scene=scene;
        this.bulletVelocity=500;
        

        this.scene.projectiles.add(this);
        

        //ANIMACIONES DEL PLAYER
        scene.anims.create({
            key: 'bulletIdle',    
            frames: scene.anims.generateFrameNumbers('playerBullets', { start: 0, end: 1 }),
            frameRate: 50,
            repeat: -1
        });

        this.play("bulletIdle",true);
        scene.physics.world.enableBody(this);
        this.body.velocity.y = this.bulletVelocity*-1;
    }

    update() {
        // Movimiento del proyectil

        if(this.y<12){
            this.destroy();
        }
    }
    
}