# 🎮 Phaser Battle Project

Este proyecto es un shoot’em up desarrollado con **Phaser 3**, inspirado en *1943 - Battle of Midway*. Ha sido diseñado como un trabajo colaborativo entre varios desarrolladores, con el objetivo de aplicar buenas prácticas de organización y modularidad en el código.

## 📁 Estructura del Proyecto

El proyecto está organizado en dos carpetas principales ubicadas en la raíz:

### `/scripts`
Contiene **todo el código JavaScript** dividido por responsabilidades. Está pensada para facilitar el trabajo en equipo y evitar conflictos. Incluye:

- `config.js` – Configuración general del juego (tamaño, física, escenas…).
- `main.js` – Punto de entrada que lanza el juego con la configuración establecida.

Dentro de `/scripts`, hay subcarpetas para clasificar las clases y componentes:

```
scripts/
├── config.js
├── main.js
│
├── scenes/           # Escenas del juego
│   ├── BootScene.js
│   ├── PreloadScene.js
│   ├── MenuScene.js
│   ├── GameScene.js
│   └── GameOverScene.js
│
├── player/           # Lógica del jugador
│   └── Player.js
│
├── enemies/          # Diferentes tipos de enemigos
│   ├── Enemy.js
│   ├── EnemyType1.js
│   ├── EnemyType2.js
│   └── EnemyType3.js
│
├── bullets/          # Proyectiles del jugador y enemigos
│   ├── Bullet.js
│   └── EnemyBullet.js
│
├── managers/         # Gestión general de enemigos y colisiones
│   ├── EnemyManager.js
│   └── CollisionManager.js
│
├── ui/               # Interfaz de usuario
│   └── UIScene.js
```

### `/assets`
Contiene **todos los recursos del juego**, organizados por tipo:

```
assets/
├── images/           # Sprites estáticos
├── spritesheets/     # Hojas de animaciones
├── sounds/           # Efectos de sonido y música
```


## 👥 Colaboración

Cada desarrollador puede trabajar en su carpeta específica (`player/`, `enemies/`, `scenes/`, etc.) evitando conflictos y facilitando la integración de cambios.
