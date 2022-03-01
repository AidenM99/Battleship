export default function createGrid() {
  for (let i = 0; i < 100; i++) {
    const userGameboard = document.querySelector('.user-gameboard');
    const gameboardSquare = document.createElement('div');
    gameboardSquare.classList.add('grid-lines');
    gameboardSquare.dataset.x = i % 10;
    gameboardSquare.dataset.y = Math.floor(i / 10);
    userGameboard.appendChild(gameboardSquare);
  }

  for (let i = 0; i < 100; i++) {
    const computerGameboard = document.querySelector('.computer-gameboard');
    const gameboardSquare = document.createElement('div');
    gameboardSquare.classList.add('grid-lines');
    gameboardSquare.dataset.x = i % 10;
    gameboardSquare.dataset.y = Math.floor(i / 10);
    computerGameboard.appendChild(gameboardSquare);
  }
}
