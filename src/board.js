import { user } from './game';
import Ship from './factories/ship';
import { dropHandler, dragOverHandler } from './dragAndDrop';

function getShipType(ship) {
  let length;
  if (ship.id === 'destroyer') {
    length = 2;
  }
  if (ship.id === 'submarine' || ship.id === 'cruiser') {
    length = 3;
  }
  if (ship.id === 'battleship') {
    length = 4;
  }
  if (ship.id === 'carrier') {
    length = 5;
  }

  return length;
}

function placeShip(x, y, ship) {
  const newShip = new Ship(getShipType(ship));

  if (!user.gameboard.placeShip(x, y, newShip)) return;

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (user.gameboard.board[i][j].ship) {
        document.querySelector(
          `[data-x="${i}"][data-y="${j}"]`
        ).style.background = 'grey';
      }
    }
  }

  ship.remove();
}

function renderBoard() {
  for (let i = 0; i < 100; i++) {
    const userGameboard = document.querySelector('.user-gameboard');
    const userSquare = document.createElement('div');
    userSquare.classList.add('grid-square');
    userSquare.dataset.x = i % 10;
    userSquare.dataset.y = Math.floor(i / 10);

    const computerGameboard = document.querySelector('.computer-gameboard');
    const computerSquare = document.createElement('div');
    computerSquare.classList.add('grid-square');
    computerSquare.dataset.x = i % 10;
    computerSquare.dataset.y = Math.floor(i / 10);

    userSquare.addEventListener('dragover', dragOverHandler);
    userSquare.addEventListener('drop', dropHandler);

    userGameboard.appendChild(userSquare);
    computerGameboard.appendChild(computerSquare);
  }
}

export { renderBoard, placeShip };
