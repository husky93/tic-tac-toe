const Player = (name, sign) => { 
    return {name, sign}
}

const playerOne = Player('Player 1', 'X');
const playerTwo = Player('Player 2', 'O');

const gameBoard = (() => {
    let board = [[null,null,null], 
                 [null,null,null],
                 [null,null,null]];
    return {board};
})();

const game = (() => {
    return {};
})();

const displayController = (() => {
    const gameBoardDOM = [];

    const render = () => {
        getTilesDOM();
        for(i = 0; i < gameBoardDOM.length; i++) {
            const row = gameBoardDOM[i];
            for(j = 0; j < row.length; j++) {
                const tile = gameBoardDOM[i][j];
                renderTile(tile, i, j)
            }
        }
    }

    const renderTile = (tile, i, j) => {
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

    const getTilesDOM = () => {
        const rows = [...document.querySelectorAll('.game-board .row')];
        for(i = 1; i <= rows.length; i++) {
            const tiles = document.querySelectorAll(`.game-board .row[data-index="${i}"] .tile`);
            gameBoardDOM.push([...tiles]);
        } 
    } 

    return {render};
})();

displayController.render();