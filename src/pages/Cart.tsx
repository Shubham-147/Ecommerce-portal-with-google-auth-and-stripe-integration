import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className='empty-cart'>
        <div className='empty-cart-icon'>🛒</div>
        <h2>Your cart is empty</h2>
        <p>Add some products to get started!</p>
        <Link to='/' className='continue-shopping-btn'>
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className='cart-page'>
      <h1>Shopping Cart</h1>

      <div className='cart-content'>
        <div className='cart-items'>
          {cart.map((item) => (
            <div key={item.id} className='cart-item'>
              <img
                src={item.image}
                alt={item.name}
                className='cart-item-image'
              />

              <div className='cart-item-details'>
                <h3>{item.name}</h3>
                <p className='cart-item-description'>{item.description}</p>
                <span className='cart-item-category'>{item.category}</span>
              </div>

              <div className='cart-item-actions'>
                <div className='quantity-controls'>
                  <button
                    className='quantity-btn'
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span className='quantity'>{item.quantity}</span>
                  <button
                    className='quantity-btn'
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    disabled={item.quantity >= item.stock}
                  >
                    +
                  </button>
                </div>

                <div className='cart-item-price'>
                  ₹{(item.price * item.quantity).toFixed(2)}
                </div>

                <button
                  className='remove-btn'
                  onClick={() => removeFromCart(item.id)}
                  title='Remove from cart'
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className='cart-summary'>
          <h2>Order Summary</h2>

          <div className='summary-row'>
            <span>Subtotal</span>
            <span>₹{getCartTotal().toFixed(2)}</span>
          </div>

          <div className='summary-row'>
            <span>Shipping</span>
            <span>Free</span>
          </div>

          <div className='summary-row'>
            <span>Tax (estimate)</span>
            <span>₹{(getCartTotal() * 0.1).toFixed(2)}</span>
          </div>

          <div className='summary-divider'></div>

          <div className='summary-row total'>
            <span>Total</span>
            <span>₹{(getCartTotal() * 1.1).toFixed(2)}</span>
          </div>

          <button className='checkout-btn' onClick={handleCheckout}>
            Proceed to Checkout
          </button>

          <Link to='/' className='continue-link'>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
