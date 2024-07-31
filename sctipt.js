let buttonGetSignal = document.getElementById("get-signal");
let minesCount = 5;

let loadingSignal = document.getElementById("loading");
let screenStart = document.getElementById("screenStart");
let signal = document.getElementById("img-signal");

const starSoundEffect = document.getElementById('starSoundEffect');
starSoundEffect.volume = 0.4;

const menuButton = document.getElementById('menuButton')


menuButton.onclick = function() {
  const stars = document.querySelectorAll('.star');
  stars.forEach((star) => {
    star.classList.remove('star', 'visible', 'hidden');
    star.classList.add('cell');
  })
}


buttonGetSignal.onclick = function() {
  buttonGetSignal.disabled = true;
  
  const cells = document.querySelectorAll('.cell');
  const duration = 1000; // Duration between each transformation in milliseconds

  let selectedCells = Array.from(cells);
  for (let i = selectedCells.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [selectedCells[i], selectedCells[j]] = [selectedCells[j], selectedCells[i]];
  }
  selectedCells = selectedCells.slice(0, minesCount);

  function transformNextCell(index) {
    if (index < selectedCells.length) {
      const cell = selectedCells[index];
      
      cell.classList.add('hidden');
      cell.addEventListener('transitionend', function onTransitionEnd() {
        cell.classList.remove('cell', 'hidden');
        cell.classList.add('star');

        void cell.offsetWidth;
        starSoundEffect.play();

        cell.classList.add('visible');
        cell.removeEventListener('transitionend', onTransitionEnd);
      }, { once: true });

      setTimeout(() => transformNextCell(index + 1), duration);
    }
  }

  transformNextCell(0);

  setTimeout(() => {
    buttonGetSignal.disabled = false;
  }, duration * minesCount + 1000); // Ожидание полного завершения всех анимаций + 1 секунда
}

