const hamburger = document.getElementById('hamburger');
const dynamicNav = document.querySelector('.dynamic-nav-content');
const navHeader = document.querySelector('.nav-header');


hamburger.addEventListener('click', () => {
    if(dynamicNav.style.display === 'flex'){
        dynamicNav.style.display = 'none';
    }else{
        dynamicNav.style.display = 'flex';
        navHeader.style.backgroundColor = '#b3b3b3';
    }
});

window.addEventListener('resize', () => {
    if(window.innerWidth > 700){
        dynamicNav.style.display = 'none';
        navHeader.style.backgroundColor = 'white';
    }
})