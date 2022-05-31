import Referee from './Referee.js';



export default class Game{
    constructor(){
        this.$winner = $('#winner');
        this.$gameBoard = $('.game-board');
        this.$boardCells = $('.game-board-cell');
        this.$currentPlayer = $('#current-player');
        this.currentPlayer = null;
        this.winner = null;
        this.board = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
        this.cellArray = [
            null, null, null,
            null, null, null,
            null, null, null
        ];

        
        this.red = {
            player: 'x',
            name: 'Red',
            select: 'x-cell',
            hover: 'gbcr',
            boardCells: [],
        }
        this.blue = {
            player: 'o',
            name: 'Blue',
            select: 'o-cell',
            hover: 'gbcb',
            boardCells: []
        }
        this.ref = new Referee({board: this.board});
        this.reset();
    }
    reset(){
        this.$winner.text('');
        this.$winner.hide();
        this.$boardCells.removeClass('xw');
        this.$boardCells.removeClass('ow');
        this.$boardCells.removeClass('o-cell');
        this.$boardCells.removeClass('x-cell');
        this.$boardCells.removeClass('gbcr');
        this.$boardCells.removeClass('gbcb');
        this.$boardCells.text("");
        this.start();
    }

    randomizePlayer(){
        let player = Math.random() > 0.5 ? this.blue : this.red;
        this.currentPlayer = player;
    }

    setUp(){
        this.$currentPlayer.text(this.currentPlayer.name);
        this.$currentPlayer.removeClass('cpblue');
        this.$currentPlayer.removeClass('cpred');
        this.$currentPlayer.addClass('cp' + this.currentPlayer.name.toLocaleLowerCase());
        this.$boardCells.removeClass(this.red.hover);
        this.$boardCells.removeClass(this.blue.hover);
        this.$boardCells.addClass(this.currentPlayer.hover);    
    }

    switchPlayer(){
        this.currentPlayer = this.currentPlayer === this.red ? this.blue : this.red;
        this.$currentPlayer.text(this.currentPlayer.name);
        this.$currentPlayer.removeClass('cpblue');
        this.$currentPlayer.removeClass('cpred');
        this.$currentPlayer.addClass('cp' + this.currentPlayer.name.toLocaleLowerCase());
        this.$boardCells.removeClass(this.red.hover);
        this.$boardCells.removeClass(this.blue.hover);
        // if board cells have class current player select, remove it
        this.$boardCells.each((i, cell) => {
            if(!$(cell).hasClass(this.blue.select) && !$(cell).hasClass(this.red.select)){
                $(cell).addClass(this.currentPlayer.hover);
            }
        });
    }
    
    getGameData(){
        let data = {
            red: this.red,
            blue: this.blue,
            currentPlayer: this.currentPlayer,
            board: this.board,
            cellArray: this.cellArray
        }
        return data;
    }

    updateBoard(){
        this.$gameBoard.on('click', (e) => {
            let $cell = $(e.target);
            if($cell[0].classList.contains(this.currentPlayer.hover)){
                $cell.text(this.currentPlayer.player);
                $cell.addClass(this.currentPlayer.select);
                if(this.winner === null){
                    for(let i = 0; i < this.$boardCells.length; i++){
                        //send index of cell to board and player cell.
                        if(this.$boardCells[i] == $cell[0]){
                            let cellY = Math.floor(i / 3);
                            let cellX = i % 3;
                            this.board[cellY][cellX] = this.currentPlayer.player;

                            this.currentPlayer.boardCells.push(i);
                            this.cellArray[i] = this.currentPlayer.player;
                            
                            this.ref.updateRefereeData(this.getGameData());
                        }
                    }
                    this.switchPlayer();
                }
            }
        });
    }
    clearBoard(){
        this.board = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
        this.cellArray = [
            null, null, null,
            null, null, null,
            null, null, null
        ];
    }
    start(){
        this.clearBoard();
        this.randomizePlayer();
        this.setUp();
        this.updateBoard();
    }
}

