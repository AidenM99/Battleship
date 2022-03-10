import addDragAndDropEventListeners from './dragAndDrop';
import Ship from './factories/ship';
import { players, attack, init } from './game';
import 'animate.css';

function changeAlignment(getAlignment) {
  const ships = document.querySelectorAll('.ship');
  const shipsContainer = document.querySelector('.ships');

  if (getAlignment % 2 !== 0) {
    ships.forEach((ship) => {
      ship.style.flexDirection = 'column';
    });
    shipsContainer.style.flexDirection = 'row';
  } else {
    ships.forEach((ship) => {
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
  computerGameboard.classList.add('animate__animated', 'animate__zoomIn');
  computerGameboard.style.display = 'grid';

  const startGameContainer = document.querySelector('.start-game-container');
  startGameContainer.style.display = 'none';

  init();
}

function replenishShipComponents(ship, length) {
  for (let i = 0; i < length; i++) {
    ship.innerHTML += `<div data-index='${i}'</div>`;
  }
}

function replenishFleet() {
  const ships = document.querySelector('.ships');

  const carrier = document.createElement('div');
  carrier.id = 'carrier';
  carrier.classList.add('ship');
  carrier.setAttribute('draggable', 'true');

  const battleship = document.createElement('div');
  battleship.id = 'battleship';
  battleship.classList.add('ship');
  battleship.setAttribute('draggable', 'true');

  const submarine = document.createElement('div');
  submarine.id = 'submarine';
  submarine.classList.add('ship');
  submarine.setAttribute('draggable', 'true');

  const cruiser = document.createElement('div');
  cruiser.id = 'cruiser';
  cruiser.classList.add('ship');
  cruiser.setAttribute('draggable', 'true');

  const destroyer = document.createElement('div');
  destroyer.id = 'destroyer';
  destroyer.classList.add('ship');
  destroyer.setAttribute('draggable', 'true');

  replenishShipComponents(carrier, 5);
  replenishShipComponents(battleship, 4);
  replenishShipComponents(submarine, 3);
  replenishShipComponents(cruiser, 3);
  replenishShipComponents(destroyer, 2);

  ships.appendChild(carrier);
  ships.appendChild(battleship);
  ships.appendChild(cruiser);
  ships.appendChild(submarine);
  ships.appendChild(destroyer);
}

function handleUIElements() {
  const gameOverScreen = document.querySelector('.gameover-modal');
  gameOverScreen.style.display = 'none';

  const computerGameboard = document.querySelector('.computer-gameboard');
  computerGameboard.style.display = 'none';

  const shipsContainer = document.querySelector('.ships-container');
  shipsContainer.style.display = 'flex';
}

function addGridEventListeners() {
  const computerGridSquare = document.querySelectorAll('.computer-square');
  computerGridSquare.forEach((square) => {
    square.addEventListener('click', (e) => {
      attack(players.computer.gameboard, e);
    });
  });
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

  const playAgainButton = document.querySelector('.play-again-button');
  playAgainButton.addEventListener('click', () => {
    restartGame();
  });
}

function renderCell(x, y, player) {
  return `<div class="${player}-square grid-square" data-x='${x}' data-y='${y}'></div>`;
}

function renderBoard(player) {
  const gameboard = document.querySelector(`.${player}-gameboard`);
  gameboard.innerHTML = '';

  for (let i = 0; i < 100; i++) {
    const x = i % 10;
    const y = Math.floor(i / 10);
    gameboard.innerHTML += renderCell(x, y, player);
  }
}

function readyCheck() {
  if (!document.querySelector('.ships').innerHTML.includes('div')) {
    const shipsContainer = document.querySelector('.ships-container');
    shipsContainer.style.display = 'none';

    const startContainer = document.querySelector('.start-game-container');
    startContainer.style.display = 'flex';
    startContainer.classList.add('animate__animated', 'animate__zoomIn');
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
        )[1].style.background = 'purple';
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

function registerHit(x, y, player, gameboard) {
  const gameboards = document.querySelectorAll(
    `[data-x="${x}"][data-y="${y}"]`
  );

  if (gameboard.isShip(x, y)) {
    if (player === 'user') {
      gameboards[1].innerHTML = '<i class="fa-solid fa-fire"></i>';
    } else {
      gameboards[0].innerHTML = '<i class="fa-solid fa-fire"></i>';
    }
  } else if (player === 'user') {
    gameboards[1].classList.add('missed');
  } else {
    gameboards[0].classList.add('missed');
  }
}

function displayGameOver() {
  const gameOverScreen = document.querySelector('.gameover-modal');
  gameOverScreen.style.display = 'flex';

  const modalContent = document.querySelector('.modal-content');
  modalContent.classList.add('animate__animated', 'animate__zoomIn');

  const winnerText = document.querySelector('.winner-announcement');
  if (players.user.getTurn()) {
    winnerText.textContent = 'VICTORY!';
  } else {
    winnerText.textContent = 'DEFEAT!';
  }
}

function loadGame() {
  renderBoard(players.user.name);
  renderBoard(players.computer.name);
  players.computer.gameboard.placeShipsRandomly();
  removeUnavailCells();
  addGridEventListeners();
  addDragAndDropEventListeners();
}

function restartGame() {
  players.computer.gameboard.resetBoard();
  players.user.gameboard.resetBoard();
  players.computer.isTurn = false;
  players.user.isTurn = false;
  handleUIElements();
  replenishFleet();
  changeAlignment(getAlignment());
  loadGame();
}

export {
  loadGame,
  registerHit,
  getShipType,
  displayGameOver,
  showUnavailCells,
  removeUnavailCells,
  addButtonEventListeners,
};
