import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor() {
        super();
        // this.nextTurn = this.nextTurn.bind(this);
        // this.claimCell = this.claimCell.bind(this);
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
            gameOver: false,
            cells: new Array(9).fill(null),
            ties: 0
        }
        this.initialState = this.state;
    }

    clickHandler(cellIndex) {
        let nextState = this.state;
        let winner;

        if (this.state.gameOver) {
            return;
        }

        if (this.isCellEmpty(nextState.cells, cellIndex)) {
            nextState = this.claimCell(nextState, cellIndex);
            nextState = this.nextTurn(nextState);
        }

        winner = this.getWinner(nextState.cells);

        if (winner != null) {
            nextState.gameOver = true;
            nextState = this.addScore(nextState, winner);
        } else if (this.isBoardFull(nextState.cells)) {
            nextState.ties = nextState.ties + 1;
            nextState.gameOver = true;
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
        let nextState = state;
        nextState.cells[cellIndex] = nextState.playerTurn; // Original state is still mutated, so copy
        return nextState;
    }

    nextTurn(state) {
        let nextState = state;
        nextState.playerTurn = nextState.playerTurn < nextState.players.length - 1 ? nextState.playerTurn += 1 : 0;
        return nextState;
    }

    getWinner(cellValues) {
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
            if (cellValues[winPatterns[i][0]] != null
                && cellValues[winPatterns[i][0]] === cellValues[winPatterns[i][1]]
                && cellValues[winPatterns[i][0]] === cellValues[winPatterns[i][2]]) {
                return cellValues[winPatterns[i][0]];
            }
        }
        return null;
    }

    addScore(state, winner) {
        let nextState = state;
        nextState.players[winner].score++;
        return nextState;
    }

    resetGame() {
        this.setState({
            playerTurn: 0,
            gameOver: false,
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
                    <Scoreboard players={this.state.players} playerTurn={this.state.playerTurn} />
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