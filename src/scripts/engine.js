const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"), // Corrigido aqui
        score: document.querySelector("#score"),
    },
    values: {
        timeId: null,
        countDownTimerId: null,
        gameVelocity: 1000,
        hitPosition: null,
        result: 0,
        currentTime: 60, // Corrigido aqui
    },
};

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        clearInterval(state.values.countDownTimerId);
        clearInterval(state.values.timeId);
        alert("Game over! O seu resultado foi: " + state.values.result);
    }
}

function playound(){
  let audio = new Audio("./src/audios/.mp3.m4a");
  audio.play(); 
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * state.view.squares.length);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function moveEnemy() {
    state.values.timeId = setInterval(randomSquare, state.values.gameVelocity);
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => { 
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound();
            }  
        });
    });
}

function initialize() {
    randomSquare();
    moveEnemy();
    addListenerHitBox();
    state.values.countDownTimerId = setInterval(countDown, 1000); // Corrigido: mover aqui
}

initialize();
