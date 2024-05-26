document.addEventListener('DOMContentLoaded', function () {
    // 모든 bullet 요소를 가져옵니다.
    const bullets = document.querySelectorAll('.bullet-swiper');

    bullets.forEach(bullet => {
        // 각 bullet에 클릭 이벤트 리스너를 추가합니다.
        bullet.addEventListener('click', function () {
            // 모든 bullet에서 active 클래스를 제거합니다.
            bullets.forEach(b => b.classList.remove('bullet-swiper-clicked'));

            // 클릭된 bullet에 active 클래스를 추가합니다.
            this.classList.add('bullet-swiper-clicked');
        });
    });
});