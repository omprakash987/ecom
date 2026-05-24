import { useEffect, useState } from "react";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { useCartStore } from "../store/useCartStore";
import { Link } from "react-router-dom";

const FeaturedProducts = ({ featuredProducts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const { addToCart } = useCartStore();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 480) setItemsPerPage(2);
      else if (window.innerWidth < 768) setItemsPerPage(2);
      else if (window.innerWidth < 1024) setItemsPerPage(3);
      else setItemsPerPage(4);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    if (currentIndex < featuredProducts.length - itemsPerPage) {
      setCurrentIndex((prev) => prev + itemsPerPage);
    }
  };
  const prevSlide = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - itemsPerPage);
  };

  const isStartDisabled = currentIndex === 0;
  const isEndDisabled = currentIndex >= featuredProducts.length - itemsPerPage;

  return (
    <div className="relative py-2">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${(currentIndex * 100) / itemsPerPage}%)` }}
        >
          {featuredProducts?.map((product) => (
            <div
              key={product._id}
              className="flex-shrink-0 px-1.5"
              style={{ width: `${100 / itemsPerPage}%` }}
            >
              <NutrabayProductCard product={product} addToCart={addToCart} />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={prevSlide}
        disabled={isStartDisabled}
        className={`absolute top-1/2 -left-4 -translate-y-1/2 w-8 h-8 rounded-full shadow-md flex items-center justify-center border transition ${
          isStartDisabled
            ? "bg-gray-100 border-gray-200 cursor-not-allowed"
            : "bg-white border-gray-200 hover:border-[#0a1628] hover:shadow-lg"
        }`}
      >
        <ChevronLeft size={16} className={isStartDisabled ? "text-gray-300" : "text-[#0a1628]"} />
      </button>
      <button
        onClick={nextSlide}
        disabled={isEndDisabled}
        className={`absolute top-1/2 -right-4 -translate-y-1/2 w-8 h-8 rounded-full shadow-md flex items-center justify-center border transition ${
          isEndDisabled
            ? "bg-gray-100 border-gray-200 cursor-not-allowed"
            : "bg-white border-gray-200 hover:border-[#0a1628] hover:shadow-lg"
        }`}
      >
        <ChevronRight size={16} className={isEndDisabled ? "text-gray-300" : "text-[#0a1628]"} />
      </button>
    </div>
  );
};

export const NutrabayProductCard = ({ product, addToCart }) => {
  const discountPct = product.mrp
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : null;

  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-300 flex flex-col h-full group">
      {/* Image + badge */}
      <div className="relative overflow-hidden bg-gray-50">
        <Link to={`/product/${product._id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-36 md:h-44 object-contain p-2 group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        {discountPct > 0 && (
          <span className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
            {discountPct}% OFF
          </span>
        )}
        {product.isFeatured && (
          <span className="absolute top-2 right-2 bg-[#f5a623] text-black text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide">
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-2.5 md:p-3 flex flex-col flex-grow">
        <Link to={`/product/${product._id}`}>
          <h3 className="text-xs md:text-sm font-semibold text-gray-800 leading-snug line-clamp-2 mb-1 hover:text-[#0a1628]">
            {product.name}
          </h3>
        </Link>

        {/* Stars placeholder */}
        <div className="flex items-center gap-1 mb-2">
          {[1,2,3,4,5].map((s) => (
            <svg key={s} className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-[10px] text-gray-400 ml-0.5">(4.5)</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1.5 mt-auto mb-2.5">
          <span className="text-sm md:text-base font-black text-[#0a1628]">
            ₹{product.price.toFixed(0)}
          </span>
          {product.mrp && (
            <span className="text-xs text-gray-400 line-through">₹{product.mrp}</span>
          )}
        </div>

        <button
          onClick={() => addToCart(product)}
          className="w-full bg-[#0a1628] text-white text-xs font-bold py-2 rounded-lg hover:bg-[#1e3a5f] transition-colors flex items-center justify-center gap-1.5"
        >
          <ShoppingCart size={13} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default FeaturedProducts;