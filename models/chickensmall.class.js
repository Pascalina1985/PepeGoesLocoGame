/**
 * Repräsentiert einen kleinen Hühnchen-Gegner im Spiel.
 * @extends MovableObject
 */
class ChickenSmall extends MovableObject {
    y = 360;
    height = 80;
    width = 80;

    /**
     * Array von Bildpfaden für die Geh-Animation des kleinen Hühnchens.
     * @type {string[]}
     */
    IMAGES_SMALLWALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    /**
     * Array von Bildpfaden für die tote kleine Hühnchen-Animation.
     * @type {string[]}
     */
    IMAGES_CHICKENSMALL_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    /**
     * Geräusch, das abgespielt wird, wenn sich das kleine Hühnchen bewegt.
     * @type {Audio}
     */
    chicken_sound = new Audio('audio/chicken.mp3');

    /**
     * Konstruktor für ein neues kleines Hühnchen-Objekt.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.isDead = false;
        this.loadImages(this.IMAGES_SMALLWALKING);
        this.loadImages(this.IMAGES_CHICKENSMALL_DEAD);
        this.x = 200 + Math.random() * 1000;
        this.speed = 0.15 + Math.random() * 0.5; // Math.random() generiert eine zufällige Zahl zwischen 0 und 1
        this.animate();
    }

    /**
     * Animiert das kleine Hühnchen, indem es nach links bewegt wird und die Geh-Animation abgespielt wird.
     */
    animate() {
        this.movementInterval = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        this.animationInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_SMALLWALKING);
            // this.chicken_sound.play();
        }, 200);
    }

    /**
     * Stoppt die Bewegung des kleinen Hühnchens und spielt die tote Animation ab.
     */
    die() {
        clearInterval(this.movementInterval);
        this.playAnimation(this.IMAGES_CHICKENSMALL_DEAD);
        setTimeout(() => {
            clearInterval(this.animationInterval);
        }, 200);
    }
}