const cells = document.querySelectorAll(".cell");
let currentPlayer = "X";
let gameActive = true;
let audioTurn = new Audio("audioTurn.mp3");
let winnerAudio = new Audio("winner.mp3");
let drawTurn = new Audio("draw.mp3");

const resetButton = document.getElementById("reset");
resetButton.addEventListener("click", resetGame);


function resetGame() {
  cells.forEach((cell) => {
    cell.textContent = "";
  });
}

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick);
});

function handleCellClick(e) {
  const cell = e.target;
  const cellIndex = cell.id;

  if (cell.textContent === "" && gameActive) {
    cell.textContent = currentPlayer;
    audioTurn.play();

    const currentTurnDisplay = document.getElementById("turn");
    currentTurnDisplay.textContent =
      "Current Turn: " + (currentPlayer === "X" ? "O" : "X");

    if (checkWin()) {
      gameActive = false;
      currentTurnDisplay.textContent = "Winner: " + currentPlayer;
      winnerAudio.play();
    } else if (isBoardFull()) {
      gameActive = false;
      currentTurnDisplay.textContent = "It's a Draw";
      drawTurn.play();
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }
}

function checkWin() {
  for (const condition of winConditions) {
    const [a, b, c] = condition;
    if (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    ) {
      return true;
    }
  }
  return false;
}

function isBoardFull() {
  return Array.from(cells).every((cell) => cell.textContent !== "");
}
