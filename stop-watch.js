let startTime, elapsedTime = 0, timerInterval;
let isRunning = false;

const display = document.getElementById('display');
const startPauseButton = document.getElementById('startPauseButton');
const resetButton = document.getElementById('resetButton');
const lapButton = document.getElementById('lapButton');
const laps = document.getElementById('laps');

function formatTime(ms) {
    const date = new Date(ms);
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(Math.floor(date.getUTCMilliseconds() / 10)).padStart(2, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
}

function updateDisplay() {
    display.textContent = formatTime(elapsedTime + Date.now() - startTime);
}

function startPause() {
    if (isRunning) {
        clearInterval(timerInterval);
        elapsedTime += Date.now() - startTime;
        startPauseButton.textContent = 'Start';
    } else {
        startTime = Date.now();
        timerInterval = setInterval(updateDisplay, 10);
        startPauseButton.textContent = 'Pause';
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    isRunning = false;
    display.textContent = "00:00:00.00";
    startPauseButton.textContent = 'Start';
    laps.innerHTML = '';
}

function recordLap() {
    if (isRunning) {
        const lapTime = formatTime(elapsedTime + Date.now() - startTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${laps.children.length + 1}: ${lapTime}`;
        laps.appendChild(lapItem);
    }
}

startPauseButton.addEventListener('click', startPause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', recordLap);
