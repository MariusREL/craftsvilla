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

function imagetransition(){
    let images = document.querySelectorAll(".background-image-header")
    let currentIndex = 0;

    for (let i = 0; i < images.length; i++) {
        images[i].style.opacity = i === 0 ? 1 : 0;
    }
    setInterval(() => {
        images[currentIndex].style.opacity = 0
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].style.opacity = 1;
    }, 5000);
}
imagetransition();