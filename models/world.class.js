class World {
    character = new Character(); //Variablen in Klassen ohne let
    level = level1;

    canvas;
    ctx;
    camera_x = 0;
    statusBar = new StatusBar();
    StatusBarEndboss = new StatusBarEndboss();
    StatusBarBottle = new StatusBarBottle();
    StatusBarCoin = new StatusBarCoin();
    keyboard;
    throwableObject = [];
    collectedBottles = [];
    collectedCoins = [];
    hitenemies = [];
    endboss;
    coin_sound = new Audio('audio/coin.mp3');
    bottle_sound = new Audio('audio/bottlecollected2.mp3');
    yeah_sound = new Audio('audio/shoutingyeah.mp3');
    splash_sound = new Audio('audio/splash.mp3');

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d'); //nur ctx kann auf canvas gemalt werden
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.endboss = this.getEndboss();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    getEndboss() {
        return this.level.enemies.find(enemy => enemy instanceof Endboss);
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkcharacterbottle();
            this.checkBottleEndbossCollision(); // PME 21.05.2024
            this.checkcharaktercoin(); // PME 27.05.2024
            this.checkCollisionsEndbossCharacter();
        }, 200);
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (this.character.y + this.character.height < enemy.y + enemy.height &&
                    this.character.x + this.character.width > enemy.x &&
                    this.character.x < enemy.x + enemy.width) {
                    if (enemy instanceof Chicken || enemy instanceof ChickenSmall) {
                        this.handleJumpingOnEnemy(enemy);
                        this.splash_sound.play();
                        clearInterval(this.character.IMAGES_HURT);
                    }
                } else {
                    if (!this.isJumpingOnEnemy) {
                        this.handleNormalCollision();
                    }
                }
            }
        });
        this.removeHitEnemies();
    }

    checkCollisionsEndbossCharacter() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (this.character.y + this.character.height < enemy.y + enemy.height &&
                    this.character.x + this.character.width > enemy.x &&
                    this.character.x < enemy.x + enemy.width) {
                    if (enemy instanceof Endboss) {
                        this.character.hit();
                        this.statusBar.setPercentage(this.character.energy);
                    }
                }
            }
        });
    }


    handleJumpingOnEnemy(enemy) {
        enemy.die(); // Gegner entfernen
        setTimeout(() => {
            this.hitenemies.push(enemy); // Gegner zum Entfernen markieren
            this.removeHitEnemies(); // Gegner entfernen
        }, 100); // Zeit für die Todesanimation
    }


    handleNormalCollision() {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
        console.log('Energie ist ', this.character.energy);
    }


    removeHitEnemies() {
        this.level.enemies = this.level.enemies.filter(enemy => !this.hitenemies.includes(enemy));
        this.hitenemies = [];
    }


    checkcharacterbottle() {
        this.level.bottles = this.level.bottles.filter((bottle, index) => {
            if (!bottle.collected && this.character.isColliding(bottle)) {
                this.bottle_sound.play();
                bottle.collected = true; // Markiere die Flasche als gesammelt
                this.collectedBottles.push(bottle);
                this.StatusBarBottle.setPercentage(this.collectedBottles.length); //
                console.log(`Flasche ${index} gesammelt`);
                return false; // Entferne die gesammelte Flasche aus dem Array
            }
            return true; // Behalte die ungesammelten Flaschen im Array
        });
    }


    checkcharaktercoin() {
        const totalCoins = 8;
        this.level.coins = this.level.coins.filter((coin, index) => {
            if (!coin.collected && this.character.isColliding(coin)) {
                this.coin_sound.play();
                coin.collected = true;
                this.collectedCoins.push(coin);
                const percentage = (this.collectedCoins.length / totalCoins) * 100;
                this.StatusBarCoin.setPercentage(percentage);
                console.log(`Coins ${index} gesammelt`);
                return false;
            }
            return true;
        })
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.collectedBottles.length > 0) { // Überprüfe, ob Flaschen gesammelt wurden
            this.yeah_sound.play();
            this.collectedBottles.pop(); // Entferne die letzte gesammelte Flasche aus dem Array
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObject.push(bottle);
            // Aktualisiere den Prozentsatz in der Statusleiste
            this.StatusBarBottle.setPercentage(this.collectedBottles.length);
        } else {
            console.log('Keine Flaschen zum Werfen verfügbar');
        }
    }


    checkBottleEndbossCollision() {
        if (this.endboss) {
            this.throwableObject.forEach((bottle, index) => {
                if (bottle.isColliding(this.endboss)) {
                    this.endboss.hitbottle();
                    this.StatusBarEndboss.setPercentage(this.endboss.health);
                    console.log('Endboss getroffen');
                }
            });
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
        this.addToMap(this.StatusBarCoin);
        this.ctx.translate(this.camera_x, 0); //vorwärts
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObject);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);

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