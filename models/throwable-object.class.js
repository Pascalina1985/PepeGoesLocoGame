/**
 * Repräsentiert ein Objekt, das geworfen werden kann.
 * Erweitert die Funktionalität von MovableObject.
 */
class ThrowableObject extends MovableObject {
    /**
     * Erzeugt eine neue ThrowableObject-Instanz mit den angegebenen Koordinaten.
     * @param {number} x - Die x-Koordinate des Objekts.
     * @param {number} y - Die y-Koordinate des Objekts.
     */
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw();
    }

    /**
     * Startet den Wurf des Objekts.
     */
    throw () {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);
    }
}