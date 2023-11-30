class Character extends MovableObject {
    height = 300;
    y = 155;
    speed = 10;
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    world;

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png'); // super ruft Funktion des Mutterobjekts auf
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT) {
                this.otherDirection = false;
                this.x += this.speed;
            }
            if (this.world.keyboard.LEFT) {
                this.otherDirection = true;
                this.x -= this.speed;
            }
            this.world.camera_x = -this.x;
        }, 1000 / 60);

        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                //Lauf-Animation
                let i = this.currentImage % this.IMAGES_WALKING.length; //Übersetzung: let i = 0 % 5; % bedeutet math. Rest
                //für i heißt das 0, 1, 2, 3, 4, 5 und dann 5 / 5 = 0, da  Ergebnis 1 mit Rest 0 
                let path = this.IMAGES_WALKING[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            }
        }, 50);
    }

    jump() {

    }
}