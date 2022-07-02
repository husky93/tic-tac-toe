const Player = (name, sign) => { 
    let isItMyTurn = false;
    return {name, sign, isItMyTurn}
}

const playerOne = Player('Player 1', 'X');
const playerTwo = Player('Player 2', 'O');

const gameBoard = (() => {
    let board = [];
    let boardDOM = [];

    const changeMark = (x,y,symbol) => {
        board[x,y] = symbol
    }

    const _getBoardDOM = (() => {
        const rows = [...document.querySelectorAll('.game-board .row')];
        for(i = 1; i <= rows.length; i++) {
            const tiles = document.querySelectorAll(`.game-board .row[data-index="${i}"] .tile`);
            boardDOM.push([...tiles]);
        } 
    })();

    return {board, boardDOM, changeMark};
})();

const game = (() => {
    let started = false;
    const startGame = () => {
        gameBoard.board = [[null,null,null], 
                          [null,null,null],
                          [null,null,null]];
        displayController.renderBoard();
        playerOne.isItMyTurn = true;
        started = true;
    }

    const changeMarkOnClick = (tile) => {

    }
    return {startGame, changeMarkOnClick};
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
                tile.textContent = playerOne.sign;
                break;
            case 2:
                tile.textContent = playerTwo.sign;
                break;
            default:
                break;
        }
    }

    return {renderBoard};
})();
game.startGame();