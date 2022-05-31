export default class Referee{
    constructor(game){
        this.game = game;
        this.winner = null;
        this.board = game.board;
        this.cellArray = game.cellArray;
        this.$boardCells = $('.game-board-cell');
        this.$winner = $('#winner');
    }
    checkForWinner(cellArray){
        let winner = null;
        let board = cellArray || this.cellArray;
        let winningCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for(let i = 0; i < winningCombos.length; i++){
            let [a, b, c] = winningCombos[i];
            if(board[a] && board[a] === board[b] && board[a] === board[c]){
                winner = board[a];
                $(this.$boardCells[a]).addClass(`${winner}w`);
                $(this.$boardCells[b]).addClass(`${winner}w`);
                $(this.$boardCells[c]).addClass(`${winner}w`);
                //lock out rest of the board
                this.$boardCells.each((index, cell) => {
                    if(!$(cell).hasClass(`x-cell`) && !$(cell).hasClass(`o-cell`)){
                        $(cell).addClass(`${winner}-cell`);
                    }
                });
            }
        }
        return winner;
    }
    checkForTie(cellArray){
        let board = cellArray || this.cellArray;
        let tie = true;
        for(let i = 0; i < this.game.board.length; i++){
            if(board[i] === null){
                tie = false;
            }
        }

        return tie;
    }
    checkForWinnerOrTie(){
        let winner = this.checkForWinner();
        let tie = this.checkForTie();
        if(winner){
            return winner;
        }else if(tie){
            return 'tie';
        }else{
            return null;
        }
    }
    updateRefereeData(gameData){
        this.board = gameData.board;
        this.cellArray = gameData.cellArray;
        this.winner = this.checkForWinner(this.cellArray);
        if(this.winner){
          this.$winner.text(`${this.winner.toUpperCase()} wins!`);
          this.$winner.show();

        }
    }
}