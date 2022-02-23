export default class Ship {
  constructor(length) {
    this.length = length;
    this.hits = [];
  }

  hit(coord) {
    this.hits.push(coord);
  }

  isSunk() {
    return this.hits.length === this.length;
  }
}
