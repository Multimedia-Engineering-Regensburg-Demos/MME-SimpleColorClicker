class Color {

    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
        Object.freeze(this);
    }

    toCSS() {
        return `rgb(${this.r},${this.g},${this.b})`;
    }

    getDeviatingColor(deviation) {
        return new Color(this.r - deviation, this.g - deviation, this.b - deviation);
    }

    static getRandomColor() {
        let r = parseInt(Math.random() * 256),
            g = parseInt(Math.random() * 256),
            b = parseInt(Math.random() * 256);
        return new Color(r, g, b);
    }

}