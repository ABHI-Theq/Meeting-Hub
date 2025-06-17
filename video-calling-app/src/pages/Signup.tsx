import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import useSignup from '../hooks/useSignup';
import toast from 'react-hot-toast';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {loading,signup}=useSignup()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
   
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }



      await signup({ user: { username, email, password } });

  };

  return (
    <div className=' h-[92vh] flex justify-center items-center'>
      <div className='w-[400px] h-[60%] bg-base-200 rounded-4xl shadow-xl flex flex-col justify-center items-center'>
        <form
          className='w-full h-[80%] flex flex-col justify-around items-center gap-y-4'
          onSubmit={handleSubmit}
        >
          <span className='sm:text-md md:text-lg  lg:text-xl xl:text-3xl font-serif'>Signup here</span>
          <div className=' w-[76%] flex flex-col gap-y-4 justify-center items-center'>

            {/* Username */}
            <label className="input w-full  md:text-sm lg:text-md xl:text-lg">
              <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </g>
              </svg>
              <input
                type="text"
                required
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                pattern="[A-Za-z][A-Za-z0-9\-]*"
                title="Only letters, numbers or dash"
              />
            </label>

            {/* Email */}
            <label className="input md:text-sm lg:text-md xl:text-lg w-full">
              <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="mail@site.com"
                required
              />
            </label>

            {/* Password */}
            <label className="input md:text-sm lg:text-md xl:text-lg w-full relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                title="Must include number, lowercase, uppercase, 8+ chars"
              />
              <div className="absolute right-2 top-1 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.94 17.94A10.94 10.94 0 0112 19c-7 0-11-7-11-7a21.78 21.78 0 014.22-4.92M9.88 9.88A3 3 0 0114.12 14.12M6.1 6.1l12.8 12.8" />
                  </svg>
                )}
              </div>
            </label>

            {/* Confirm Password */}
            <label className="input md:text-sm lg:text-md xl:text-lg w-full relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                title="Must include number, lowercase, uppercase, 8+ chars"
              />
              <div className="absolute right-2 top-1 cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.94 17.94A10.94 10.94 0 0112 19c-7 0-11-7-11-7a21.78 21.78 0 014.22-4.92M9.88 9.88A3 3 0 0114.12 14.12M6.1 6.1l12.8 12.8" />
                  </svg>
                )}
              </div>
            </label>

            
            {/* Redirect */}
            <p className='md:text-sm lg:text-md xl:text-lg w-full'>
              Already have an account? <Link to="/login" className='underline font-bold'>Login here</Link>
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn  bg-base-100 sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl rounded-2xl"
          >
            {loading ? (
              <span className="loading loading-dots loading-lg"></span>
            ) : 'Signup'}
          </button>
        </form>
      </div>
    </div>
  );
}