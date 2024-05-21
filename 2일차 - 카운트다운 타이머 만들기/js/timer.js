let timerText = document.getElementById('timer');
let startButton = document.getElementById('start-button');
let stopButton = document.getElementById('stop-button');
let resetButton = document.getElementById('reset-button');

let interval;
let hours = 0;
let minutes = 0;
let seconds = 0;


startButton.addEventListener('click', () => {
    hours = parseInt(document.getElementById('hour').value) || 0;
    minutes = parseInt(document.getElementById('minute').value) || 0;
    seconds = parseInt(document.getElementById('second').value) || 0;

    if(interval !== null)
        clearInterval(interval);
    interval = setInterval(setTimerText, 1000);
});

stopButton.addEventListener('click', () => {
    if(interval !== null)
        clearInterval(interval);
});

resetButton.addEventListener('click', () =>{
    seconds = 0;
    minutes = 0;
    hours = 0;

    timerText.innerText = '00:00:00';

    if(interval !== null)
        clearInterval(interval);
});

function setTimerText(){
    if(hours === 0 && minutes === 0 && seconds === 0){
        alert('timer is end!!!!');
        clearInterval(interval);
    }

    if(seconds !== 0)
        seconds--;       // 1초씩 감소
    // 시 분 초 포맷 변경
    if(hours <= 0){
        
    }

    let hourText = hours >= 10 ? hours : '0' + hours;
    let minuteText = minutes >= 10 ? minutes : '0' + minutes;
    let secondText = seconds >= 10 ? seconds : '0' + seconds;

    let text = hourText + ':' + minuteText + ':' + secondText;
    timerText.innerText = text;
}