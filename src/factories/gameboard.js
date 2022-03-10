import Ship from './ship';
import { registerHit, showUnavailCells } from '../dom';
import { generateRandomPlacement } from '../game';

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

  resetBoard() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        this.board[i][j] = { ship: false, shot: false };
      }
    }
  }

  isPlacementPossible(x, y, ship, alignment) {
    for (let i = 0; i < ship.length; i++) {
      if (alignment === 'column') {
        if (
          this.board[x][y + i].ship instanceof Ship ||
          this.board[x][y + i].placementUnavailable
        ) {
          return false;
        }
      } else if (
        this.board[x + i][y].ship instanceof Ship ||
        this.board[x + i][y].placementUnavailable
      ) {
        return false;
      }
    }
    return true;
  }

  placeShip(x, y, alignment, ship) {
    if (!this.isPlacementPossible(x, y, ship, alignment)) return false;
    for (let i = 0; i < ship.length; i++) {
      if (alignment === 'column') {
        this.board[x][y + i].ship = ship;
      } else {
        this.board[x + i][y].ship = ship;
      }
    }
    return true;
  }

  receiveAttack(x, y, player, gameboard) {
    if (this.board[x][y].shot === true) {
      if (player.name === 'computer') {
        player.randomAttack(gameboard);
      }
      return;
    }
    if (this.board[x][y].ship instanceof Ship) {
      this.board[x][y].ship.hit(x, y);
    }
    this.board[x][y].shot = true;
    registerHit(x, y, player.name, gameboard);
  }

  // Prevents ships being dragged from being placed next to placed ships
  checkAround() {
    // i = row (if vertical), j = column (if vertical), k = squares adjacent to the ship
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (this.board[i][j].ship instanceof Ship) {
          for (let k = -1; k < 2; k += 2) {
            if (
              i + k > -1 &&
              i + k < 10 &&
              this.board[i + k][j].ship === false
            ) {
              // Highlights squares to the side of ship or the ends depending on alignment
              showUnavailCells(i + k, j);
              this.board[i + k][j].placementUnavailable = true;
              if (j + k > -1 && j + k < 10) {
                // Highlights diagonal squares
                showUnavailCells(i + k, j + k);
                this.board[i + k][j + k].placementUnavailable = true;
              }
            }
            if (j + k > -1 && j + k < 10) {
              if (this.board[i][j + k].ship === false) {
                // Highlights squares at the ends of ship or to the side depending on alignment
                showUnavailCells(i, j + k);
                this.board[i][j + k].placementUnavailable = true;
              }
              if (
                i - k > -1 &&
                i - k < 10 &&
                this.board[i - k][j + k].ship === false
              ) {
                // Highlights diagonal squares
                showUnavailCells(i - k, j + k);
                this.board[i - k][j + k].placementUnavailable = true;
              }
            }
          }
        }
      }
    }
  }

  placeShipsRandomly() {
    const ships = [
      new Ship(2, 'destroyer'),
      new Ship(3, 'cruiser'),
      new Ship(3, 'submarine'),
      new Ship(4, 'battleship'),
      new Ship(5, 'carrier'),
    ];

    for (let i = 0; i < ships.length; i++) {
      if (!this.placeShip(...generateRandomPlacement(ships[i]), ships[i])) i--;
      this.checkAround();
    }
  }

  isShip(x, y) {
    if (this.board[x][y].ship) return true;
    return false;
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
