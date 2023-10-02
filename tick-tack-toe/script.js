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

function makeMove(square) {
    if (typeof board[square] === 'number') {
        board[square] = currentPlayer;
        document.getElementById('message').textContent = '';
        document.querySelectorAll('.cell')[square].textContent = currentPlayer;
        const winner = checkWinner();
        if (winner) {
            document.getElementById('message').textContent = `Player ${winner} wins!`;
        } else if (board.every(square => typeof square === 'string')) {
            document.getElementById('message').textContent = 'It\'s a draw!';
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
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

darkModeToggle.addEventListener('change', () => {
    body.classList.toggle('dark-mode', darkModeToggle.checked);
});


