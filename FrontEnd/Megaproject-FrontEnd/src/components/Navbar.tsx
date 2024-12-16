import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
       
        <Link to="/" className="font-bold text-lg">
          Shopping App
        </Link>

      
        <div className="space-x-4">
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/register" className="hover:underline">
                Register
              </Link>
            </>
          ) : (
            <>
              <Link to="/" className="hover:underline">
                Home
              </Link>
              <Link to="/cart" className="hover:underline">
                Cart
              </Link>
              <Link to="/profile" className="hover:underline">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="hover:underline text-red-400"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
