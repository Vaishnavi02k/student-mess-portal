import React, { useEffect } from "react";

const PaymentSuccess = () => {
  const username = localStorage.getItem("username");
  useEffect(() => {
    // Set timeout to redirect to the dashboard after 5 seconds
    const timer = setTimeout(() => {
      window.location.href =    window.location.href = `/${username}/dashboard`; ;  // Redirect to dashboard
    }, 5000); // 5 seconds delay

    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, [username]);

  return (
    <div className="payment-success-container pt-40">
      <h2 className="text-center text-4xl font-bold text-green-600 ">Payment Successful!</h2>
      <p className="text-center text-lg font-extrabold">Thank you for your payment. You will be redirected to your dashboard shortly.</p>
    </div>
  );
};

export default PaymentSuccess;
