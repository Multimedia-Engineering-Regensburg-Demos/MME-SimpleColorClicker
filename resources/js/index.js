/* eslint-env browser */
/* global Config, Targets */

var boardEl,
    scoreEl,
    deviation = Config.defaultDeviation,
    score = 0;

function init() {
    boardEl = document.querySelector(".board");
    boardEl.addEventListener("click", onBoardClicked);
    scoreEl = document.querySelector(".score .value");
    startNextRound();
}

function onBoardClicked(event) {
    if (event.target.getAttribute("data-isTarget") === "true") {
        score++;
        if (deviation > Config.minDeviation) {
            deviation--;
        }
    } else {
        score = 0;
    }
    startNextRound();
}

function startNextRound() {
    clearBoard();
    fillBoard();
    scoreEl.innerHTML = score;
}

function clearBoard() {
    var targets = document.querySelectorAll(".target");
    for (let i = targets.length - 1; i >= 0; i--) {
        boardEl.removeChild(targets[i]);
    }
}

function fillBoard() {
    let targets = Targets.createTargetList(Config.numberOfTargets, deviation);
    for (let i = 0; i < targets.length; i++) {
        boardEl.insertBefore(targets[i], boardEl.firstChild);
    }
}

init();