import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Products from './pages/Products';
import Cart from './pages/Cart';

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  const handleAddToCart = async (productId: number) => {
    try {
      await fetch('http://localhost:3000/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token || '',
        },
        body: JSON.stringify({ productId }),
      });
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  const isAuthenticated = !!token;

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Routes */}
      <div className="container mx-auto py-6">
        <Routes>
          <Route
            path="/"
            element={<Products token={token} onAddToCart={handleAddToCart} />}
          />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
          />
          <Route
            path="/cart"
            element={isAuthenticated ? <Cart token={token} /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
