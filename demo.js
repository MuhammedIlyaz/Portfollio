//Navbars link
const navLinks = document.querySelectorAll('header nav a');
const sections = document.querySelectorAll('section');
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('header nav');

menuIcon.addEventListener('click',() => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active')
});

const activePage = () => {
    const header = document.querySelector('header')


    header.classList.remove('active');
    setTimeout(()=>{
        header.classList.remove('active')
    }, 1100);


    navLinks.forEach(link => {
        link.classList.remove('active');
    });


    sections.forEach(section => {
        section.classList.remove('active');
    });

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

navLinks.forEach((link,idx) => {
    link.addEventListener('click', () =>{
        if (!link.classList.contains('active')) {
            activePage();

            link.classList.add('active');
        }
    });
});







//Resume section
const resumeBtns = document.querySelectorAll('.resume-btn');
const resumeDetails = document.querySelectorAll('.resume-detail');

resumeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.getAttribute('data-target');
    const targetDetail = document.getElementById(targetId);

    // Reset all
    resumeBtns.forEach(b => b.classList.remove('active'));
    resumeDetails.forEach(d => d.classList.remove('active'));

    // Activate clicked button + detail
    btn.classList.add('active');
    if (targetDetail) {
      targetDetail.classList.add('active');
    }
  });
});





// ================= PORTFOLIO =================

const arrowRight = document.querySelector(
    '.portfolio .navigation .arrow-right'
);

const arrowLeft = document.querySelector(
    '.portfolio .navigation .arrow-left'
);

const imgSlide = document.querySelector(
    '.portfolio .img-slide'
);

const portfolioDetails = document.querySelectorAll(
    '.portfolio .portfollio-detail'
);

let index = 0;


// Update Portfolio
function updatePortfolio() {

    console.log("Current index:", index);

    // Move image
    imgSlide.style.transform =
        `translateX(calc(-${index * 100}% - ${index * 2}rem))`;


    // Details
    portfolioDetails.forEach(detail => {
        detail.classList.remove('active');
    });

    portfolioDetails[index].classList.add('active');


    // LEFT ARROW
    if (index === 0) {
        arrowLeft.classList.add('disabled');
    } else {
        arrowLeft.classList.remove('disabled');
    }


    // PROJECT 2
    if (index === 1) {

        arrowRight.innerHTML =
            `Explore <i class='bx bx-right-arrow-alt'></i>`;

        arrowRight.classList.add('explore-btn-mode');

    }

    // PROJECT 1
    else {

        arrowRight.innerHTML =
            `<i class='bx bx-chevron-right'></i>`;

        arrowRight.classList.remove('explore-btn-mode');

    }
}


// RIGHT BUTTON
arrowRight.addEventListener('click', () => {

    console.log("Right clicked");

    // Project 1 → Project 2
    if (index === 0) {

        index = 1;

        updatePortfolio();

    }

    // Explore
    else {

        window.location.href = "projects.html";

    }

});


// LEFT BUTTON
arrowLeft.addEventListener('click', () => {

    console.log("Left clicked");

    if (index === 1) {

        index = 0;

        updatePortfolio();

    }

});


// Start
updatePortfolio();