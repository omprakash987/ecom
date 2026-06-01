import React from "react";
import { motion } from "framer-motion";
import { Trash, Star } from "lucide-react";
import { useProductStore } from "../store/useProductStore";

const ProductsList = () => {
  const { deleteProduct, toggleFeaturedProduct, products } =
    useProductStore();

  return (
    <motion.div
      className="max-w-7xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
        <table className="min-w-full">
          <thead className="bg-black text-white">
            <tr>
              <th className="px-6 py-4 text-left">Product</th>
              <th className="px-6 py-4 text-left">Price</th>
              <th className="px-6 py-4 text-left">Category</th>
              <th className="px-6 py-4 text-center">Featured</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products?.map((product) => (
              <tr
                key={product._id}
                className="border-t border-gray-100 hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-14 w-14 rounded-xl object-cover border"
                    />
                    <span className="font-semibold text-gray-800">
                      {product.name}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4 font-medium text-gray-700">
                  ₹{Number(product.price).toFixed(2)}
                </td>

                <td className="px-6 py-4">
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                    {product.category}
                  </span>
                </td>

                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => toggleFeaturedProduct(product._id)}
                    className={`p-2 rounded-full transition ${
                      product.isFeatured
                        ? "bg-yellow-400 text-black"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    <Star size={18} />
                  </button>
                </td>

                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition"
                  >
                    <Trash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="grid gap-4 lg:hidden">
        {products?.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-2xl shadow-md border border-gray-100 p-4"
          >
            <div className="flex gap-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-20 rounded-xl object-cover"
              />

              <div className="flex-1">
                <h3 className="font-bold text-gray-800">
                  {product.name}
                </h3>

                <p className="text-gray-500 text-sm mt-1">
                  {product.category}
                </p>

                <p className="font-semibold text-lg mt-2">
                  ₹{Number(product.price).toFixed(2)}
                </p>
              </div>
            </div>

            <div className="flex justify-between mt-4 pt-4 border-t">
              <button
                onClick={() => toggleFeaturedProduct(product._id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  product.isFeatured
                    ? "bg-yellow-400 text-black"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                <Star size={18} />
                Featured
              </button>

              <button
                onClick={() => deleteProduct(product._id)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-100 text-red-600"
              >
                <Trash size={18} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {products?.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl shadow">
          <h3 className="text-xl font-semibold text-gray-700">
            No Products Found
          </h3>
          <p className="text-gray-500 mt-2">
            Add your first product from the Create Product tab.
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default ProductsList;