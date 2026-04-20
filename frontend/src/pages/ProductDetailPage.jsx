import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../lib/axios.js";
import { ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import { useCartStore } from "../store/useCartStore.js";
import { useUserStore } from "../store/useUserstore.js";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const {addToCart} = useCartStore()
  const {user} = useUserStore(); 


   const handleAddToCart = (e) => {
    e.stopPropagation(); // 🔥 important
    e.preventDefault();  // 🔥 prevent link navigation

    if (!user) {
      return toast.error("please login to add products to cart");
    }

    addToCart(product);
    toast.success("added to cart");
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`products/product/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 text-black mt-20">

      <div className="grid md:grid-cols-2 gap-10">

        {/* Images */}
        <div>
          <img
            src={product.image}
            className="w-full rounded-xl"
          />
        </div>

        {/* Details */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-4">
            {product.name}
          </h1>

          <p className="text-gray-600 mb-4">
            {product.description}
          </p>

          <p className="text-xl font-semibold mb-6">
            ₹ {product.price}
          </p>

          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-white bg-black hover:bg-gray-800 transition"
          >
            <ShoppingCart size={20} className="mr-2" />
            Add to cart
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductDetailPage;