/**
 * Eine Klasse, die ein Hintergrundobjekt darstellt.
 * 
 * @class BackgroundObject
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {
    /**
     * Die Breite des Hintergrundobjekts.
     * 
     * @type {number}
     */
    width = 720;

    /**
     * Die Höhe des Hintergrundobjekts.
     * 
     * @type {number}
     */
    height = 480;

    /**
     * Erzeugt ein neues BackgroundObject.
     * 
     * @constructor
     * @param {string} imagePath - Der Dateipfad zum Bild des Hintergrundobjekts.
     * @param {number} x - Die x-Koordinate, an der das Hintergrundobjekt platziert werden soll.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}