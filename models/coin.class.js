/**
 * Repräsentiert eine Münze im Spiel.
 * @extends MovableObject
 */
class Coin extends MovableObject {
    y = 100;
    height = 70;
    width = 70;
    collected = false;

    /**
     * Konstruktor für ein neues Münz-Objekt.
     */
    constructor() {
        super().loadImage('img/8_coin/coin_2.png');
        this.x = 200 + Math.random() * 2000;
    }
}