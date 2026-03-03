import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "../lib/axios";
import { useCartStore } from "../store/useCartStore";
import { ShoppingCart } from "lucide-react";

const SearchPage = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const { addToCart } = useCartStore();

  useEffect(() => {
    const query = new URLSearchParams(location.search).get("q");

    if (query) {
      axios.get(`/products/search?q=${query}`).then((res) => {
        setResults(res.data);
      });
    }
  }, [location.search]);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-16">
      <h1 className="text-2xl font-bold mb-10 text-black">
        Search Results
      </h1>

      {results.length === 0 ? (
        <p className="text-gray-600">No products found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {results.map((product) => (
            <div
              key={product._id}
              className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm hover:shadow-md transition duration-300 flex flex-col"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-40 w-full object-cover rounded-md mb-4"
              />

              <h3 className="font-semibold text-black mb-2">
                {product.name}
              </h3>

              <p className="text-gray-600 mb-4">
                ₹{product.price}
              </p>

              <button
                onClick={() => addToCart(product)}
                className="mt-auto bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition flex items-center justify-center"
              >
                <ShoppingCart size={18} className="mr-2" />
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;