document.addEventListener("DOMContentLoaded", () => {
    const board = document.querySelector(".board");
    const message = document.querySelector(".message");
    const restartBtn = document.querySelector(".restart");
    const cells = [];
    const winCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    let currentPlayer = "X";
    let gameRunning = true;
  
    // Initialize the game board
    for (let i = 0; i < 9; i++) {
      const cell = document.querySelector(".cell");
      cell.addEventListener("click", () => cellClick(i));
      cells.push(cell);
      board.appendChild(cell);
    }
  
    // Handle cell clicks
    function cellClick(cellIndex) {
      if (!gameRunning || cells[cellIndex].textContent !== "") return;
  
      cells[cellIndex].textContent = currentPlayer;
  
      if (checkWin()) {
        message.textContent = `${currentPlayer} wins!`;
        gameRunning = false;
      } else if (cells.every((cell) => cell.textContent !== "")) {
        message.textContent = "It's a draw!";
        gameRunning = false;
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        message.textContent = `${currentPlayer}'s turn`;
      }
    }
  
    // Check if there is a winner
    function checkWin() {
      for (const combo of winCombinations) {
        const [a, b, c] = combo;
        if (
          cells[a].textContent !== "" &&
          cells[a].textContent === cells[b].textContent &&
          cells[a].textContent === cells[c].textContent
        ) {
          return true;
        }
      }
      return false;
    }
  
    // Restart the game
    restartBtn.addEventListener("click", () => {
      cells.forEach((cell) => (cell.textContent = ""));
      currentPlayer = "X";
      gameRunning = true;
      message.textContent = `${currentPlayer}'s turn`;
    });
});