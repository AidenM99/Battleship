import Player from './factories/player';

const players = {
  user: new Player('user'),
  computer: new Player('computer'),
};

function init() {
  players.user.setTurn();
}

function generateRandomPlacement(ship) {
  let x = Math.floor(Math.random() * 10);
  let y = Math.floor(Math.random() * 10);
  let alignment;

  if (Math.random() < 0.5) {
    alignment = 'row';
  } else {
    alignment = 'column';
  }

  if (alignment === 'column') {
    if (y + ship.length > 9) {
      y = 10 - ship.length;
    }
  } else if (x + ship.length > 9) x = 10 - ship.length;

  return [x, y, alignment];
}

function checkHit(gameboard, x, y) {
  if (players.user.turn()) {
    if (!players.user.attack(x, y, gameboard)) {
      return false;
    }
  }
  if (gameboard.isGameOver()) {
    console.log('game over!');
    return false;
  }
  return true;
}

function turnController() {
  players.user.setTurn();
  players.computer.setTurn();
  if (players.computer.turn()) {
    players.computer.setConsideringAttack();
    // eslint-disable-next-line no-use-before-define
    setTimeout(aiPlay, 1000);
  }
}

function attack(gameboard, e) {
  if (!players.computer.consideringAttack()) {
    if (players.user.turn()) {
      const { x, y } = {
        x: parseInt(e.target.dataset.x, 10),
        y: parseInt(e.target.dataset.y, 10),
      };

      if (checkHit(gameboard, x, y)) turnController();
    } else {
      players.computer.randomAttack(gameboard);
      checkHit(gameboard);
    }
  }
}

function aiPlay() {
  players.computer.setConsideringAttack();
  attack(players.user.gameboard);
  turnController();
}

export { players, init, attack, generateRandomPlacement };
