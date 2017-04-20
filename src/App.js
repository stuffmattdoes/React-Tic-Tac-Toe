import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.nextTurn = this.nextTurn.bind(this);
        this.claimCell = this.claimCell.bind(this);
        this.resetGame = this.resetGame.bind(this);
        this.state = {
            players: [
                {
                    name: 'Player 1',
                    score: 0,
                    symbol: 'X',
                    wins: 0
                },
                {
                    name: 'Player 2',
                    score: 0,
                    symbol: 'O',
                    wins: 0
                },
            ],
            playerTurn: 0,
            cells: new Array(9).fill(null),
            gameOver: false,
            ties: 0
        }
        this.initialState = this.state;
    }

    claimCell(cellIndex) {
        if (this.state.gameOver) {
            return;
        }

        let nextCellsState = this.state.cells;

        // Check if the current cell is occupied or not
        let occupied = this.state.cells[cellIndex] === null ? false : true;

        if (!occupied) {
            nextCellsState[cellIndex] = this.state.playerTurn;

            this.setState({
                cells: nextCellsState
            });

            this.nextTurn();
        }
    }

    nextTurn() {
        if (!this.checkGameOver() || !this.checkWinner()) {
            return
        };

        let turn = this.state.playerTurn;
        this.state.playerTurn < this.state.players.length - 1 ? turn++ : turn = 0;

        this.setState({
            playerTurn: turn
        });
    }

    checkGameOver() {
        if (this.state.cells.indexOf(null) === -1) {
            this.checkWinner();
            return false;
        }

        return true;
    }

    checkWinner() {
        let gameOver = false;
        let winner = false;
        let patterns = [

            // Horizontal match
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],

            // Vertical match
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],

            // Diagonal match
            [0, 4, 8],
            [2, 4, 6]
        ];

        // iterate through each pattern
        for (var i = 0; i < patterns.length; i++) {
            let matches = patterns[i].reduce((acc, val) => {

                // Compare to our cells state
                let index = patterns[i][0];
                if (this.state.cells[val] === null) {
                    return acc;
                }
                this.state.cells[val] === this.state.cells[index] ? acc++ : acc;
                return acc;
            }, 0);

            if (matches === 3) {
                gameOver = true;
                winner = true;
            }
        }
        
        if (gameOver || winner) {
            console.log(gameOver, winner);
            let currentPlayerScore = this.state.players[this.state.playerTurn].score;
            let ties = this.state.ties;
            let score = this.state.players[this.state.playerTurn].score;

            if (!winner) {
                console.log('tie');
                ties++;
            } else {
                console.log('score');
                score++;
            }

            this.setState({
                gameOver: true,
                currentPlayerScore: this.state.players[this.state.playerTurn].score++,
                ties: ties
            });

            return false;
        }

        return true;
    }

    resetGame() {
        this.setState({
            playerTurn: 0,
            cells: new Array(9).fill(null),
            gameOver: false
        });
    }

    render() {

        return (
            <div className='App'>
                <div className='container'>
                    <div className='board'>
                        <div className='row'>
                            <Cell cellIndex={0} claimCell={this.claimCell} occupant={this.state.cells[0]} />
                            <Cell cellIndex={1} claimCell={this.claimCell} occupant={this.state.cells[1]} />
                            <Cell cellIndex={2} claimCell={this.claimCell} occupant={this.state.cells[2]} />
                        </div>
                        <div className='row'>
                            <Cell cellIndex={3} claimCell={this.claimCell} occupant={this.state.cells[3]} />
                            <Cell cellIndex={4} claimCell={this.claimCell} occupant={this.state.cells[4]} />
                            <Cell cellIndex={5} claimCell={this.claimCell} occupant={this.state.cells[5]} />
                        </div>
                        <div className='row'>
                            <Cell cellIndex={6} claimCell={this.claimCell} occupant={this.state.cells[6]} />
                            <Cell cellIndex={7} claimCell={this.claimCell} occupant={this.state.cells[7]} />
                            <Cell cellIndex={8} claimCell={this.claimCell} occupant={this.state.cells[8]} />
                        </div>
                    </div>
                    <Scoreboard players={this.state.players} playerTurn={this.state.playerTurn} gameOver={this.state.gameOver} />
                    <p>Ties: {this.state.ties}</p>
                    {this.state.gameOver ?
                        <div className='button' onClick={this.resetGame} >Play Again</div>
                            : null}
                </div>
            </div>
        );
    }

}

class Cell extends Component {

    render() {
        let symbol = '';

        if (this.props.occupant === 0) {
            symbol = 'X';
        } else if (this.props.occupant === 1) {
            symbol = 'O';
        }

        return (
            <div className='cell' onClick={() => {this.props.claimCell(this.props.cellIndex)}}>{symbol}</div>
        );
    }
}

class Scoreboard extends Component {
    render() {

        if (!this.props.players.length) {
            return null;
        }

        let players = this.props.players.map((player, index) => {
            let playerClass = 'player';
            playerClass += index === this.props.playerTurn ? ' active' : '';
            return (
                <div className={playerClass} key={player.name}>
                    <p>{player.name} - {player.symbol}</p>
                    <p>score: {player.score}</p>
                </div>
            );
        });

        return (
            <div className='scoreboard'>
                <p>Score:</p>
                {players}
            </div>
        );
    }
}

export default App;
