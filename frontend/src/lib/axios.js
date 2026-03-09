

import axios from 'axios'; 

const axiosInstance = axios.create({
    baseURL:"https://ecom-ev1s.onrender.com/api",
    withCredentials:true,
})

export default axiosInstance; 