/**
 * Repräsentiert eine Statusleiste für Münzen.
 * Erweitert die Funktionalität von DrawableObject um die Anzeige des Münzenstatus.
 */
class StatusBarCoin extends DrawableObject {
    /**
     * Die Liste der Bildpfade für verschiedene Münzenstatus.
     * @type {Array<string>}
     */
    IMAGES_COIN = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];

    /**
     * Der Prozentsatz des Münzenstatus.
     * @type {number}
     * @default 0
     */
    percentage = 0;

    /**
     * Erzeugt eine neue StatusBarCoin-Instanz.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_COIN);
        this.x = 30;
        this.y = 35;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }

    /**
     * Setzt den Prozentsatz des Münzenstatus.
     * @param {number} percentage - Der Prozentsatz des Münzenstatus.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_COIN[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Bestimmt den Index des Bildpfads basierend auf dem Münzenprozentsatz.
     * @returns {number} - Der Index des Bildpfads.
     */
    resolveImageIndex() {
        if (this.percentage >= 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 10) { // Schwellenwert geändert von 20 auf 10
            return 1;
        } else {
            return 0;
        }
    }

}