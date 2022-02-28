/* eslint-disable no-undef */
import Player from '../factories/player';

describe('Player', () => {
  let user;
  let computer;
  let randomMock;

  beforeEach(() => {
    user = new Player('user');
    computer = new Player('computer');
    randomMock = jest.spyOn(global.Math, 'random');
  });

  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
  });

  test('player is created', () => {
    expect(user.name).toBe('user');
  });

  test('computer can randomly attack', () => {
    randomMock.mockReturnValue(0.2);
    computer.randomAttack(user.gameboard);
    expect(user.gameboard.board[2][2].shot).toBe(true);
  });

  test('computer cannot hit the same position twice', () => {
    randomMock.mockRestore();
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        user.gameboard.board[i][j].shot = true;
      }
    }
    user.gameboard.board[0][0].shot = false;
    computer.randomAttack(user.gameboard);
    expect(user.gameboard.board[0][0].shot).toBe(true);
  });
});
