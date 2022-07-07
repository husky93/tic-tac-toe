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

    const startGame = () => {
        gameBoard.board = [[null,null,null], 
                          [null,null,null],
                          [null,null,null]];
        displayController.renderBoard();
        playerOne.changeTurn(true);
        playerTwo.changeTurn(false);
        _tiles.forEach(tile => tile.addEventListener('click', e => game.tileOnClick(e.target)));
    }

    const stopGame = (winner) => {
        _tiles.forEach(tile => tile.removeEventListener('click', e => game.tileOnClick(e.target)));
    }

    const tileOnClick = (tile) => {
        const xIndex = tile.dataset.index; 
        const yIndex = tile.parentElement.dataset.index;
        const symbol = playerOne.isItMyTurn() ? 1 : 2;
        _playRound(xIndex, yIndex, symbol);
    }

    const _checkForWinner = () => {
        const winnerCheck = [_checkVertically(), _checkHorizontally(), _checkDiagonally()];
        const winner = winnerCheck.filter(item => item !== 0);
        if(winner.length !== 0) {
            stopGame(winner[0]);
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

    const _playRound = (x, y, symbol) => {
        if(gameBoard.board[y][x] === null) {
            gameBoard.changeMark(x, y, symbol);
            displayController.renderBoard();
            playerOne.changeTurn();
            playerTwo.changeTurn();
        }
        _checkForWinner();
    }

    return {startGame, tileOnClick};
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

    return {renderBoard};
})();

const startButton = document.querySelector('.start-game');
startButton.addEventListener('click', game.startGame());