document.addEventListener("DOMContentLoaded", function () {
  // Sample product data
  const products = [
    {
      id: 1,
      name: "Dunk Low Midnight Navy and Varsity Red",
      price: 127.72,
      images: [
        "images/product-images/dunk-low-midnight-navy-and-varsity-red-ib2051-1.jpg",
        "images/product-images/dunk-low-midnight-navy-and-varsity-red-ib2051-2.jpg",
        "images/product-images/dunk-low-midnight-navy-and-varsity-red-ib2051-3.jpg",
        "images/product-images/dunk-low-midnight-navy-and-varsity-red-ib2051-4.jpg",
        "images/product-images/dunk-low-midnight-navy-and-varsity-red-ib2051-5.jpg",
      ],
      sizes: ["6", "7", "8", "9", "10", "11"],
    },
    {
      id: 2,
      name: "Air Jordan 1 Mid",
      price: 136.01,
      images: [
        "images/product-images/AIR+JORDAN+1+MID 1.png",
        "images/product-images/AIR+JORDAN+1+MID 2.png",
        "images/product-images/AIR+JORDAN+1+MID 3.png",
        "images/product-images/AIR+JORDAN+1+MID 4.png",
        "images/product-images/AIR+JORDAN+1+MID 5.jpeg",
      ],
      sizes: ["6", "7", "8", "9", "10", "11"],
    },
    {
      id: 3,
      name: "LeBron XXII 'Token' EP",
      price: 217.65,
      images: [
        "images/product-images/LEBRON+XXII+NRG+EP 1.png",
        "images/product-images/LEBRON+XXII+NRG+EP 2.png",
        "images/product-images/LEBRON+XXII+NRG+EP 3.png",
        "images/product-images/LEBRON+XXII+NRG+EP 4.png",
        "images/product-images/LEBRON+XXII+NRG+EP 5.png",
      ],
      sizes: ["6", "7", "8", "9", "10", "11"],
    },
    {
      id: 4,
      name: "Nike Air Max Alpha Trainer",
      price: 100.51,
      images: [
        "images/product-images/M+AIR+MAX+ALPHA+TRAINER+1.png",
        "images/product-images/M+AIR+MAX+ALPHA+TRAINER+2.png",
        "images/product-images/M+AIR+MAX+ALPHA+TRAINER+3.png",
        "images/product-images/M+AIR+MAX+ALPHA+TRAINER+4.png",
        "images/product-images/M+AIR+MAX+ALPHA+TRAINER+5.png",
      ],
      sizes: ["6", "7", "8", "9", "10", "11"],
    },
    {
      id: 5,
      name: "Nike Pegasus Plus",
      price: 201.08,
      images: [
        "images/product-images/PEGASUS+PLUS 1.png",
        "images/product-images/PEGASUS+PLUS 2.png",
        "images/product-images/PEGASUS+PLUS 3.png",
        "images/product-images/PEGASUS+PLUS 4.png",
        "images/product-images/PEGASUS+PLUS 5.png",
      ],
      sizes: ["6", "7", "8", "9", "10", "11"],
    },
    {
      id: 6,
      name: "Tatum 2 PF",
      price: 127.72,
      images: [
        "images/product-images/JORDAN+TATUM+2+GPX+PF 1.png",
        "images/product-images/JORDAN+TATUM+2+GPX+PF 2.png",
        "images/product-images/JORDAN+TATUM+2+GPX+PF 3.jpeg",
        "images/product-images/JORDAN+TATUM+2+GPX+PF 4.jpeg",
        "images/product-images/JORDAN+TATUM+2+GPX+PF 5.jpeg",
      ],
      sizes: ["6", "7", "8", "9", "10", "11"],
    },
    {
      id: 7,
      name: "Nike Vaporfly 3",
      price: 232.58,
      images: [
        "images/product-images/NIKEZOOMXVAPORFLYNEXT1.png",
        "images/product-images/NIKEZOOMXVAPORFLYNEXT2.png",
        "images/product-images/NIKEZOOMXVAPORFLYNEXT3.png",
        "images/product-images/NIKEZOOMXVAPORFLYNEXT4.png",
        "images/product-images/NIKEZOOMXVAPORFLYNEXT5.png",
      ],
      sizes: ["6", "7", "8", "9", "10", "11"],
    },
    {
      id: 8,
      name: "JA 1 'Scratch' EP",
      price: 127.72,
      images: [
        "images/product-images/JA+1+SCRATCH+EP1.png",
        "images/product-images/JA+1+SCRATCH+EP2.png",
        "images/product-images/JA+1+SCRATCH+EP3.png",
        "images/product-images/JA+1+SCRATCH+EP4.png",
        "images/product-images/JA+1+SCRATCH+EP5.png",
      ],
      sizes: ["6", "7", "8", "9", "10", "11"],
    },
  ];
  // Get product ID from URL query params (e.g., ?id=1)
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get("id"));

  if (!productId) {
    alert("Invalid product ID");
    return;
  }

  // Find product by ID
  const product = products.find((p) => p.id === productId);
  if (!product) {
    alert("Product not found");
    return;
  }

  // Populate product details
  document.getElementById("product-name").textContent = product.name;
  document.getElementById(
    "product-price"
  ).textContent = `$${product.price.toFixed(2)}`;

  // Display main product image
  const mainImageContainer = document.getElementById("main-product-image");
  const mainImage = document.createElement("img");
  mainImage.src = product.images[0];
  mainImage.alt = `${product.name} Main Image`;
  mainImage.classList.add("main-image");
  mainImageContainer.innerHTML = ""; // Clear previous images if any
  mainImageContainer.appendChild(mainImage);

  // Display product thumbnails
  const thumbnailContainer = document.getElementById("product-thumbnails");
  thumbnailContainer.innerHTML = ""; // Clear previous thumbnails
  product.images.forEach((image, index) => {
    const thumbnail = document.createElement("img");
    thumbnail.src = image;
    thumbnail.alt = `${product.name} Thumbnail ${index + 1}`;
    thumbnail.classList.add("thumbnail");

    // Update main image on thumbnail click
    thumbnail.addEventListener("click", () => {
      mainImage.src = image;
    });

    thumbnailContainer.appendChild(thumbnail);
  });

  // Display available sizes
  const sizeContainer = document.getElementById("product-sizes");
  sizeContainer.innerHTML = ""; // Clear previous sizes
  product.sizes.forEach((size) => {
    const sizeButton = document.createElement("button");
    sizeButton.textContent = size;
    sizeButton.classList.add("size-option");

    // Handle size selection
    sizeButton.addEventListener("click", () => {
      document
        .querySelectorAll(".size-option")
        .forEach((btn) => btn.classList.remove("selected"));
      sizeButton.classList.add("selected");
      localStorage.setItem("selectedSize", size); // Store selected size in localStorage
    });

    sizeContainer.appendChild(sizeButton);
  });

  // Add to cart functionality
  document.getElementById("add-to-cart").addEventListener("click", () => {
    const selectedSize = localStorage.getItem("selectedSize");
    if (!selectedSize) {
      alert("Please select a size before adding to the cart.");
      return;
    }

    const selectedImage = mainImage.src; // Use the current displayed image as the selected one

    // Check if item is already in cart
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find(
      (item) => item.id === product.id && item.size === selectedSize
    );

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({
        ...product,
        size: selectedSize,
        quantity: 1,
        image: selectedImage, // Add the selected image to the cart item
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`Added ${product.name} (Size ${selectedSize}) to cart!`);
    updateCartCount(); // Update cart count after adding
  });

  // Update cart count and ensure only one cart element exists
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Update the cart count only if the element exists
    const cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
      cartCountElement.textContent = `(${count})`;
    }
  }

  // Ensure no duplicate cart links are dynamically created
  const cartLink = document.querySelector('a[href="cart.html"]');
  if (cartLink) {
    const existingCartCount = cartLink.querySelector("#cart-count");
    if (!existingCartCount) {
      // Add cart count element if it's missing
      const cartCount = document.createElement("span");
      cartCount.id = "cart-count";
      cartCount.textContent = "(0)";
      cartLink.appendChild(cartCount);
    }
  }

  // Update cart count on page load
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
