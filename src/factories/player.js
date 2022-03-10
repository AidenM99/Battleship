/* eslint-disable class-methods-use-this */
import Gameboard from './gameboard';

export default class Player {
  constructor(name) {
    this.name = name;
    this.isTurn = false;
    this.isConsideringAttack = false;
    this.gameboard = new Gameboard();
  }

  attack(x, y, gameboard) {
    if (gameboard.board[x][y].shot === true) return false;
    gameboard.receiveAttack(x, y, this, gameboard);
    return true;
  }

  randomAttack(gameboard) {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    gameboard.receiveAttack(x, y, this, gameboard);
  }

  getTurn() {
    return this.isTurn;
  }

  consideringAttack() {
    return this.isConsideringAttack;
  }

  setTurn() {
    if (this.isTurn === false) {
      this.isTurn = true;
    } else {
      this.isTurn = false;
    }
  }

  setConsideringAttack() {
    if (this.isConsideringAttack === false) {
      this.isConsideringAttack = true;
    } else {
      this.isConsideringAttack = false;
    }
  }
}
