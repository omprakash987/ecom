import toast from 'react-hot-toast';
import axios from '../lib/axios';
import React, { useEffect, useState } from 'react'
import LoadingSpinner from '../components/LoadingSpinner';
import ProductCard from './ProductCard'
const PeopleAlsoBought = () => {
  const [recommendations,setRecommendation] = useState([]); 
const [isLoading,setIsLoading] = useState(true); 

  useEffect(()=>{
    const fetchRecommendations = async()=>{
      try {
        const res = await axios.get('/products/recommendation'); 
        console.log("recommendation data : ", res.data); 

      setRecommendation(res.data); 
        
      } catch (error) {
        toast.error("error while fetching recomention",error.response.data); 
      }
      finally{
        setIsLoading(false); 
      }

    }; 
    fetchRecommendations(); 
  },[]); 

if(isLoading)return <LoadingSpinner/>


  return (
    <div className='mt-8'>
			<h3 className='text-2xl font-semibold text-emerald-400'>People  bought</h3>
			<div className='mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg: grid-col-3'>
				{recommendations.map((product) => (
					<ProductCard key={product._id} product={product} />
				))}
			</div>
		</div>
  )
}

export default PeopleAlsoBought