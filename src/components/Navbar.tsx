import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';
import './Navbar.css';

const Navbar = () => {
  const { getCartItemsCount } = useCart();
  const { user, isGuest, signOut } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const itemCount = getCartItemsCount();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    setShowUserMenu(false);
    navigate('/');
  };

  const getDisplayName = () => {
    if (isGuest) return 'Guest';
    return user?.displayName || user?.email?.split('@')[0] || 'User';
  };

  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        <Link to='/' className='navbar-logo'>
          <span className='logo-icon'>🛍️</span>
          <span>ShopHub</span>
        </Link>

        <div className='navbar-links'>
          <Link to='/' className='nav-link'>
            Products
          </Link>
          <Link to='/cart' className='nav-link cart-link'>
            <span className='cart-icon'>🛒</span>
            Cart
            {itemCount > 0 && <span className='cart-badge'>{itemCount}</span>}
          </Link>
          <ThemeToggle />

          {/* User Menu */}
          {user || isGuest ? (
            <div className='user-menu'>
              <button
                className='user-menu-trigger'
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt='Profile'
                    className='user-avatar'
                  />
                ) : (
                  <span className='user-avatar-icon'>
                    {isGuest ? '👤' : '👤'}
                  </span>
                )}
                <span className='user-name'>{getDisplayName()}</span>
              </button>

              {showUserMenu && (
                <div className='user-dropdown'>
                  {!isGuest && user?.email && (
                    <div className='user-email'>{user.email}</div>
                  )}
                  {isGuest && <div className='guest-badge'>Guest Mode</div>}
                  <button onClick={handleSignOut} className='signout-btn'>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to='/login' className='login-btn'>
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
