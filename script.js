const grid = document.querySelector(".gridContainer");
const statusEl = document.querySelector(".status");
const Gameboard = (function () {
  const board = new Array(9).fill("");
  const getBoard = () => [...board];

  const placeMark = (index, marker) => {
    if (!Number.isInteger(index) || index < 0 || index > 8) return false;

    if (board[index] !== "") return false;

    board[index] = marker;

    return true;
  };

  const reset = () => {
    board.fill("");
  };

  const isFull = () => board.every((cell) => cell !== "");

  return { getBoard, placeMark, reset, isFull };
})();

function createPlayer(name, marker) {
  return { name, marker };
}

// ---------- EVALUATOR ----------
// Pure: looks at a board and reports what it sees. It never changes anything,
// never touches the DOM and never resets. The controller decides what to do with the answer.
const GameEvaluator = (function () {
  const WINNING_LINES = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // columns
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ];

  const evaluate = (cells) => {
    for (const [a, b, c] of WINNING_LINES) {
      if (cells[a] !== "" && cells[a] === cells[b] && cells[a] === cells[c]) {
        return { status: "won", winner: cells[a] };
      }
    }

    if (cells.every((cell) => cell !== "")) {
      return { status: "tied", winner: null };
    }

    return { status: "ongoing", winner: null };
  };

  return { evaluate };
})();

const GameController = (function () {
  const players = [
    createPlayer("Player 1", "X"),
    createPlayer("Player 2", "O"),
  ];

  let currentIndex = 0;
  let gameOver = false;
  let result = { status: "ongoing", winner: null };

  const getCurrentPlayer = () => players[currentIndex];
  const getResult = () => ({ ...result });
  const isGameOver = () => gameOver;

  const playTurn = function (position) {
    if (gameOver) return false;

    const placed = Gameboard.placeMark(position, players[currentIndex].marker);
    if (!placed) return false;

    result = GameEvaluator.evaluate(Gameboard.getBoard());

    if (result.status !== "ongoing") {
      gameOver = true;
      return true;
    }

    currentIndex = 1 - currentIndex;
    return true;
  };

  const restart = () => {
    Gameboard.reset();
    currentIndex = 0;
    gameOver = false;
    result = { status: "ongoing", winner: null };
  };

  return { getCurrentPlayer, getResult, isGameOver, playTurn, restart };
})();

const UI = (function () {
  const render = () => {
    const board = Gameboard.getBoard();
    const items = grid.children;
    for (let i = 0; i < 9; i++) {
      items[i].textContent = board[i];
      items[i].dataset.mark = board[i];
    }
    GameController.getCurrentPlayer().marker === "X"
      ? (statusEl.style.color = "#ff6b6b")
      : (statusEl.style.color = "#4ecdc4");

    const { status, winner } = GameController.getResult();

    if (status === "won") {
      statusEl.textContent = `${winner} wins!`;
      statusEl.style.color = "green";
    } else if (status === "tied") {
      statusEl.textContent = "It's a tie.";
      statusEl.style.color = "#ffaa00";
    } else {
      statusEl.textContent = `${GameController.getCurrentPlayer().name}'s turn`;
    }
  };

  const onCellClick = (e) => {
    const index = Number(e.target.dataset.index);
    const moved = GameController.playTurn(index);
    if (moved) render();
  };

  const init = () => {
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement("div");
      cell.classList.add("grid-item");
      cell.dataset.index = i;

      cell.addEventListener("click", onCellClick);
      grid.appendChild(cell);
    }
    document.getElementById("reset").addEventListener("click", () => {
      GameController.restart();
      render();
    });
    render();
  };

  return { init, render };
})();

UI.init();
