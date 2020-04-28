/* eslint-env browser */
/* global Color, Targets */

const NUMBER_OF_TARGETS = 16,
DEFAULT_DEVIATION = 50;

var boardEl,
highscoreEl,
highscore = 0;

function init() {
    boardEl = document.querySelector(".board");
    boardEl.addEventListener("click", onBoardClicked);
    highscoreEl = document.querySelector(".highscore .value");
    startNextRound();
}

function onBoardClicked(event) {
    if(event.target.getAttribute("data-isTarget") === "true") {
        highscore++;
    } else {
        highscore = 0;
    }
    startNextRound();
}

function startNextRound() {
    clearBoard();
    fillBoard();
    highscoreEl.innerHTML = highscore;
}

function clearBoard() {
    var targets = document.querySelectorAll(".target");
    for(let i = targets.length-1; i >= 0; i--) {
        boardEl.removeChild(targets[i]);
    }
}

function fillBoard() {
    let targets = Targets.createTargetList(NUMBER_OF_TARGETS, DEFAULT_DEVIATION);
    for(let i = 0; i < targets.length; i++) {
        boardEl.insertBefore(targets[i], boardEl.firstChild);
    }
}

init();