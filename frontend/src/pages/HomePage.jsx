import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategoryItem from "../components/CategoryItems";
import { useProductStore } from "../store/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";
import Footer from "../components/Footer";
import ProductCard from '../components/ProductCard'
import TrandingInCreatine from "../components/TrandingInCreatine";
import TrandingInFishOil from "../components/TrandingInFishOil";


const categories = [
  { href: "/category/whey", name: "Protein", imageUrl: "/whey.jpeg" },
  { href: "/category/BCAA", name: "BCAA", imageUrl: "/BCAA.jpg" },
  { href: "/category/EAA", name: "EAA", imageUrl: "/EAA.jpg" },
  { href: "/category/FishOil", name: "Fish Oil", imageUrl: "/FishOil.avif" },
  { href: "/category/Multivitamin", name: "Multivitamin", imageUrl: "/Multivitamin.webp" },
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

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#1A1A1A]">

      {/* ================= FULL-WIDTH HERO SLIDER ================= */}
      <div className="relative w-full h-[88vh] overflow-hidden">
        {categories.map((category, index) => (
          <Link
            key={category.name}
            to={category.href}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={category.imageUrl}
              alt={category.name}
              className="w-full h-full object-cover object-center"
            />

            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

            {/* Text content */}
            <div className="absolute bottom-16 left-12 md:left-20 z-20">
              <p
                className="text-xs uppercase tracking-[0.3em] text-white/70 mb-2 font-light"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Featured Category
              </p>
              <h1
                className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight"
                style={{ fontFamily: "'Bebas Neue', cursive", letterSpacing: "0.03em" }}
              >
                {category.name}
              </h1>
              <span
                className="inline-flex items-center gap-2 text-white border border-white/50 px-6 py-2.5 rounded-full text-sm hover:bg-white hover:text-black transition-all duration-300"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Shop Now
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </div>
          </Link>
        ))}

        {/* Dot indicators */}
        <div className="absolute bottom-8 right-12 flex gap-2 z-20">
          {categories.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all duration-300 rounded-full ${
                i === current
                  ? "w-8 h-2 bg-white"
                  : "w-2 h-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>

        {/* Slide counter */}
        <div
          className="absolute top-8 right-12 z-20 text-white/60 text-sm tabular-nums"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          {String(current + 1).padStart(2, "0")} / {String(categories.length).padStart(2, "0")}
        </div>
      </div>
      {/* ================= END HERO SLIDER ================= */}


 


      {/* ================= EXPLORE CATEGORIES ================= */}
      <section
        id="categories"
        className="py-24 px-6"
        style={{
          background: "linear-gradient(180deg, #EFEFEC 0%, #F7F7F5 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col items-center mb-14">
            <p
              className="text-xs uppercase tracking-[0.35em] text-[#8C8C7A] mb-3"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Browse
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold text-[#1A1A1A] text-center"
              style={{ fontFamily: "'Bebas Neue', cursive", letterSpacing: "0.04em" }}
            >
              Explore Categories
            </h2>
            <div className="w-16 h-[3px] bg-[#C8A96E] mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.href}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-400 border border-[#E8E8E2]"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3
                    className="text-white font-semibold text-lg leading-tight"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {category.name}
                  </h3>
                  <p className="text-white/60 text-xs mt-0.5 group-hover:text-white/90 transition-colors">
                    Shop Now →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* ================= END EXPLORE ================= */}

<TrandingInCreatine/>
<TrandingInFishOil/>


      {/* ================= FEATURED PRODUCTS ================= */}
      {!isLoading && products.length > 0 && (
        <section className="py-24 px-6 bg-[#F7F7F5]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center mb-14">
              <p
                className="text-xs uppercase tracking-[0.35em] text-[#8C8C7A] mb-3"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Hand Picked
              </p>
              <h2
                className="text-4xl md:text-5xl font-bold text-[#1A1A1A] text-center"
                style={{ fontFamily: "'Bebas Neue', cursive", letterSpacing: "0.04em" }}
              >
                Featured Products
              </h2>
              <div className="w-16 h-[3px] bg-[#C8A96E] mt-4 rounded-full" />
            </div>
            <FeaturedProducts featuredProducts={products} />
          </div>
        </section>
      )}
      {/* ================= END FEATURED ================= */}

      <Footer />
    </div>
  );
};

export default HomePage;