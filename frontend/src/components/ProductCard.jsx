import React from "react";
import { ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import { useUserStore } from "../store/useUserstore";
import { useCartStore } from "../store/useCartStore";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { addToCart } = useCartStore();
  const { user } = useUserStore();

  const handleAddToCart = (e) => {
    e.stopPropagation(); // 🔥 important
    e.preventDefault();  // 🔥 prevent link navigation

    if (!user) {
      return toast.error("please login to add products to cart");
    }

    addToCart(product);
    toast.success("added to cart");
  };

  return (
    <Link to={`/product/${product._id}`}>
      <div className="flex w-full relative flex-col overflow-hidden rounded-lg border border-gray-700 shadow-lg hover:shadow-xl transition duration-300 cursor-pointer">

        {/* IMAGE */}
        <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
          <img
            className="object-cover w-full hover:scale-105 transition duration-300"
            src={product.image}
            alt="product"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20" />
        </div>

        {/* DETAILS */}
        <div className="mt-4 px-5 pb-5">
          <h5 className="text-xl font-semibold tracking-tight text-black">
            {product.name}
          </h5>

          <div className="mt-2 mb-5 flex items-center justify-between">
            <span className="text-2xl font-bold text-black">
              ₹{product.price}
            </span>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-white bg-black hover:bg-gray-800 transition"
          >
            <ShoppingCart size={20} className="mr-2" />
            Add to cart
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;