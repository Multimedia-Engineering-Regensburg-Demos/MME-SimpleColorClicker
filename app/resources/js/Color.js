/* Javascript Klasse für die Farbverwaltung der Anwendung
 *  
 *  Ermöglicht (1) das Erstellen einer zufälligen Farbe, 
 *  (2) das Konvertieren einer Farbe zu einem CSS-String, der in HTML verwendet werden kann und 
 *  (3) das Erstellen einer Ziel-Farbe, basierend auf der aktuellen Farbe und einer Abweichung
 *
 *  Parameter: R,G und B-Werte der Farbe
 */
class Color {

    // Konstruktor nimmt RGB-Werte als Variablen entgegen und speichert diese ab
    constructor(r, g, b) {
        // Hinzufügen von Variablen zur Klassen-Instanz / zum Objekt über this-Keyword
        this.r = r;
        this.g = g;
        this.b = b;

        // Klassen-Objekt soll nicht mehr verändert werden können
        Object.freeze(this);
    }

    // Die Gestaltung von HTML-Elementen passiert im CSS, daher Umwandlung der Objekt-Variablen in einen CSS-String,
    // um diesen inline in HTML-Elementen verwenden zu können
    toCSS() {
        // rgb(r,g,b) als Template-String
        return `rgb(${this.r},${this.g},${this.b})`;
    }

    // Erstellung einer Ziel-Farbe, basierend auf der aktuellen Farbe minus einer vorgegebenen Abweichung
    getDeviatingColor(deviation) {
        return new Color(this.r - deviation, this.g - deviation, this.b -
            deviation);
    }

    // Static-Methode, welche unabhängig von einer Klassen-Instanz ausgeführt werden kann 
    // und eine zufällige Farbe als Klassen-Instanz zurück gibt.
    static getRandomColor() {
        let r = parseInt(Math.random() * 256),
            g = parseInt(Math.random() * 256),
            b = parseInt(Math.random() * 256);
        return new Color(r, g, b);
    }
}