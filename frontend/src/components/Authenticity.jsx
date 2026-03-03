import React from "react";
import { Clock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ComingSoonPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">

      <motion.div
        className="bg-white border border-gray-100 shadow-md rounded-2xl p-10 max-w-xl w-full text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-gray-100 p-5 rounded-full">
            <Clock className="w-10 h-10 text-black" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">
          Coming Soon
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 mb-8">
          We're working hard to bring this feature to you.
          Stay tuned for something amazing 🚀
        </p>

        {/* Button */}
        <Link
          to="/"
          className="inline-flex items-center bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition duration-200"
        >
          <ArrowLeft className="mr-2" size={18} />
          Back to Home
        </Link>
      </motion.div>

    </div>
  );
};

export default ComingSoonPage;