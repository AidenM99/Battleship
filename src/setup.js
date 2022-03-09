import addDragAndDropEventListeners from './dragAndDrop';
import Ship from './factories/ship';
import { players, attack, init } from './game';

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
  const computerGameboard = document.querySelector('.computer-gameboard');
  computerGameboard.style.display = 'grid';

  const startGameContainer = document.querySelector('.start-game-container');
  startGameContainer.style.display = 'none';

  init();
}

function addEventListeners() {
  const alignmentButton = document.querySelector('.alignment-button');
  alignmentButton.addEventListener('click', () => {
    changeAlignment(getAlignment());
  });

  const startGameButton = document.querySelector('.start-game-button');
  startGameButton.addEventListener('click', () => {
    startGame();
  });

  const computerGridSquare = document.querySelectorAll('.computer-square');
  computerGridSquare.forEach((square) => {
    square.addEventListener('click', (e) => {
      attack(players.computer.gameboard, e);
    });
  });

  addDragAndDropEventListeners();
}

function renderCell(x, y, player) {
  return `<div class="${player}-square grid-square" data-x='${x}' data-y='${y}'></div>`;
}

function renderBoard(player) {
  const gameboard = document.querySelector(`.${player}-gameboard`);

  for (let i = 0; i < 100; i++) {
    const x = i % 10;
    const y = Math.floor(i / 10);
    gameboard.innerHTML += renderCell(x, y, player);
  }
}

function readyCheck() {
  if (!document.querySelector('.ships').innerHTML.includes('div')) {
    document.querySelector('.ships-container').style.display = 'none';
    document.querySelector('.start-game-container').style.display = 'flex';
  }
}

function placeShip(x, y, draggedShip, alignment, newShip) {
  if (!players.user.gameboard.placeShip(x, y, alignment, newShip)) return;

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (players.user.gameboard.board[i][j].ship.type === draggedShip.id) {
        document.querySelector(
          `[data-x="${i}"][data-y="${j}"]`
        ).style.background = getComputedStyle(draggedShip).backgroundColor;
      }
      if (players.computer.gameboard.board[i][j].ship instanceof Ship) {
        document.querySelectorAll(
          `[data-x="${i}"][data-y="${j}"]`
        )[1].style.backgroundColor = 'red';
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

  placeShip(x, y, ship, alignment, new Ship(length, ship.id));
}

function showUnavailCells(x, y) {
  document
    .querySelector(`[data-x="${x}"][data-y="${y}"]`)
    .classList.add('placement-unavailable');
}

function removeUnavailCells() {
  const gridSquares = document.querySelectorAll('.grid-square');
  gridSquares.forEach((square) => {
    square.classList.remove('placement-unavailable');
  });
}

function registerHit(x, y, player) {
  if (player === 'user') {
    document.querySelectorAll(
      `[data-x="${x}"][data-y="${y}"]`
    )[1].style.backgroundColor = 'purple';
  } else {
    document.querySelectorAll(
      `[data-x="${x}"][data-y="${y}"]`
    )[0].style.backgroundColor = 'purple';
  }
}

function loadGame() {
  renderBoard(players.user.name);
  renderBoard(players.computer.name);
  players.computer.gameboard.placeShipsRandomly();
  removeUnavailCells();
  addEventListeners();
}

export {
  loadGame,
  getShipType,
  registerHit,
  showUnavailCells,
  removeUnavailCells,
};
