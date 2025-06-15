import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import useLogin from '../hooks/useLogin';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const {loading,login}=useLogin()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');


    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

      await login({user:{ email, password } });

  };

  return (
    <div className='h-[92vh] flex justify-center items-center'>
      <div className='w-[28%] h-[40%] bg-base-200 rounded-4xl shadow-xl flex flex-col justify-center items-center'>
        <form
          className='w-full h-[80%] flex flex-col justify-around items-center gap-y-4'
          onSubmit={handleSubmit}
        >
          <span className='text-3xl font-serif'>Login here</span>
          <div className='w-[76%] flex flex-col gap-y-4 justify-center items-center'>

           {/* Email */}
            <label className="input text-lg w-full">
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
            <label className="input text-lg w-full relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
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

            
            {/* Error */}
            {error && <p className="text-red-500">{error}</p>}

            {/* Redirect */}
            <p className='text-lg w-full'>
              don't have an account? <Link to="/login" className='underline font-bold'>Signup here</Link>
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-xs bg-base-100 sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl rounded-2xl"
          >
            {loading ? (
              <span className="loading loading-dots loading-lg"></span>
            ) : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}