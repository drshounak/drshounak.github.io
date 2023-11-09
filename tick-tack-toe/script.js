let currentPlayer = 'X';
const board = Array.from(Array(9).keys());

function checkWinner() {
    const winningCombination = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let combination of winningCombination) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
}

function checkGameState() {
    const winner = checkWinner();
    if (winner !== null) {
        document.getElementById('message').textContent = `Player ${winner} wins!`;
    } else if (board.every(square => typeof square !== 'number')) {
        document.getElementById('message').textContent = "It's a draw!";
    }
}

function getAiMove() {
    let availableSquares = board.filter(s => typeof s === 'number');

    // Check for a winning move for AI
    for (let move of availableSquares) {
        board[move] = currentPlayer;
        if (checkWinner() === currentPlayer) {
            board[move] = move; // Undo the move
            return move;
        }
        board[move] = move; // Undo the move
    }

    // Check for a winning move for the user and block it
    for (let move of availableSquares) {
        board[move] = currentPlayer === 'X' ? 'O' : 'X';
        if (checkWinner() === (currentPlayer === 'X' ? 'O' : 'X')) {
            board[move] = move; // Undo the move
            return move;
        }
        board[move] = move; // Undo the move
    }

    // If there are no immediate winning moves, choose a random move
    if (availableSquares.length > 0) {
        let randomMove = availableSquares[Math.floor(Math.random() * availableSquares.length)];
        return randomMove;
    }
    return null;
}


function aiTurn() {
    let aiMove = getAiMove();
    if (aiMove !== null) {
        board[aiMove] = currentPlayer;
        document.querySelectorAll('.cell')[aiMove].textContent = currentPlayer;
        if (checkWinner() === null) {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function makeMove(square) {
    if (typeof board[square] === 'number' && checkWinner() === null) {
        board[square] = currentPlayer;
        document.getElementById('message').textContent = '';
        document.querySelectorAll('.cell')[square].textContent = currentPlayer;
        if (checkWinner() === null) {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            aiTurn();
        }
    }
}

function restartGame() {
    for (let i = 0; i < board.length; i++) {
        board[i] = i; // Reset each cell to its index value (0 to 8)
        document.querySelectorAll('.cell')[i].textContent = ''; // Clear the cell text
    }
    currentPlayer = 'X'; // Reset currentPlayer to 'X'
    document.getElementById('message').textContent = ''; // Clear any messages
}

const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;
const themeColorMetaTag = document.querySelector('meta[name=theme-color]');

darkModeToggle.addEventListener('change', () => {
    const isDarkMode = darkModeToggle.checked;
    body.classList.toggle('dark-mode', isDarkMode);
    themeColorMetaTag.content = isDarkMode ? '#000000' : '#ffffff';
});

// Add event listeners to the game cells
document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', () => {
        const cellIndex = Array.from(document.querySelectorAll('.cell')).indexOf(cell);
        makeMove(cellIndex);
    });
});
