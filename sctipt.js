const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

let buttonGetSignal = document.getElementById("get-signal");

let loadingSignal = document.getElementById("loading");
let screenStart = document.getElementById("screenStart");
let signal = document.getElementById("img-signal");


// Источники звука
const starSoundEffect = document.getElementById('starSoundEffect');
starSoundEffect.volume = 0.5;

const clickSoundEffect = document.getElementById('clickSoundEffect');
clickSoundEffect.volume = 0.2;

// Полное открытие окна WebApp
let tg = window.Telegram.WebApp;
tg.expand();

let starsCount;
let minesCount = 5;
const minMinesCount = 1;
const maxMinesCount = 7;

plusButton = document.getElementById("plus");
minusButton = document.getElementById("minus");
minesCountDisplay = document.getElementById("minesCountDisplay");

minesCountDisplay.innerText = minesCount;

minusButton.onclick = function() {
  clickSoundEffect.play();
  minesCount = clamp(minesCount-2, minMinesCount, maxMinesCount);
  minesCountDisplay.innerText = minesCount;
}

plusButton.onclick = function() {
  clickSoundEffect.play();
  minesCount = clamp(minesCount+2, minMinesCount, maxMinesCount);
  minesCountDisplay.innerText = minesCount;
}


buttonGetSignal.onclick = function() {
  buttonGetSignal.disabled = true;

  // Заменяем звёзды на клетки
  const stars = document.querySelectorAll('.star');
  stars.forEach((star) => {
    star.classList.remove('star', 'visible', 'hidden');
    star.classList.add('cell');
  })

  // Считаем, сколько должно быть звёзд в зависимости от ловушек
  if (minesCount === 7) { starsCount = 3; }
  else if (minesCount === 5) { starsCount = 4; }
  else if (minesCount === 3) { starsCount = 5; }
  else { starsCount = 6; }
  
  const cells = document.querySelectorAll('.cell');
  const duration = 1000; // Время между заменой клетки на звёздочку

  let selectedCells = Array.from(cells);
  for (let i = selectedCells.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [selectedCells[i], selectedCells[j]] = [selectedCells[j], selectedCells[i]];
  }
  selectedCells = selectedCells.slice(0, starsCount);

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

  starSoundEffect.pause();
  starSoundEffect.currentTime = 0;

  setTimeout(() => {
    buttonGetSignal.disabled = false;
  }, duration * starsCount + 800); // Ожидание полного завершения всех анимаций + 1 секунда
}

