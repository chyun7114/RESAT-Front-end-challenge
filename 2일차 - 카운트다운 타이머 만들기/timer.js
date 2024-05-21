let timerText = document.getElementById('timer');
let startButton = document.getElementById('start-button');
let stopButton = document.getElementById('stop-button');
let resetButton = document.getElementById('reset-button');

let interval;
let [hours, minutes, seconds] = [0, 0, 0];
let inputDisplayStyle = document.getElementById('input-text').style.display;

startButton.addEventListener('click', () => {
    hours = parseInt(document.getElementById('hour').value) || 0;
    minutes = parseInt(document.getElementById('minute').value) || 0;
    seconds = parseInt(document.getElementById('second').value) || 0;

    document.getElementById('input-text').style.display = 'none';

    setTimerTextFormat(hours, minutes, seconds); 

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

    if(inputDisplayStyle !== document.getElementById('input-text').style.display){
        document.getElementById('input-text').style.display = inputDisplayStyle;
    }
});

function setTimerText(){
    if(hours === 0 && minutes === 0 && seconds === 0){
        alert('timer is end!!!!');
        clearInterval(interval);
        timerText.innerText = '00:00:00';
        document.getElementById('input-text').style.display = inputDisplayStyle;
        return;
    }

    if(seconds < 0){
        if(minutes === 0){
            hours--;
            minutes = 59;
            seconds = 59;
        }
        else{
            seconds = 59;
            minutes--;
        }
    }
    else{
        seconds--;
    }

    setTimerTextFormat(hours, minutes, seconds);   
}

function setTimerTextFormat(hours , minutes, seconds){
    let hourText = hours >= 10 ? hours : '0' + hours;
    let minuteText = minutes >= 10 ? minutes : '0' + minutes;
    let secondText = seconds >= 10 ? seconds : '0' + seconds;

    let text = hourText + ':' + minuteText + ':' + secondText;
    timerText.innerText = text;
}