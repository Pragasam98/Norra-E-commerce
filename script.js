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
      name: "Nike Free RN Flyknit",
      price: 19.99,
      quantity: 1,
      image: "images/Product+Photography.jpg",
      description: "A lightweight running shoe for comfort and performance.",
    },
    {
      id: 2,
      name: "NIKE DUNK LOW JP",
      price: 29.99,
      quantity: 1,
      image: "images/NIKE+DUNK+LOW+JP+QS.png",
      description: "Classic style with a low-top design.",
    },
    {
      id: 3,
      name: "NIKE Interact Run",
      price: 39.99,
      quantity: 1,
      image:
        "images/pngtree-nike-sneakers-showcased-in-tyumen-store-leather-product-nike-shoes-photo-image_49118888.jpg",
      description:
        "Running shoes with great comfort for long-distance running.",
    },
    {
      id: 4,
      name: "NIKE COURT VISION LOW",
      price: 49.99,
      quantity: 1,
      image: "images/NIKE+COURT+VISION+LO+NN.png",
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
