document.addEventListener("DOMContentLoaded", function () {
  const cartCount = document.getElementById("cart-count");
  const productList = document.querySelector(".cart-items");
  const cartTotal = document.getElementById("total-amount");
  const productAmount = document.getElementById("product-amount");
  const discountAmount = document.getElementById("discount-amount");

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

    // Update cart item count
    cartCount.innerText = `(${cart.length})`;

    // Add event listeners to the plus, minus, and remove buttons
    addEventListeners(cart);

    // Update the cart count in the navigation bar
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
        if (item) {
          if (item.quantity > 1) {
            item.quantity--;
          } else {
            // Remove item if quantity reaches 1
            cart = cart.filter((item) => item.id != id);
          }
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
    cartCount.innerText = `(${cart.length})`; // Update the cart count in the nav
  }

  // Initialize cart on page load
  if (window.location.pathname.includes("cart.html")) {
    updateCartDisplay();
  } else {
    // Update cart count on other pages (like the homepage)
    updateCartCount();
  }
});
