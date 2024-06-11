/**
 * Repräsentiert eine Statusleiste für den Endboss.
 * Erweitert die Funktionalität von DrawableObject um die Anzeige des Endboss-Status.
 */
class StatusBarEndboss extends DrawableObject {
    /**
     * Die Liste der Bildpfade für verschiedene Endboss-Gesundheitszustände.
     * @type {Array<string>}
     */
    IMAGES_HEALTH_ENDBOSS = [
        'img/7_statusbars/2_statusbar_endboss/blue.png',
        'img/7_statusbars/2_statusbar_endboss/green.png',
        'img/7_statusbars/2_statusbar_endboss/orange.png'
    ];

    /**
     * Der Prozentsatz des Endboss-Status.
     * @type {number}
     * @default 100
     */
    percentage = 100;

    /**
     * Erzeugt eine neue StatusBarEndboss-Instanz.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH_ENDBOSS);
        this.x = 500;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    /**
     * Setzt den Prozentsatz des Endboss-Status.
     * @param {number} percentage - Der Prozentsatz des Endboss-Status.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_HEALTH_ENDBOSS[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Bestimmt den Index des Bildpfads basierend auf dem Endboss-Prozentsatz.
     * @returns {number} - Der Index des Bildpfads.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 0;
        } else if (this.percentage > 66) {
            return 1;
        } else {
            return 2;
        }
    }
}