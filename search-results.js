document.addEventListener("DOMContentLoaded", function () {
  // Function to handle search
  function handleSearch(inputId, buttonId) {
    const searchInput = document.getElementById(inputId);
    const searchButton = document.getElementById(buttonId);

    if (!searchInput || !searchButton) return;

    // Handle search on button click
    searchButton.addEventListener("click", function () {
      const query = searchInput.value.trim();
      if (!query) {
        // If the input is empty, show error message and prevent search
        document.getElementById("search-error-message").style.display = "block";
        return;
      }

      // Redirect to the search results page with the query parameter
      window.location.href = `search-results.html?q=${encodeURIComponent(
        query
      )}`;
    });

    // Handle "Enter" key press for search
    searchInput.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        const query = searchInput.value.trim();
        if (!query) {
          // If the input is empty, show error message and prevent search
          document.getElementById("search-error-message").style.display =
            "block";
          return;
        }

        // Redirect to the search results page with the query parameter
        window.location.href = `search-results.html?q=${encodeURIComponent(
          query
        )}`;
      }
    });
  }

  // Apply search functionality to desktop and mobile search bars
  handleSearch("desktop-search-input", "desktop-search-button");
  handleSearch("mobile-search-input", "mobile-search-button");

  // Get the query parameter from the URL when the search results page loads
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get("q");

  const searchMessage = document.getElementById("search-message");
  const productGrid = document.getElementById("product-list");
  const noResultsMessage = document.getElementById("no-results-message");

  // Show message if no search query is provided
  if (!query) {
    searchMessage.innerHTML = "<p>Please enter a search term.</p>";
    noResultsMessage.style.display = "block"; // Show no results message
    return; // Exit the function
  }

  // Display the search term
  searchMessage.innerHTML = `<p>Showing results for "<strong>${query}</strong>"</p>`;

  // Sample product data (this can be dynamic or fetched from an API)
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

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  // Handle case where no products match the search query
  if (filteredProducts.length === 0) {
    noResultsMessage.style.display = "block"; // Show no results message
    productGrid.innerHTML = "";
    return; // Exit the function
  }

  // Hide the "No Results" message if products are found
  noResultsMessage.style.display = "none";

  // Dynamically display the filtered products
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

  // Make product cards clickable to redirect to a product detail page
  document.querySelectorAll(".product-card").forEach((card) => {
    card.addEventListener("click", (e) => {
      const productId = e.currentTarget.getAttribute("data-id");
      window.location.href = `product-detail.html?id=${productId}`;
    });
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

const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector("nav");

hamburger.addEventListener("click", () => {
  nav.classList.toggle("active");
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
