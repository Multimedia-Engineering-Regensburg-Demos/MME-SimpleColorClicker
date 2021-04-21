class Target {

    constructor(color, isTarget = false) {
        this.color = color;
        this.isTarget = isTarget;
        Object.freeze(this);
    }

    createNode() {
        let el = document.createElement("span");
        el.classList.add("target");
        el.style.backgroundColor = this.color.toCSS();
        el.setAttribute("data-is-target", this.isTarget);
        return el;
    }

    static createRandomTargetList(numberOfTargets, deviation) {
        let randomColor = Color.getRandomColor(),
            deviatingColor = randomColor.getDeviatingColor(deviation),
            randomIndex = parseInt(Math.random() * numberOfTargets),
            targets = [];
        for (let i = 0; i < numberOfTargets; i++) {
            let color = i !== randomIndex ? randomColor : deviatingColor;
            if (i !== randomIndex) {
                targets.push(new Target(color));
            } else {
                targets.push(new Target(color, true));
            }
        }
        return targets;
    }

}