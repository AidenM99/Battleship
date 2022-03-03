import { placeShip } from './board';

let componentIndex;

function setComponentIndex(e) {
  componentIndex = e.target.dataset.index;
}

function dragStartHandler(e) {
  setTimeout(() => {
    e.target.classList.add('hide');
  }, 0);

  e.dataTransfer.setData('text/plain', e.target.id);
}

function dragEndHandler(e) {
  e.target.classList.remove('hide');
}

function dragOverHandler(e) {
  e.preventDefault();
}

function dropHandler(e) {
  const ship = document.getElementById(e.dataTransfer.getData('text/plain'));

  const x = parseInt(e.target.dataset.x, 10);
  const y = parseInt(e.target.dataset.y, 10) - componentIndex;

  placeShip(x, y, ship);
}

const ships = document.querySelectorAll('.ship');
ships.forEach((ship) => {
  ship.addEventListener('mousedown', setComponentIndex);
  ship.addEventListener('dragstart', dragStartHandler);
  ship.addEventListener('dragend', dragEndHandler);
});

export { dropHandler, dragOverHandler };
