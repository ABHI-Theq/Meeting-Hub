import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useLogin from '../hooks/useLogin';
import toast from 'react-hot-toast';
import { Mail, Lock, Eye, EyeOff, Home, LogIn } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { loading, login } = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    await login({ user: { email, password } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex justify-center items-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>

      {/* Home Button - Top Left */}
      <Link 
        to="/"
        className="absolute top-6 left-6 z-10 group"
      >
        <div className="flex items-center space-x-2 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl px-4 py-3 shadow-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
          <Home className="w-5 h-5 text-white group-hover:text-purple-300 transition-colors duration-200" />
          <span className="text-white font-medium group-hover:text-purple-300 transition-colors duration-200">Home</span>
        </div>
      </Link>

      <div className="relative w-full max-w-md">
        {/* Glassmorphism card */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-all duration-500">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-4 shadow-lg">
              <LogIn className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-300">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="group relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-purple-400 transition-colors duration-200" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="mail@site.com"
                required
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-white/10"
              />
            </div>

            {/* Password Field */}
            <div className="group relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-purple-400 transition-colors duration-200" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                title="Must include number, lowercase, uppercase, 8+ chars"
                className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-white/10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-purple-400 transition-colors duration-200"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>


            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>

            {/* Signup Link */}
            <div className="text-center pt-4">
              <p className="text-gray-300">
                Don't have an account?{' '}
                <Link 
                  to="/signup" 
                  className="text-purple-400 hover:text-purple-300 font-semibold underline underline-offset-2 hover:underline-offset-4 transition-all duration-200"
                >
                  Sign up here
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-20 blur-xl"></div>
      </div>
    </div>
  );
}