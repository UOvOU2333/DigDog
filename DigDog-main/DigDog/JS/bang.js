const board = document.getElementById('board');
  const message = document.getElementById('message');
  const resetButton = document.getElementById('resetButton');
  let gameBoard = [];
  let currentPlayer = 'red';
  let gameActive = true;

  function createBoard() {
    for (let row = 0; row < 6; row++) {
      gameBoard[row] = [];
      for (let col = 0; col < 7; col++) {
        gameBoard[row][col] = null;
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.col = col.toString();
        board.appendChild(cell);
      }
    }
  }

  function switchPlayer() {
    currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
    message.textContent = `${currentPlayer.toUpperCase()}'s turn`;
  }

  function resetGame() {
    gameBoard.forEach(row => row.fill(null));
    board.querySelectorAll('.cell').forEach(cell => {
      cell.classList.remove('red', 'yellow');
    });
    gameActive = true;
    currentPlayer = 'red';
    message.textContent = `${currentPlayer.toUpperCase()}'s turn`;
  }

  function placeDisk(col) {
    for (let row = 5; row >= 0; row--) {
      if (gameBoard[row][col] === null) {
        gameBoard[row][col] = currentPlayer;
        const cell = board.children[row * 7 + col];
        cell.classList.add(currentPlayer);
        return row; // 返回放置棋子的行，用于判断胜利
      }
    }
    return -1; // 如果列是满的，返回-1
  }

  board.addEventListener('click', (e) => {
    if (!gameActive) return;

    const col = parseInt(e.target.dataset.col);
    if (!isNaN(col)) {
      const row = placeDisk(col);
      if (row === -1) return;

      if (checkWinner(row, col)) {
        message.textContent = `${currentPlayer.toUpperCase()} Wins!`;
        gameActive = false;
        return;
      }

      if (gameBoard.every(row => row.every(cell => cell !== null))) {
        message.textContent = `It's a draw!`;
        gameActive = false;
        return;
      }
      switchPlayer();
    }
  });

  resetButton.addEventListener('click', resetGame);

  function checkWinner(row, col) {
    const directions = [
      [0, 1], [1, 0], [1, 1], [1, -1]
    ];

    for (let direction of directions) {
      let count = 1;
      for (let i = 1; i <= 3; i++) {
        const r = row + direction[0] * i;
        const c = col + direction[1] * i;
        if (r >= 0 && r < 6 && c >= 0 && c < 7 && gameBoard[r][c] === currentPlayer) {
          count++;
        } else {
          break;
        }
      }
      for (let i = 1; i <= 3; i++) {
        const r = row - direction[0] * i;
        const c = col - direction[1] * i;
        if (r >= 0 && r < 6 && c >= 0 && c < 7 && gameBoard[r][c] === currentPlayer) {
          count++;
        } else {
          break;
        }
      }
      if (count >= 4) {
        return true;
      }
    }
    return false;
  }

  createBoard();
  message.textContent = `${currentPlayer.toUpperCase()}'s turn`;