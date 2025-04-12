import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const PaymentForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return; // Ensure Stripe is loaded

    setLoading(true);

    // Create payment method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.error(error);
      setLoading(false);
    } else {
      // Send paymentMethod.id to your backend (Firebase Function)
      const response = await fetch('/create-payment-intent', {  // Endpoint to your Firebase function
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentMethodId: paymentMethod.id, amount }),
      });

      const paymentIntent = await response.json();

      // Confirm the payment on the client
      const { error: confirmError } = await stripe.confirmCardPayment(paymentIntent.clientSecret);

      if (confirmError) {
        console.error(confirmError);
        setLoading(false);
      } else {
        // Payment successful, do something (e.g., show confirmation)
        alert('Payment Successful!');
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={loading || !stripe}>Pay {amount}</button>
    </form>
  );
};

export default PaymentForm;
