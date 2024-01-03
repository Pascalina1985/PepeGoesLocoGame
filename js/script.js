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

function startGame() {
    document.getElementById('startScreenID').style.visibility = 'hidden';
    init();
}