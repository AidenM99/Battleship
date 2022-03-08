import addDragAndDropEventListeners from './dragAndDrop';
import Ship from './factories/ship';
import players from './game';

function changeAlignment(getAlignment) {
  const ships = document.querySelectorAll('.ship');
  const shipsContainer = document.querySelector('.ships');

  if (getAlignment % 2 !== 0) {
    ships.forEach((ship) => {
      // eslint-disable-next-line no-param-reassign
      ship.style.flexDirection = 'column';
    });
    shipsContainer.style.flexDirection = 'row';
  } else {
    ships.forEach((ship) => {
      // eslint-disable-next-line no-param-reassign
      ship.style.flexDirection = 'row';
    });
    shipsContainer.style.flexDirection = 'column';
  }
}

const getAlignment = (() => {
  let alignment = 0;

  return () => alignment++;
})();

function startGame() {
  console.log('test');
}

function addButtonEventListeners() {
  const alignmentButton = document.querySelector('.alignment-button');
  alignmentButton.addEventListener('click', () => {
    changeAlignment(getAlignment());
  });

  const startGameButton = document.querySelector('.start-game-button');
  startGameButton.addEventListener('click', () => {
    startGame();
  });
}

function renderCell(x, y) {
  return `<div class="grid-square" data-x='${x}' data-y='${y}'></div>`;
}

function renderBoard(player) {
  const gameboard = document.querySelector(`.${player}-gameboard`);

  for (let i = 0; i < 100; i++) {
    const x = i % 10;
    const y = Math.floor(i / 10);
    gameboard.innerHTML += renderCell(x, y);
  }
}

function readyCheck() {
  if (!document.querySelector('.ships').innerHTML.includes('div')) {
    document.querySelector('.ships-container').style.display = 'none';
    document.querySelector('.start-game-container').style.display = 'flex';
  }
}

function placeShip(x, y, draggedShip, newShip, alignment) {
  if (!players.user.gameboard.placeShip(x, y, newShip, alignment)) return;

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (players.user.gameboard.board[i][j].ship.type === draggedShip.id) {
        document.querySelector(
          `[data-x="${i}"][data-y="${j}"]`
        ).style.background = getComputedStyle(draggedShip).backgroundColor;
      }
    }
  }

  draggedShip.remove();

  readyCheck();
}

function getShipType(x, y, ship, alignment) {
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

  placeShip(x, y, ship, new Ship(ship.id, length), alignment);
}

function showUnavailCells(x, y) {
  document
    .querySelector(`[data-x="${x}"][data-y="${y}"]`)
    .classList.add('placement-unavailable');
}

function loadGame() {
  renderBoard(players.user.name);
  renderBoard(players.computer.name);
  addButtonEventListeners();
  addDragAndDropEventListeners();
}

export { loadGame, getShipType, showUnavailCells };
