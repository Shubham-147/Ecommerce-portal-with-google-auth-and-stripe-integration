import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import './App.css';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <div className='app'>
              <Navbar />
              <main className='main-content'>
                <Routes>
                  <Route path='/' element={<Products />} />
                  <Route path='/cart' element={<Cart />} />
                  <Route path='/login' element={<Login />} />
                  <Route
                    path='/checkout'
                    element={
                      <ProtectedRoute>
                        <Checkout />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </main>
              <footer className='footer'>
                <p>
                  &copy; 2024 ShopHub. All rights reserved. Built with React &
                  Stripe.
                </p>
              </footer>
            </div>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
