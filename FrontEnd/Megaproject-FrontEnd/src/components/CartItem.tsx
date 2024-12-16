import React from 'react';

interface CartItemProps {
  item: { productId: number; name: string; price: number };
  onRemove: (productId: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove }) => (
  <div className="flex items-center justify-between p-4 bg-white shadow-md rounded-md mb-4">
    <div>
      <h2 className="text-lg font-bold text-gray-800">{item.name}</h2>
      <p className="text-gray-600">Price: ${item.price}</p>
    </div>
    <button
      onClick={() => onRemove(item.productId)}
      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
    >
      Remove
    </button>
  </div>
);

export default CartItem;
