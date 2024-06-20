/**
 * Repräsentiert einen Hühnchen-Gegner im Spiel.
 * @extends MovableObject
 */
class Chicken extends MovableObject {
    y = 360;
    height = 80;
    width = 80;

    /**
     * Array von Bildpfaden für die Geh-Animation.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    /**
     * Array von Bildpfaden für die tote Hühnchen-Animation.
     * @type {string[]}
     */
    IMAGES_CHICKEN_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    /**
     * Geräusch, das abgespielt wird, wenn sich das Hühnchen bewegt.
     * @type {Audio}
     */
    chicken_sound = new Audio('audio/chicken.mp3');

    /**
     * Konstruktor für ein neues Hühnchen-Objekt.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.isDead = false;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_CHICKEN_DEAD);
        this.x = 200 + Math.random() * 1500;
        this.speed = 0.15 + Math.random() * 0.5; // Math.random() generiert eine zufällige Zahl zwischen 0 und 1
        this.animate();
    }

    /**
     * Animiert das Hühnchen, indem es nach links bewegt wird und die Geh-Animation abgespielt wird.
     */
    animate() {
        this.movementInterval = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        this.animationInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }

    stopAnimationIntervals() {
        clearInterval(this.movementInterval);
        clearInterval(this.animationInterval);
    }


    /**
     * Stoppt die Bewegung des Hühnchens und spielt die Sterbe-Animation ab.
     */
    die() {
        clearInterval(this.movementInterval);
        this.playAnimation(this.IMAGES_CHICKEN_DEAD);

        setTimeout(() => {
            clearInterval(this.animationInterval);
        }, 200);
    }
}