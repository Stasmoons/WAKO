const clickSoundEffect = document.getElementById('clickSoundEffect');
clickSoundEffect.volume = 0.2;

const restartButton = document.getElementById("restartButton");
const playButton = document.getElementById("playButton");
const signalsField = document.getElementById("signalsField");

let cellsPerRow = 4;
let currentRowId = 0;
let rowsCount = document.getElementsByClassName("signals-row").length;


restartButton.onclick = function() {
    clickSoundEffect.play();

    currentRowId = 0;
    const signalRows = document.querySelectorAll(".footprint");

    signalRows.forEach(row => {
        row.classList.remove("footprint");
    });
}


playButton.onclick = function() {
    clickSoundEffect.play();

    const signalRows = document.getElementsByClassName("signals-row");

    if (currentRowId >= rowsCount) {
        signalRows[0].remove();
        currentRowId = rowsCount-1;
        
        // Создаём новый ряд ячеек
        const newRow = document.createElement("div");
        newRow.classList.add("signals-row", "fade-in-up");
        
        // Добавляем ячейки в созданный ряд
        for (let i = 0; i < cellsPerRow; i++) {
            const newCell = document.createElement("div");
            newCell.classList.add("signal-cell");
            newRow.appendChild(newCell);
        }

        // Добавляем ряд в поле
        signalsField.appendChild(newRow);
    }

    const currentRow = signalRows[currentRowId]
    const cellToMarkId = Math.floor(Math.random() * (cellsPerRow));

    const cells = currentRow.getElementsByClassName("signal-cell");
    cellToMark = cells[cellToMarkId];
    cellToMark.classList.add("footprint");

    currentRowId++;
}
