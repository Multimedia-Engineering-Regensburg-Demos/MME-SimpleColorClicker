/* Javascript Klasse für die Farbverwaltung der Anwendung
 *  
 *  Ermöglicht (1) das Erstellen einer zufälligen Farbe, 
 *  (2) das Konvertieren einer Farbe zu einem CSS-String, der in HTML verwendet werden kann und 
 *  (3) das Erstellen einer Ziel-Farbe, basierend auf der aktuellen Farbe und einer Abweichung
 *
 *  Parameter: R,G und B-Werte der Farbe
 */
class Color {

    /**
     * Erzeugt ein neues Color-Objekt auf Basis der angegebenen R-,G- und B-Werte
     */
    constructor(r, g, b) {
        // Speichern der Farbwerte im neuen Objekt
        this.r = r;
        this.g = g;
        this.b = b;
        // Verhindert das Verändern der Eigenschaften und Werte des neuen Objekts (Vgl. Immutable)
        Object.freeze(this);
    }

    /**
     * Gibt die im Objekt gespeicherte Farbe (intern als einzelne RGB-Kanäle gespeichert) als CSS-String zurück,
     * der z.B. zum expliziten Setzen der entsprechenden CSS-Eigenschaft der Farbquadrate verwendet werden kann.
     */
    toCSS() {
        return `rgb(${this.r},${this.g},${this.b})`;
    }

    /**
     * Gibt ein neues Color-Objekt zurück, dessen Farbwerte (RGB) jeweils um den angegebenen Wert von denen
     * Farbwerten des Objekts abweichen, auf dem die Methode aufgerufen wurde: Damit lässt sich eine leicht
     * abweichende Variante der im Objekt repräsentierten Farbe erzeugen.
     */
    getDeviatingColor(deviation) {
        return new Color(this.r - deviation, this.g - deviation, this.b -
            deviation);
    }

    /**
     * Gibt eine neue, zufällige RGB-Farbe zurück
     */
    static getRandomColor() {
        let r = parseInt(Math.random() * 256), // Math.random erzeugt einen Pseudo-Zufallswert zwischen 0 (inklusive) und 1 (exklusive)
            g = parseInt(Math.random() * 256),
            b = parseInt(Math.random() * 256);
        return new Color(r, g, b);
    }
}