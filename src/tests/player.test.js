/* eslint-disable no-undef */
import Player from '../factories/player';

describe('Player', () => {
  let user;

  beforeEach(() => {
    user = new Player('user');
    computer = new Player('computer');
  });

  test('player is created', () => {
    expect(user.name).toBe('user');
  });
});
