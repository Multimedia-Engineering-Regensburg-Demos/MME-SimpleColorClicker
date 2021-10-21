/* eslint-env browser */
/* global Target */

/**
 * In diesem ersten Beispiel entwickeln Sie ein einfaches Spiel: Nutzer*innen sehen mehrere Quadrate der gleichen Farbe.
 * Ein Quadrat unterscheidet sich dabei farblich unwesentlich. Die Spieler*innen haben die Aufgabe dieses Quadrat zu erkennen
 * und durch einen Klick auszuwählen. Für jede Runde wird eine neue, zufällige Farbe bestimmt. Anschließend werden 16 Quadrate
 * im UI angezeigt und mit dieser Farbe eingefärbt. Ein einzelnes, zufällig bestimmtes Quadrat wird dabei mit einer abweichenden
 * Farbvariation eingefärbt.
 * 
 * Aufbau der Anwendung
 * 
 * index.js: Das Spiel wird im Code dieser Datei initialisiert. Hier werden die notwendigen Spiel-Elemente erzeugt und zum existierenden
 * UI (siehe HTML-Datei) hinzugefügt. Über eine Callback-Methode werden Klicks auf die Spiel-Elemente, konkret die farbigen Quadrate,
 * abgefangen und ausgewertet.
 * 
 * Target: Jedes einzelne Quadrat im Spiel wird als Objekt dargestellt. Alle diese Objekte basieren auf dem gleichen Prototyp, der
 * in der Datei Target.js definiert wird.
 * 
 * Color: Für die Repräsentation von individuellen Farben werden Objekte auf Basis eines weiteren Prototypen verwendet (siehe Color.js) Grundsätzlich 
 * werden dabei die R-,G- und B-Werte zur Repräsentation einer Farbe gespeichert. Zusätzlich verfügen die Objekte über Methoden, um die repräsentierte 
 * Farbe in CSS-kompatibler Form darzustellen oder anhand einer numerisch definierten Abweichung eine neue Farbe für das Ziel-Quadrat zu bestimmen. 
 * 
 * Target und Color enthalten statische Methoden, die nicht den einzelnen Objekten zugeordnet sind, sondern unterschiedliche Hilfsfunktonen anbeiten,
 * die innerhalb der Anwendung generell für die Verwendung aller Objekte dieser Typen verwendet werden können.
 */


// Über diese Konstanten lassen sich die wesentlichen Parameter des Spiels an  einer Stelle definieren und bei Bedarf ändern
const NUMBER_OF_TARGETS = 16, // Anzahl der Quadrate pro Rude
    DEFAULT_DEVIATION = 50, // Anfängliche Farbabweichung (numerischer Unterschied in den RGB-Kanälen) des Zielquadrats
    MIN_DEVIATION = 10; // Minimale Farbabweichung

// UI-Elemente und Werte, die häufiger oder an unterschiedlichen Stellen des Codes verwendet werden, werden in zentral definierten Variablen gehalten    
let boardEl, // Referenz auf das HTML-Element, in dem die Quadrate angezeigt werden
    scoreEl, // Referenz auf das HTML-Element, in dem der aktuelle Punktestand angezeigt werden
    currentDeviation, // Die aktuell verwendete numerische Farbabweichung, wird mit jeder Runde kleiner, bis der Minimalwert erreicht wird
    currentScore; // Aktueller Punktestand (= Anzahl der Runden, die seit dem letzten Fehler erfolgreich absolviert wurden)

/**
 * Einstiegspunkt in die Anwendung (Methode wird am Ende dieser Datei aufgerufen)
 */
function init() {
    // Referenzieren der relevanten HTML-Elemente aus dem DOM
    boardEl = document.querySelector(".board");
    scoreEl = document.querySelector(".score");
    /**
     * Registrieren eines Callbacks für Mausklicks
     * Für jeden Mausklick innerhalb des Board-Element (boadEl) wird einmal die Methode onBoardClicked aufgerufen. Da die Quadrate, bzw. deren 
     * Repräsentationen als HTML-Elemente, mit jeder Spielrunde neu erstellt werden, nutzen wir statt einzelner Callbacks für jedes der HTML-Elemente,
     * die Möglichkeit, die Eventverarbeitung im umschließenden Elternelement (hier boardEL) durchzuführen.
     */
    boardEl.addEventListener("click", onBoardClicked);
    restartGame();
}

/**
 * Die Methode prüft, ob der im Board-Element registrierte Klick das aktuelle Zielquadrat getroffen hat. Trifft dies zu,
 * erhält der Spieler einen Punkt und die nächste Runde wird mit höherer Schwierigkeit gestartet. Trifft dies nicht zu,
 * wird das Spiel zurückgesetzt.
 */
function onBoardClicked(event) {
    /**
     * Der event-Parameter enthält wichtige Informationen über das Eingabe-Event, u.a. über das tatsächlich angeklickte Element.
     * Da nur das Zielquadrat (als HTML-Element) über das Attribut "data-is-target" mit dem Wert "true" verfügt, können wir anhand
     * der programmatischen Überprüfung dieses Attributs feststellen, ob die Spieler*innen tatsächlich das richtige Element angelickt 
     * haben. 
     */
    let targetWasClicked = (event.target.getAttribute("data-is-target") === "true");
    if (targetWasClicked) {
        startNextRound();
    } else {
        restartGame();
    }
}

/**
 * Die Methode startet das Spiel neu und setzt dazu die Farbweichung auf den initialen Wert und den Punktestand auf 0 zurück, bevor
 * im Anschluss eine neue Spielrunde initialisiert wird.
 */
function restartGame() {
    // Zurücksetzen aller laufenden Variablen
    currentDeviation = DEFAULT_DEVIATION;
    currentScore = 0;
    initRound();
}

/**  
 * Die Methode wechselt in die nächste Runde. Dazu werden der Punktestand inkrementiert und die numerische Farbaweichung reduziert.
 * Im Anschluss wird eine neue Spielrunde initialisiert.
 */
function startNextRound() {
    currentScore++;
    currentDeviation--;
    // Sicherstellen, das niemals die minimale numerische Farbabweichung unterschritten wird
    if (currentDeviation < MIN_DEVIATION) {
        currentDeviation = MIN_DEVIATION;
    }
    initRound();
}

/**
 * Bereitet Spiel und UI für die nächste Runde vor.
 */
function initRound() {
    // Über die statische Hilfsmethode in Target erstellen wir eine Liste von zufälliger Ziele auf Basis der aktuellen Spielparameter
    let targets = Target.createRandomTargetList(NUMBER_OF_TARGETS, currentDeviation);
    // Entfernt die Quadrate der letzten Spielrunde
    clearBoard();
    // Fügt die neuen Quadrate zum UI hinzu
    addTargetsToBoard(targets);
    // Aktualisiert die Punkteanzeige im UI
    scoreEl.innerHTML = currentScore;
}

/** 
 * Entfernt alle aktuell vorhandenen Quadrate aus dem UI 
 */
function clearBoard() {
    // Selektieren aller Farbfelder im DOM anhand deren Klassenattributs
    var targets = boardEl.querySelectorAll(".target");
    /**
     * Entfernen aller selektierten Farbfelder
     * 
     * Für einen möglichst schnellen und fehlerfreien Ablauf arbeiten wir die Liste der selektierten
     * Elemente von hinten nach vorne ab.
     */
    for (let i = targets.length - 1; i >= 0; i--) {
        boardEl.removeChild(targets[i]);
    }
}

/**
 * Fügt alle im Parameter angegebenen Targets in das UI ein
 */
function addTargetsToBoard(targets) {
    // Für jedes Target-Objekt im Array ...
    for (let i = 0; i < targets.length; i++) {
        // ... wird eine HTML-Repräsentation erstellt (createNode) und zum Elternelement (boardEL) hinzugefügt (append)
        boardEl.append(targets[i].createNode());
    }
}

init(); // Ruft die zu Beginn der Datei definierte Initialisierungsmethode auf (= jetzt geht es los!)