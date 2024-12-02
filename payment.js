// // Wait for the DOM to load before running the script
// document.addEventListener("DOMContentLoaded", function () {
//   // Get the total amount from localStorage
//   const totalAmount = localStorage.getItem("totalAmount");

//   // If totalAmount is not available in localStorage, display an error and stop the process
//   if (!totalAmount) {
//     alert("Cart is empty. Please add items to the cart.");
//     window.location.href = "checkout.html"; // Redirect to checkout page
//     return;
//   }

//   // Set up Razorpay Checkout options
//   const options = {
//     key: "rzp_test_wXN4Trx0gv8vzT", // Your Razorpay API Key
//     amount: totalAmount, // The amount directly from localStorage (in paisa, but here you are passing the amount as ₹ directly)
//     currency: "INR", // Currency type
//     name: "Your Company Name", // Your company's name
//     description: "Order Summary", // Description for the payment
//     image: "https://your-logo-url.com/logo.png", // Your company's logo (optional)
//     handler: function (response) {
//       // This function is called when the payment is successful
//       alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
//       console.log(response);
//       // Redirect to the success page after successful payment
//       window.location.href = "success.html";
//     },
//     prefill: {
//       name: "Customer Name", // Prefill customer name (this can be dynamic based on user data)
//       email: "customer@example.com", // Prefill customer email
//       contact: "9876543210", // Prefill customer phone number
//     },
//     theme: {
//       color: "#3399cc", // Color theme for the Razorpay popup
//     },
//     modal: {
//       ondismiss: function () {
//         // Handle when the Razorpay modal is dismissed (payment cancelled)
//         alert("Payment Cancelled.");
//       },
//     },
//   };

//   // Display the total amount in the summary on the page
//   document.getElementById("amount-summary").innerText = `₹${parseFloat(
//     totalAmount
//   ).toFixed(2)}`;

//   // Add a click event listener to the "Pay Now" button
//   const payButton = document.getElementById("pay-now");
//   payButton.addEventListener("click", function (e) {
//     e.preventDefault(); // Prevent the default button action
//     const rzp1 = new Razorpay(options); // Create a new Razorpay instance with the options
//     rzp1.open(); // Open the Razorpay payment modal
//   });
// });
