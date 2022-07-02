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
    let started = false;
    const startGame = () => {
        gameBoard.board = [[null,null,null], 
                          [null,null,null],
                          [null,null,null]];
        displayController.renderBoard();
        playerOne.changeTurn(true);
        playerTwo.changeTurn(false);
        started = true;
    }

    const changeMarkOnClick = (tile) => {
        const xIndex = tile.dataset.index; 
        const yIndex = tile.parentElement.dataset.index;
        const symbol = playerOne.isItMyTurn() ? 1 : 2;
        if(gameBoard.board[yIndex][xIndex] === null) {
            gameBoard.changeMark(xIndex, yIndex, symbol);
            displayController.renderBoard();
            playerOne.changeTurn();
            playerTwo.changeTurn();
        }
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
const tiles = document.querySelectorAll(`.tile`);
tiles.forEach(tile => tile.addEventListener('click', e => game.changeMarkOnClick(e.target)));

game.startGame();