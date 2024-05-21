let timerText = document.getElementById('timer-text');
let startButton = document.getElementById('start-button');
let stopButton = document.getElementById('stop-button');
let resetButton = document.getElementById('reset-button');

startButton.addEventListener('click', () => {
    timerText.innerHTML = '01:00:01'
});