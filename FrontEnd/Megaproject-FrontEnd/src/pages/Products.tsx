import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface ProductsProps {
  token: string | null;
  onAddToCart: (productId: number) => void;
}

const Products: React.FC<ProductsProps> = ({ token }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3000/products').then((res) => setProducts(res.data));
  }, []);

  const handleAddToCart = async (productId: number) => {
    try {
      if (!token) {
        console.error('User not logged in. No token found.');
        return;
      }

      const response = await axios.post(
        'http://localhost:3000/cart',
        { productId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('Add to cart response:', response.data);
      alert('Product added to cart!');
    } catch (err: any) {
      console.error('Error adding to cart:', err.response?.data || err.message);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart}
          token={token}
        />
      ))}
    </div>
  );
};


export default Products;
