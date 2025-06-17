import React, { useEffect, useState } from 'react'
import { useAuth } from './AuthContext'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const AuthContext = useAuth()
  const token = AuthContext?.token
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const validateToken = async () => {
      try {
        if (!token) throw new Error("No token provided");

        const response = await axios.post("http://localhost:5500/api/auth/validate", {
          token
        }, {
          headers: {
            "Content-Type": "application/json"
          }
        })

        if (response.status >= 400 || response.data.error) {
          throw new Error(response.data.error)
        }

        setLoading(false) // token is valid

      } catch (error) {
        toast.error("Token expired or invalid. Please log in again.");
        navigate("/login");
      }
      }

    validateToken()
  }, [token, navigate]) // run only once, and if token changes

  if (loading) return <div>Loading...</div>

  return <>{children}</>
}

export default ProtectedRoute
