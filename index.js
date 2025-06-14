const navbar = document.querySelector('.navbar');
const headerImg = document.querySelector('.header-img');
const logo = document.querySelector("#logo")

document.addEventListener('scroll', () => {
    const headerBottom = headerImg.offsetTop + headerImg.offsetHeight;
    
    if (window.scrollY >= headerBottom) {
        navbar.classList.add('nav-activated');
        logo.setAttribute("src", "./img/CraftsvillaB.png")

    } else {
        navbar.classList.remove('nav-activated')
        logo.setAttribute("src", "./img/CraftsvillaW.png");
    }
});