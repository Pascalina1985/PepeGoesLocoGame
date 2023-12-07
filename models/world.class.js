class World {
    character = new Character(); //Variablen in Klassen ohne let
    level = level1;

    canvas;
    ctx;
    camera_x = 0;
    keyboard;
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d'); //nur ctx kann auf canvas gemalt werden
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }

    setWorld() {
        this.character.world = this;
    }

    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach(enemy => { // Wird jede Sekunde(bei 1000) für alle Gegner ausgeführt
                if (this.character.isColliding(enemy)) {
                    this.character.hit();
                    console.log('Energie ist ', this.character.energy);
                }
            });
        }, 200);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0); //translate als Funktion verschiebt etwas in Abhängigkeit einer Variable

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => { //o steht für jedes Objekt
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipIMage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);


        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipIMage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}