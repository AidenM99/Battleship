/* eslint-disable no-undef */
import Gameboard from '../factories/gameboard';
import Ship from '../factories/ship';

describe('Gameboard', () => {
  let gameboard;

  const testBoard = [];

  for (let i = 0; i < 10; i++) {
    testBoard.push([]);
    for (let j = 0; j < 10; j++) {
      testBoard[i].push({ ship: false, shot: false });
    }
  }

  beforeEach(() => {
    gameboard = new Gameboard();
  });

  test('gameboard is correctly initialised', () => {
    expect(gameboard.board).toEqual(expect.arrayContaining(testBoard));
  });

  test('ship is correctly placed', () => {
    const carrier = new Ship(3);
    gameboard.placeShip(0, 0, carrier);
    expect(gameboard.board[0][0].ship).toEqual(carrier);
  });

  test('position correctly receives attack', () => {
    gameboard.receiveAttack(0, 0);
    expect(gameboard.board[0][0].shot).toBe(true);
  });

  test('receive attack function recognises if ship is hit on position', () => {
    const carrier = new Ship(3);
    gameboard.placeShip(0, 0, carrier);
    gameboard.receiveAttack(0, 0);
    expect(gameboard.board[0][0].ship.hits).toStrictEqual([
      { posX: 0, posY: 0 },
    ]);
  });
});
