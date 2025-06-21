import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Room from './pages/Room';
import Header from './components/Header';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ProtectedRoute from './context/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import ContactPage from './pages/ContactPage';

function App() {
  const location = useLocation();

  // Paths where the header should NOT be shown
  const noHeaderRoutes = ['/', '/login', '/signup'];
  const shouldShowHeader = !noHeaderRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowHeader && <Header />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute><AboutPage /></ProtectedRoute>} />
        <Route path="/contactus" element={<ProtectedRoute><ContactPage /></ProtectedRoute>} />
        <Route path="/room/:roomId" element={<ProtectedRoute><Room /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default App;
