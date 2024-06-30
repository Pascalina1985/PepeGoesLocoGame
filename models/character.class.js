/**
 * Eine Klasse, die einen Charakter im Spiel darstellt.
 * 
 * @class Character
 * @extends MovableObject
 */
class Character extends MovableObject {
    /**
     * Die Höhe des Charakters.
     * 
     * @type {number}
     */
    height = 250;

    /**
     * Die y-Koordinate des Charakters.
     * 
     * @type {number}
     */
    y = 80;

    /**
     * Die Geschwindigkeit des Charakters.
     * 
     * @type {number}
     */
    speed = 10;

    /**
     * Ein Array mit den Bildpfaden für die Laufanimation des Charakters.
     * 
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    /**
     * Ein Array mit den Bildpfaden für die Sprunganimation des Charakters.
     * 
     * @type {string[]}
     */
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    /**
     * Ein Array mit den Bildpfaden für die Todesanimation des Charakters.
     * 
     * @type {string[]}
     */
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    /**
     * Ein Array mit den Bildpfaden für die Verletzungsanimation des Charakters.
     * 
     * @type {string[]}
     */
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_SLEEP = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    /**
     * Die Welt, in der sich der Charakter befindet.
     * 
     * @type {World}
     */
    world;

    /**
     * Ein Audio-Objekt für den Laufsound des Charakters.
     * 
     * @type {Audio}
     */
    walking_sound = new Audio('audio/walking.mp3');


    /**
     * Erzeugt einen neuen Charakter.
     * 
     * @constructor
     */
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_SLEEP);
        this.applyGravity();
        this.otherDirection = false;
        this.setupIntervals();
    }


    /**
     * Führt die Animation des Charakters aus.
     * 
     * Diese Methode startet zwei Intervalle für die Animation des Charakters: 
     * 
     * Das erste Intervall wird alle 1/60 Sekunde ausgeführt und überprüft die Tastatureingaben des Benutzers. 
     * Abhängig von den Tastatureingaben wird der Charakter bewegt, indem entweder die `moveRight()`- oder `moveLeft()`-Methode aufgerufen wird.
     * Außerdem wird überprüft, ob der Charakter springen soll, und die `jump()`-Methode wird aufgerufen, wenn die Leertaste gedrückt wird und der Charakter nicht bereits in der Luft ist.
     * Zusätzlich wird die Kamera entsprechend der Position des Charakters aktualisiert.
     * 
     * Das zweite Intervall wird alle 50 Millisekunden ausgeführt und überprüft den Zustand des Charakters. 
     * Wenn der Charakter tot ist, wird eine Todesanimation abgespielt und die Seite nach einer Verzögerung von 2,7 Sekunden neu geladen.
     * Wenn der Charakter verletzt ist, wird eine Verletzungsanimation abgespielt und der entsprechende Sound abgespielt.
     * Wenn der Charakter in der Luft ist, wird eine Sprunganimation abgespielt.
     * Wenn der Charakter auf dem Boden ist und sich nach rechts oder links bewegt, wird eine Laufanimation abgespielt.
     */


    // Setup der Intervalle
    setupIntervals() {
        this.startMovementInterval();
        this.startAnimationInterval();
        this.startJumpingAnimationInterval();

    }

    // Intervall für die Bewegung und Grundlogik
    startMovementInterval() {
        this.MovementInterval = setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                if (!isSoundPaused && game_sound.paused) game_sound.play();
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                if (!isSoundPaused && game_sound.paused) game_sound.play();
            }
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
                if (!isSoundPaused && game_sound.paused) game_sound.play();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
    }

    // Intervall für die Animationen außer Jumping und Schlafen
    sleeper = false;
    sleepTimeout = null;

    startAnimationInterval() {
        this.animationInterval = setInterval(() => {
            if (this.isDead()) {
                this.world.chicken_sound.pause();
                if (!this.world.isSoundPaused) {
                    this.world.dead_sound.play();
                }
                clearTimeout(this.sleepTimeout);
                this.sleeper = false;
                this.playAnimation(this.IMAGES_DEAD);
                document.getElementById('lostscreen').style.display = 'block';
                this.stopAnimationIntervals();
                setTimeout(() => {
                    this.world.dead_sound.currentTime = 0;
                }, 2700);
                this.world.characterIsDead = true;
            } else if (this.isHurt()) {
                this.sleeper = false;
                this.playAnimation(this.IMAGES_HURT);
                clearTimeout(this.sleepTimeout);
            } else if (this.world.keyboard.SPACE && this.isAboveGround()) {
                this.sleeper = false;
                clearTimeout(this.sleepTimeout);
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.sleeper = false;
                clearTimeout(this.sleepTimeout);
                this.playAnimation(this.IMAGES_WALKING);
            } else if (!this.isAboveGround()) {
                if (!this.sleeper) {
                    this.sleeper = true;
                    this.sleepTimeout = setTimeout(() => {
                        if (this.sleeper) {
                            this.playAnimation(this.IMAGES_SLEEP);
                            this.loopSleepAnimation();
                        }
                    }, 1500);
                }
            }
        }, 100);
    }

    stopAnimationIntervals() {
        clearInterval(this.animationInterval);
        clearInterval(this.MovementInterval);
        this.world.stopEndbossAnimations();
        this.world.stopChickenAnimations();
        this.world.stopChickenSmallAnimations();
    }

    stopCharacterAnimation() {
        clearInterval(this.animationInterval);
        clearInterval(this.MovementInterval);
    }


    loopSleepAnimation() {
        if (this.sleeper) {
            this.playAnimation(this.IMAGES_SLEEP);
            setTimeout(() => this.loopSleepAnimation(), 100);
        }
    }

    startJumpingAnimationInterval() {
        setInterval(() => {
            if (this.isAboveGround()) {
                this.sleeper = false;
                clearTimeout(this.sleepTimeout);
                this.playAnimation(this.IMAGES_JUMPING);
            }
        }, 200);
    }

    /**
     * Lässt den Charakter springen, indem die vertikale Geschwindigkeit des Charakters erhöht wird.
     */
    jump() {
        this.speedY = 30; // Setzt die vertikale Geschwindigkeit des Charakters auf einen Sprungwert
    }
}