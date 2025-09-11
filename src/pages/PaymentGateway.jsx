import React from "react";

const PaymentGateway = () => {
    const loadRazorpay = () => {
        return new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          script.async = true;
          script.onload = () => resolve(true);
          script.onerror = () => resolve(false);
          document.body.appendChild(script);
        });
      };
      
      const handlePayment = async () => {
        const isLoaded = await loadRazorpay();
        if (!isLoaded) {
          alert("Razorpay SDK failed to load. Check your internet connection.");
          return;
        }
      
        const options = {
          key: "rzp_test_1234567890abcdef", // Use your actual Razorpay Key
          amount: 50000, // Amount in paisa (₹500.00)
          currency: "INR",
          name: "Itdose Infosystems Pvt Ltd.",
          description: "Project Transaction",
          image: "https://your-logo-url.com/logo.png",
          handler: function (response) {
            alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
          },
          prefill: {
            name: "Raj Kamal",
            email: "raj.kamal@itdoseinfo.com",
            contact: "9430978818",
          },
          theme: {
            color: "#3399cc",
          },
        };
      
        const rzp = new window.Razorpay(options);
        rzp.open();
      };
      

  return (
    <div>
      {/* <h2>Razorpay Payment Gateway</h2> */}
      <button className="btn btn-sm bg-success" style={{borderRadius:"5px"}} onClick={handlePayment}>Payment</button>
    </div>
  );
};

export default PaymentGateway;
