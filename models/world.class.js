/**
 * Die Klasse, die die Spielwelt repräsentiert und die verschiedenen Objekte und deren Interaktionen enthält.
 */
class World {
    /**
     * Der Charakter des Spiels.
     * @type {Character}
     */
    character = new Character(); // Variablen in Klassen ohne 'let'

    /**
     * Das aktuelle Level des Spiels.
     * @type {Level}
     */
    level = level1;

    /**
     * Das Canvas-Element, auf dem das Spiel gerendert wird.
     * @type {HTMLCanvasElement}
     */
    canvas;

    /**
     * Der Kontext des Canvas-Elements.
     * @type {CanvasRenderingContext2D}
     */
    ctx;

    /**
     * Die horizontale Position der Kamera.
     * @type {number}
     */
    camera_x = 0;

    /**
     * Die Statusleiste des Charakters.
     * @type {StatusBar}
     */
    statusBar = new StatusBar();

    /**
     * Die Statusleiste des Endbosses.
     * @type {StatusBarEndboss}
     */
    StatusBarEndboss = new StatusBarEndboss();

    /**
     * Die Statusleiste der Flaschen.
     * @type {StatusBarBottle}
     */
    StatusBarBottle = new StatusBarBottle();

    /**
     * Die Statusleiste der Münzen.
     * @type {StatusBarCoin}
     */
    StatusBarCoin = new StatusBarCoin();

    /**
     * Die Tastatureingabe für das Spiel.
     * @type {Keyboard}
     */
    keyboard;

    /**
     * Die geworfenen Objekte im Spiel.
     * @type {ThrowableObject[]}
     */
    throwableObject = [];

    /**
     * Die gesammelten Flaschen im Spiel.
     * @type {Bottle[]}
     */
    collectedBottles = [];

    /**
     * Die gesammelten Münzen im Spiel.
     * @type {Coin[]}
     */
    collectedCoins = [];

    /**
     * Die getroffenen Feinde im Spiel.
     * @type {Enemy[]}
     */
    hitenemies = [];

    /**
     * Der Endboss des Levels.
     * @type {Endboss}
     */
    endboss = new Endboss();


    /**
     * Erstellt eine Instanz der Spielwelt.
     * @param {HTMLCanvasElement} canvas - Das Canvas-Element, auf dem das Spiel gerendert wird.
     * @param {Keyboard} keyboard - Die Tastatur-Eingabe für das Spiel.
     */
    constructor(canvas, keyboard, splashSound, coinSound, bottleSound, yeahSound, hurtSound, chickenSound, bombSound, deadSound, gameSound) {
        this.collidedBottles = [];
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.splash_sound = splashSound;
        this.coin_sound = coinSound;
        this.bottle_sound = bottleSound;
        this.yeah_sound = yeahSound;
        this.hurt_sound = hurtSound;
        this.chicken_sound = chickenSound;
        this.bomb_sound = bombSound;
        this.dead_sound = deadSound;
        this.game_sound = gameSound;
        this.isSoundPaused = localStorage.getItem('isSoundPaused') === 'true';
        this.keyboard = keyboard;

        // Starte das Spiel
        this.draw();
        this.endboss = this.getEndboss();
        this.setWorld();
        this.chicken = this.getChicken();
        this.ChickenSmall = this.getCickenSmall();
        this.run();
    }

    updateSoundStatus(isPaused) {
        this.isSoundPaused = isPaused;
    }

    /**
     * Setzt die Welt für das Spiel.
     */
    setWorld() {
        this.character.world = this;
        this.endboss.world = this;
    }

    /**
     * Ruft den Endboss des Levels ab.
     * @returns {Endboss} - Der Endboss des Levels.
     */
    getEndboss() {
        return this.level.enemies.find(enemy => enemy instanceof Endboss);
    }

    getChicken() {
        return this.level.enemies.find(enemy => enemy instanceof Chicken);
    }

    getCickenSmall() {
        return this.level.enemies.find(enemy => enemy instanceof ChickenSmall);
    }

    stopEndbossAnimations() {
        if (this.endboss) {
            this.endboss.stopAnimationIntervals();
        }
    }

    stopChickenAnimations() {
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Chicken) {
                enemy.stopAnimationIntervals();
            }
        });
    }

    stopChickenSmallAnimations() {
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof ChickenSmall) {
                enemy.stopAnimationIntervals();
            }
        });
    }


    /**
     * Startet das Spiel.
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkcharacterbottle();
            this.checkBottleEndbossCollision();
            this.checkcharaktercoin();
            this.checkCollisionsEndbossCharacter();
        }, 200);
        setInterval(() => {
            this.checkCharacterJumpingOnEnemy();
        }, 10);
    }


    /**
     * Überprüft Kollisionen zwischen dem Charakter und den Feinden im Spiel.
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (!this.character.isAboveGround() && !enemy.isDead) {
                    this.handleNormalCollision();
                }
            }
        });
        this.removeHitEnemies();
    }

    checkCharacterJumpingOnEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && this.character.isAboveGround()) {
                if ((enemy instanceof Chicken || enemy instanceof ChickenSmall) && !enemy.isDead) {
                    this.handleJumpingOnEnemy(enemy);
                    enemy.isDead = true;
                    if (!this.isSoundPaused) { // Überprüfen, ob der Sound pausiert ist
                        this.splash_sound.play();
                    }
                }
            }
        });
    }

    /**
     * Überprüft Kollisionen zwischen dem Charakter und dem Endboss.
     */
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

    /**
     * Behandelt die Kollision des Charakters mit einem springbaren Feind.
     * @param {Enemy} enemy - Der Feind, mit dem der Charakter kollidiert ist.
     */
    handleJumpingOnEnemy(enemy) {
        enemy.die(); // Gegner entfernen
        setTimeout(() => {
            this.hitenemies.push(enemy); // Gegner zum Entfernen markieren
            this.removeHitEnemies(); // Gegner entfernen
        }, 100); // Zeit für die Todesanimation
    }

    /**
     * Behandelt eine normale Kollision des Charakters mit einem Feind.
     */
    handleNormalCollision() {
        this.character.hit();
        if (!this.isSoundPaused) {
            if (!this.character.isDead()) { // Überprüfe, ob der Charakter nicht tot ist
                this.chicken_sound.play();
                this.hurt_sound.play();
            } else if (this.character.isDead()) {
                this.game_sound.pause();
            }
        }
        this.statusBar.setPercentage(this.character.energy);
    }


    /**
     * Entfernt die getroffenen Feinde aus der Liste der Feinde des Levels.
     */
    removeHitEnemies() {
        this.level.enemies = this.level.enemies.filter(enemy => !this.hitenemies.includes(enemy));
        this.hitenemies = [];
    }

    /**
     * Überprüft, ob der Charakter eine Flasche sammelt, und aktualisiert entsprechend die Statusleiste.
     */
    checkcharacterbottle() {
        this.level.bottles = this.level.bottles.filter((bottle, index) => {
            if (!bottle.collected && this.character.isColliding(bottle)) {
                if (!this.isSoundPaused) {
                    this.bottle_sound.play();
                }
                bottle.collected = true;
                this.collectedBottles.push(bottle);
                this.StatusBarBottle.setPercentage(this.collectedBottles.length);
                return false;
            }
            return true;
        });
    }

    /**
     * Überprüft, ob der Charakter eine Münze sammelt, und aktualisiert entsprechend die Statusleiste.
     */
    checkcharaktercoin() {
        const totalCoins = 8;
        this.level.coins = this.level.coins.filter((coin, index) => {
            if (!coin.collected && this.character.isColliding(coin)) {
                if (!this.isSoundPaused) {
                    this.coin_sound.play();
                }
                coin.collected = true;
                this.collectedCoins.push(coin);
                const percentage = (this.collectedCoins.length / totalCoins) * 100;
                this.StatusBarCoin.setPercentage(percentage);
                return false;
            }
            return true;
        })
    }

    /**
     * Überprüft, ob der Charakter eine Flasche wirft und aktualisiert die Statusleiste entsprechend.
     */
    checkThrowObjects() {
        if (this.keyboard.D && this.collectedBottles.length > 0) {
            if (!this.isSoundPaused) {
                this.yeah_sound.play();
            }
            this.collectedBottles.pop();
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, !this.character.otherDirection);
            this.throwableObject.push(bottle);
            this.StatusBarBottle.setPercentage(this.collectedBottles.length);

            if (this.collectedBottles.length === 0) {

                setTimeout(() => {
                    document.getElementById('lostscreen').style.display = 'block';
                    this.stopEndbossAnimations();
                    this.stopChickenAnimations();
                    this.stopChickenSmallAnimations();
                    this.character.stopCharacterAnimation();
                }, 1000);

            }
        }
    }

    /**
     * Überprüft, ob eine geworfene Flasche den Endboss trifft und aktualisiert die Statusleiste entsprechend.
     */
    /**
     * Prüft die Kollisionen zwischen geworfenen Flaschen und dem Endboss.
     */
    /**
     * Überprüft, ob eine Flasche mit dem Endboss kollidiert und führt entsprechende Aktionen aus.
     */
    checkBottleEndbossCollision() {
        if (this.endboss) {
            this.throwableObject.forEach((bottle) => {
                if (bottle.isColliding(this.endboss) && !this.collidedBottles.includes(bottle)) {
                    bottle.splash();
                    this.collidedBottles.push(bottle); // Füge die Flasche zur Liste der kollidierten Flaschen hinzu
                    this.endboss.hitbottle();
                    this.StatusBarEndboss.setPercentage(this.endboss.health);
                }
            });
        }
    }

    /**
     * Zeichnet den Spielbildschirm, aktualisiert die Objekte und führt Animationen durch.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0); // Verschiebt das Koordinatensystem entsprechend der Kamera

        // Zeichnet Hintergrundobjekte
        this.addObjectsToMap(this.level.backgroundObjects);

        // Zeichnet den Charakter
        this.addToMap(this.character);

        // Setzt das Koordinatensystem zurück
        this.ctx.translate(-this.camera_x, 0);

        // Zeichnet Statusleisten
        this.addToMap(this.statusBar);
        this.addToMap(this.StatusBarEndboss);
        this.addToMap(this.StatusBarBottle);
        this.addToMap(this.StatusBarCoin);

        // Verschiebt das Koordinatensystem vorwärts
        this.ctx.translate(this.camera_x, 0);

        // Zeichnet Gegner, geworfene Objekte, Wolken, Flaschen und Münzen
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObject);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);

        // Setzt das Koordinatensystem zurück
        this.ctx.translate(-this.camera_x, 0);

        // Führt die Zeichenfunktion erneut aus, um Animationen fortzusetzen
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    /**
     * Fügt eine Gruppe von Objekten der Karte hinzu.
     * @param {Array} objects - Die Liste der Objekte, die der Karte hinzugefügt werden sollen.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Fügt ein einzelnes Objekt der Karte hinzu und berücksichtigt dabei die Ausrichtung.
     * @param {Object} mo - Das hinzuzufügende Objekt.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipIMage(mo);
        }
        mo.draw(this.ctx); // Zeichnet das Objekt
        mo.drawFrame(this.ctx); // Zeichnet den Rahmen

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Spiegelt ein Objekt horizontal.
     * @param {Object} mo - Das zu spiegelnde Objekt.
     */
    flipIMage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Setzt ein zuvor gespiegeltes Objekt wieder zurück.
     * @param {Object} mo - Das zurückzusetzende Objekt.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}