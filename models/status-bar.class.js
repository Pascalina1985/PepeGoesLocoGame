/**
 * Repräsentiert eine generische Statusleiste.
 * Erweitert die Funktionalität von DrawableObject um die Anzeige des Status.
 */
class StatusBar extends DrawableObject {
    /**
     * Die Liste der Bildpfade für verschiedene Statuszustände.
     * @type {Array<string>}
     */
    IMAGES_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];

    /**
     * Der Prozentsatz des Status.
     * @type {number}
     * @default 100
     */
    percentage = 100;

    /**
     * Erzeugt eine neue StatusBar-Instanz.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH);
        this.x = 30;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    /**
     * Setzt den Prozentsatz des Status.
     * @param {number} percentage - Der Prozentsatz des Status.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_HEALTH[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Bestimmt den Index des Bildpfads basierend auf dem Prozentsatz des Status.
     * @returns {number} - Der Index des Bildpfads.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}