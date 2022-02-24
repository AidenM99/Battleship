import Ship from './ship';

export default class Gameboard {
  constructor() {
    this.board = [];
    this.ships = [];
    this.initialiseBoard();
  }

  initialiseBoard() {
    for (let i = 0; i < 10; i++) {
      this.board.push([]);
      for (let j = 0; j < 10; j++) {
        this.board[i].push({ ship: false, shot: false });
      }
    }
  }

  placeShip(x, y, ship) {
    this.board[x][y].ship = ship;
  }

  receiveAttack(x, y) {
    this.board[x][y].shot = true;
    if (this.board[x][y].ship instanceof Ship) {
      this.board[x][y].ship.hit(x, y);
    }
  }

  /*isGameOver() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {}
    }
  }*/
}
