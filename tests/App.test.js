import React, { Component } from 'react';
import App, {Cell, Scoreboard} from '../src/App';

describe('Jest', () => {
   it('Renders without crashing!!!', () => {
       expect(true).toBe(true);
   });
});

describe('App', () => {

    var state = {};

    beforeEach(() => {
        state = {
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
    });

    it('Checks if cell is vacant', () => {
        // Vacant
        var isCellEmpty = new App().isCellEmpty(state.cells, 0);
        expect(isCellEmpty).toBe(true);

        // Occupied
        new App().claimCell(state, 1);
        isCellEmpty = new App().isCellEmpty(state.cells, 1);
        expect(isCellEmpty).toBe(false);
    });

    it('Checks if the board is full', () => {
        // Empty
        var isBoardFull = new App().isBoardFull(state.cells);
        expect(isBoardFull).toBe(false);

        // Full
        state.cells = new Array(9).fill(0);
        isBoardFull = new App().isBoardFull(state.cells);
        expect(isBoardFull).toBe(true);
    });

    it('Checks if player has won', () => {
        var cellsValues = [0, 0, 0,
            null, null, null,
            null, null, null];

        // Won
        var hasPlayerWon = new App().getWinner(cellsValues);
        expect(hasPlayerWon).toBe(0);

        // Has not won
        hasPlayerWon = new App().getWinner(state.cells);
        expect(hasPlayerWon).toBe(null);
    });

    it('Should claim a cell at the given index', () => {
        var claimCell = new App().claimCell;
        claimCell(state, 0);
        expect(state.cells[0]).toBe(0);
        expect(state.cells[1]).toBe(null);
    });

    it('Should proceed game to next turn after successfully claiming a cell', () => {
        var nextTurn = new App().nextTurn;
        nextTurn(state);
        expect(state.playerTurn).toBe(1);
        nextTurn(state);
        expect(state.playerTurn).toBe(0);
    });

    // it('Should be able to reset game once game is finished', () => {
    //     expect(true).toBe(false);
    // });

    /*
        My tests:



     */

    /*
     Suggested tests:

     Square value gets rendered
     Square on click action gets called
     Board has 3 rows
     Board has 9 squares
     Can move to a position
     Cannot move to a taken position
     Players can win the game
     Cannot play if the game is finished
     If all the board is completed then it's a tie
     Should be able to start a new round when game finishes
    */

});