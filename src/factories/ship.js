export default class Ship {
  constructor(length) {
    this.length = length;
    this.hits = [];
  }

  hit(pos) {
    this.hits.push(pos);
  }

  isSunk() {
    return this.hits.length === this.length;
  }
}
