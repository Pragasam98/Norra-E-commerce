document.addEventListener("DOMContentLoaded", function () {
  const products = [
    {
      id: 1,
      name: "Dunk Low Midnight Navy and Varsity Red",
      price: 127.72,
      image:
        "images/product-images/dunk-low-midnight-navy-and-varsity-red-ib2051-1.jpg",
    },
    {
      id: 2,
      name: "Air Jordan 1 Mid",
      price: 136.01,
      image: "images/product-images/AIR+JORDAN+1+MID 1.png",
    },
    {
      id: 3,
      name: "LeBron XXII 'Token' EP",
      price: 217.65,
      image: "images/product-images/LEBRON+XXII+NRG+EP 1.png",
    },
    {
      id: 4,
      name: "Nike Air Max Alpha Trainer",
      price: 100.51,
      image: "images/product-images/M+AIR+MAX+ALPHA+TRAINER+1.png",
    },
    {
      id: 5,
      name: "Nike Pegasus Plus",
      price: 201.08,
      image: "images/product-images/PEGASUS+PLUS 1.png",
    },
    {
      id: 6,
      name: "Tatum 2 PF",
      price: 127.72,
      image: "images/product-images/JORDAN+TATUM+2+GPX+PF 1.png",
    },
    {
      id: 7,
      name: "Nike Vaporfly 3",
      price: 232.58,
      image: "images/product-images/NIKEZOOMXVAPORFLYNEXT1.png",
    },
    {
      id: 8,
      name: "JA 1 'Scratch' EP",
      price: 127.72,
      image: "images/product-images/JA+1+SCRATCH+EP1.png",
    },
  ];

  const productGrid = document.getElementById("product-grid");

  // Render products dynamically
  products.forEach((product) => {
    const productHTML = `
      <div class="product-card" data-id="${product.id}">
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>Price: $${product.price.toFixed(2)}</p>
      </div>
    `;
    productGrid.innerHTML += productHTML;
  });

  // Make the entire product card clickable
  document.querySelectorAll(".product-card").forEach((card) => {
    card.addEventListener("click", (e) => {
      const productId = e.currentTarget.getAttribute("data-id");

      // Redirect to product details page with product ID in the query string
      window.location.href = `product-detail.html?id=${productId}`;
    });
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
