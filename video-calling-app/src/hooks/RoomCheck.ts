import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export const useCheck = () => {
  const [check, setCheck] = useState(false);
  const [loading,setLoading]=useState(false)

  const roomcheck = async ({ roomId }: { roomId: string }) => {
    if (!roomId) {
      toast.error("Room ID is required");
      return;
    }

    try {
        setLoading(true)
      const res = await axios.get(`https://meeting-hub-backend.onrender.com/api/room/${roomId}`,
        {
            headers:{
                "Authorization":`Bearer ${(localStorage.getItem("token"))}`
            }
        }
      );
      console.log(res.data)
      if (res.data.error) {
        toast.error(res.data.error);
        setCheck(false);
      } else {
        setCheck(true); // assuming success means room exists
      }
    } catch (error: any) {
      toast.error("Failed to check room. Please try again.");
      setCheck(false);
    }finally{
        setLoading(false)
    }
  };

  return { check, roomcheck,loading };
};


export default useCheck