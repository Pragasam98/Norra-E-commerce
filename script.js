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

  // Initialize cart count from localStorage
  let cartCount = parseInt(localStorage.getItem("cartCount")) || 0;

  // Function to update the cart count display
  function updateCartCount() {
    document.getElementById("cart-count").textContent = `(${cartCount})`;
    localStorage.setItem("cartCount", cartCount); // Save cart count to localStorage
  }

  // Event listener for "Add to Cart" buttons
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      // Increment the cart count
      cartCount++;
      updateCartCount(); // Update the cart count display

      // Highlight the cart icon
      const cartIcon = document.getElementById("cart-icon");
      cartIcon.classList.add("highlight");

      // Remove highlight class after 300ms
      setTimeout(() => cartIcon.classList.remove("highlight"), 300);
    });
  });

  // Initialize the cart count on page load
  updateCartCount();

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
  const cartCount = document.getElementById("cart-count");
  const productList = document.querySelector(".cart-items");
  const cartTotal = document.getElementById("total-amount");
  const productAmount = document.getElementById("product-amount");
  const discountAmount = document.getElementById("discount-amount");

  // Array to store product data (same as index page)
  const products = [
    {
      id: 1,
      name: "Dunk Low Midnight Navy and Varsity Red",
      price: 127.72,
      quantity: 1,
      image:
        "images/product-images/dunk-low-midnight-navy-and-varsity-red-ib2051-1.jpg",
      description: "A lightweight running shoe for comfort and performance.",
    },
    {
      id: 2,
      name: "Air Jordan 1 Mid",
      price: 136.01,
      quantity: 1,
      image: "images/product-images/AIR+JORDAN+1+MID 1.png",
      description: "Classic style with a low-top design.",
    },
    {
      id: 3,
      name: "LeBron XXII 'Token' EP",
      price: 217.65,
      quantity: 1,
      image: "images/product-images/LEBRON+XXII+NRG+EP 1.png",
      description:
        "Running shoes with great comfort for long-distance running.",
    },
    {
      id: 4,
      name: "Nike Air Max Alpha Trainer",
      price: 100.51,
      quantity: 1,
      image: "images/product-images/M+AIR+MAX+ALPHA+TRAINER+1.png",
      description: "Casual shoes with a sporty look for everyday wear.",
    },
  ];

  // Function to update the cart display (on the cart page)
  function updateCartDisplay() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Clear the current cart item display
    productList.innerHTML = "";

    // Map over the cart and generate HTML for each item
    cart.forEach((item) => {
      const cartItemHTML = `
        <div class="cart-item" data-id="${item.id}">
          <img
            src="${item.image}"
            alt="${item.name}"
            class="cart-item-image"
          />
          <div class="cart-item-info">
            <h3>${item.name}</h3>
            <p>Price: $${item.price}</p>

            <!-- Quantity Controls -->
            <div class="quantity-control">
              <button class="decrease-quantity" data-id="${item.id}">-</button>
              <span class="quantity" data-id="${item.id}">${item.quantity}</span>
              <button class="increase-quantity" data-id="${item.id}">+</button>
            </div>
            <button class="remove-from-cart" data-id="${item.id}">Remove</button>
          </div>
        </div>
      `;
      productList.innerHTML += cartItemHTML;
    });

    // Update the total price
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const discount = 0; // You can add logic for discounts here
    const finalAmount = total - discount;

    productAmount.innerText = `$${total.toFixed(2)}`;
    discountAmount.innerText = `$${discount.toFixed(2)}`;
    cartTotal.innerText = `$${finalAmount.toFixed(2)}`;

    // Add event listeners to the plus, minus, and remove buttons
    addEventListeners(cart);

    // Update cart item count
    updateCartCount();
  }

  // Function to handle quantity changes (plus/minus) and item removal
  function addEventListeners(cart) {
    document.querySelectorAll(".increase-quantity").forEach((button) => {
      button.addEventListener("click", (e) => {
        const id = e.target.getAttribute("data-id");
        const item = cart.find((item) => item.id == id);
        if (item) {
          item.quantity++;
          localStorage.setItem("cart", JSON.stringify(cart));
          updateCartDisplay();
        }
      });
    });

    document.querySelectorAll(".decrease-quantity").forEach((button) => {
      button.addEventListener("click", (e) => {
        const id = e.target.getAttribute("data-id");
        const item = cart.find((item) => item.id == id);
        if (item && item.quantity > 1) {
          item.quantity--;
          localStorage.setItem("cart", JSON.stringify(cart));
          updateCartDisplay();
        }
      });
    });

    document.querySelectorAll(".remove-from-cart").forEach((button) => {
      button.addEventListener("click", (e) => {
        const id = e.target.getAttribute("data-id");
        const updatedCart = cart.filter((item) => item.id != id);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        updateCartDisplay();
      });
    });
  }

  // Function to update the cart count in the navigation bar
  function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCount = document.getElementById("cart-count");
    cartCount.innerText = `(${cart.length})`; // Update the cart count in the nav
  }

  // Initialize cart on page load
  if (window.location.pathname.includes("cart.html")) {
    updateCartDisplay();
  } else {
    // Update cart count on other pages (like the homepage)
    updateCartCount();
  }

  // Handle the "Add to Cart" functionality on the home page
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", function () {
      const productId = this.getAttribute("data-id");
      const product = products.find((p) => p.id == productId);
      addToCart(product);
    });
  });

  // Function to add items to the cart and store in localStorage
  function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the product already exists in the cart
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      product.quantity = 1;
      cart.push(product);
    }

    // Save the updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update cart count in navigation
    updateCartCount();
  }
});

// search

document.addEventListener("DOMContentLoaded", function () {
  document.body.addEventListener("click", function (event) {
    if (event.target.id === "search-button") {
      const searchInput = document.getElementById("search-input");
      if (!searchInput) return;

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

  const searchInput = document.getElementById("search-input");
  if (searchInput) {
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
});
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector("nav");

hamburger.addEventListener("click", () => {
  nav.classList.toggle("active");
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
