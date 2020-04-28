/* eslint-env browser */
/* global  Color */

class Targets {

    static createTargetList(numberOfTargets, deviation) {
        let randomColor = Color.getRandomColor(),
        deviatingColor = randomColor.getDeviatingColor(deviation),
        randomIndex = parseInt(Math.random() * numberOfTargets),
        targets = [];
        for(let i = 0; i < numberOfTargets; i++) {
            let color = i !== randomIndex ? randomColor : deviatingColor;
            targets.push(createTargetElement(color));
        }
        targets[randomIndex].setAttribute("data-isTarget", "true");
        return targets;
    }
}

function createTargetElement(color) {
    let el = document.createElement("span");
    el.classList.add("target");
    el.style.backgroundColor = color.toCSS();
    el.setAttribute("data-isTarget", "false");
    return el;
}