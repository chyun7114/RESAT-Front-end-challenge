const hamburger = document.getElementById('hamburger');
const dynamicNav = document.querySelector('.dynamic-nav-content');


hamburger.addEventListener('click', () => {
    if(dynamicNav.style.display === 'flex'){
        dynamicNav.style.display = 'none';
    }else{
        dynamicNav.style.display = 'flex';
    }
});

window.addEventListener('resize', () => {
    if(window.innerWidth > 700){
        dynamicNav.style.display = 'none';
    }
})