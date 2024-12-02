document.addEventListener("DOMContentLoaded", function () {
  const totalAmount = localStorage.getItem("totalAmount");

  if (!totalAmount) {
    alert("No payment amount found. Redirecting to checkout.");
    window.location.href = "checkout.html";
    return;
  }

  document.getElementById("total-amount").innerText = `₹${totalAmount}`;

  const payButton = document.getElementById("pay-button");
  payButton.addEventListener("click", function () {
    fetch("/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: totalAmount }),
    })
      .then((response) => response.json())
      .then((data) => {
        const options = {
          key: "rzp_test_wXN4Trx0gv8vzT",
          amount: data.amount,
          currency: "INR",
          name: "Your Company",
          description: "Test Payment",
          order_id: data.orderId,
          handler: function (response) {
            fetch("/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                signature: response.razorpay_signature,
              }),
            })
              .then((res) => res.json())
              .then((result) => {
                if (result.success) {
                  alert("Payment Successful!");
                  window.location.href = "success.html";
                } else {
                  alert("Payment Verification Failed!");
                  window.location.href = "failure.html";
                }
              });
          },
          prefill: {
            name: "John Doe",
            email: "john@example.com",
            contact: "9999999999",
          },
          theme: { color: "#3399cc" },
        };

        const rzp = new Razorpay(options);
        rzp.open();
      })
      .catch((err) => {
        console.error("Error creating Razorpay order:", err);
        alert("Something went wrong. Please try again.");
      });
  });
});
