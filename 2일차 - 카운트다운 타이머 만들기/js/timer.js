let timerText = document.getElementById('timer-text');
let startButton = document.getElementById('start-button');
let stopButton = document.getElementById('stop-button');
let resetButton = document.getElementById('reset-button');

let interval;
let hour = 0;
let minute = 0;
let second = 0;


startButton.addEventListener('click', () => {
    if(interval !== null)
        clearInterval(interval);

    interval = setInterval(setTimerText, 1000);
});

stopButton.addEventListener('click', () => {
    if(interval !== null)
        clearInterval(interval);
});

resetButton.addEventListener('click', () =>{
    second = 0;
    minute = 0;
    hour = 0;

    timerText.innerText = '00:00:00';

    if(interval !== null)
        clearInterval(interval);
});

function setTimerText(){
    second++;       // 1초씩 증가

    // 시 분 초 포맷 변경
    if(second === 60){
        second = 0;
        minute++;
    }
    if(minute === 60){
        minute = 0;
        hour++;
    }

    let hourText = hour >= 10 ? hour : '0' + hour;
    let minuteText = minute >= 10 ? minute : '0' + minute;
    let secondText = second >= 10 ? second : '0' + second;

    let text = hourText + ':' + minuteText + ':' + secondText;
    timerText.innerText = text;
}