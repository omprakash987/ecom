import React from "react";
import { Minus, Plus, Trash } from "lucide-react";
import { useCartStore } from "../store/useCartStore";

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCartStore();

  return (
    <div className="rounded-2xl border border-gray-700 bg-gray-800/80 backdrop-blur-md p-5 shadow-lg hover:shadow-emerald-500/10 transition-all duration-300">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        
        {/* Product Image */}
        <div className="shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="h-24 w-24 md:h-32 md:w-32 object-cover rounded-xl border border-gray-700"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 space-y-2">
          <h3 className="text-lg md:text-xl font-semibold text-white hover:text-emerald-400 transition">
            {item.name}
          </h3>

          <p className="text-sm text-gray-400 line-clamp-2">
            {item.description}
          </p>

          <p className="text-xl font-bold text-emerald-400">
            ${item.price.toFixed(2)}
          </p>
        </div>

        {/* Quantity Controls */}
        <div className="flex flex-col items-end gap-4">
          
          <div className="flex items-center gap-3 bg-gray-700/60 px-3 py-2 rounded-xl">
            <button
              disabled={item.quantity <= 1}
              onClick={() =>
                item.quantity > 1 &&
                updateQuantity(item._id, item.quantity - 1)
              }
              className="p-1 rounded-lg bg-gray-600 hover:bg-gray-500 disabled:opacity-40 transition"
            >
              <Minus size={16} className="text-white" />
            </button>

            <span className="text-white font-semibold w-6 text-center">
              {item.quantity}
            </span>

            <button
              onClick={() =>
                updateQuantity(item._id, item.quantity + 1)
              }
              className="p-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 transition"
            >
              <Plus size={16} className="text-white" />
            </button>
          </div>

          {/* Remove Button */}
          <button
            onClick={() => removeFromCart(item._id)}
            className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition"
          >
            <Trash size={16} />
            Remove
          </button>
        </div>

      </div>
    </div>
  );
};

export default CartItem;