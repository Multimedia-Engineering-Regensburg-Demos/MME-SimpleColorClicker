/* Javascript Klasse für die Verwaltung der Farbfelder-Plaketten
 *  
 *  Ermöglicht (1) das Erstellen einer Liste an Farbfeldern einer zufälligen Farbe inkl. einer Ziel-Farbe mit festgelegter Abweichung und
 *  (2) die Erstellung der HTML-Elemente, welche für die Darstellung einer zugehörigen Target-Instanz benötigt werden.
 *
 *  Parameter: 
 *  color: Color-Instanz der Farbe der aktuellen Runde
 *  isTarget: Boolean, ob das Farbfeld die Zielfarbe enthält
 */
class Target {

    // Konstruktor nimmt Color-Instanz und Boolean bzgl. Ziel-Status entgegen (default: false)
    constructor(color, isTarget = false) {
        this.color = color; // Speichert Referenz der zum Feld zugehörigen Farbe
        this.isTarget = isTarget; // Speichert Ziel-Status als Boolean

        // Klassen-Objekt soll nicht mehr verändert werden können
        Object.freeze(this);
    }

    // Funktion zur Umwandlung des Target-Objekts inkl. Color-Objekts zum 
    createNode() {
        // Erstellung eines span-HTML-Elements
        let el = document.createElement("span");

        // Hinzufügen einer Klasse, mit welcher alle Farbfelder angesprochen werden können
        el.classList.add("target");

        // Setzen der Farbe des Feldes auf die RGB-Farbe des zugewiesenen Color-Objekts
        el.style.backgroundColor = this.color.toCSS();

        // Setzen des Attributes "data-is-target" bzgl. des Ziel-Status des Farbfelds
        el.setAttribute("data-is-target", this.isTarget);

        return el;
    }

    /* Static-Methode, welche unabhängig von einer Klassen-Instanz ausgeführt werden kann 
     *  und eine vorgegebene Anzahl an Farbfeldern mit einheitlicher Grund-Farbe sowie ein Farbfeld mit der Ziel-Farbe enthält
     *  
     *  Parameter:
     *  numberOfTargets: Anzahl der Farbfelder auf dem Spiel-Board
     *  deviation: Aktuelle Abweichung der Grund-Farbe zur Ziel-Farbe
     */
    static createRandomTargetList(numberOfTargets, deviation) {
        let randomColor = Color.getRandomColor(), //Erstellen einer zufälligen Farbe
            deviatingColor = randomColor.getDeviatingColor(deviation), // Erstellen einer Ziel-Farbe
            randomIndex = parseInt(Math.random() * numberOfTargets), // Ermitteln der zufälligen Position der Ziel-Farbe
            targets = []; // Array für die Farbfelder

        for (let i = 0; i < numberOfTargets; i++) {
            // Überprüfung, ob der aktuelle Durchlauf der Schleife der Position der Ziel-Farbe entspricht
            let color = i !== randomIndex ? randomColor : deviatingColor;

            // Hinzufügen eines neuen Farbfeldes zum Array inkl. Setzen des Ziel-Status
            if (i !== randomIndex) {
                targets.push(new Target(color));
            } else {
                targets.push(new Target(color, true));
            }
        }
        return targets;
    }
}