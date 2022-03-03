import Ship from './ship';

export default class Gameboard {
  constructor() {
    this.board = [];
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

  isPlacementPossible(x, y, ship) {
    for (let i = 0; i < ship.length; i++) {
      if (this.board[x][y + i].ship instanceof Ship) {
        return false;
      }
    }
    return true;
  }

  placeShip(x, y, ship) {
    if (!this.isPlacementPossible(x, y, ship)) return false;
    for (let i = 0; i < ship.length; i++) {
      this.board[x][y + i].ship = ship;
    }
    return true;
  }

  receiveAttack(x, y, gameboard, player) {
    if (this.board[x][y].shot === true) {
      if (player.name === 'computer') {
        player.randomAttack(gameboard);
      }
      return;
    }
    this.board[x][y].shot = true;
    if (this.board[x][y].ship instanceof Ship) {
      this.board[x][y].ship.hit(x, y);
    }
  }

  isGameOver() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (this.board[i][j].ship instanceof Ship) {
          if (!this.board[i][j].ship.isSunk()) {
            return false;
          }
        }
      }
    }
    return true;
  }
}
