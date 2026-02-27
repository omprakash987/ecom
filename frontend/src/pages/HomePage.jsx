import React, { useEffect } from "react";
import CategoryItem from "../components/CategoryItems";
import { useProductStore } from "../store/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";

const categories = [
  { href: "/whey", name: "Whey Protein", imageUrl: "/whey.jpeg" },
  { href: "/protein", name: "Mass Gainer", imageUrl: "/proton.jpeg" },
];

const HomePage = () => {
  const { fetchFeaturedProducts, products, isLoading } = useProductStore();

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* Animated Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600 rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500 rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-pulse"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">

        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
            Fuel Your Strength
          </h1>
          <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto">
            Premium supplements crafted to power your performance and maximize results.
          </p>

          <div className="mt-8">
            <a
              href="#categories"
              className="px-8 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 
              hover:scale-105 hover:shadow-[0_0_25px_rgb(16,185,129)]
              transition duration-300"
            >
              Shop Now
            </a>
          </div>
        </div>

        {/* Categories Section */}
        <section id="categories">
          <h2 className="text-3xl font-bold mb-10 text-center text-gray-200">
            Explore Categories
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {categories.map((category) => (
              <div
                key={category.name}
                className="backdrop-blur-xl bg-white/5 border border-white/10 
                rounded-2xl p-4 hover:scale-105 hover:shadow-[0_0_25px_rgba(0,255,255,0.2)]
                transition duration-300"
              >
                <CategoryItem category={category} />
              </div>
            ))}
          </div>
        </section>

        {/* Featured Products Section */}
        {!isLoading && products.length > 0 && (
          <section className="mt-24">
            <h2 className="text-3xl font-bold mb-10 text-center bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Featured Products
            </h2>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 
            rounded-2xl p-6 shadow-[0_0_40px_rgba(255,0,255,0.1)]">
              <FeaturedProducts featuredProducts={products} />
            </div>
          </section>
        )}

      </div>
    </div>
  );
};

export default HomePage;