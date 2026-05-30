import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";
import Footer from "../components/Footer";
import TrandingInCreatine from "../components/TrandingInCreatine";
import TrandingInFishOil from "../components/TrandingInFishOil";
import { ChevronLeft, ChevronRight, ShieldCheck, Tag, Star, Zap, Gift } from "lucide-react";
import ReviewsMarquee from "../components/Review";
import PromoSection from "../components/Promotion";

const categories = [
  { href: "/category/whey", name: "Protein", imageUrl: "/whey.jpeg" },
  { href: "/category/BCAA", name: "BCAA", imageUrl: "/BCAA.jpg" },
  { href: "/category/EAA", name: "EAA", imageUrl: "/EAA.jpg" },
  { href: "/category/FishOil", name: "Fish Oil", imageUrl: "/FishOil.avif" },
  { href: "/category/Multivitamin", name: "Multivitamin", imageUrl: "/Multivitamin.webp" },
  { href: "/category/creatine", name: "Creatine", imageUrl: "/creatine.jpg" },
  { href: "/category/preworkout", name: "Pre Workout", imageUrl: "/preworkout.webp" },
];

const trustBadges = [
  { icon: "✅", text: "100% Authentic Products" },
  { icon: "🏷️", text: "5% Off for New Users" },
  { icon: "⭐", text: "Top Rated Supplements" },
  { icon: "⚡", text: "Fast Delivery Pan India" },
  { icon: "🎁", text: "Free Gifts on Orders ₹999+" },
];

const specialtyCategories = [
  { name: "Bone & Joints", emoji: "🦴" },
  { name: "Skin & Hair", emoji: "✨" },
  { name: "Digestion", emoji: "🌿" },
  { name: "Liver & Kidney", emoji: "💊" },
  { name: "Vitality", emoji: "⚡" },
];

const HomePage = () => {
  const { fetchFeaturedProducts, products, isLoading } = useProductStore();
  const [current, setCurrent] = useState(0);
  const [badgeCurrent, setBadgeCurrent] = useState(0);

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % categories.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBadgeCurrent((prev) => (prev + 1) % trustBadges.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div  className="min-h-screen bg-white text-gray-900 pt-[112px] md:pt-14"
  style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* TRUST BADGES TICKER */}
      <div className="bg-[#0a1628] text-white text-xs py-1.5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-8">
          {trustBadges.map((badge, i) => (
            <span
              key={i}
              className={`flex items-center gap-1.5 whitespace-nowrap transition-opacity duration-500 ${
                i === badgeCurrent ? "opacity-100" : "opacity-0 hidden md:flex md:opacity-40"
              }`}
            >
              <span>{badge.icon}</span>
              <span className="font-semibold tracking-wide">{badge.text}</span>
            </span>
          ))}
        </div>
      </div>

      {/* HERO SLIDER */}
      <div className="relative w-full overflow-hidden bg-gray-900" style={{ height: "clamp(180px, 40vw, 460px)" }}>
        {categories.map((category, index) => (
          <Link
            key={category.name}
            to={category.href}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={category.imageUrl}
              alt={category.name}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center pl-5 md:pl-16">
              <p className="text-[9px] md:text-xs uppercase tracking-[0.3em] text-white/50 mb-1">
                Featured Category
              </p>
              <h1
                className="text-3xl sm:text-5xl md:text-7xl font-black text-white mb-3 leading-none uppercase"
                style={{ fontFamily: "'Bebas Neue', cursive", letterSpacing: "0.04em" }}
              >
                {category.name}
              </h1>
              <span className="inline-flex items-center gap-2 bg-[#f5a623] text-black text-xs md:text-sm font-bold px-4 py-2 md:px-6 md:py-2.5 rounded w-fit uppercase tracking-wider hover:bg-yellow-400 transition-colors">
                Shop Now →
              </span>
            </div>
          </Link>
        ))}

        <button
          onClick={() => setCurrent((p) => (p - 1 + categories.length) % categories.length)}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-7 h-7 md:w-9 md:h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/40 transition"
        >
          <ChevronLeft size={16} className="text-white" />
        </button>
        <button
          onClick={() => setCurrent((p) => (p + 1) % categories.length)}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-7 h-7 md:w-9 md:h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/40 transition"
        >
          <ChevronRight size={16} className="text-white" />
        </button>

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
          {categories.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current ? "w-5 h-1.5 bg-[#f5a623]" : "w-1.5 h-1.5 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* CATEGORY CIRCLE NAV */}
      <div className="border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-3 md:px-6">
          <div className="flex items-center gap-3 md:gap-5 overflow-x-auto scrollbar-hide py-3">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={cat.href}
                className="flex flex-col items-center gap-1.5 min-w-[58px] md:min-w-[72px] group flex-shrink-0"
              >
                <div className="w-11 h-11 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-gray-100 group-hover:border-[#f5a623] transition-colors shadow-sm">
                  <img src={cat.imageUrl} alt={cat.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-[9px] md:text-[11px] text-gray-600 font-semibold whitespace-nowrap group-hover:text-[#0a1628]">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* TRENDING IN CREATINE */}
      <TrandingInCreatine />

      {/* PROMO BANNER */}
      <div className="max-w-7xl mx-auto px-4 my-5">
        <div
          className="relative rounded-xl overflow-hidden flex items-center justify-between px-6 md:px-12 py-5 md:py-8"
          style={{ background: "linear-gradient(135deg, #0a1628 55%, #1e3a5f 100%)" }}
        >
          <div>
            <p className="text-[#f5a623] text-[10px] font-bold uppercase tracking-widest mb-1">Limited Time Offer</p>
            <h3
              className="text-white text-4xl md:text-6xl font-black uppercase leading-none"
              style={{ fontFamily: "'Bebas Neue', cursive" }}
            >
              Pre-Workout
            </h3>
            <p className="text-white/50 text-xs mt-1">2× Higher Beta-Alanine · No Crashes</p>
            <Link
              to="/category/preworkout"
              className="inline-block mt-3 bg-[#f5a623] text-black text-xs font-bold px-5 py-2 rounded uppercase tracking-wider hover:bg-yellow-400 transition"
            >
              Shop Now
            </Link>
          </div>
          <div className="text-right">
            <p className="text-white/40 text-[10px] uppercase tracking-widest">Starting from</p>
            <p className="text-[#f5a623] text-3xl md:text-5xl font-black" style={{ fontFamily: "'Bebas Neue', cursive" }}>
              ₹1,111
            </p>
            <p className="text-white/40 text-[10px]">Only</p>
          </div>
        </div>
      </div>

      {/* TRENDING IN FISH OIL */}
      <TrandingInFishOil />

      {/* SPECIALTY SUPPLEMENTS */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <SectionHeader title="Specialty Supplements" />
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mt-4">
          {specialtyCategories.map((spec) => (
            <div
              key={spec.name}
              className="flex flex-col items-center justify-center bg-gray-50 rounded-xl py-5 px-2 border border-gray-100 hover:border-[#f5a623] hover:shadow-md transition-all cursor-pointer group"
            >
              <span className="text-3xl mb-2">{spec.emoji}</span>
              <span className="text-xs md:text-sm font-semibold text-gray-700 text-center group-hover:text-[#0a1628]">
                {spec.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      {!isLoading && products.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-6">
          <SectionHeader title="Featured Products" subtitle="Hand Picked" viewAllHref="/category/whey" viewAllLabel="View All" />
          <FeaturedProducts featuredProducts={products} />
        </section>
      )}

      <ReviewsMarquee/>
      <PromoSection/>

      {/* TRUST STRIP */}
      <div className="bg-[#f7f8fa] border-t border-gray-100 py-4 mt-6">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-3 divide-x divide-gray-200">
          {[
            { icon: "✅", label: "Certified by Brands" },
            { icon: "🚚", label: "Direct Sourcing" },
            { icon: "📦", label: "Secure Packaging" },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-center gap-2 px-2 md:px-4">
              <span className="text-base md:text-xl">{item.icon}</span>
              <span className="text-[10px] md:text-sm font-semibold text-gray-600">{item.label}</span>
            </div>
          ))}
        </div>
      </div>


      <Footer />
    </div>
  );
};

export const SectionHeader = ({ title, subtitle, viewAllHref, viewAllLabel = "View All" }) => (
  <div className="flex items-end justify-between mb-1">
    <div>
      {subtitle && (
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#f5a623] font-bold mb-0.5">{subtitle}</p>
      )}
      <h2
        className="text-xl md:text-2xl font-black text-[#0a1628] uppercase"
        style={{ fontFamily: "'Bebas Neue', cursive", letterSpacing: "0.04em" }}
      >
        {title}
      </h2>
      <div className="w-10 h-[3px] bg-[#f5a623] mt-1 rounded-full" />
    </div>
    {viewAllHref && (
      <Link
        to={viewAllHref}
        className="text-xs font-semibold text-[#0a1628] border border-[#0a1628] rounded px-3 py-1.5 hover:bg-[#0a1628] hover:text-white transition-colors whitespace-nowrap"
      >
        {viewAllLabel} →
      </Link>
    )}
  </div>
);

export default HomePage;