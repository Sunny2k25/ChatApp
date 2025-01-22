import {create} from "zustand"
import { axiosInstance } from "../lib/axios.js"
import toast from "react-hot-toast";


export  const useAuthStore = create((set)=>({
    authUser: null,
    isSigningUp: false,
    isLoggingIng:false,
    isUpdatingProfile:false,
    isCheckingAuth: true,


    //So let's try to create function for checking the auth

    checkAuth: async ()=>{
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data })
            
        } catch (error) {
            console.log("Error in checkAuth:",error);
            set({authUser:null});
        }finally{
            set({ isCheckingAuth:false });
        }
    },


    signup: async function (data) {
        set({isSigningUp:true})
        try {
            const res = await axiosInstance.post("/auth/signup", data);

            //this response data sent to user so that user would be authenticated
            set({ authUser: res.data });
            toast.success("Account created sucessfully");
            
        } catch (error) {
            toast.error(error.response.data.message);
        } finally{
            set({ isSigningUp: false});
        }
    },


    login: async function (data) {
        set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");

      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
    },


    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser: null});
            toast.success("logout sucessfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }


    
})) 