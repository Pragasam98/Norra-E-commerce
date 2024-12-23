document.addEventListener("DOMContentLoaded", function () {
  // Product Slider
  let slideInterval;
  let currentSlide = 0;
  let slides = document.querySelectorAll(".product-image-box");
  let totalSlides = slides.length;

  function moveSlide(step) {
    currentSlide = (currentSlide + step + totalSlides) % totalSlides;
    updateSliderPosition();
  }

  function updateSliderPosition() {
    document.querySelector(".slider").style.transform = `translateX(-${
      currentSlide * 100
    }%)`;
  }

  // Function to start the slider (loop)
  function startSlider() {
    slideInterval = setInterval(() => moveSlide(1), 3000);
  }

  // Function to pause the slider (stop the loop)
  function pauseSlider() {
    clearInterval(slideInterval);
  }

  // Function to resume the slider
  function resumeSlider() {
    startSlider();
  }

  // Event listeners to pause and resume the slider on mouse enter/leave
  document
    .querySelector(".slider-container")
    .addEventListener("mouseenter", pauseSlider);
  document
    .querySelector(".slider-container")
    .addEventListener("mouseleave", resumeSlider);

  // Start the slider initially
  startSlider();

  // Testimonial Carousel
  var swiper = new Swiper(".testimonial-wrapper", {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 30,
    loop: true,
    speed: 2000,
    autoplay: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      768: { slidesPerView: 3, slidesPerGroup: 1 },
      480: { slidesPerView: 2, slidesPerGroup: 1 },
    },
  });

  // Sticky Header
  const header = document.querySelector("header");
  const featuredProducts = document.querySelector(".featured-products");

  if (featuredProducts) {
    // Check if the element exists before using offsetTop
    const featuredProductsOffset = featuredProducts.offsetTop;

    window.addEventListener("scroll", function () {
      if (window.scrollY >= featuredProductsOffset) {
        header.classList.add("fixed");
      } else {
        header.classList.remove("fixed");
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const products = [
    {
      id: 1,
      name: "Dunk Low Midnight Navy and Varsity Red",
      price: 10795.0,
      image:
        "images/product-images/dunk-low-midnight-navy-and-varsity-red-ib2051-1.jpg",
      description: "A lightweight running shoe for comfort and performance.",
    },
    {
      id: 2,
      name: "Air Jordan 1 Mid",
      price: 13601.0,
      image: "images/product-images/AIR+JORDAN+1+MID 1.png",
      description: "Classic style with a low-top design.",
    },
    {
      id: 3,
      name: "LeBron XXII 'Token' EP",
      price: 21765.0,
      image: "images/product-images/LEBRON+XXII+NRG+EP 1.png",
      description:
        "Running shoes with great comfort for long-distance running.",
    },
    {
      id: 4,
      name: "Nike Air Max Alpha Trainer",
      price: 10051.0,
      image: "images/product-images/M+AIR+MAX+ALPHA+TRAINER+1.png",
      description: "Casual shoes with a sporty look for everyday wear.",
    },
  ];

  const productGrid = document.getElementById("product-grid");

  // Loop through products and dynamically add them to the product grid
  products.forEach((product) => {
    const productHTML = `
      <div class="product-card" data-id="${product.id}">
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>₹${product.price.toLocaleString()}</p>
        <p>${product.description}</p>
      </div>
    `;
    productGrid.innerHTML += productHTML;
  });

  // Make the entire product card clickable
  document.querySelectorAll(".product-card").forEach((card) => {
    card.addEventListener("click", function () {
      const productId = this.getAttribute("data-id");
      window.location.href = `product-detail.html?id=${productId}`;
    });
  });
});

// search

document.addEventListener("DOMContentLoaded", function () {
  // Function to handle the search operation
  function handleSearch(inputId, buttonId) {
    const searchInput = document.getElementById(inputId);
    const searchButton = document.getElementById(buttonId);

    if (!searchInput || !searchButton) return;

    // Click event listener for search button
    searchButton.addEventListener("click", function () {
      const query = searchInput.value.trim();
      if (!query) {
        alert("Please enter a search term.");
        return;
      }

      // Redirect to search results page with query as a URL parameter
      window.location.href = `search-results.html?q=${encodeURIComponent(
        query
      )}`;
    });

    // Allow 'Enter' key to trigger the search
    searchInput.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        const query = searchInput.value.trim();
        if (!query) {
          alert("Please enter a search term.");
          return;
        }

        // Redirect to search results page with query as a URL parameter
        window.location.href = `search-results.html?q=${encodeURIComponent(
          query
        )}`;
      }
    });
  }

  // Handle search functionality for both desktop and mobile
  handleSearch("mobile-search-input", "mobile-search-button");
  handleSearch("desktop-search-input", "desktop-search-button");
});

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector("nav");

  hamburger.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
});

// Open the modal when "Contact Us" button is clicked
document
  .getElementById("contactUsButton")
  .addEventListener("click", function () {
    document.getElementById("contactModal").style.display = "block";
  });

// Close the modal when the user clicks on the close button
document.getElementById("closeModal").addEventListener("click", function () {
  document.getElementById("contactModal").style.display = "none";
});

// Close the modal if the user clicks outside the modal content
window.addEventListener("click", function (event) {
  if (event.target == document.getElementById("contactModal")) {
    document.getElementById("contactModal").style.display = "none";
  }
});

// Helper function to show error messages
function showError(inputId, errorMessage) {
  const errorSpan = document.getElementById(inputId + "Error");
  errorSpan.innerText = errorMessage;
  errorSpan.style.display = "block"; // Show the error message
}

// Helper function to hide specific error message
function hideError(inputId) {
  const errorSpan = document.getElementById(inputId + "Error");
  errorSpan.style.display = "none"; // Hide the error message
}

// Helper function to hide all error messages
function hideAllErrors() {
  const errorSpans = document.querySelectorAll(".error-message");
  errorSpans.forEach((span) => {
    span.style.display = "none";
  });
}

// Open the modal when the "Contact Us" button is clicked
document
  .getElementById("contactUsButton")
  .addEventListener("click", function () {
    document.getElementById("contactModal").style.display = "block";
  });

// Close the modal when the close button (&times;) is clicked
document.getElementById("closeModal").addEventListener("click", function () {
  document.getElementById("contactModal").style.display = "none";
});

// Close the modal if the user clicks outside the modal content
window.addEventListener("click", function (e) {
  if (e.target === document.getElementById("contactModal")) {
    document.getElementById("contactModal").style.display = "none";
  }
});

// Handle form submission
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Fetch form input values
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const mobileNumber = document.getElementById("mobileNumber").value.trim();
  const country = document.getElementById("country").value.trim();
  const state = document.getElementById("state").value.trim();
  const city = document.getElementById("city").value.trim();
  const pincode = document.getElementById("pincode").value.trim();
  const services = document.getElementById("services").value.trim();
  const dob = document.getElementById("dob").value.trim();
  const message = document.getElementById("message").value.trim();

  // Email validation regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Reset error messages first
  hideAllErrors();

  let isValid = true;

  // Validation checks (only showing first error)
  if (!firstName) {
    showError("firstName", "Please enter your first name");
    isValid = false;
  } else if (!lastName) {
    showError("lastName", "Please enter your last name");
    isValid = false;
  } else if (!email) {
    showError("email", "Please enter a valid email address");
    isValid = false;
  } else if (!emailRegex.test(email)) {
    showError(
      "email",
      "Please enter a valid email address (e.g., example@domain.com)"
    );
    isValid = false;
  } else if (
    !mobileNumber ||
    mobileNumber.length !== 10 ||
    isNaN(mobileNumber)
  ) {
    showError("mobileNumber", "Please enter a valid 10-digit mobile number");
    isValid = false;
  } else if (!country) {
    showError("country", "Please enter your country");
    isValid = false;
  } else if (!state) {
    showError("state", "Please enter your state");
    isValid = false;
  } else if (!city) {
    showError("city", "Please enter your city");
    isValid = false;
  } else if (!pincode || pincode.length !== 6 || isNaN(pincode)) {
    showError("pincode", "Pincode must be 6 digits");
    isValid = false;
  } else if (!services) {
    showError("services", "Please select a service");
    isValid = false;
  } else if (!dob) {
    showError("dob", "Please select your date of birth");
    isValid = false;
  } else if (!message) {
    showError("message", "Please enter your message");
    isValid = false;
  }

  // If form is valid, show success message and store data in localStorage
  if (isValid) {
    // Save form data in an object
    const formData = {
      firstName,
      lastName,
      email,
      mobileNumber,
      country,
      state,
      city,
      pincode,
      services,
      dob,
      message,
    };

    // Try storing in localStorage
    try {
      localStorage.setItem("contactFormData", JSON.stringify(formData)); // Store data
      console.log("Data saved to localStorage:", formData);

      // Show success message
      document.getElementById("successMessage").style.display = "block";
      setTimeout(() => {
        document.getElementById("successMessage").style.display = "none";
      }, 5000);

      // Reset the form after submission
      document.getElementById("contactForm").reset();
    } catch (error) {
      console.error("Error saving to localStorage:", error); // Error handling
    }
  } else {
    // Hide success message if form is invalid
    document.getElementById("successMessage").style.display = "none";
  }
});

// Add event listeners to hide error messages when the user starts typing
document.getElementById("firstName").addEventListener("input", function () {
  hideError("firstName");
});
document.getElementById("lastName").addEventListener("input", function () {
  hideError("lastName");
});
document.getElementById("email").addEventListener("input", function () {
  hideError("email");
});
document.getElementById("mobileNumber").addEventListener("input", function () {
  hideError("mobileNumber");
});
document.getElementById("country").addEventListener("input", function () {
  hideError("country");
});
document.getElementById("state").addEventListener("input", function () {
  hideError("state");
});
document.getElementById("city").addEventListener("input", function () {
  hideError("city");
});
document.getElementById("pincode").addEventListener("input", function () {
  hideError("pincode");
});
document.getElementById("services").addEventListener("input", function () {
  hideError("services");
});
document.getElementById("dob").addEventListener("input", function () {
  hideError("dob");
});
document.getElementById("message").addEventListener("input", function () {
  hideError("message");
});

// Handle "Add to Cart" functionality
document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", (e) => {
    const id = e.target.getAttribute("data-id");
    const product = products.find((p) => p.id == id);

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find((item) => item.id == product.id);

    if (existingItem) {
      existingItem.quantity++; // If the product already exists, increase the quantity
    } else {
      cart.push({ ...product, quantity: 1 }); // Add new product to the cart with quantity 1
    }

    localStorage.setItem("cart", JSON.stringify(cart)); // Save the updated cart back to localStorage

    // Update the cart count in the navigation bar across pages
    updateCartCount();
  });
});

// Function to update cart count in navigation (total quantity of items)
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCount = document.getElementById("cart-count");

  if (cartCount) {
    // Calculate total quantity (sum of all product quantities in the cart)
    const totalQuantity = cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
    cartCount.innerText = `(${totalQuantity})`; // Update the cart count dynamically
  }
}

// Initial cart count update when the page loads
updateCartCount();
