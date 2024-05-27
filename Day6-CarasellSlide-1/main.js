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
        slideImage.style.transition = 'transform 0.5s ease-in-out';
        setSlide();
        slideImage.style.transform = 'translateX(0)';
    }, 50);
}

document.addEventListener('DOMContentLoaded', () => {
    setSlide();
});

prevBtn.addEventListener('click', () => {
    if(nowArray == 0){
        nowArray = maxArray - 1;
    }else{
        nowArray--;
    }

    changeSlide('prev');
});

nextBtn.addEventListener('click', () => {
    if(nowArray >= maxArray - 1){
        nowArray = 0;
    }else{
        nowArray++;
    }

    changeSlide('next');
})
