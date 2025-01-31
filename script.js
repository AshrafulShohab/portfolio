const setBodyPadding = () => {
  const bottomMenu = document.querySelector('.bottom-menu');
if (bottomMenu) {
      const menuHeight = bottomMenu.offsetHeight;
    document.body.style.paddingBottom = `${menuHeight}px`;
 }
};
setBodyPadding(); // Set initial padding
window.addEventListener('resize', setBodyPadding); 

// Create and append circles to the body
const circleCount = 5;
const circles = [];

for (let i = 0; i < circleCount; i++) {
  const circle = document.createElement("div");
  circle.classList.add("circle");

  // Random initial size and position
  const size = Math.random() * 60 + 40; // Sizes between 40px and 100px
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.position = "fixed"; // Fix circles to the viewport
  circle.style.top = `${Math.random() * 100}vh`;
  circle.style.left = `${Math.random() * 100}vw`;

  document.body.appendChild(circle);
  circles.push({
    element: circle,
    size,
    speedX: (Math.random() - 0.5) * 2, // Speed in x direction (-1 to 1)
    speedY: (Math.random() - 0.5) * 2, // Speed in y direction (-1 to 1)
  });
}

// Animate the circles
function animateCircles() {
  circles.forEach((circle) => {
    const rect = circle.element.getBoundingClientRect();

    // Update position based on speed
    let newX = rect.left + circle.speedX;
    let newY = rect.top + circle.speedY;

    // Bounce off walls
    if (newX < 0 || newX + circle.size > window.innerWidth) {
      circle.speedX *= -1;
    }
    if (newY < 0 || newY + circle.size > window.innerHeight) {
      circle.speedY *= -1;
    }

    // Apply the new position
    circle.element.style.left = `${newX}px`;
    circle.element.style.top = `${newY}px`;
  });

  requestAnimationFrame(animateCircles); // Continue animation
}

// Start animation
animateCircles();

document.addEventListener('DOMContentLoaded', () => {
  const svgElement = document.querySelector('.floating-svg');
  if (svgElement) {
       const randomTop = Math.random();
       const randomLeft = Math.random();
       svgElement.style.setProperty('--random-top', randomTop);
       svgElement.style.setProperty('--random-left', randomLeft);
  }
});
// Object to store the current slide for each tab
const tabCurrentSlides = {};

function showSlide(tabId, slideIndex) {
    const slider = document.querySelector(`#${tabId} .slider`);
    const slides = document.querySelectorAll(`#${tabId} .slide`);
  //Get the tab's current slide, create one if it doesn't exist
    let currentSlide = tabCurrentSlides[tabId] || 0;
    if (slideIndex < 0) {
        currentSlide = slides.length - 1;
    } else if (slideIndex >= slides.length) {
        currentSlide = 0;
    } else {
        currentSlide = slideIndex;
    }
    //Set the current slide for that tab
    tabCurrentSlides[tabId] = currentSlide;
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    slides[currentSlide].classList.add('active');
}

function nextSlide(tabId) {
    const current = tabCurrentSlides[tabId] || 0;
    showSlide(tabId, current + 1);
}

function prevSlide(tabId) {
    const current = tabCurrentSlides[tabId] || 0;
    showSlide(tabId, current - 1);
}
//Initialize the first slide of all tabs
const tabContents = document.querySelectorAll('.tab');
tabContents.forEach(tab => {
    const tabId = tab.getAttribute('id');
     showSlide(tabId, 0);
});



// Smooth scrolling implementation
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
// Tab functionality
const tabButtons = document.querySelectorAll('.tab-button');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        //Remove the active status from the button and tab
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        //Add the active status to the current button and tab
        button.classList.add('active');
        const tabId = button.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
          // Update current slide
         showSlide(tabId, 0);

    });
});

const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('nav');

navToggle.addEventListener('click', () => {
  nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
});