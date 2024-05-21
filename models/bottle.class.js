class Bottle extends MovableObject {
    y = 380;
    height = 40;
    width = 40;
    collected = false;

    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.x = 200 + Math.random() * 1000;
    }
}