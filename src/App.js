import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.nextTurn = this.nextTurn.bind(this);
        this.claimCell = this.claimCell.bind(this);
        this.resetGame = this.resetGame.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
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
            ties: 0
        }
        this.initialState = this.state;
    }

    clickHandler(cellIndex) {
        let nextState = this.state;

        if (this.isBoardFull(nextState)) {
            return;
        }

        if (!this.isCellEmpty(nextState.cells, cellIndex)) {
            return;
        } else {
            nextState = this.claimCell(nextState, cellIndex);
        }

        if (!this.isBoardFull(nextState.cells) && !this.hasPlayerWon(nextState.cells)) {
            this.nextTurn(nextState);
        }

        this.setState(nextState);
    }

    isCellEmpty(cells, cellIndex) {
        if (cells[cellIndex] === null) {
            return true;
        }

        return false;
    }

    isBoardFull (cells) {
        if (cells.indexOf(null) === -1) {
            return true;
        }
        return false;
    }


    claimCell(state, cellIndex) {
        state.cells[cellIndex] = state.playerTurn; // Original state is still mutated, so copy
        return state;
    }

    nextTurn(state) {
        state.playerTurn = state.playerTurn < state.players.length - 1 ? state.playerTurn += 1 : 0;
        return state;
    }

    hasPlayerWon(cellVavlues) {
        let winPatterns = [

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
        for (var i = 0; i < winPatterns.length; i++) {
            let matches = winPatterns[i].reduce((acc, val) => {

                // Compare to our cells state
                let index = winPatterns[i][0];
                if (cellVavlues[val] === null) {
                    return acc;
                }
                cellVavlues[val] === cellVavlues[index] ? acc++ : acc;
                return acc;
            }, 0);

            if (matches === 3) {
                // console.log('Winner!');
                return true;
            }
            // console.log('Loop');
        }
        // console.log('No winner :/');
        return false;
    }

    addScore(state) {
        let gameOver = false;
        let winner = false;

        if (gameOver || winner) {
            let currentPlayerScore = state.players[state.playerTurn].score;
            let ties = state.ties;
            let score = state.players[state.playerTurn].score;

            if (!winner) {
                ties++;
            } else {
                score++;
            }

            this.setState({
                currentPlayerScore: state.players[state.playerTurn].score += 1,
                ties: ties
            });
        }
    }

    resetGame() {
        this.setState({
            playerTurn: 0,
            cells: new Array(9).fill(null)
        });
    }

    render() {

        return (
            <div className='App'>
                <div className='container'>
                    <div className='board'>
                        <div className='row'>
                            <Cell cellIndex={0} onClick={this.clickHandler} occupant={this.state.cells[0]} />
                            <Cell cellIndex={1} onClick={this.clickHandler} occupant={this.state.cells[1]} />
                            <Cell cellIndex={2} onClick={this.clickHandler} occupant={this.state.cells[2]} />
                        </div>
                        <div className='row'>
                            <Cell cellIndex={3} onClick={this.clickHandler} occupant={this.state.cells[3]} />
                            <Cell cellIndex={4} onClick={this.clickHandler} occupant={this.state.cells[4]} />
                            <Cell cellIndex={5} onClick={this.clickHandler} occupant={this.state.cells[5]} />
                        </div>
                        <div className='row'>
                            <Cell cellIndex={6} onClick={this.clickHandler} occupant={this.state.cells[6]} />
                            <Cell cellIndex={7} onClick={this.clickHandler} occupant={this.state.cells[7]} />
                            <Cell cellIndex={8} onClick={this.clickHandler} occupant={this.state.cells[8]} />
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

export class Cell extends Component {

    render() {
        let symbol = '';

        if (this.props.occupant === 0) {
            symbol = 'X';
        } else if (this.props.occupant === 1) {
            symbol = 'O';
        }

        return (
            <div className='cell' onClick={() => {this.props.onClick(this.props.cellIndex)}}>{symbol}</div>
        );
    }
}

export class Scoreboard extends Component {
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