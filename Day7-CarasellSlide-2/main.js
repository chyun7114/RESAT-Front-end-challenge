const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const slideImage = document.querySelector('.image-wrapper');
const slideNum = document.querySelector('.slide-number');

// 이미지 배열 선언
const imageArray = [
    "1.png",
    "2.png",
    "3.png",
    "4.png",
    "5.png"
];

let maxArray = imageArray.length;
let nowArray = 0;

function setSlide(){
    slideImage.src = `${imageArray[nowArray]}`;
    slideNum.textContent = `${nowArray + 1} / ${maxArray}`
}

function changeSlide(direction) {
    slideImage.style.transition = 'none';
    slideImage.style.transform = direction === 'next' ? 'translateX(100%)' : 'translateX(-100%)';
    
    setTimeout(() => {
        if(direction === 'next'){
            nowArray = (nowArray + 1) % maxArray;
        }
        else if(direction === 'prev'){
            nowArray = (nowArray === 0) ? maxArray - 1 : nowArray - 1;
        }
        slideImage.style.transition = 'transform 0.5s ease-in-out';
        setSlide();
        slideImage.style.transform = 'translateX(0)';
    }, 50);
}

document.addEventListener('DOMContentLoaded', () => {
    setSlide();
    setInterval(() => {
        changeSlide('next');
    }, 2000);
});

prevBtn.addEventListener('click', () => {
    changeSlide('prev');
    clearInterval()
});

nextBtn.addEventListener('click', () => {
    changeSlide('next');
    clearInterval() 
})
