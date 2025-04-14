import React, { useEffect } from "react";

const PaymentCancel = () => {
  useEffect(() => {
    // Set timeout to redirect to the dashboard after 5 seconds
    const timer = setTimeout(() => {
      window.location.href = "/";  // Redirect to dashboard
    }, 5000); // 5 seconds delay

    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, []);

  return (
    <div className="payment-cancel-container">
      <h2 className="text-center text-3xl text-red-600">Payment Canceled</h2>
      <p className="text-center text-lg">Your payment was not processed. You will be redirected to your dashboard shortly.</p>
    </div>
  );
};

export default PaymentCancel;
