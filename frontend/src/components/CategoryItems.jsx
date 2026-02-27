import { Link } from "react-router-dom";

const CategoryItem = ({ category }) => {
  return (
    <Link to={"/category" + category.href}>
      <div
        className="relative group h-96 w-full rounded-2xl overflow-hidden 
        cursor-pointer transform transition duration-500 
        hover:-translate-y-3 hover:scale-[1.02]"
      >

        {/* RGB Glow Border */}
        <div className="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-r 
        from-cyan-500 via-purple-500 to-pink-500 opacity-0 
        group-hover:opacity-100 blur-sm transition duration-500"></div>

        {/* Image */}
        <img
          src={category.imageUrl}
          alt={category.name}
          className="w-full h-full object-cover transition duration-700 
          group-hover:scale-110"
          loading="lazy"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t 
        from-black/90 via-black/40 to-transparent 
        opacity-70 group-hover:opacity-90 transition duration-500"></div>

        {/* Glass Content */}
        <div
          className="absolute bottom-0 left-0 right-0 p-6 
          backdrop-blur-md bg-white/5 border-t border-white/10 
          text-white z-20 transition duration-500"
        >
          <h3 className="text-3xl font-extrabold bg-gradient-to-r 
          from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            {category.name}
          </h3>

          <p className="text-gray-300 mt-2 text-sm tracking-wide">
            Explore {category.name}
          </p>

          {/* Animated Underline */}
          <div className="mt-3 h-[2px] w-0 bg-gradient-to-r 
          from-cyan-400 to-purple-500 
          group-hover:w-full transition-all duration-500"></div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryItem;