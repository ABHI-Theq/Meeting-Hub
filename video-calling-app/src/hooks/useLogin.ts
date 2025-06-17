import { useState } from "react";
import type { IUserLogin } from "../types/Context";
// import axiosInstance from '../api/api'
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const useLogin = () => {
  const AuthContext = useAuth();
  const setUser = AuthContext?.setUser;
  const setToken = AuthContext?.setToken;
    const navigate = useNavigate();
  const [loading,setLoading]=useState(false)
  const login = async ({ user }: { user: IUserLogin }) => {
    try {
      setLoading(true)
      const response = await axios.post(
        "http://localhost:5500/api/auth/login",
        { ...user },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.error) {
        // toast.error(response.data.error);
         throw new Error(response.data.error);
      }
      if (setUser) {
        setUser(response.data.user);
        localStorage.setItem("user",JSON.stringify(response.data.user))
      }
      if (setToken) {
        setToken(response.data.token);
      }
            toast.success("logged in successfully")
      localStorage.setItem("token", response.data.token);
      navigate("/home")
      return;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.error || "Signup failed";
        toast.error(message);
      } else {
        toast.error(error.message || "Unknown error");
      }
    } finally {
      setLoading(false);
    }
  };

  return {setLoading,loading,login}
};

export default useLogin;
