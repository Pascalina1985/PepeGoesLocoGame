/**
 * Repräsentiert eine Statusleiste für Flaschen.
 * Erweitert die Funktionalität von DrawableObject um die Anzeige des Flaschenstatus.
 */
class StatusBarBottle extends DrawableObject {
    /**
     * Die Liste der Bildpfade für verschiedene Flaschenstatus.
     * @type {Array<string>}
     */
    IMAGES_BOTTLE_STATUS = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];

    /**
     * Der Prozentsatz der Flaschenkollisionen.
     * @type {number}
     * @default 0
     */
    percentage = 0;

    /**
     * Erzeugt eine neue StatusBarBottle-Instanz.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLE_STATUS);
        this.x = 500;
        this.y = 35;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }

    /**
     * Setzt den Prozentsatz basierend auf der Anzahl der Kollisionen mit Flaschen.
     * @param {number} collisionCount - Die Anzahl der Kollisionen mit Flaschen.
     */
    setPercentage(collisionCount) {
        this.bottle = Math.min(collisionCount, 5);
        let index = this.resolveImageIndex();
        let path = this.IMAGES_BOTTLE_STATUS[index];
        this.img = this.imageCache[path];
    }

    /**
     * Bestimmt den Index des Bildpfads basierend auf der Anzahl der Flaschenkollisionen.
     * @returns {number} - Der Index des Bildpfads.
     */
    resolveImageIndex() {
        return this.bottle;
    }
}