

import axios from 'axios'; 

const axiosInstance = axios.create({
    baseURL:"https://ecom-ev1s.onrender.com/api",
    // baseURL: "http://localhost:5000/api",
    withCredentials:true,
})

export default axiosInstance; 