import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCart } from '../context/CartContext';
import './CheckoutForm.css';

interface CheckoutFormProps {
  amount: number;
  shippingInfo: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

const CheckoutForm = ({ amount, shippingInfo }: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // Validate shipping info
    const { fullName, email, address, city, state, zipCode } = shippingInfo;
    if (!fullName || !email || !address || !city || !state || !zipCode) {
      setError('Please fill in all shipping information');
      return;
    }

    setProcessing(true);
    setError(null);

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setError('Card element not found');
      setProcessing(false);
      return;
    }

    try {
      // In a real application, you would create a payment intent on your server
      // and use the client secret here. For demo purposes, we'll simulate the payment

      // Create a payment method
      const { error: paymentError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
          billing_details: {
            name: fullName,
            email: email,
            address: {
              line1: address,
              city: city,
              state: state,
              postal_code: zipCode,
              country: shippingInfo.country,
            },
          },
        });

      if (paymentError) {
        setError(paymentError.message || 'Payment failed');
        setProcessing(false);
        return;
      }

      // Simulate successful payment
      // In production, you would send this to your backend to complete the payment
      console.log('Payment Method:', paymentMethod);

      setSuccess(true);
      clearCart();

      // Redirect to success page after 2 seconds
      setTimeout(() => {
        navigate('/', { state: { orderSuccess: true } });
      }, 2000);
    } catch (err) {
      setError('An unexpected error occurred');
      setProcessing(false);
    }
  };

  if (success) {
    return (
      <div className='payment-success'>
        <div className='success-icon'>✓</div>
        <h3>Payment Successful!</h3>
        <p>Your order has been placed successfully.</p>
        <p className='redirect-message'>Redirecting to home page...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className='checkout-form'>
      <div className='card-element-wrapper'>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#2d3436',
                '::placeholder': {
                  color: '#636e72',
                },
                fontFamily:
                  '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                fontSmoothing: 'antialiased',
              },
              invalid: {
                color: '#ff4757',
              },
            },
            hidePostalCode: true,
          }}
        />
      </div>

      {error && <div className='payment-error'>{error}</div>}

      <div className='payment-info'>
        <p className='secure-payment'>🔒 Secure payment powered by Stripe</p>
        <p className='test-card-info'>
          Test card: 4242 4242 4242 4242 | Any future date | Any 3-digit CVC
        </p>
      </div>

      <button
        type='submit'
        disabled={!stripe || processing}
        className='pay-button'
      >
        {processing ? 'Processing...' : `Pay ₹${amount.toFixed(2)}`}
      </button>
    </form>
  );
};

export default CheckoutForm;
