class MovableObject {
    x = 120;
    y = 280;
    img;
    width = 100;
    height = 150;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;

    loadImage(path) {
        this.img = new Image(); //<img> JavaScript Abbildung vom Image Tag
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => { //forEach: für jeden Inhalt des arrays
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    moveRight() {
        console.log('moveRight');
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}