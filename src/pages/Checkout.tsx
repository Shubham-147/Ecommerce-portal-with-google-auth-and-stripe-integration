import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/CheckoutForm';
import { useCart } from '../context/CartContext';
import './Checkout.css';

// Replace with your actual Stripe publishable key
const stripePromise = loadStripe(
  'pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3'
);

const Checkout = () => {
  const { cart, getCartTotal } = useCart();
  const navigate = useNavigate();
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
  });

  if (cart.length === 0) {
    return (
      <div className='empty-checkout'>
        <h2>Your cart is empty</h2>
        <p>Add items to your cart before checking out.</p>
        <button onClick={() => navigate('/')} className='back-to-shop-btn'>
          Back to Shop
        </button>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='checkout-page'>
      <h1>Checkout</h1>

      <div className='checkout-content'>
        <div className='checkout-form-section'>
          <div className='shipping-section'>
            <h2>Shipping Information</h2>
            <div className='form-grid'>
              <div className='form-group full-width'>
                <label>Full Name</label>
                <input
                  type='text'
                  name='fullName'
                  value={shippingInfo.fullName}
                  onChange={handleShippingChange}
                  placeholder='John Doe'
                  required
                />
              </div>

              <div className='form-group full-width'>
                <label>Email</label>
                <input
                  type='email'
                  name='email'
                  value={shippingInfo.email}
                  onChange={handleShippingChange}
                  placeholder='john@example.com'
                  required
                />
              </div>

              <div className='form-group full-width'>
                <label>Address</label>
                <input
                  type='text'
                  name='address'
                  value={shippingInfo.address}
                  onChange={handleShippingChange}
                  placeholder='123 Main St'
                  required
                />
              </div>

              <div className='form-group'>
                <label>City</label>
                <input
                  type='text'
                  name='city'
                  value={shippingInfo.city}
                  onChange={handleShippingChange}
                  placeholder='New York'
                  required
                />
              </div>

              <div className='form-group'>
                <label>State</label>
                <input
                  type='text'
                  name='state'
                  value={shippingInfo.state}
                  onChange={handleShippingChange}
                  placeholder='NY'
                  required
                />
              </div>

              <div className='form-group'>
                <label>ZIP Code</label>
                <input
                  type='text'
                  name='zipCode'
                  value={shippingInfo.zipCode}
                  onChange={handleShippingChange}
                  placeholder='10001'
                  required
                />
              </div>

              <div className='form-group'>
                <label>Country</label>
                <input
                  type='text'
                  name='country'
                  value={shippingInfo.country}
                  onChange={handleShippingChange}
                  placeholder='US'
                  required
                />
              </div>
            </div>
          </div>

          <div className='payment-section'>
            <h2>Payment Information</h2>
            <Elements stripe={stripePromise}>
              <CheckoutForm amount={total} shippingInfo={shippingInfo} />
            </Elements>
          </div>
        </div>

        <div className='order-summary-section'>
          <h2>Order Summary</h2>

          <div className='order-items'>
            {cart.map((item) => (
              <div key={item.id} className='order-item'>
                <img src={item.image} alt={item.name} />
                <div className='order-item-details'>
                  <h4>{item.name}</h4>
                  <p>Qty: {item.quantity}</p>
                </div>
                <span className='order-item-price'>
                  ₹{(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className='order-totals'>
            <div className='total-row'>
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className='total-row'>
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className='total-row'>
              <span>Tax</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className='total-divider'></div>
            <div className='total-row final-total'>
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
