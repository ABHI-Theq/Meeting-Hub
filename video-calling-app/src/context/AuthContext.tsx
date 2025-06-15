import {useContext,createContext, useState, useEffect} from 'react'
import axiosInstance from '../api/api'
import type { AuthContextType, IUser } from '../types/Context'
const AuthContext=createContext<AuthContextType | null>(null)

export const useAuth=()=>{
  return useContext(AuthContext)
}

export const AuthProvider: React.FC<{children: React.ReactNode}>=({children})=>{
  const [user, setUser] = useState<IUser | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) as IUser : null;
  });
  const [token, setToken] = useState<string | null>(() => {
    const storedToken = localStorage.getItem("token");
    return storedToken ? storedToken : null;
  });
  
  useEffect(()=>{
    const fetchUser=()=>{
      const token=localStorage.getItem('token')
      if(token){
        const response=axiosInstance.get("/getdetails",{
          headers:{
            "Content-Type":'application/json',
            "Authorization":`Bearer ${token}`
            }
        })
        
      }
    }
  },[user,token])

  return (
    <AuthContext.Provider value={{user,token,setUser,setToken}}>
      {children}
    </AuthContext.Provider>
  )

}






export default AuthContext