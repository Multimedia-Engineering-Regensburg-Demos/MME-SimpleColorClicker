/* eslint-env browser */
/* global Target */

const NUMBER_OF_TARGETS = 16, // Die maximale Anzahl an Feldern
    DEFAULT_DEVIATION = 50, // Die standardmäßige Abweichung zur Farbe des Ziels
    MIN_DEVIATION = 10; // Die minimale Abweichung zur Farbe des Ziels

var boardEl, // Das Element, in welches alle Felder eingegliedert werden
    scoreEl, // Das Element, in welchem der aktuelle Score angezeigt wird
    currentDeviation, // Die momentane Abweichung zur Ziel-Farbe
    currentScore; // Der momentane Score

// Initialisierung der Anwendung: Selektieren der HTML-Elemente und Registrierung der Listener
function init() {
    // Initialisierung festgelegter Variablen durch Selektion bestimmter DOM-Elemente
    boardEl = document.querySelector(".board");
    scoreEl = document.querySelector(".score");

    // Erstellung eines EventListeners, welcher Klicks auf die Felder des Spielbretts an die Funktion onBoardClicked() weiterleitet
    boardEl.addEventListener("click", onBoardClicked);

    restartGame();
}

// EventListener-Funktion, welche auf Board-Klicks reagiert
function onBoardClicked(event) {
    // Überprüfung ob das angeklickte Feld gleich dem Ziel-Feld ist
    let targetWasClicked = (event.target.getAttribute("data-is-target") ===
        "true");

    // Entscheidung über Starten der nächsten Runde oder Neustart des Spiels, basierend auf dem Erfolg der Runde
    if (targetWasClicked) {
        startNextRound();
    } else {
        restartGame();
    }
}

// Neustart des Spiels
function restartGame() {
    // Zurücksetzen aller laufenden Variablen
    currentDeviation = DEFAULT_DEVIATION;
    currentScore = 0;

    // Start der ersten Runde
    initRound();
}

// Start der nächsten Runde
function startNextRound() {
    currentScore++; // Herauf zählen des Scores
    currentDeviation--; // Absenken der Abweichung der Farbfelder zur Ziel-Farbe

    // Überprüfung, ob die aktuelle Abweichung die minimale Abweichung unterschreiten würde
    if (currentDeviation < MIN_DEVIATION) {
        currentDeviation = MIN_DEVIATION;
    }
    initRound();
}

// Initialisierung der nächsten Runde
function initRound() {
    // Erstellung von Klasseninstanzen an Farbfeldern für das Spielbrett
    let targets = Target.createRandomTargetList(NUMBER_OF_TARGETS,
        currentDeviation);

    // Entfernen des alten Boards
    clearBoard();

    // Erstellung des neuen Boards
    addTargetsToBoard(targets);

    // Setzen des aktuellen Scores
    scoreEl.innerHTML = currentScore;
}

// Entfernen aller Farbfeld-Elemente vom aktuellen Board
function clearBoard() {
    // Selektieren aller Farbfelder aus dem DOM
    var targets = boardEl.querySelectorAll(".target");

    // Entfernen aller Farbfelder aus dem DOM
    for (let i = targets.length - 1; i >= 0; i--) {
        boardEl.removeChild(targets[i]);
    }
}

// Erstellung von DOM-Elementen passend zu den Klasseninstanzen der Farbfelder
function addTargetsToBoard(targets) {
    for (let i = 0; i < targets.length; i++) {
        boardEl.append(targets[i].createNode());
    }
}

init();