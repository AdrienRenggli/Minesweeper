// script.js

const boardSize = 10;
const mineCount = 15;
let gameBoard = [];
let revealedCells = [];
let mines = [];

const gameBoardElement = document.getElementById('game-board');
const resetButton = document.getElementById('reset-btn');
const gameOverScreen = document.getElementById('game-over-screen');
const playAgainButton = document.getElementById('play-again-btn');


// Create a game board
function createBoard() {
    gameBoard = [];
    revealedCells = [];
    mines = [];

    // Initialize the game board with empty cells
    for (let row = 0; row < boardSize; row++) {
        gameBoard[row] = [];
        for (let col = 0; col < boardSize; col++) {
            gameBoard[row][col] = { isMine: false, isRevealed: false, neighboringMines: 0 };
        }
    }

    // Place mines randomly
    let placedMines = 0;
    while (placedMines < mineCount) {
        const row = Math.floor(Math.random() * boardSize);
        const col = Math.floor(Math.random() * boardSize);

        if (!gameBoard[row][col].isMine) {
            gameBoard[row][col].isMine = true;
            placedMines++;
        }
    }

    // Calculate neighboring mines for each cell
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            if (!gameBoard[row][col].isMine) {
                let mineCount = 0;
                for (let r = -1; r <= 1; r++) {
                    for (let c = -1; c <= 1; c++) {
                        const newRow = row + r;
                        const newCol = col + c;

                        if (
                            newRow >= 0 &&
                            newCol >= 0 &&
                            newRow < boardSize &&
                            newCol < boardSize &&
                            gameBoard[newRow][newCol].isMine
                        ) {
                            mineCount++;
                        }
                    }
                }
                gameBoard[row][col].neighboringMines = mineCount;
            }
        }
    }

    renderBoard();
}

// Render the board to the DOM
function renderBoard() {
    gameBoardElement.innerHTML = '';
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;

            if (gameBoard[row][col].isRevealed) {
                cell.classList.add('revealed');
                if (gameBoard[row][col].isMine) {
                    cell.classList.add('mine');
                } else {
                    if (gameBoard[row][col].neighboringMines > 0) {
                        cell.textContent = gameBoard[row][col].neighboringMines;
                    }
                }
            }

            cell.addEventListener('click', () => handleClick(row, col));
            gameBoardElement.appendChild(cell);
        }
    }
}

// Handle cell click
function handleClick(row, col) {
    if (gameBoard[row][col].isRevealed) return;

    gameBoard[row][col].isRevealed = true;
    revealedCells.push({ row, col });

    if (gameBoard[row][col].isMine) {
        gameBoard[row][col].isRevealed = true;
        renderBoard();
        showGameOver();
        revealMines();
        return;
    }

    if (gameBoard[row][col].neighboringMines === 0) {
        revealNeighbors(row, col);
    }

    renderBoard();
}

function showGameOver() {
    gameOverScreen.classList.remove('hidden');
}

function revealMines() {
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            if (gameBoard[row][col].isMine) {
                gameBoard[row][col].isRevealed = true;
            }
        }
    }
    renderBoard();
}

// Reveal neighboring cells if there are no neighboring mines
function revealNeighbors(row, col) {
    const directions = [-1, 0, 1];
    for (let r of directions) {
        for (let c of directions) {
            const newRow = row + r;
            const newCol = col + c;
            if (newRow >= 0 && newCol >= 0 && newRow < boardSize && newCol < boardSize) {
                if (!gameBoard[newRow][newCol].isRevealed && !gameBoard[newRow][newCol].isMine) {
                    gameBoard[newRow][newCol].isRevealed = true;
                    revealedCells.push({ row: newRow, col: newCol });
                    if (gameBoard[newRow][newCol].neighboringMines === 0) {
                        revealNeighbors(newRow, newCol);
                    }
                }
            }
        }
    }
}

// Reset the game
resetButton.addEventListener('click', createBoard);

// Play again
playAgainButton.addEventListener('click', () => {
    gameOverScreen.classList.add('hidden');
    createBoard();
});


// Start a new game on load
createBoard();
