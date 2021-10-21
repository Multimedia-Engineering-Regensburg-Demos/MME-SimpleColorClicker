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

    /**
     * Erzeugt ein neues Target-Objekt, das eines der Farbquadrate im Spiel repräsentiert. Über die
     * Parameter wird festgelegt, welche Farbe das Quadrat haben soll und ob es sich um das einzelne
     * Zielquadrat der aktuellen Runde handelt (isTarget === true). Für den zweiten Parameter wird ein
     * Default-Wert (isTarget = false) verwendet, da der größte Teil der Objekte mit diesem Wert 
     * initialisiert werden wird. 
     */
    constructor(color, isTarget = false) {
        this.color = color;
        this.isTarget = isTarget;
        // Verhindert das Verändern der Eigenschaften und Werte des neuen Objekts (Vgl. Immutable)
        Object.freeze(this);
    }

    /**
     * Erzeugt auf Basis der im Objekt gespeicherten Werte ein HTML-Objekt, das zur Darstellung
     * des Targets im UI genutzt werden kann. 
     */
    createNode() {
        // Erstellung eines span-HTML-Elements
        let el = document.createElement("span");
        // Hinzufügen einer Klasse, mit welcher alle Farbfelder angesprochen werden können
        el.classList.add("target");
        // Setzen der Farbe des Feldes auf die RGB-Farbe des zugewiesenen Color-Objekts
        el.style.backgroundColor = this.color.toCSS();
        // Markiert im HTML-Attribut, ob es sich um das Zielquadrat handelt
        el.setAttribute("data-is-target", this.isTarget);
        return el;
    }


    /**
     * Gibt eine zufällige Liste an Target-Objekten für eine Spielrunde zurück. Die Anzahl der Quadrate und die numerische 
     * Farbabweichung des Zielquadrats werden als Parameter übergeben. Innerhalb der Methode werden zufällig die zu verwendende 
     * Grundfarbe sowie die Position des Zielquadrats bestimmt.
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
                targets.push(new Target(color)); // "Normales" Farbquadrat
            } else {
                targets.push(new Target(color, true)); // Ziel der aktuellen Runde
            }
        }
        return targets;
    }
}