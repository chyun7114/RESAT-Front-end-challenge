const description = [
    'CRM 마케팅<br>이해하기',
    '구글 스프레드시트로<br> 마케팅 데이터 분석하기',
    '검색 광고(SA)<br>이해하기',
    '디스플레이 광고<br>이해하기'
]

const bannerDescription = document.getElementById('banner-slide-description');
const bannerSlide = document.getElementById('banner-slide')

let currentIndex = 0;
let interval = 3000;
let slideInterval;

document.addEventListener('DOMContentLoaded', function () {
    // 모든 bullet 요소가져오기
    const bullets = document.querySelectorAll('.bullet-swiper');

    bullets[currentIndex].classList.add('bullet-swiper-clicked');
    bannerDescription.innerHTML = description[currentIndex];

    bullets.forEach((bullet, index) => bullet.addEventListener('click', function() {
        const direction = index > currentIndex ? 'right' : 'left';
        currentIndex = index;
        bulletSlideSet(bullets, bullet, direction);
    }));

    slideInterval = setInterval(nextSlide, interval);
});

function nextSlide() {
    const bullets = document.querySelectorAll('.bullet-swiper');
    const nextIndex = (currentIndex + 1) % bullets.length;
    const direction = nextIndex > currentIndex ? 'right' : 'left';
    currentIndex = nextIndex;
    bulletSlideSet(bullets, bullets[currentIndex], direction);
}

function bulletSlideSet(bullets, bullet, direction){
    // 모든 bullet에서 active 클래스를 제거.
    bullets.forEach(bullet => bullet.classList.remove('bullet-swiper-clicked'));

    // 클릭된 bullet에 active 클래스 추가
    bullet.classList.add('bullet-swiper-clicked');

    // 애니메이션 설정
    bannerSlide.classList.remove('slide-left', 'slide-right');
    bannerSlide.classList.add((direction === 'left') ? 'slide-left' : 'slide-right');

    // 현재 인덱스 설정
    const index = Array.from(bullets).indexOf(bullet);
    bannerDescription.innerHTML = description[index];

    // 애니메이션이 끝난 후 클래스를 제거
    setTimeout(() => {
        bannerSlide.classList.remove('slide-left', 'slide-right');
    }, 500);

    // 인터벌을 재설정하여 슬라이드가 자동으로 이동하도록 유지
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, interval);
}