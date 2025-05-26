let btns = document.querySelectorAll(".btn-option");
let popup = document.querySelector(".popup");
let newGameBtn = document.getElementById("New-Game");
let restartBtn = document.getElementById("restart");
let message = document.getElementById("message");

let currentPlayer = "X";
let gameActive = true;

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

function disableButtons() {
    btns.forEach(btn => btn.disabled = true);
    popup.classList.remove("hide");
}

function enableButtons() {
    btns.forEach(btn => {
        btn.innerText = "";
        btn.disabled = false;
    });
    popup.classList.add("hide");
    currentPlayer = "X";
    gameActive = true;
}

function showWinner(player) {
    message.innerText = `Player ${player} Wins!`;
    disableButtons();
}

function showDraw() {
    message.innerText = `It's a Draw!`;
    disableButtons();
}

function checkWin() {
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        if (
            btns[a].innerText &&
            btns[a].innerText === btns[b].innerText &&
            btns[a].innerText === btns[c].innerText
        ) {
            showWinner(btns[a].innerText);
            gameActive = false;
            return;
        }
    }

    
    let isDraw = [...btns].every(btn => btn.innerText !== "");
    if (isDraw && gameActive) {
        showDraw();
        gameActive = false;
    }
}
btns.forEach(btn => {
    btn.addEventListener("click", () => {
        if (btn.innerText === "" && gameActive) {
            btn.innerText = currentPlayer;
            btn.disabled = true;
            checkWin();
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    });
});
restartBtn.addEventListener("click", enableButtons);
newGameBtn.addEventListener("click", enableButtons);
window.onload = enableButtons;
