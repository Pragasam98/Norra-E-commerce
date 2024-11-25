document.addEventListener("DOMContentLoaded", function () {
  // Get the query parameter from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get("q");

  // If no query is provided, display a message and exit
  if (!query) {
    document.getElementById("search-message").innerHTML =
      "<p>No search query provided.</p>";
    document.getElementById("product-list").innerHTML =
      "<p>Please enter a search term in the search bar.</p>";
    return; // Exit here if no query
  }

  // Display a message with the search term
  const searchMessage = document.getElementById("search-message");
  searchMessage.innerHTML = `<p>Showing results for "<strong>${query}</strong>"</p>`;

  // Sample products data (you should dynamically load this from a database or API in a real scenario)
  const products = [
    {
      id: 1,
      name: "Dunk Low Midnight Navy",
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

  // Filter products based on the query (case-insensitive)
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  // Get the product grid element
  const productGrid = document.getElementById("product-list");

  // If there are no matching products
  if (filteredProducts.length === 0) {
    document.getElementById("no-results-message").style.display = "block";
    productGrid.innerHTML = "<p>No products found for your search.</p>";
    return;
  }

  // Hide the "No results" message if products are found
  document.getElementById("no-results-message").style.display = "none";

  // Render products dynamically
  filteredProducts.forEach((product) => {
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
