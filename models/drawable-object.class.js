/**
 * Repräsentiert ein zeichnbares Objekt im Spiel.
 */
class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 280;
    width = 100;
    height = 150;

    /**
     * Lädt ein Bild anhand des angegebenen Pfads.
     * @param {string} path - Der Pfad des Bildes, das geladen werden soll.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Zeichnet das Bild des Objekts auf das angegebene Canvas-Kontext.
     * @param {CanvasRenderingContext2D} ctx - Der Canvas-Kontext, auf dem das Bild gezeichnet werden soll.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Zeichnet den Rahmen des Objekts auf das angegebene Canvas-Kontext.
     * Diese Methode wird nur für bestimmte Objekttypen ausgeführt.
     * @param {CanvasRenderingContext2D} ctx - Der Canvas-Kontext, auf dem der Rahmen gezeichnet werden soll.
     */
    drawFrame(ctx) {
        if (this instanceof Character ||
            this instanceof Chicken ||
            this instanceof Endboss ||
            this instanceof ThrowableObject ||
            this instanceof Bottle ||
            this instanceof Coin ||
            this instanceof ChickenSmall) {
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.width, this.height);
        }
    }

    /**
     * Lädt eine Reihe von Bildern anhand der angegebenen Pfade und speichert sie im Bild-Cache.
     * @param {string[]} arr - Ein Array von Pfaden der Bilder, die geladen werden sollen.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}