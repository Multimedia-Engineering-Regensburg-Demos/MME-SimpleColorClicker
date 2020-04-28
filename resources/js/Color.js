/* eslint-env browser */

class Color {

    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    toCSS() {
        return `rgb(${this.r},${this.g},${this.b})`;
    }

    getDeviatingColor(deviation) {
        return new Color(this.r - deviation, this.g - deviation, this.b - deviation);
    }

    static getRandomColor() {
        /* eslint-disable no-magic-numbers */
        let r = parseInt(Math.random() * 256),
            g = parseInt(Math.random() * 256),
            b = parseInt(Math.random() * 256);
        /* eslint-enable no-magic-numbers */
        return new Color(r, g, b);
    }

}