const gameBoard = document.getElementById('gameBoard');
const rows = 6;
const columns = 7;
let currentPlayer = 'red'; // Start with the human player
let board = [];

function initializeBoard() {
    board = Array(rows).fill(null).map(() => Array(columns).fill(null));
    renderBoard();
}

function renderBoard() {
    gameBoard.innerHTML = ''; // Clear existing board
    for (let r = 0; r < rows; r++) {
        const row = document.createElement('div');
        row.className = 'game-row';
        for (let c = 0; c < columns; c++) {
            const cell = document.createElement('div');
            cell.className = 'game-cell';
            cell.dataset.column = c;
            if (board[r][c]) {
                const piece = document.createElement('div');
                piece.className = `piece ${board[r][c]}`;
                cell.appendChild(piece);
            }
            cell.addEventListener('click', () => selected(c)); // Human move
            row.appendChild(cell);
        }
        gameBoard.appendChild(row);
    }
}

// Adjusted selected function for human moves
function selected(column) {
  // Directly exit if the column is full or if it's the computer's turn
  if (currentPlayer === 'yellow' || board[0][column] != null) return;

  dropPiece(column, currentPlayer);
  switchPlayer();
}

function dropPiece(column, player) {
  for (let r = rows - 1; r >= 0; r--) {
      if (!board[r][column]) {
          board[r][column] = player;
          animateDrop(r, column, player);
          break;
      }
  }
}

function animateDrop(row, column, player) {
    const cell = gameBoard.children[row].children[column];
    const piece = document.createElement('div');
    piece.className = `piece ${player} filled`;
    cell.appendChild(piece);
    piece.offsetHeight; // Force reflow to ensure animation plays
}

function switchPlayer() {
    currentPlayer = (currentPlayer === 'red') ? 'yellow' : 'red';
    
    if (currentPlayer === 'yellow') {
        // Simulate a short delay before the computer makes a move
        setTimeout(computerMove, 1000); // Adjust delay as needed
    }
}

function computerMove() {
  let validMove = false;

  // Attempt to make a strategic move or block the opponent
  for (let c = 0; c < columns; c++) {
      if (canWinNext(c, 'yellow')) { // AI winning move
          dropPiece(c, 'yellow');
          validMove = true;
          break;
      } else if (canWinNext(c, 'red')) { // Block player's winning move
          dropPiece(c, 'yellow');
          validMove = true;
          break;
      }
  }

  // If no strategic move was made, make a random move
  while (!validMove) {
      const column = Math.floor(Math.random() * columns);
      if (!board[0][column]) { // Ensure the selected column isn't full
          dropPiece(column, 'yellow');
          validMove = true;
      }
  }

  if (validMove) {
      switchPlayer(); // Switch back to the human player after the computer's move
  }
}


function canWinNext(column, player) {
  // Temporarily drop the piece in the column
  for (let r = rows - 1; r >= 0; r--) {
      if (!board[r][column]) {
          board[r][column] = player;
          const win = checkWin(player); // Implement checkWin function to evaluate win
          board[r][column] = null; // Remove the temporary piece
          return win;
      }
  }
  return false;
}

function checkWin(player) {
  // Check horizontal
  for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns - 3; c++) {
          if (board[r][c] === player && board[r][c + 1] === player && board[r][c + 2] === player && board[r][c + 3] === player) {
              return true;
          }
      }
  }

  // Check vertical
  for (let r = 0; r < rows - 3; r++) {
      for (let c = 0; c < columns; c++) {
          if (board[r][c] === player && board[r + 1][c] === player && board[r + 2][c] === player && board[r + 3][c] === player) {
              return true;
          }
      }
  }

  // Check diagonal (bottom left to top right)
  for (let r = 3; r < rows; r++) {
      for (let c = 0; c < columns - 3; c++) {
          if (board[r][c] === player && board[r - 1][c + 1] === player && board[r - 2][c + 2] === player && board[r - 3][c + 3] === player) {
              return true;
          }
      }
  }

  // Check diagonal (top left to bottom right)
  for (let r = 0; r < rows - 3; r++) {
      for (let c = 0; c < columns - 3; c++) {
          if (board[r][c] === player && board[r + 1][c + 1] === player && board[r + 2][c + 2] === player && board[r + 3][c + 3] === player) {
              return true;
          }
      }
  }

  // No win found
  return false;
}


initializeBoard();
