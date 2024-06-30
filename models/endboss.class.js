/**
 * Repräsentiert den Endboss im Spiel.
 * @extends MovableObject
 */
class Endboss extends MovableObject {
    height = 400;
    width = 250;
    y = 60;
    health = 132;

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

    IMAGE_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGE_END = [
        'img/9_intro_outro_screens/game_over/win.png'
    ];


    IMAGE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    IMAGE_ANGRY = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png'
    ];


    bomb_sound = new Audio('audio/winnersound.mp3');

    world;

    /**
     * Erzeugt eine neue Instanz des Endbosses.
     */
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGE_DAMAGED);
        this.loadImages(this.IMAGE_END);
        this.loadImages(this.IMAGE_SPLASH);
        this.loadImages(this.IMAGE_HURT);
        this.loadImages(this.IMAGE_ANGRY);
        this.x = 2500;
        this.speed = 9;
        this.world = world;
        this.animate();
    }

    /**
     * Animiert den Endboss.
     */
    animate() {
        this.movementInterval = setInterval(() => {
            if (this.health >= 35) {
                this.moveLeft();
                this.playAnimation(this.IMAGE_ANGRY);
                if (this.x < world.character.x) {
                    this.x = world.character.x;
                }
            }
        }, 1000 / 10);


        this.animationInterval = setInterval(() => {
            if (this.health < 35) {
                this.playDamagedAnimation();
            }
        }, 300);
    }


    stopAnimationIntervals() {
        clearInterval(this.movementInterval);
        clearInterval(this.animationInterval);
    }


    // Neue Methode zur Verwaltung der beschädigten Animation
    playDamagedAnimation() {
        this.playAnimation(this.IMAGE_DAMAGED);
        if (!this.world.isSoundPaused) {
            this.bomb_sound.play();
        }
        clearInterval(this.movementInterval);

        setTimeout(() => {
            clearInterval(this.animationInterval);
            this.showEndScreen();
        }, 1700);
    }


    /**
     * Zeigt den Endbildschirm an.
     */
    showEndScreen() {
        clearInterval(this.interval);
        this.loadImage(this.IMAGE_END[0]);
        this.world.stopChickenAnimations();
        this.world.stopChickenSmallAnimations();
        this.world.character.stopCharacterAnimation();
        document.getElementById('losescreen').style.display = 'block';
        this.world.game_sound.pause();
    }

    /**
     * Reduziert die Gesundheit des Endbosses, wenn er von einer Flasche getroffen wird.
     */
    /**
     * Reduziert die Gesundheit des Endbosses, wenn er von einer Flasche getroffen wird.
     */
    hitbottle() {
        this.playAnimation(this.IMAGE_HURT);
        this.health -= 33;
        if (this.health < 0) {
            this.health = 0;
        }
    }
}