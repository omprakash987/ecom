import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CategoryItem from "../components/CategoryItems";
import { useProductStore } from "../store/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";
import Footer from "../components/Footer";

const categories = [
  { href: "/category/whey", name: "Whey Protein", imageUrl: "/whey.jpeg" },
  { href: "/category/protein", name: "Mass Gainer", imageUrl: "/proton.jpeg" },
  { href: "/category/creatine", name: "Creatine", imageUrl: "/creatine.jpg" },
  { href: "/category/preworkout", name: "Pre Workout", imageUrl: "/preworkout.webp" },
];

const HomePage = () => {
  const { fetchFeaturedProducts, products, isLoading } = useProductStore();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % categories.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % categories.length);
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? categories.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* ================= HERO SLIDER ================= */}
        <div className="relative w-full h-[420px] overflow-hidden rounded-2xl mb-20 bg-white shadow-md">

          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.href}
                className="min-w-full relative"
              >
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="w-full h-[420px] object-cover"
                />

                <div className="absolute bottom-10 left-10 bg-white px-6 py-3 rounded-lg shadow-md">
                  <h2 className="text-xl md:text-2xl font-semibold text-black">
                    {category.name}
                  </h2>
                  <p className="text-sm text-gray-700">
                    Shop Now →
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-5 top-1/2 -translate-y-1/2 bg-white shadow-md hover:bg-gray-200 p-3 rounded-full"
          >
            <ChevronLeft size={24} className="text-black" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-5 top-1/2 -translate-y-1/2 bg-white shadow-md hover:bg-gray-200 p-3 rounded-full"
          >
            <ChevronRight size={24} className="text-black" />
          </button>
        </div>
        {/* ================= END SLIDER ================= */}



        {/* ================= EXPLORE CATEGORIES ================= */}
        <section id="categories" className="mb-24">
          <h2 className="text-3xl font-bold mb-10 text-center text-black">
            Explore Categories
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <div
                key={category.name}
                className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-lg transition duration-300"
              >
                <CategoryItem category={category} />
              </div>
            ))}
          </div>
        </section>
        {/* ================= END EXPLORE ================= */}



        {/* ================= FEATURED PRODUCTS ================= */}
       {!isLoading && products.length > 0 && ( <section> <h2 className="text-3xl font-bold mb-10 text-center text-black"> Featured Products </h2> <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"> <FeaturedProducts featuredProducts={products} /> </div> </section> )}
        {/* ================= END FEATURED ================= */}

      </div>
      <Footer/>
    </div>
  );
};

export default HomePage;