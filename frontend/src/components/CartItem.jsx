import React from "react";
import { Minus, Plus, Trash } from "lucide-react";
import { useCartStore } from "../store/useCartStore";

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCartStore();

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition duration-300">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

        {/* Product Image */}
        <div className="shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="h-24 w-24 md:h-28 md:w-28 object-cover rounded-xl border border-gray-200"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 space-y-2">
          <h3 className="text-lg md:text-xl font-semibold text-black">
            {item.name}
          </h3>

          <p className="text-sm text-gray-600 line-clamp-2">
            {item.description}
          </p>

          <p className="text-xl font-bold text-black">
            ₹{item.price.toFixed(2)}
          </p>
        </div>

        {/* Quantity + Remove */}
        <div className="flex flex-col items-end gap-4">

          {/* Quantity Controls */}
          <div className="flex items-center gap-3 border border-gray-300 px-3 py-2 rounded-lg">

            <button
              disabled={item.quantity <= 1}
              onClick={() =>
                item.quantity > 1 &&
                updateQuantity(item._id, item.quantity - 1)
              }
              className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-40 transition"
            >
              <Minus size={16} className="text-black" />
            </button>

            <span className="text-black font-semibold w-6 text-center">
              {item.quantity}
            </span>

            <button
              onClick={() =>
                updateQuantity(item._id, item.quantity + 1)
              }
              className="p-1 rounded-md hover:bg-gray-100 transition"
            >
              <Plus size={16} className="text-black" />
            </button>
          </div>

          {/* Remove Button */}
          <button
            onClick={() => removeFromCart(item._id)}
            className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600 transition"
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