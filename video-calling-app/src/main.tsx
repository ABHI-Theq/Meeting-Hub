import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { SocketProvider } from './context/SocketContext.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <AuthProvider>
  <SocketProvider>
    <Toaster/>
    <App />
    </SocketProvider>
    </AuthProvider>
    </BrowserRouter>
)
