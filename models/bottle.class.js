/**
 * Eine Klasse, die eine Flasche darstellt.
 * 
 * @class Bottle
 * @extends MovableObject
 */
class Bottle extends MovableObject {
    /**
     * Die y-Koordinate der Flasche.
     * 
     * @type {number}
     */
    y = 380;

    /**
     * Die Höhe der Flasche.
     * 
     * @type {number}
     */
    height = 40;

    /**
     * Die Breite der Flasche.
     * 
     * @type {number}
     */
    width = 40;

    /**
     * Gibt an, ob die Flasche bereits eingesammelt wurde oder nicht.
     * 
     * @type {boolean}
     */
    collected = false;

    /**
     * Erzeugt eine neue Flasche.
     * 
     * @constructor
     */
    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.x = 200 + Math.random() * 1000;
    }
}