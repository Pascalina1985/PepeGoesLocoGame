/**
 * Repräsentiert ein Level im Spiel.
 */
class Level {
    /**
     * Die Feinde in diesem Level.
     * @type {Array}
     */
    enemies;

    /**
     * Die Wolken in diesem Level.
     * @type {Array}
     */
    clouds;

    /**
     * Die Hintergrundobjekte in diesem Level.
     * @type {Array}
     */
    backgroundObjects;

    /**
     * Die Flaschen in diesem Level.
     * @type {Array}
     */
    bottles;

    /**
     * Die Münzen in diesem Level.
     * @type {Array}
     */
    coins;

    /**
     * Das Ende des Levels auf der x-Achse.
     * @type {number}
     * @default 2200
     */
    level_end_x = 2200;

    /**
     * Erstellt ein neues Level.
     * @param {Array} enemies - Die Feinde in diesem Level.
     * @param {Array} clouds - Die Wolken in diesem Level.
     * @param {Array} backgroundObjects - Die Hintergrundobjekte in diesem Level.
     * @param {Array} bottles - Die Flaschen in diesem Level.
     * @param {Array} coins - Die Münzen in diesem Level.
     */
    constructor(enemies, clouds, backgroundObjects, bottles, coins) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.coins = coins;
    }
}