function fullscreen() {
    openFullscreen();
}

function openFullscreen() {
    let fullscreenDiv = document.getElementById('fullscreen');
    let canvas = fullscreenDiv.querySelector('canvas');

    canvas.width = 2560;
    canvas.height = 480;

    if (fullscreenDiv.requestFullscreen) {
        fullscreenDiv.requestFullscreen();
    } else if (fullscreenDiv.webkitRequestFullscreen) { /* Safari */
        fullscreenDiv.webkitRequestFullscreen();
    } else if (fullscreenDiv.msRequestFullscreen) { /* IE11 */
        fullscreenDiv.msRequestFullscreen();
    }
}



function closeFullscreen() {
    let fullscreenDiv = document.getElementById('fullscreen');
    let canvas = fullscreenDiv.querySelector('canvas');

    canvas.width = 720;
    canvas.height = 480;

    if (fullscreenDiv.exitFullscreen) {
        fullscreenDiv.exitFullscreen();
    } else if (fullscreenDiv.webkitExitFullscreen) { /* Safari */
        fullscreenDiv.webkitExitFullscreen();
    } else if (fullscreenDiv.msExitFullscreen) { /* IE11 */
        fullscreenDiv.msExitFullscreen();
    }
}

let level1;

function startGame() {
    document.getElementById('startScreenID').style.visibility = 'hidden';
    document.getElementById('startGameButton').style.visibility = 'hidden';

    level1 = new Level(
        [ //Variablen in Klassen ohne let
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Endboss()
        ], [
            new Cloud()
        ], [
            new BackgroundObject('img/5_background/layers/air.png', -719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0), //nur x Koordinate
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/air.png', 719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2), //nur x Koordinate
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
            new Bottle()
        ]
    );

    init();
}