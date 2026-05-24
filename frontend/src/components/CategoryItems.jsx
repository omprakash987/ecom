import React from "react";
import { Link } from "react-router-dom";

const CategoryItem = ({ category }) => {
  return (
    <Link to={category.href} className="block group">
      <div className="relative overflow-hidden rounded-xl bg-gray-50 border border-gray-100 hover:border-[#f5a623] hover:shadow-lg transition-all duration-300">

        {/* Image */}
        <div className="aspect-square overflow-hidden bg-gray-100">
          <img
            src={category.imageUrl}
            alt={category.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Bottom overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Text */}
        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
          <h3
            className="text-white font-black text-lg md:text-xl uppercase leading-tight"
            style={{ fontFamily: "'Bebas Neue', cursive", letterSpacing: "0.04em" }}
          >
            {category.name}
          </h3>
          <p className="text-white/60 text-xs mt-0.5 group-hover:text-[#f5a623] transition-colors font-medium">
            Shop Now →
          </p>
          {/* Amber underline on hover */}
          <div className="mt-1.5 h-[2px] w-0 bg-[#f5a623] group-hover:w-full transition-all duration-400 rounded-full" />
        </div>

      </div>
    </Link>
  );
};

export default CategoryItem;