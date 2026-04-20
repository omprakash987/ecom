import React,{useEffect} from 'react'
import { useProductStore } from '../store/useProductStore';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
 

const TrandingInCreatine = () => {
     const { fetchTrendingCreatine, trendingCreatine } = useProductStore();
    
      useEffect(() => {
      fetchTrendingCreatine();
    }, []);
  return (
    <div>
  
{trendingCreatine.length > 0 && (
  <section className="max-w-7xl mx-auto px-4 md:px-6 mt-16">

    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl md:text-3xl font-bold">
        🔥 Trending in Creatine
      </h2>

      <Link
        to="/category/creatine"
        className="text-sm text-gray-400 hover:text-white"
      >
        View All →
      </Link>
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {trendingCreatine.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>

  </section>
)}
      
    </div>
  
  )
}

export default TrandingInCreatine