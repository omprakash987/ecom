
import {create} from 'zustand'; 
import axios from '../lib/axios';
import {toast} from 'react-hot-toast'; 



export const useUserStore = create((set,get)=>({
    user:null,
    loading:false,
    checkingAuth:true,


    signup:async({name,email,password,confirmPassword})=>{
        set({loading:true}); 
        if(password !== confirmPassword){
            return toast.error("password do not match");
             
        }
        try {
            const res = await axios.post("/auth/signup",{name,email,password}); 
            console.log("res.data from signup : ", res.data)
            set({user:res.data,loading:false}); 


        } catch (error) {
            set({loading:false}); 
            toast.error(error.response.data.message || "error")
        }
    },
    login:async(email,password)=>{
        set({loading:true}); 
       
        try {
            const res = await axios.post('/auth/login',{
                email,password
            }); 
            console.log(res.data); 

            set({user:res.data,loading:false}); 
            
        } catch (error) {
            set({loading:false}); 
            toast.error("login error"); 
        }
    },
    checkAuth:async()=>{
        set({checkingAuth:true}); 
        try {
            const response = await axios.get("/auth/profile"); 
            set({user:response.data,checkingAuth:false}); 

            
        } catch (error) {
            set({checkingAuth:false,user:null}); 
            console.log("error : ", error)
        }
    },
    logout:async()=>{
        try {
            await axios.post('/auth/logout'); 
            set({user:null}); 
            
        } catch (error) {
            toast.error(error.response?.data?.message || "an error occured during logout"); 
            
        }

    },
    refreshToken: async () => {
		if (get().checkingAuth) return;

		set({ checkingAuth: true });
		try {
			const response = await axios.post("/auth/refresh-token");
			set({ checkingAuth: false });
			return response.data;
		} catch (error) {
			set({ user: null, checkingAuth: false });
			throw error;
		}
	},
}))

let refreshPromise = null;

axios.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				 
				if (refreshPromise) {
					await refreshPromise;
					return axios(originalRequest);
				}

				 
				refreshPromise = useUserStore.getState().refreshToken();
				await refreshPromise;
				refreshPromise = null;

				return axios(originalRequest);
			} catch (refreshError) {
				 
				useUserStore.getState().logout();
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	}
);