import { useEffect, useState } from "react";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { useCartStore } from "../store/useCartStore";

const FeaturedProducts = ({ featuredProducts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const { addToCart } = useCartStore();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerPage(1);
      else if (window.innerWidth < 1024) setItemsPerPage(2);
      else if (window.innerWidth < 1280) setItemsPerPage(3);
      else setItemsPerPage(4);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    if (currentIndex < featuredProducts.length - itemsPerPage) {
      setCurrentIndex((prevIndex) => prevIndex + itemsPerPage);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - itemsPerPage);
    }
  };

  const isStartDisabled = currentIndex === 0;
  const isEndDisabled =
    currentIndex >= featuredProducts.length - itemsPerPage;

  return (
    <div className="py-6">
      <div className="relative">

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${
                (currentIndex * 100) / itemsPerPage
              }%)`,
            }}
          >
            {featuredProducts?.map((product) => (
              <div
                key={product._id}
                className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex-shrink-0 px-3"
              >
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">

                  {/* Image */}
                  <div className="overflow-hidden rounded-t-xl">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover hover:scale-105 transition duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold text-black mb-2">
                      {product.name}
                    </h3>

                    <p className="text-gray-700 font-medium mb-4">
                      ₹{product.price.toFixed(2)}
                    </p>

                    <button
                      onClick={() => addToCart(product)}
                      className="mt-auto w-full bg-black text-white font-medium py-2 rounded-lg hover:bg-gray-800 transition duration-300 flex items-center justify-center"
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          disabled={isStartDisabled}
          className={`absolute top-1/2 -left-5 transform -translate-y-1/2 p-3 rounded-full shadow-md transition ${
            isStartDisabled
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-white hover:bg-gray-200"
          }`}
        >
          <ChevronLeft className="w-6 h-6 text-black" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          disabled={isEndDisabled}
          className={`absolute top-1/2 -right-5 transform -translate-y-1/2 p-3 rounded-full shadow-md transition ${
            isEndDisabled
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-white hover:bg-gray-200"
          }`}
        >
          <ChevronRight className="w-6 h-6 text-black" />
        </button>
      </div>
    </div>
  );
};

export default FeaturedProducts;