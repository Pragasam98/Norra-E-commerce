let currentSlide = 0;
let slides = document.querySelectorAll(".product-image-box");
let totalSlides = slides.length;
let slideInterval;

function moveSlide(step) {
  currentSlide = (currentSlide + step + totalSlides) % totalSlides;
  updateSliderPosition();
}

function updateSliderPosition() {
  document.querySelector(".slider").style.transform = `translateX(-${
    currentSlide * 100
  }%)`;
}

function startSlider() {
  slideInterval = setInterval(() => {
    moveSlide(1);
  }, 3000); // Automatic slide every 3 seconds
}

function pauseSlider() {
  clearInterval(slideInterval);
}

function resumeSlider() {
  startSlider();
}

// Manual controls for slider
// document.querySelector(".prev").addEventListener("click", () => moveSlide(-1));
// document.querySelector(".next").addEventListener("click", () => moveSlide(1));

startSlider();

var swiper = new Swiper(".testimonial-wrapper", {
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 30,
  loop: true,
  speed: 1300,
  autoplay: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    768: {
      slidesPerView: 3,
      slidesPerGroup: 3,
    },
    480: {
      slidesPerView: 2,
      slidesPerGroup: 1,
    },
  },
});

window.addEventListener("scroll", () => {
  const footer = document.querySelector("footer");
  const header = document.querySelector("header");
  const headerHeight = header.offsetHeight;

  if (window.scrollY > headerHeight) {
    footer.classList.add("fixed");
  } else {
    footer.classList.remove("fixed");
  }
});
