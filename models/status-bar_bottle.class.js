class StatusBarBottle extends DrawableObject {
    IMAGES_BOTTLE_STATUS = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];

    bottle = 0;
    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLE_STATUS);
        this.x = 30;
        this.y = 60;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_BOTTLE_STATUS[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.bottle == 0) {
            return 0;
        } else if (this.bottle == 1) {
            return 1;
        } else if (this.bottle == 2) {
            return 2;
        } else if (this.bottle == 3) {
            return 3;
        } else if (this.bottle == 4) {
            return 4;
        } else if (this.bottle == 5) {
            return 5;
        } else {
            return 0;
        }
    }
}