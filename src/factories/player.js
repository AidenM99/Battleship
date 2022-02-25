/* eslint-disable class-methods-use-this */
import Gameboard from './gameboard';

export default class Player {
  constructor(name) {
    this.name = name;
    this.gameboard = new Gameboard();
  }

  attack(x, y, gameboard) {
    if (gameboard.board[x][y].shot === true) return;
    gameboard.receiveAttack(x, y);
  }

  randomAttack(gameboard) {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    gameboard.receiveAttack(x, y);
  }
}
