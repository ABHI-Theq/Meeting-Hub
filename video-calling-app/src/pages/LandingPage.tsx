import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Video, Zap, Users, Shield, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LandingPage: React.FC = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const Auth=useAuth()
  const token=Auth?.token
  const user =Auth?.user

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-synthwave-pink/10 to-synthwave-cyan/10"></div>
        <div 
          className="absolute w-96 h-96 rounded-full bg-synthwave-pink/20 blur-3xl animate-pulse-slow"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            transition: 'all 0.3s ease-out'
          }}
        ></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <div className="animate-float mb-8">
            <div className="relative inline-block">
              <Video className="w-20 h-20 mx-auto text-synthwave-pink animate-glow" />
              <div className="absolute inset-0 w-20 h-20 mx-auto bg-synthwave-pink/20 rounded-full blur-xl animate-pulse"></div>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-synthwave-pink via-synthwave-purple to-synthwave-cyan bg-clip-text text-transparent animate-pulse-slow">
            SynthWave Meet
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Experience the future of video conferencing with our neon-powered platform. 
            Connect, collaborate, and create in the digital frontier.
          </p>

          <div className="space-y-6 md:space-y-0 md:space-x-6 md:flex md:justify-center">
            {(token) ? (
              <Link 
                to="/home" 
                className="btn btn-primary btn-lg group hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-synthwave-pink/50"
              >
                Go to Home
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="btn btn-primary btn-lg group hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-synthwave-pink/50"
                >
                  Sign In
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  to="/signup" 
                  className="btn btn-outline btn-secondary btn-lg hover:scale-105 transition-all duration-300"
                >
                  Get Started Free
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Features section */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="card bg-base-100/30 backdrop-blur-lg border border-synthwave-pink/20 hover:border-synthwave-pink/50 transition-all duration-300 hover:scale-105">
            <div className="card-body text-center">
              <Zap className="w-12 h-12 mx-auto text-synthwave-cyan mb-4" />
              <h3 className="card-title text-synthwave-cyan justify-center">Lightning Fast</h3>
              <p className="text-gray-300">Ultra-low latency video calls with crystal clear quality</p>
            </div>
          </div>

          <div className="card bg-base-100/30 backdrop-blur-lg border border-synthwave-purple/20 hover:border-synthwave-purple/50 transition-all duration-300 hover:scale-105">
            <div className="card-body text-center">
              <Users className="w-12 h-12 mx-auto text-synthwave-purple mb-4" />
              <h3 className="card-title text-synthwave-purple justify-center">Team Collaboration</h3>
              <p className="text-gray-300">Connect with unlimited participants in style</p>
            </div>
          </div>

          <div className="card bg-base-100/30 backdrop-blur-lg border border-synthwave-cyan/20 hover:border-synthwave-cyan/50 transition-all duration-300 hover:scale-105">
            <div className="card-body text-center">
              <Shield className="w-12 h-12 mx-auto text-synthwave-pink mb-4" />
              <h3 className="card-title text-synthwave-pink justify-center">Secure & Private</h3>
              <p className="text-gray-300">End-to-end encryption keeps your conversations safe</p>
            </div>
          </div>
        </div>

        {/* Demo toggle button */}
        <div className="text-center mt-16">
          <button 
            onClick={() => setIsSignedIn(!isSignedIn)}
            className="btn btn-ghost text-synthwave-cyan opacity-50 hover:opacity-100"
          >
            Demo: Toggle Sign In Status
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;