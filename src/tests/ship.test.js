/* eslint-disable no-undef */
import Ship from '../factories/ship';

describe('Ship', () => {
  let ship;

  beforeEach(() => {
    ship = new Ship(3);
  });

  test('ship function is correctly initialised', () => {
    expect(ship).toEqual({ length: 3, hits: [] });
  });

  test('when a ship is hit, correct value is pushed to array', () => {
    ship.hit(1);
    expect(ship.hits).toEqual([1]);
  });

  test('when a ship is hit, correct value is pushed to array', () => {
    ship.hit(1);
    ship.hit(2);
    expect(ship.hits).toEqual([1, 2]);
  });

  test('ship is sunk when all positions are hit', () => {
    ship.hit(1);
    ship.hit(2);
    ship.hit(3);
    expect(ship.isSunk()).toBe(true);
  });

  test('ship is not sunk if all positions are not hit', () => {
    ship.hit(1);
    ship.hit(2);
    expect(ship.isSunk()).toBe(false);
  });
});
