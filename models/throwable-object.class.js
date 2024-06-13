/**
 * Repräsentiert ein Objekt, das geworfen werden kann.
 * Erweitert die Funktionalität von MovableObject.
 */
class ThrowableObject extends MovableObject {
    /**
     * Erzeugt eine neue ThrowableObject-Instanz mit den angegebenen Koordinaten und der Richtung des Wurfs.
     * @param {number} x - Die x-Koordinate des Objekts.
     * @param {number} y - Die y-Koordinate des Objekts.
     * @param {boolean} facingRight - Die Richtung des Wurfs (true für rechts, false für links).
     */
    constructor(x, y, facingRight) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.facingRight = facingRight; // Richtung des Wurfs speichern
        this.throw();
    }

    /**
     * Startet den Wurf des Objekts.
     */
    throw () {
        this.speedY = 30;
        this.applyGravity();
        this.throwInterval = setInterval(() => {
            if (this.facingRight) {
                this.x += 10;
            } else {
                this.x -= 10;
            }
        }, 25);
    }

    /**
     * Spielt die Spritzanimation ab, wenn das Objekt auf den Endboss trifft.
     */
    splash() {
        clearInterval(this.throwInterval); // Stoppe die Bewegung der Flasche
        this.loadImages(world.endboss.IMAGE_SPLASH); // Lade die Spritzbilder
        this.loadImages(world.endboss.IMAGE_DAMAGED);
        this.playAnimation(world.endboss.IMAGE_SPLASH); // Spiele die Spritzanimation ab
        this.playAnimation(world.endboss.IMAGE_DAMAGED);
        setTimeout(() => {
            // Entferne die Flasche nach der Animation
            world.throwableObject = world.throwableObject.filter(obj => obj !== this);
        }, 500); // Zeit für die Spritzanimation anpassen
    }
}