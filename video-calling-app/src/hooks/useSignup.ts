import { useState } from "react";
import type { IUserSignup } from "../types/Context";
// import axiosInstance from '../api/api'
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const useSignup = () => {
  const AuthContext = useAuth();
  const setUser = AuthContext?.setUser;
  const setToken = AuthContext?.setToken;
    const navigate = useNavigate();
  const [loading,setLoading]=useState(false)
  const signup = async ({ user }: { user: IUserSignup }) => {
    try {
      setLoading(true)
      const response = await axios.post(
        "http://localhost:5500/api/auth/signup",
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

      localStorage.setItem("token", response.data.token);
      navigate("/home")
      return;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : String(error))
    }finally{
      setLoading(false)
    }
  };

  return {setLoading,loading,signup}
};

export default useSignup;
