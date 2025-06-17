import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const useLogout = () => {
  const navigate = useNavigate();
  const AuthContext = useAuth();
  const setUser = AuthContext?.setUser;
  const setToken = AuthContext?.setToken;

  const logout = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("No token found");
        return;
      }

      await axios.get("http://localhost:5500/api/auth/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true, // if using httpOnly cookies too
      });

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      if (setUser) setUser(null);
      if (setToken) setToken(null);

      toast.success("Logged out successfully");
      navigate("/");
    } catch (error: any) {
      toast.error("Logout failed. Please try again.");
      console.error("Logout error:", error);
    }
  };

  return logout;
};

export default useLogout;
