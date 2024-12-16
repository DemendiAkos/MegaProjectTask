import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CartItem from '../components/CartItem';

interface CartItemData {
  productId: number;
  name: string;
  price: number;
}

const Cart: React.FC = () => {
  const [cart, setCart] = useState<CartItemData[]>([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('http://localhost:3000/cart', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCart(response.data);
      } catch (err: any) {
        console.error('Error fetching cart:', err.response?.data || err.message);
      }
    };

    fetchCart();
  }, [token]);

  const removeFromCart = async (productId: number) => {
    console.log('Attempting to delete productId:', productId); 

    try {
      await axios.delete(`http://localhost:3000/cart/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart((prev) => prev.filter((item) => item.productId !== productId));
      console.log(`Product with ID ${productId} removed successfully`);
    } catch (err: any) {
      console.error('Error deleting item:', err.response?.data || err.message);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {cart.map((item) => (
        <CartItem key={item.productId} item={item} onRemove={removeFromCart} />
      ))}
    </div>
  );
};

export default Cart;
