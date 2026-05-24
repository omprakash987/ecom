import React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "../store/useCartStore";
import { Link } from "react-router-dom";

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCartStore();

  return (
    <div
      className="bg-white border border-gray-100 rounded-xl p-3 md:p-4 hover:shadow-md transition-shadow duration-200"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="flex gap-3 md:gap-4">

        {/* Product Image */}
        <Link to={`/product/${item._id}`} className="flex-shrink-0">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-contain p-1"
            />
          </div>
        </Link>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <Link to={`/product/${item._id}`}>
            <h3 className="text-sm md:text-base font-semibold text-gray-800 leading-snug line-clamp-2 hover:text-[#0a1628]">
              {item.name}
            </h3>
          </Link>

          {item.description && (
            <p className="text-xs text-gray-400 mt-0.5 line-clamp-1 hidden md:block">
              {item.description}
            </p>
          )}

          {/* Price row */}
          <div className="flex items-baseline gap-2 mt-1.5">
            <span className="text-base md:text-lg font-black text-[#0a1628]">
              ₹{(item.price * item.quantity).toFixed(0)}
            </span>
            {item.quantity > 1 && (
              <span className="text-xs text-gray-400">
                ₹{item.price.toFixed(0)} each
              </span>
            )}
          </div>

          {/* Controls row */}
          <div className="flex items-center justify-between mt-2.5">
            {/* Quantity stepper */}
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
              <button
                disabled={item.quantity <= 1}
                onClick={() =>
                  item.quantity > 1 && updateQuantity(item._id, item.quantity - 1)
                }
                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                <Minus size={13} />
              </button>
              <span className="w-8 h-8 flex items-center justify-center text-sm font-bold text-[#0a1628] border-x border-gray-200">
                {item.quantity}
              </span>
              <button
                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition"
              >
                <Plus size={13} />
              </button>
            </div>

            {/* Remove */}
            <button
              onClick={() => removeFromCart(item._id)}
              className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600 transition font-medium"
            >
              <Trash2 size={13} />
              <span>Remove</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CartItem;