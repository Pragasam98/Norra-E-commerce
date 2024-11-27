document.addEventListener("DOMContentLoaded", function () {
  // Get references to cart-related elements
  const cartCount = document.getElementById("cart-count");
  const productList = document.querySelector(".cart-items");
  const cartTotal = document.getElementById("total-amount");
  const productAmount = document.getElementById("product-amount");
  const discountAmount = document.getElementById("discount-amount");

  // Handle "Add to Cart" on the product detail page
  if (window.location.pathname.includes("product-detail.html")) {
    const addToCartButton = document.getElementById("add-to-cart");
    addToCartButton.addEventListener("click", function () {
      const selectedSize = localStorage.getItem("selectedSize");
      if (!selectedSize) {
        alert("Please select a size before adding to the cart.");
        return;
      }

      const product = {
        id: this.getAttribute("data-id"),
        name: document.querySelector("#product-name").innerText,
        price: parseFloat(
          document.querySelector("#product-price").innerText.replace("$", "")
        ),
        image: document.querySelector("#main-product-image img").src,
        size: selectedSize,
        quantity: 1,
      };
      addToCart(product);
    });
  }

  // Add items to cart and store in localStorage
  function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find(
      (item) => item.id === product.id && item.size === product.size
    );
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.push(product);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert(
      `${product.name} (Size: ${product.size}) has been added to your cart!`
    );
  }

  // Update the cart display on the cart page
  function updateCartDisplay() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    productList.innerHTML = ""; // Clear current cart items

    if (cart.length === 0) {
      productList.innerHTML = "<p>Your cart is empty.</p>";
      productAmount.innerText = "$0.00";
      discountAmount.innerText = "$0.00";
      cartTotal.innerText = "$0.00";
      cartCount.innerText = "(0)";
      return;
    }

    cart.forEach((item) => {
      const cartItemHTML = `
        <div class="cart-item" data-id="${item.id}" data-size="${item.size}">
          <div class="cart-item-left">
            <div class="cart-item-image-container">
              <img src="${item.image}" alt="${
        item.name
      }" class="cart-item-image" />
            </div>
            <div class="quantity-control">
              <button class="decrease-quantity" data-id="${
                item.id
              }" data-size="${item.size}">-</button>
              <span class="quantity-display" data-id="${item.id}" data-size="${
        item.size
      }">${item.quantity}</span>
              <button class="increase-quantity" data-id="${
                item.id
              }" data-size="${item.size}">+</button>
             
          </div>
           <button class="remove-from-cart" data-id="${item.id}" data-size="${
        item.size
      }">Remove</button>
            </div>
          <div class="cart-item-info">
            <h3>${item.name}</h3>
            <p>Size: ${item.size}</p>
            <p>Price: $<span class="item-total" data-id="${item.id}">${(
        item.price * item.quantity
      ).toFixed(2)}</span></p>
            <p>Quantity: <span class="quantity-info" data-id="${
              item.id
            }" data-size="${item.size}">${item.quantity}</span></p>
          </div>
        </div>
      `;
      productList.innerHTML += cartItemHTML;
    });

    // Calculate total price
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const discount = 0; // Placeholder for discount
    const finalAmount = total - discount;

    productAmount.innerText = `$${total.toFixed(2)}`;
    discountAmount.innerText = `$${discount.toFixed(2)}`;
    cartTotal.innerText = `$${finalAmount.toFixed(2)}`;

    // Update cart count
    updateCartCount();

    // Add listeners for cart actions
    addCartListeners(cart);
  }

  // Handle quantity and removal actions
  function addCartListeners(cart) {
    document.querySelectorAll(".increase-quantity").forEach((button) => {
      button.addEventListener("click", (e) => {
        const id = e.target.getAttribute("data-id");
        const size = e.target.getAttribute("data-size");
        const item = cart.find((item) => item.id == id && item.size == size);
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
        const size = e.target.getAttribute("data-size");
        const item = cart.find((item) => item.id == id && item.size == size);
        if (item) {
          item.quantity--;
          if (item.quantity <= 0) {
            cart = cart.filter((item) => !(item.id == id && item.size == size));
          }
          localStorage.setItem("cart", JSON.stringify(cart));
          updateCartDisplay();
        }
      });
    });

    document.querySelectorAll(".remove-from-cart").forEach((button) => {
      button.addEventListener("click", (e) => {
        const id = e.target.getAttribute("data-id");
        const size = e.target.getAttribute("data-size");
        cart = cart.filter((item) => !(item.id == id && item.size == size));
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartDisplay();
      });
    });
  }

  // Update the cart count in the navigation bar
  function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.innerText = `(${itemCount})`;
  }

  // Initialize cart display on cart page
  if (window.location.pathname.includes("cart.html")) {
    updateCartDisplay();
  } else {
    updateCartCount();
  }
});

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
