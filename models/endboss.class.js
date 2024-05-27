class Endboss extends MovableObject {
    height = 400;
    width = 250;
    y = 60;
    health = 100; // Anfangsenergie des Endbosses


    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGE_DAMAGED = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    IMAGE_END = [
        'img/9_intro_outro_screens/game_over/win.png'
    ];

    bomb_sound = new Audio('audio/bomb.mp3');

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGE_DAMAGED);
        this.loadImages(this.IMAGE_END);
        this.x = 2500;
        this.animate();
    }


    animate() {
        this.interval = setInterval(() => {
            if (this.health < 35) {
                this.playAnimation(this.IMAGE_DAMAGED);
                this.bomb_sound.play();
                setTimeout(() => {
                    this.showEndScreen();
                }, 3000);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }

    showEndScreen() {
        clearInterval(this.interval);
        this.loadImage(this.IMAGE_END[0]);
        setTimeout(() => {
            location.reload();
        }, 3000);
    }


    hitbottle() {
        this.health -= 33;
        if (this.health < 0) {
            this.health = 0;
        }
        console.log('Endboss Gesundheit: ', this.health);
    }
}