const cells = document.querySelectorAll(".cell");
const statusDiv = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameRunning = true;

const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellClick(e) {
  const cell = e.target;
  const index = cell.getAttribute("data-index");
if (!gameRunning || board[index] !== "") return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;

   if (currentPlayer === "X") {
    cell.classList.add("x");
  } else {
    cell.classList.add("o");
  }

  if (checkWinner()) {
    statusDiv.textContent = `${currentPlayer} wins!`;
    gameRunning = false;
    return;
  }

  if (board.every(x => x !== "")) {
    statusDiv.textContent = "Draw!";
    gameRunning = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDiv.textContent = `Turn: ${currentPlayer}`;
}

function checkWinner() {
  return winningPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return (
      board[a] === currentPlayer &&
      board[b] === currentPlayer &&
      board[c] === currentPlayer
    );
  });
}

function restartGame() {
  currentPlayer = "X";
  board = ["", "", "", "", "", "", "", "", ""];
  gameRunning = true;

  statusDiv.textContent = "Turn: X";
  cells.forEach(cell => cell.textContent = "");
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
restartBtn.addEventListener("click", restartGame);
