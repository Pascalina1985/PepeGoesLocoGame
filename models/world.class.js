class World {
    character = new Character(); //Variablen in Klassen ohne let
    level = level1;

    canvas;
    ctx;
    camera_x = 0;
    statusBar = new StatusBar();
    StatusBarEndboss = new StatusBarEndboss();
    StatusBarBottle = new StatusBarBottle();
    keyboard;
    throwableObject = [];
    collectedBottles = []; // PME 21.05.2024

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d'); //nur ctx kann auf canvas gemalt werden
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkcharacterbottle();
        }, 200);
    }

    checkCollisions() {
        this.level.enemies.forEach(enemy => { // Wird jede Sekunde(bei 1000) für alle Gegner ausgeführt
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
                console.log('Energie ist ', this.character.energy);
            }
        });
    }


    checkcharacterbottle() {
        this.level.bottles.forEach((bottle, index) => {
            if (!bottle.collected && this.character.isColliding(bottle)) {
                bottle.collected = true; // Markiere die Flasche als gesammelt
                this.collectedBottles.push(bottle); // PME 21.05.2024
                this.StatusBarBottle.setPercentage(this.collectedBottles.length); //
                console.log(`Flasche ${index} gesammelt`);
            }
        });
    }


    checkThrowObjects() {
        if (this.keyboard.D && this.collectedBottles.length > 0) { // Überprüfe, ob Flaschen gesammelt wurden
            this.collectedBottles.pop(); // Entferne die letzte gesammelte Flasche aus dem Array
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObject.push(bottle);
            // Aktualisiere den Prozentsatz in der Statusleiste
            this.StatusBarBottle.setPercentage(this.collectedBottles.length);
        } else {
            console.log('Keine Flaschen zum Werfen verfügbar');
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0); //translate als Funktion verschiebt etwas in Abhängigkeit einer Variable
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0); //zurück
        this.addToMap(this.statusBar);
        this.addToMap(this.StatusBarEndboss);
        this.addToMap(this.StatusBarBottle);
        this.ctx.translate(this.camera_x, 0); //vorwärts
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObject);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.bottles);

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