/**
 * Repräsentiert eine Wolke im Spiel.
 * @extends MovableObject
 */
class Cloud extends MovableObject {
    y = 75;
    width = 500;
    height = 250;

    IMAGES_CLOUD = [
        'img/5_background/layers/4_clouds/1.png'
    ];

    /**
     * Konstruktor für ein neues Wolken-Objekt.
     */
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.loadImages(this.IMAGES_CLOUD);
        this.x = 50;
        this.speed = 2;
        this.animate();
    }

    /**
     * Animiert die Wolke, indem sie nach links bewegt wird.
     */
    animate() {
        setInterval(() => {
            this.moveRight();
        }, 1000 / 60); // Bewegung alle 1/60 Sekunden, ungefähr 60 FPS

        setInterval(() => {
            this.playAnimation(this.IMAGES_CLOUD);
        }, 200); // Animation alle 200ms wechseln
    }
}