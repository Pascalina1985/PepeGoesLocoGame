/**
 * Überprüft die Ausrichtung des Geräts und zeigt eine Meldung an, falls das Gerät vertikal ausgerichtet ist.
 * 
 * @function checkOrientation
 */
function checkOrientation() {
    if (window.innerHeight > window.innerWidth) {
        document.getElementById('rotate-device').style.display = 'block';
    } else {
        document.getElementById('rotate-device').style.display = 'none';
    }
}

// Fügt Event-Listener für das Überprüfen der Ausrichtung hinzu
window.addEventListener('resize', checkOrientation);
window.addEventListener('load', checkOrientation);

/**
 * Startet das Spiel und initialisiert die Level.
 * 
 * @function startGame
 */
let level1;

function restartGame() {
    location.reload();
}

function startGame() {
    document.getElementById('startScreenID').style.visibility = 'hidden';
    document.getElementById('startGameButton').style.visibility = 'hidden';
    document.getElementById('pausebutton').style.display = 'block';
    document.getElementById('pauseimg').style.display = 'block';

    level1 = new Level(
        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Endboss(),
            new ChickenSmall(),
            new ChickenSmall(),
            new ChickenSmall(),
            new ChickenSmall(),
            new ChickenSmall()
        ], [
            new Cloud()
        ], [
            new BackgroundObject('img/5_background/layers/air.png', -719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/air.png', 719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3)
        ], [
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle()
        ], [
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin()
        ]
    );

    init();
}