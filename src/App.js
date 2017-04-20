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
            turn: 0,
            cells: new Array(9).fill(null),
            winner: null
        }
        this.initialState = this.state;
    }

    componentDidMount() {
        this.state.cells.map((el, i, arr) => {

        });
    }

    claimCell(cellIndex) {
        let nextCellsState = this.state.cells;

        // Check if the current cell is occupied or not
        let occupied = this.state.cells.reduce((val, el, i) => {
            if (el !== null || val === true) {
                return true;
            }
            return false;
        }, false);

        if (!occupied) {
            nextCellsState.push({
                cell: cellIndex,
                occupant: this.state.turn
            });

            this.setState({
                cells: nextCellsState
            });

            this.nextTurn();
        }
    }

    nextTurn() {
        let turn = this.state.turn;
        this.state.turn < this.state.players.length - 1 ? turn++ : turn = 0;

        this.setState({
            turn
        });
        // console.log('Next turn!', this.state.turn);
    }

    checkWinner() {
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
        ]

    }

    resetGame() {
        this.setState(this.initialState);
    }

    render() {
        // let cells = this.state.cells.map((cell, iterator, array) => {
        //     return (
        //         <Cell key={iterator} cellIndex={iterator} claimCell={this.claimCell} occupant={0} />
        //     )
        // });

        return (
            <div className='App'>
                <div className='container'>
                    <div className='board'>
                        <div className='row'>
                            <Cell cellIndex={0} claimCell={this.claimCell} occupant={0} />
                            <Cell cellIndex={1} claimCell={this.claimCell} occupant={1} />
                            <Cell cellIndex={2} claimCell={this.claimCell} occupant={0} />
                        </div>
                        <div className='row'>
                            <Cell cellIndex={0} claimCell={this.claimCell} occupant={0} />
                            <Cell cellIndex={1} claimCell={this.claimCell} occupant={1} />
                            <Cell cellIndex={2} claimCell={this.claimCell} occupant={0} />
                        </div>
                        <div className='row'>
                            <Cell cellIndex={0} claimCell={this.claimCell} occupant={0} />
                            <Cell cellIndex={1} claimCell={this.claimCell} occupant={1} />
                            <Cell cellIndex={2} claimCell={this.claimCell} occupant={0} />
                        </div>
                    </div>
                    <Scoreboard players={this.state.players} turn={this.state.turn} />
                    {this.state.winner !== null ?
                        <div className='button' onClick={this.resetGame} >Play Again</div>
                            : null}
                </div>
            </div>
        );
    }

}

class Cell extends Component {

    render() {
        let symbol = this.props.occupant === 1 ? 'X' : 'O';

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
            playerClass += index === this.props.turn ? ' active' : '';
            return <p className={playerClass} key={player.name}>{player.name} : {player.score}</p>;
        });

        return (
            <div className='scoreboard'>
                Score:
                {players}
            </div>
        );
    }
}

export default App;
