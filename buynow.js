document.addEventListener("DOMContentLoaded", function () {
  // Function to retrieve cart data and update the summary
  function updateCartSummary() {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsList = document.getElementById("cart-items-list");
    const cartTotal = document.getElementById("cart-total");
    const shippingAmount = document.getElementById("shipping-amount");
    const discountAmount = document.getElementById("discount-amount");
    const finalAmount = document.getElementById("final-amount");

    // If there are no items in the cart, display a message
    if (cartItems.length === 0) {
      cartItemsList.innerHTML = "<p>Your cart is empty.</p>";
      cartTotal.innerText = "$0.00";
      shippingAmount.innerText = "$0.00";
      discountAmount.innerText = "$0.00";
      finalAmount.innerText = "$0.00";
      return;
    }

    // Generate the HTML for each cart item
    let totalAmount = 0;
    cartItemsList.innerHTML = ""; // Clear any previous cart content
    cartItems.forEach((item) => {
      const itemHTML = `
            <div class="cart-item">
              <h4>${item.name}</h4>
              <p>Size: ${item.size}</p>
              <p>Price: ₹${item.price.toFixed(2)} x ${item.quantity} = ₹${(
        item.price * item.quantity
      ).toFixed(2)}</p>
            </div>
          `;
      cartItemsList.innerHTML += itemHTML;
      totalAmount += item.price * item.quantity;
    });

    // Assuming shipping is a fixed amount (customizable) and discount is dynamic
    const shipping = 100.0; // Example fixed shipping cost
    const discount = 50.0; // Example fixed discount

    // Update amounts
    cartTotal.innerText = `₹${totalAmount.toFixed(2)}`;
    shippingAmount.innerText = `₹${shipping.toFixed(2)}`;
    discountAmount.innerText = `₹${discount.toFixed(2)}`;
    finalAmount.innerText = `₹${(totalAmount + shipping - discount).toFixed(
      2
    )}`;
  }

  // Call the function to update the cart summary
  updateCartSummary();

  const buyNowButton = document.getElementById("buy-now-button");

  // Function to validate the form fields
  // Function to validate an address field
  function validateAddressField(fieldId, errorId, errorMessage) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(errorId);

    if (!field.value.trim()) {
      errorElement.innerText = errorMessage; // Display error
      errorElement.style.display = "block"; // Ensure it's visible
      field.focus(); // Focus on the first invalid field
      return false; // Stop further validation
    }

    errorElement.innerText = ""; // Clear error message
    errorElement.style.display = "none"; // Hide error
    return true;
  }

  // Function to validate pincode
  function validatePincode(fieldId, errorId) {
    const pincode = document.getElementById(fieldId).value.trim();
    const errorElement = document.getElementById(errorId);

    if (!pincode || pincode.length !== 6 || isNaN(pincode)) {
      errorElement.innerText = "Pincode must be 6 digits.";
      errorElement.style.display = "block"; // Ensure it's visible
      document.getElementById(fieldId).focus(); // Focus on invalid field
      return false;
    }

    errorElement.innerText = ""; // Clear error message
    errorElement.style.display = "none"; // Hide error
    return true;
  }

  // Handle Buy Now button click
  buyNowButton.addEventListener("click", function (e) {
    e.preventDefault(); // Prevent form submission

    // Validate fields in order, stop after the first error
    if (
      !validateAddressField("homeStreet", "street-error", "Street is required.")
    )
      return;
    if (!validateAddressField("homeCity", "city-error", "City is required."))
      return;
    if (!validateAddressField("homeState", "state-error", "State is required."))
      return;
    if (!validatePincode("homePincode", "pincode-error")) return;

    if (
      !validateAddressField(
        "billingStreet",
        "billing-street-error",
        "Billing street is required."
      )
    )
      return;
    if (
      !validateAddressField(
        "billingCity",
        "billing-city-error",
        "Billing city is required."
      )
    )
      return;
    if (
      !validateAddressField(
        "billingState",
        "billing-state-error",
        "Billing state is required."
      )
    )
      return;
    if (!validatePincode("billingPincode", "billing-pincode-error")) return;

    // If no errors, save data to localStorage and redirect
    const formData = {
      homeStreet: document.getElementById("homeStreet").value.trim(),
      homeCity: document.getElementById("homeCity").value.trim(),
      homeState: document.getElementById("homeState").value.trim(),
      homePincode: document.getElementById("homePincode").value.trim(),
      billingStreet: document.getElementById("billingStreet").value.trim(),
      billingCity: document.getElementById("billingCity").value.trim(),
      billingState: document.getElementById("billingState").value.trim(),
      billingPincode: document.getElementById("billingPincode").value.trim(),
    };

    localStorage.setItem("addressData", JSON.stringify(formData));
    window.location.href = "checkout.html";
  });

  // Add event listeners to clear error messages while typing
  const fields = [
    { fieldId: "homeStreet", errorId: "street-error" },
    { fieldId: "homeCity", errorId: "city-error" },
    { fieldId: "homeState", errorId: "state-error" },
    { fieldId: "homePincode", errorId: "pincode-error" },
    { fieldId: "billingStreet", errorId: "billing-street-error" },
    { fieldId: "billingCity", errorId: "billing-city-error" },
    { fieldId: "billingState", errorId: "billing-state-error" },
    { fieldId: "billingPincode", errorId: "billing-pincode-error" },
  ];

  fields.forEach((field) => {
    document
      .getElementById(field.fieldId)
      .addEventListener("input", function () {
        document.getElementById(field.errorId).innerText = "";
        document.getElementById(field.errorId).style.display = "none";
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

  // Search Functionality
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

  // Hamburger Menu
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector("nav");

  hamburger.addEventListener("click", () => {
    nav.classList.toggle("active");
  });

  // Modal Functions
  document
    .getElementById("contactUsButton")
    .addEventListener("click", function () {
      document.getElementById("contactModal").style.display = "block";
    });

  // Close the modal when the user clicks the close button
  document
    .getElementById("closeContactModal")
    .addEventListener("click", function () {
      document.getElementById("contactModal").style.display = "none";
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

//hamburger

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
