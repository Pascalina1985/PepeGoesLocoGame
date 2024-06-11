/**
 * Repräsentiert ein bewegliches Objekt, das gezeichnet werden kann.
 * Erweitert die Funktionalität von DrawableObject um Bewegungs- und Kollisionslogik.
 */
class MovableObject extends DrawableObject {
    /**
     * Die Geschwindigkeit des Objekts.
     * @type {number}
     * @default 0.15
     */
    speed = 0.15;

    /**
     * Gibt an, ob das Objekt in die andere Richtung schaut.
     * @type {boolean}
     * @default false
     */
    otherDirection = false;

    /**
     * Die vertikale Geschwindigkeit des Objekts.
     * @type {number}
     * @default 0
     */
    speedY = 0;

    /**
     * Die Beschleunigung des Objekts.
     * @type {number}
     * @default 2.5
     */
    acceleration = 2.5;

    /**
     * Die Energie des Objekts.
     * @type {number}
     * @default 100
     */
    energy = 100;

    /**
     * Der Zeitpunkt des letzten Treffers.
     * @type {number}
     * @default 0
     */
    lastHit = 0;

    /**
     * Wendet die Schwerkraft auf das Objekt an.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Überprüft, ob das Objekt sich über dem Boden befindet.
     * @returns {boolean} - true, wenn das Objekt sich über dem Boden befindet.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 180;
        }
    }

    /**
     * Verursacht Schaden am Objekt und verringert die Energie.
     */
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Überprüft, ob das Objekt tot ist.
     * @returns {boolean} - true, wenn das Objekt tot ist.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Überprüft, ob das Objekt verletzt ist.
     * @returns {boolean} - true, wenn das Objekt in den letzten Sekunden verletzt wurde.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Differenz in ms
        timepassed = timepassed / 1000; // in Sekunden
        return timepassed < 1;
    }

    /**
     * Überprüft, ob dieses Objekt mit einem anderen Objekt kollidiert.
     * @param {MovableObject} mo - Das andere bewegliche Objekt.
     * @returns {boolean} - true, wenn eine Kollision vorliegt.
     */
    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height;
    }

    /**
     * Spielt eine Animation basierend auf einer Liste von Bildern ab.
     * @param {Array<string>} images - Die Liste der Bildpfade für die Animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Bewegt das Objekt nach rechts.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Bewegt das Objekt nach links.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Lässt das Objekt springen.
     */
    jump() {
        this.speedY = 30;
    }
}