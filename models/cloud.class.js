/**
 * Repräsentiert eine Wolke im Spiel.
 * @extends MovableObject
 */
class Cloud extends MovableObject {
    y = 75;
    width = 500;
    height = 250;

    /**
     * Konstruktor für ein neues Wolken-Objekt.
     */
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 500;
        this.animate();
    }

    /**
     * Animiert die Wolke, indem sie nach links bewegt wird.
     */
    animate() {
        this.moveLeft();
    }
}