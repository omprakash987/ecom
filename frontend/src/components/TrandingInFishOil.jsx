import React, { useEffect } from 'react';
import { useProductStore } from '../store/useProductStore';
import { Link } from 'react-router-dom';
import { NutrabayProductCard } from './FeaturedProducts';
import { useCartStore } from '../store/useCartStore';

const TrandingInFishOil = () => {
  const { fetchTrendingFishOil, trendingFishOil } = useProductStore();
  const { addToCart } = useCartStore();

  useEffect(() => {
    fetchTrendingFishOil();
  }, []);

  if (!trendingFishOil.length) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#f5a623] font-bold mb-0.5">
            Hot Right Now
          </p>
          <h2
            className="text-xl md:text-2xl font-black text-[#0a1628] uppercase"
            style={{ fontFamily: "'Bebas Neue', cursive", letterSpacing: "0.04em" }}
          >
            🔥 Trending in Fish Oil
          </h2>
          <div className="w-10 h-[3px] bg-[#f5a623] mt-1 rounded-full" />
        </div>
        <Link
          to="/category/FishOil"
          className="text-xs font-semibold text-[#0a1628] border border-[#0a1628] rounded px-3 py-1.5 hover:bg-[#0a1628] hover:text-white transition-colors whitespace-nowrap"
        >
          View All →
        </Link>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {trendingFishOil.map((product) => (
          <NutrabayProductCard key={product._id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </section>
  );
};

export default TrandingInFishOil;