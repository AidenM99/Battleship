import { getShipType } from './setup';

let componentIndex;

function setComponentIndex(e) {
  componentIndex = e.target.dataset.index;
}

function dragStartHandler(e) {
  setTimeout(() => {
    e.target.style.display = 'none';
  }, 0);

  e.dataTransfer.setData('text/plain', e.target.id);
}

function dragEndHandler(e) {
  e.target.style.display = 'flex';
}

function dragOverHandler(e) {
  e.preventDefault();
}

function dropHandler(e) {
  const ship = document.getElementById(e.dataTransfer.getData('text/plain'));

  const x = parseInt(e.target.dataset.x, 10);
  const y = parseInt(e.target.dataset.y, 10) - componentIndex;

  getShipType(x, y, ship);
}

export default function addDragAndDropEventListeners() {
  const ships = document.querySelectorAll('.ship');
  ships.forEach((ship) => {
    ship.addEventListener('mousedown', setComponentIndex);
    ship.addEventListener('dragstart', dragStartHandler);
    ship.addEventListener('dragend', dragEndHandler);
  });

  const cells = document.querySelectorAll('.grid-square');
  cells.forEach((cell) => {
    cell.addEventListener('dragover', dragOverHandler);
    cell.addEventListener('drop', dropHandler);
  });
}
