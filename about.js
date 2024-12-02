var swiper = new Swiper(".swiper", {
  effect: "coverflow", // Use coverflow effect
  grabCursor: true, // Enable cursor interaction
  centeredSlides: true, // Center the active slide
  slidesPerView: 3, // Display 3 slides at a time by default (for large screens)
  coverflowEffect: {
    rotate: 0, // No rotation for slides
    stretch: -50, // Space between slides for side visibility
    depth: 200, // Depth for a 3D perspective
    modifier: 1.5, // Amplify the effect
    slideShadows: true, // Enable slide shadows
  },
  loop: true, // Enable infinite loop
  autoplay: {
    delay: 3000, // Auto-slide every 3 seconds
    disableOnInteraction: false, // Continue autoplay after user interaction
  },
  pagination: {
    el: ".swiper-pagination", // Pagination element
    clickable: true, // Allow clicking on bullets
  },
  breakpoints: {
    // Mobile view (screens up to 480px)
    480: {
      slidesPerView: 1, // Only 1 slide visible
      spaceBetween: 10, // Reduced space between slides
    },
    // Tablet view (screens up to 768px)
    768: {
      slidesPerView: 1, // Only 1 slide visible
      spaceBetween: 10, // Reduced space between slides
    },
    // For larger screens (1024px and up)
    1024: {
      slidesPerView: 3, // Show 3 slides per view
      spaceBetween: 20, // Space between slides
    },
  },
  on: {
    init: function () {
      // Randomizing content
      const names = ["Alice", "Bob", "Charlie", "Diana", "Eve"];
      const roles = ["CEO", "CTO", "SEO", "CFO", "CRO"];
      document.querySelectorAll(".slide-content").forEach((content) => {
        const randomName = names[Math.floor(Math.random() * names.length)];
        const randomRole = roles[Math.floor(Math.random() * roles.length)];
        content.querySelector("h2").innerText = randomName;
        content.querySelector("p").innerText = randomRole;
      });
    },
  },
});

// FAQ Accordion Toggle
document.addEventListener("DOMContentLoaded", function () {
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach(function (question) {
    question.addEventListener("click", function () {
      const answer = this.nextElementSibling;

      // Close all other open answers
      document.querySelectorAll(".faq-answer").forEach(function (otherAnswer) {
        if (otherAnswer !== answer) {
          otherAnswer.style.display = "none";
        }
      });

      // Toggle the display of the clicked answer
      if (answer.style.display === "block") {
        answer.style.display = "none";
      } else {
        answer.style.display = "block";
      }
    });
  });
});

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
