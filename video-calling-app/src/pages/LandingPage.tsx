import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Video, Zap, Users, Shield, ArrowRight, Sparkles, Play, Star, Globe } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LandingPage: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const Auth = useAuth();
  const token = Auth?.token;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#090040]">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-500/10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(236, 72, 153, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(236, 72, 153, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.05}px)`
            }}
          />
        </div>

        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-bounce"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-purple-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>

        {/* Mouse follower */}
        <div 
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-pink-500/10 to-cyan-500/10 blur-3xl transition-all duration-300 ease-out pointer-events-none"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />

        {/* Animated lines */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent animate-pulse"></div>
          <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent animate-pulse delay-500"></div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Hero section */}
        <div className="text-center mb-20">
          {/* Logo with glow effect */}
          <div className="relative inline-block mb-8 animate-float">
            <div className="relative">
              <Video className="w-24 h-24 mx-auto text-pink-400 drop-shadow-2xl" />
              <div className="absolute inset-0 w-24 h-24 mx-auto bg-pink-400/30 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute -top-2 -right-2">
                <Sparkles className="w-6 h-6 text-cyan-400 animate-spin" />
              </div>
            </div>
          </div>
          
          {/* Main title */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-pulse-slow drop-shadow-2xl">
              Meeting
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Hub
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed font-light">
            Experience the <span className="text-pink-400 font-semibold">future</span> of video conferencing with our 
            <span className="text-cyan-400 font-semibold"> neon-powered</span> platform.
          </p>
          
          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
            Connect, collaborate, and create in the digital frontier with cutting-edge technology.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            {token ? (
              <Link 
                to="/home" 
                className="group relative bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/25 flex items-center gap-3"
              >
                <Play className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-lg">Enter the Matrix</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500/30 to-purple-600/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </Link>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="group relative bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/25 flex items-center gap-3"
                >
                  <Zap className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="text-lg">Sign In</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500/30 to-purple-600/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </Link>
                
                <Link 
                  to="/signup" 
                  className="group relative bg-transparent border-2 border-cyan-400 hover:border-cyan-300 text-cyan-400 hover:text-cyan-300 font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-400/25 flex items-center gap-3 backdrop-blur-sm"
                >
                  <Star className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
                  <span className="text-lg">Get Started Free</span>
                  <div className="absolute inset-0 rounded-2xl bg-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-20">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-pink-400 mb-2">10M+</div>
              <div className="text-gray-400">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">99.9%</div>
              <div className="text-gray-400">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">150+</div>
              <div className="text-gray-400">Countries</div>
            </div>
          </div>
        </div>

        {/* Features section */}
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Powered by the Future
            </span>
          </h2>
          <p className="text-xl text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Experience next-generation features designed for the digital age
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="group relative bg-gray-900/50 backdrop-blur-xl border border-pink-500/20 hover:border-pink-500/50 rounded-3xl p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-pink-400 mb-4">Lightning Fast</h3>
                <p className="text-gray-300 leading-relaxed">
                  Ultra-low latency video calls with crystal clear 4K quality. Experience conversations like never before.
                </p>
              </div>
            </div>

            <div className="group relative bg-gray-900/50 backdrop-blur-xl border border-purple-500/20 hover:border-purple-500/50 rounded-3xl p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-purple-400 mb-4">Team Collaboration</h3>
                <p className="text-gray-300 leading-relaxed">
                  Connect with unlimited participants in style. Advanced screen sharing and real-time collaboration tools.
                </p>
              </div>
            </div>

            <div className="group relative bg-gray-900/50 backdrop-blur-xl border border-cyan-500/20 hover:border-cyan-500/50 rounded-3xl p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-cyan-400 mb-4">Secure & Private</h3>
                <p className="text-gray-300 leading-relaxed">
                  Military-grade end-to-end encryption keeps your conversations safe. Your privacy is our priority.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional features */}
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="relative bg-gray-900/30 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50">
            <div className="absolute top-4 right-4">
              <Globe className="w-6 h-6 text-pink-400 animate-spin-slow" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Global Infrastructure</h3>
            <p className="text-gray-300 mb-6">
              Our worldwide network of servers ensures optimal performance no matter where you are.
            </p>
            <div className="flex items-center gap-2 text-pink-400">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">99.9% Uptime Guarantee</span>
            </div>
          </div>

          <div className="relative bg-gray-900/30 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50">
            <div className="absolute top-4 right-4">
              <Video className="w-6 h-6 text-cyan-400 animate-pulse" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">AI-Powered Features</h3>
            <p className="text-gray-300 mb-6">
              Smart noise cancellation, auto-framing, and real-time language translation powered by AI.
            </p>
            <div className="flex items-center gap-2 text-cyan-400">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">Next-Gen Technology</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
    </div>
  );
};

export default LandingPage;