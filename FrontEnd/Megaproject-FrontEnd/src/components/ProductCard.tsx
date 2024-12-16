import React from 'react';

interface ProductCardProps {
  product: { id: number; name: string; price: number };
  onAddToCart: (productId: number) => void;
  token: string | null;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, token }) => (
  <div className="flex flex-col p-4 bg-white shadow-md rounded-md">
    <h2 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h2>
    <p className="text-gray-600 mb-4">Price: ${product.price}</p>
    {token && (
      <button
        onClick={() => onAddToCart(product.id)}
        className="mt-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        Add to Cart
      </button>
    )}
  </div>
);


export default ProductCard;
