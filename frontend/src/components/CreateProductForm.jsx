import React from 'react'
import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader } from "lucide-react";
import { useProductStore } from '../store/useProductStore';
const categories = ["protein", "creatine","whey"];

const CreateProductForm = () => {
  const [newProduct, setNewProduct] = useState({
		name: "",
		description: "",
		price: "",
		category: "",
		image: "",
	});
  const {createProduct,loading} = useProductStore(); 

  const handleSubmit = async(e)=>{
    e.preventDefault(); 
try {
  await createProduct(newProduct); 
setNewProduct({name:'',description:"",price:"",category:"",image:""}); 

} catch (error) {
  console.log("error creating a product"); 
}   

  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
  
      reader.onload = () => {
        setNewProduct({ ...newProduct, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };
  


  return (
  <motion.div
  className="relative max-w-2xl mx-auto mt-10"
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>

  {/* RGB Border Glow */}
  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r 
  from-cyan-500 via-purple-500 to-pink-500 blur-lg opacity-20"></div>

  <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 
  rounded-2xl shadow-[0_0_40px_rgba(0,255,255,0.1)] p-10">

    <h2 className="text-3xl font-extrabold mb-8 bg-gradient-to-r 
    from-cyan-400 to-purple-500 bg-clip-text text-transparent">
      Create New Product
    </h2>

    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Name */}
      <div>
        <label className="block text-sm text-gray-400 mb-2">
          Product Name
        </label>
        <input
          type="text"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
          className="w-full px-4 py-3 rounded-xl bg-black/40 border border-gray-700 
          text-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 
          transition duration-300 outline-none"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm text-gray-400 mb-2">
          Description
        </label>
        <textarea
          rows="3"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
          className="w-full px-4 py-3 rounded-xl bg-black/40 border border-gray-700 
          text-white focus:ring-2 focus:ring-purple-400 focus:border-purple-400 
          transition duration-300 outline-none"
          required
        />
      </div>

      {/* Price & Category Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Price
          </label>
          <input
            type="number"
            step="0.01"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-gray-700 
            text-white focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 
            transition duration-300 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Category
          </label>
          <select
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-gray-700 
            text-white focus:ring-2 focus:ring-pink-400 focus:border-pink-400 
            transition duration-300 outline-none"
            required
          >
            <option value="">Select</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Image Upload */}
      <div>
        <input
          type="file"
          id="image"
          className="hidden"
          accept="image/*"
          onChange={handleImageChange}
        />
        <label
          htmlFor="image"
          className="flex items-center justify-center gap-2 px-4 py-3 
          rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 
          hover:scale-105 hover:shadow-[0_0_20px_rgb(147,51,234)] 
          transition duration-300 cursor-pointer text-white"
        >
          <Upload size={18} />
          Upload Image
        </label>

        {newProduct.image && (
          <div className="mt-4">
            <img
              src={newProduct.image}
              alt="preview"
              className="w-full h-48 object-cover rounded-xl border border-gray-700"
            />
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-xl text-white font-semibold
        bg-gradient-to-r from-cyan-500 to-emerald-500
        hover:scale-105 hover:shadow-[0_0_25px_rgb(16,185,129)]
        transition duration-300 flex justify-center items-center gap-2 disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader className="animate-spin" size={18} />
            Creating...
          </>
        ) : (
          <>
            <PlusCircle size={18} />
            Create Product
          </>
        )}
      </button>

    </form>
  </div>
</motion.div>
  )
}

export default CreateProductForm