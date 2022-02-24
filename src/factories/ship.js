export default class Ship {
  constructor(length) {
    this.length = length;
    this.hits = [];
  }

  hit(x, y) {
    this.hits.push({ posX: x, posY: y });
  }

  isSunk() {
    return this.hits.length === this.length;
  }
}
