const Player = (name) => { 
    return {name}
}

const gameBoard = (() => {
    let board = [[null,null,null], 
                [null,null,null],
                [null,null,null]];
    return {board};
})();

const game = (() => {
    return {};
})();

const playerOne = Player('Player 1');
const playerTwo = Player('Player 2');