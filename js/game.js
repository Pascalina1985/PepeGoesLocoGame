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
let shouldPlaySound = true; // Flag zur Steuerung des Sounds
/**
 * Initialisiert das Spiel.
 * 
 * @function init
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    game_sound = new Audio('audio/soundofgame.mp3'); // game_sound global zuweisen
    if (isSoundPaused) {
        game_sound.pause();
    } else {
        game_sound.play();
    }
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
    if (!isSoundPaused) {
        document.getElementById('pausebutton').blur();
        game_sound.pause();
        isSoundPaused = true;
    } else {
        document.getElementById('pausebutton').blur();
        game_sound.play();
        isSoundPaused = false;
    }
    localStorage.setItem('isSoundPaused', isSoundPaused); // Speichere den Soundstatus im localStorage
    shouldPlaySound = !isSoundPaused; // Aktualisiere das Flag
}