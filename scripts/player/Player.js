import Bullet from "./../bullets/Bullet.js"

export default class Player{
    constructor(scene, x, y) {
        //super(scene, x, y, 'player');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.scene=scene;

        //DATOS PROPIOS DEL PLAYER
        this.currentEnergy=100;
        this.maxEnergy=100;

        this.currentStatus="spawn";     //Esto es para hacer la movida de llevar el avión desde el fondo de la pantalla hasta su posición final con un tween guarrero de esos.
        this.playerControlActive=false;
        
        this.readyToShoot=true;

        this.invencible=false;
        this.maxTiempoInvencible=2500;
        this.tiempoInvencible=0;

        this.velX=105;   //Velocidad horizontal
        this.velY=105;   //Velocidad vertical
        
        this.frameRate=40;  //Como la velocidad de las hélices son visibles y están presentes en todas las anims vamos a definir un frameRate común para todas. Luego veremos si esto va bien.

        this.sprite = scene.physics.add.sprite(x,y,"player");   //Creamos el sprite y activamos las físicas
        this.sprite.setCollideWorldBounds(false);

        this.sprite.setSize(24,24);
        this.sprite.setOffset(12,12);


        

        //DEFINICIÓN DE TECLAS
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.teclasExtra = scene.input.keyboard.addKeys({   //Añadimos teclas adicionales además de los cursores
            espacio: Phaser.Input.Keyboard.KeyCodes.SPACE,
            control: Phaser.Input.Keyboard.KeyCodes.control
        });

        //REASIGNAMOS TECLAS PARA UNIFICAR
        this.KLeft = this.cursors.left;             //Izquierda
        this.KRight = this.cursors.right;           //Derecha
        this.KUp = this.cursors.up;                 //Arriba
        this.KDown = this.cursors.down;             //Abajo
        this.KShoot = this.teclasExtra.espacio;     //Disparo
        this.KBomb = this.teclasExtra.control;      //Bomba (la movida esta que hace un barrido y elimina a todos los enemigos en pantalla)

        //ANIMACIONES DEL PLAYER
        
        //Posición neutra
        scene.anims.create({
            key: 'idle',    
            frames: scene.anims.generateFrameNumbers('playerAnims', { start: 0, end: 1 }),
            frameRate: this.frameRate,
            repeat: -1
        });
        
        //Hacemos el viraje hacia la derecha desde posición neutra
        scene.anims.create({
            key: 'idleToTurnRight',    
            frames: scene.anims.generateFrameNumbers('playerAnims', { start: 2, end: 5 }),
            frameRate: this.frameRate,
            repeat: 0
        });
        
        //Estamos totalmente virados a la derecha
        scene.anims.create({
            key: 'turnRight',    
            frames: scene.anims.generateFrameNumbers('playerAnims', { start: 6, end: 7 }),
            frameRate: this.frameRate,
            repeat: -1
        });

        //Hacemos el viraje hacia la izquierda desde posición neutra
        scene.anims.create({
            key: 'idleToTurnLeft',    
            frames: scene.anims.generateFrameNumbers('playerAnims', { start: 8, end: 11 }),
            frameRate: this.frameRate,
            repeat: 0
        });

        //Estamos totalmente virados a la izquierda
        scene.anims.create({
            key: 'turnLeft',    
            frames: scene.anims.generateFrameNumbers('playerAnims', { start: 12, end: 13 }),
            frameRate: this.frameRate,
            repeat: -1
        });
    }

    update() {
        // Movimiento del jugador
        
        this.showPlayerAnimation();

        //Si vamos a spawnear hacemos cosas...
        /*
        if(this.currentStatus=="spawn"){
            this.currentStatus="idle";
            this.tiempoInvencible=this.maxTiempoInvencible;
            //Como montar un tween para mover al player desde el fondo de la pantalla
            this.scene.tweens.add({
                targets:this.sprite,
                y:150,
                duration:1000,
                onStart: (tween, target, param) => {
                    this.sprite.setCollideWorldBounds(false);
                },
                onComplete: (tween, target, param) => {
                    
                    this.playerControlActive=true;
                    this.sprite.setCollideWorldBounds(true);
                    
                },
            })
        }
        */
        //Comprobamos si nos queda tiempo siendo invulnerables (this.tiempoInvencible)
        if(this.tiempoInvencible>0){
            
            this.invencible=true;
            
            //console.log(this.tiempoInvencible);
            //Para hacer el efecto ese de blinkeo vamos a intentar con valores pares/impares del tiempo actual.
            if(Phaser.Math.RoundTo(this.tiempoInvencible)%2===0){   //si es par tintamos...
                this.sprite.setTint(0xff0000);
                
            }else{                                                  //Si no eliminamos el tint
                this.sprite.clearTint();                                
                
            }
            this.tiempoInvencible-=this.scene.game.loop.delta;      //Vamos restando tiempo de invencibilidad en cada ciclo de juego
        }else{
            this.invencible=false;
            this.sprite.clearTint();
        }

        this.getPlayerInputs();

    }

    showPlayerAnimation(){   
        //Discriminamos por this.currentStatus
        switch(this.currentStatus){
            case "spawn"://o en el estado spawn...
                this.sprite.play("idle",true);
                this.currentStatus="idle";
                this.tiempoInvencible=this.maxTiempoInvencible;
                //Como montar un tween para mover al player desde el fondo de la pantalla
                this.scene.tweens.add({
                    targets:this.sprite,
                    y:this.sprite.y-75,  //150
                    duration:1000,
                    onStart: (tween, target, param) => {
                        this.sprite.setCollideWorldBounds(false);
                    },
                    onComplete: (tween, target, param) => {
                        
                        this.playerControlActive=true;
                        this.sprite.setCollideWorldBounds(true);
                        
                    },
                })
            break;

            case "idle"://En el estado idle...
                this.sprite.play("idle",true);
            break;

            //Animaciones para el viraje a la derecha
            case "idleToTurnRight":
                this.sprite.play("idleToTurnRight",true).once('animationcomplete',() => {    //Encadenamos la animación con el viraje hacia la derecha
                    this.currentStatus="turnRight";
                });
            break;

            case "turnRight":
                this.sprite.play("turnRight",true);
            break;

            case "turnRightToIdle":
                this.sprite.playReverse("idleToTurnRight",true).once('animationcomplete',() => {    //Curiosísimo lo del playReverse, así no tengo que definir toda una animación nueva de vuelta a idle.
                    this.currentStatus="idle";
                });
            break;

            case "LeftToRight":
                this.sprite.playReverse("idleToTurnLeft",true).once('animationcomplete',() => {    //Como en el caso del viraje derecho deshacemos la animación "idleToTurnLeft" con playReverse()
                    this.currentStatus="idleToTurnRight";
                });
            break;

            //Animaciones para el viraje a la izquierda
            case "idleToTurnLeft":
                this.sprite.play("idleToTurnLeft",true).once('animationcomplete',() => {    //Encadenamos la animación con el viraje hacia la derecha
                    this.currentStatus="turnLeft";
                });
            break;

            case "turnLeft":
                this.sprite.play("turnLeft",true);
            break;

            case "turnLeftToIdle":
                this.sprite.playReverse("idleToTurnLeft",true).once('animationcomplete',() => {    //Como en el caso del viraje derecho deshacemos la animación "idleToTurnLeft" con playReverse()
                    this.currentStatus="idle";
                });
            break;
            case "RightToLeft":
                this.sprite.playReverse("idleToTurnRight",true).once('animationcomplete',() => {    //Como en el caso del viraje derecho deshacemos la animación "idleToTurnLeft" con playReverse()
                    this.currentStatus="idleToTurnLeft";
                });
            break;
        }
    }

    getPlayerInputs(){
        
        if(!this.playerControlActive){  //Si playerControlActive está a false salimos de la función y no permitimos ningún input
            return;
        }
        //SI NO PULSAMOS NINGUNA TECLA DEL EJE VERTICAL
        if(!this.KDown.isDown && !this.KUp.isDown){
            this.sprite.setVelocityY(0);
        }

        //SI NO PULSAMOS NINGUNA TECLA DEL EJE HORIZONTAL
        if(!this.KLeft.isDown && !this.KRight.isDown){
            this.sprite.setVelocityX(0);
            
            //Evaluamos el estado actual para ver qué nuevo estado asignamos (y qué animación se mostrará)
            switch(this.currentStatus){
                case "idleToTurnRight":             //Tanto si estamos virando hacia la derecha
                case "idleToTurnLeft":              //o a la izquierda...
                    this.currentStatus="idle";      //...nos iremos a idle
                break;

                case "turnRight":                   //Si estamos totalmente virados hacia la derecha...
                    this.currentStatus="turnRightToIdle";   //Hacemos el recorrido hasta volver a idle y que no se vea brusco
                    
                break;

                case "turnLeft":                    //Si estamos totalmente virados hacia la izquierda...
                    this.currentStatus="turnLeftToIdle";   //Hacemos el recorrido hasta volver a idle y que no se vea brusco
                    
                break;
            }
            
            
        }
        
        //SI PULSAMOS DERECHA
        if(this.KRight.isDown){
            this.sprite.setVelocityX(this.velX);
            //Evaluamos el estado actual para ver qué nuevo estado asignamos (y qué animación se mostrará)
            switch(this.currentStatus){
                case "idle":
                case "idleToTurnLeft":
                    this.currentStatus="idleToTurnRight";
                break;

                case "turnLeft":
                    this.currentStatus="LeftToRight";
                break;
            }
        }

        //SI PULSAMOS IZQUIERDA
        if(this.KLeft.isDown){
            this.sprite.setVelocityX(this.velX*-1);
            switch(this.currentStatus){
                case "idle":
                case "idleToTurnRight":
                    this.currentStatus="idleToTurnLeft";
                break;

                case "turnRight":
                    this.currentStatus="LeftToRight";
                break;
            }
        }

        //SI PULSAMOS ABAJO
        if(this.KDown.isDown){
            this.sprite.setVelocityY(this.velY);
        }

        //SI PULSAMOS ARRIBA
        if(this.KUp.isDown){
            this.sprite.setVelocityY(this.velY*-1);
        }

        //DISPARAMOS
        if(this.KShoot.isDown && this.readyToShoot==true){
            //console.log("PIUM!");
           var disparo = new Bullet(this.scene);
           this.scene.soundManager.playPlayerShoot();
           this.readyToShoot=false;
           
           this.scene.uiManager.sumaScoreP1(100);   //Esto es una churriprueba para comprobar que aumenta correctamente la puntuación del score
        }

        if(this.KShoot.isUp && this.readyToShoot==false){
            this.readyToShoot=true;
        }
    }
}