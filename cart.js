document.addEventListener("DOMContentLoaded", function () {
  // Get references to cart-related elements
  const cartCount = document.getElementById("cart-count");
  const productList = document.querySelector(".cart-items");
  const cartTotal = document.getElementById("total-amount");
  const productAmount = document.getElementById("product-amount");
  const discountAmount = document.getElementById("discount-amount");
  const summaryItemsContainer = document.getElementById("cart-summary-items");

  // Handle the "Add to Cart" functionality on the product detail page
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
        name: document.querySelector(".product-name").innerText,
        price: parseFloat(
          document.querySelector(".product-price").innerText.replace("$", "")
        ),
        image: document.querySelector(".product-image").src,
        size: selectedSize, // Add size information here
        quantity: 1,
      };
      addToCart(product);
    });
  }

  // Function to add items to the cart and store in localStorage
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

  // Function to update the cart display (on the cart page)
  function updateCartDisplay() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    productList.innerHTML = ""; // Clear the current cart items

    // If the cart is empty, show an empty cart message
    if (cart.length === 0) {
      productList.innerHTML = "<p>Your cart is empty.</p>";
      summaryItemsContainer.innerHTML = "<p>No items in cart.</p>";
      productAmount.innerText = "$0.00";
      discountAmount.innerText = "$0.00";
      cartTotal.innerText = "$0.00";
      cartCount.innerText = "(0)";
      return;
    }

    // Loop through each item in the cart and display it
    cart.forEach((item) => {
      const cartItemHTML = `
        <div class="cart-item" data-id="${item.id}">
          <img src="${item.image}" alt="${item.name}" class="cart-item-image" />
          <div class="cart-item-info">
            <h3>${item.name}</h3>
            <p>Price: $${item.price}</p>
            <p>Size: ${item.size}</p> <!-- Display the selected size -->
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

      // Add summary items
      const summaryItemHTML = `
        <div class="summary-item">
          <p>${item.name} (Size: ${item.size}, x${item.quantity}): $${(
        item.price * item.quantity
      ).toFixed(2)}</p>
        </div>
      `;
      summaryItemsContainer.innerHTML += summaryItemHTML;
    });

    // Calculate the total price and display it
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

    // Add event listeners for quantity changes and removal
    addEventListeners(cart);
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
        } else {
          cart = cart.filter((item) => item.id != id); // Remove item if quantity is 1
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartDisplay();
      });
    });

    document.querySelectorAll(".remove-from-cart").forEach((button) => {
      button.addEventListener("click", (e) => {
        const id = e.target.getAttribute("data-id");
        cart = cart.filter((item) => item.id != id); // Remove item from cart
        localStorage.setItem("cart", JSON.stringify(cart));
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

  // Initialize cart display on the cart page
  if (window.location.pathname.includes("cart.html")) {
    updateCartDisplay();
  } else {
    updateCartCount(); // Update cart count in the nav bar for other pages
  }

  // Handle search functionality
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
