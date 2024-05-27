class ChickenSmall extends MovableObject {
    y = 360;
    height = 80;
    width = 80;
    IMAGES_SMALLWALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_CHICKENSMALL_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    chicken_sound = new Audio('audio/chicken.mp3');

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_SMALLWALKING);
        this.loadImages(this.IMAGES_CHICKENSMALL_DEAD);
        this.x = 200 + Math.random() * 1000;
        this.speed = 0.15 + Math.random() * 0.5; //Math.random():generiert eine zufällige Zahl zwischen 0 und 1
        this.animate();
    }

    animate() {
        this.movementInterval = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        this.animationInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_SMALLWALKING);
            //this.chicken_sound.play();
        }, 200);
    }

    die() {
        clearInterval(this.movementInterval);
        this.playAnimation(this.IMAGES_CHICKENSMALL_DEAD);
        setTimeout(() => {
            clearInterval(this.animationInterval);
        }, 200);
    }
}