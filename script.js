const Player = (name, mark) => { 
    let myTurn = false;

    const changeTurn = (value) => {
        if(value) myTurn = value;  
        else myTurn = !myTurn; 
    }

    const isItMyTurn = () => {
        return myTurn
    }

    return {name, mark, changeTurn, isItMyTurn}
}

const playerOne = Player('Player 1', 'O');
const playerTwo = Player('Player 2', 'X');

const gameBoard = (() => {
    let board = [];
    let boardDOM = [];

    const changeMark = (x,y,symbol) => {
        gameBoard.board[y][x] = symbol
    }

    const _getBoardDOM = (() => {
        const rows = [...document.querySelectorAll('.game-board .row')];
        for(i = 0; i < rows.length; i++) {
            const tiles = document.querySelectorAll(`.game-board .row[data-index="${i}"] .tile`);
            boardDOM.push([...tiles]);
        } 
    })();

    return {board, boardDOM, changeMark};
})();

const game = (() => {
    const _tiles = document.querySelectorAll(`.tile`);
    const _winnerDisplay = document.querySelector('.winner-display');

    const startGame = () => {
        gameBoard.board = [[null,null,null], 
                          [null,null,null],
                          [null,null,null]];
        displayController.renderBoard();
        playerOne.changeTurn(true);
        playerTwo.changeTurn(false);
        displayController.changeText(_winnerDisplay, '');
        _tiles.forEach(tile => tile.addEventListener('click', _tileOnClick));
    }

    const _stopGame = (winner) => {
        _tiles.forEach(tile => tile.removeEventListener('click', _tileOnClick));
        if (winner === 1) displayController.changeText(_winnerDisplay, `The winner is: ${playerOne.mark}`);
        else if (winner === 2) displayController.changeText(_winnerDisplay, `The winner is: ${playerTwo.mark}`);
        else displayController.changeText(_winnerDisplay, 'Draw');
    }

    const _tileOnClick = (e) => {
        const xIndex = e.target.dataset.index; 
        const yIndex = e.target.parentElement.dataset.index;
        const symbol = playerOne.isItMyTurn() ? 1 : 2;
        _playRound(xIndex, yIndex, symbol);
    }

    const _checkForWinner = () => {
        const winnerCheck = [_checkVertically(), _checkHorizontally(), _checkDiagonally(), _checkForTie()];
        const winner = winnerCheck.filter(item => item !== 0);
        if(winner.length !== 0) {
            _stopGame(winner[0]);
            console.log(winner);
        }

    }

    const _checkVertically = () => {
        for(i = 0; i < 3; i++) {
            let board = gameBoard.board;
            if(board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== null) {
                const winner = board[0][i];
                return winner;
            }
        }
        return 0;
    }

    const _checkHorizontally = () => {
        let winner = 0;
        gameBoard.board.forEach(row => {
            if(row[0] === row[1] && row[1] === row[2] && row[0] !== null) {
                winner = row[0];
            }
        });
        return winner;
    }

    const _checkDiagonally = () => {
        let board = gameBoard.board;
        if(board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== null) {
            const winner = board[0][0];
            return winner;
        } else if (board[2][0] === board[1][1] && board[1][1] === board[0][2] && board[2][0] !== null) {
            const winner = board[2][0];
            return winner;
        } else return 0;
    }

    const _checkForTie = () => {
        tilesCheck = Array.from(_tiles).filter(tile => tile.textContent === '');
        if(tilesCheck.length === 0) {
            return 3;
        }
        return 0;
    }

    const _playRound = (x, y, symbol) => {
        if(gameBoard.board[y][x] === null) {
            gameBoard.changeMark(x, y, symbol);
            displayController.renderBoard();
            playerOne.changeTurn();
            playerTwo.changeTurn();
        }
        _checkForWinner();
    }

    return {startGame};
})();

const displayController = (() => {

    const renderBoard = () => {
        for(i = 0; i < gameBoard.boardDOM.length; i++) {
            const row = gameBoard.boardDOM[i];
            for(j = 0; j < row.length; j++) {
                const tile = gameBoard.boardDOM[i][j];
                _renderTile(tile, i, j)
            }
        }
    }

    const changeText = (element, text) => {
        element.textContent = text;
    }

    const _renderTile = (tile, i, j) => {
        switch (gameBoard.board[i][j]) {
            case null:
                tile.textContent = '';
                break;
            case 1:
                tile.textContent = playerOne.mark;
                break;
            case 2:
                tile.textContent = playerTwo.mark;
                break;
            default:
                break;
        }
    }

    return {renderBoard, changeText};
})();

const startButton = document.querySelector('.start-game');
startButton.addEventListener('click', game.startGame);