/**
 * Das Canvas-Element, auf dem das Spiel gerendert wird.
 * @type {HTMLCanvasElement}
 */
let canvas;

/**
 * Die Welt des Spiels.
 * @type {World}
 */
let world;

/**
 * Die Tastatursteuerung des Spiels.
 * @type {Keyboard}
 */
let keyboard = new Keyboard();

let isSoundPaused = localStorage.getItem('isSoundPaused') === 'true';
let game_sound; // Global zuweisen
let splash_sound;
let coin_sound;
let bottle_sound;
let yeah_sound;
let hurt_sound;
let chicken_sound;
let bomb_sound;
let dead_sound;
let shouldPlaySound = true; // Flag zur Steuerung des Sounds
/**
 * Initialisiert das Spiel.
 * 
 * @function init
 */
function init() {
    canvas = document.getElementById('canvas');
    game_sound = new Audio('audio/soundofgame.mp3'); // game_sound global zuweisen
    splash_sound = new Audio('audio/splash.mp3');
    coin_sound = new Audio('audio/coin.mp3');
    bottle_sound = new Audio('audio/bottlecollected2.mp3');
    yeah_sound = new Audio('audio/shoutingyeah.mp3');
    hurt_sound = new Audio('audio/hurt.mp3');
    chicken_sound = new Audio('audio/chicken2.mp3');
    bomb_sound = new Audio('audio/winnersound.mp3');
    dead_sound = new Audio('audio/dead.mp3');
    world = new World(canvas, keyboard, splash_sound, coin_sound, bottle_sound, yeah_sound, hurt_sound, chicken_sound, bomb_sound, dead_sound, game_sound);
    if (isSoundPaused) {
        game_sound.pause();
        splash_sound.pause();
        coin_sound.pause();
        bottle_sound.pause();
        yeah_sound.pause();
        hurt_sound.pause();
        chicken_sound.pause();
        bomb_sound.pause();
        dead_sound.pause();
    } else {
        game_sound.play();
    }
}

document.addEventListener("DOMContentLoaded", function() {
    buttonPressed();
});

function buttonPressed() {
    document.getElementById('btn-right').addEventListener("touchstart", (e) => {
        if (e.cancelable) e.preventDefault();
        keyboard.RIGHT = true;
    });
    document.getElementById('btn-right').addEventListener("touchend", (e) => {
        if (e.cancelable) e.preventDefault();
        keyboard.RIGHT = false;
    });
    document.getElementById('btn-left').addEventListener("touchstart", (e) => {
        if (e.cancelable) e.preventDefault();
        keyboard.LEFT = true;
    });
    document.getElementById('btn-left').addEventListener("touchend", (e) => {
        if (e.cancelable) e.preventDefault();
        keyboard.LEFT = false;
    });
    document.getElementById('btn-up').addEventListener("touchstart", (e) => {
        if (e.cancelable) e.preventDefault();
        keyboard.SPACE = true;
    });
    document.getElementById('btn-up').addEventListener("touchend", (e) => {
        if (e.cancelable) e.preventDefault();
        keyboard.SPACE = false;
    });
    document.getElementById('btn-throw').addEventListener("touchstart", (e) => {
        if (e.cancelable) e.preventDefault();
        keyboard.D = true;
    });
    document.getElementById('btn-throw').addEventListener("touchend", (e) => {
        if (e.cancelable) e.preventDefault();
        keyboard.D = false;
    });
    document.getElementById('btn-upup').addEventListener("touchstart", (e) => {
        if (e.cancelable) e.preventDefault();
        keyboard.SPACE = true;
    });
    document.getElementById('btn-upup').addEventListener("touchend", (e) => {
        if (e.cancelable) e.preventDefault();
        keyboard.SPACE = false;
    });
}



/**
 * Reaktion auf Tastenereignisse beim Drücken.
 * 
 * @callback keydownCallback
 * @param {KeyboardEvent} event - Das Tastaturereignis.
 */
window.addEventListener("keydown", (event) => {
    switch (event.keyCode) {
        case 39:
            keyboard.RIGHT = true;
            break;
        case 37:
            keyboard.LEFT = true;
            break;
        case 40:
            keyboard.DOWN = true;
            break;
        case 38:
            keyboard.UP = true;
            break;
        case 32:
            keyboard.SPACE = true;
            break;
        case 68:
            keyboard.D = true;
            break;
        default:
            break;
    }
});

/**
 * Reaktion auf Tastenereignisse beim Loslassen.
 * 
 * @callback keyupCallback
 * @param {KeyboardEvent} event - Das Tastaturereignis.
 */
window.addEventListener("keyup", (event) => {
    switch (event.keyCode) {
        case 39:
            keyboard.RIGHT = false;
            break;
        case 37:
            keyboard.LEFT = false;
            break;
        case 40:
            keyboard.DOWN = false;
            break;
        case 38:
            keyboard.UP = false;
            break;
        case 32:
            keyboard.SPACE = false;
            break;
        case 68:
            keyboard.D = false;
            break;
        default:
            break;
    }
});

/**
 * Pausiert alle Sounds im Spiel.
 */
/**
 * Pausiert alle Sounds im Spiel.
 */


function pauseSounds() {
    document.getElementById('pausebutton').blur();
    isSoundPaused = !isSoundPaused; // Wechsel des Sound-Status
    localStorage.setItem('isSoundPaused', isSoundPaused); // Speichern des neuen Status in localStorage
    if (isSoundPaused) {
        document.getElementById('pauseimg').src = 'img/soundoff.png';
    } else if (!isSoundPaused) {
        document.getElementById('pauseimg').src = 'img/sound.png';
    }
    if (isSoundPaused) {
        game_sound.pause();
        splash_sound.pause();
        coin_sound.pause();
        bottle_sound.pause();
        yeah_sound.pause();
        hurt_sound.pause();
        chicken_sound.pause();
        bomb_sound.pause();
        dead_sound.pause();
    } else {
        game_sound.play();
    }

    world.updateSoundStatus(isSoundPaused); // Aktualisieren Sie den Soundstatus in der World-Klasse
}