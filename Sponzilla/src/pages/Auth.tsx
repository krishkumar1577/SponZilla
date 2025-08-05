import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    userType: 'club' // 'club' or 'brand'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      console.log('Login:', { email: formData.email, password: formData.password });
    } else {
      console.log('Sign Up:', formData);
    }
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <Navbar />
        
        <div className="px-40 flex flex-1 justify-center py-8">
          <div className="layout-content-container flex flex-col max-w-[480px] flex-1">
            {/* Tab Switcher */}
            <div className="flex bg-[#f1f2f4] rounded-xl p-1 mb-8">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold leading-normal tracking-[0.015em] transition-colors ${
                  isLogin 
                    ? 'bg-white text-[#121416] shadow-sm' 
                    : 'bg-transparent text-[#617689] hover:text-[#121416]'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold leading-normal tracking-[0.015em] transition-colors ${
                  !isLogin 
                    ? 'bg-white text-[#121416] shadow-sm' 
                    : 'bg-transparent text-[#617689] hover:text-[#121416]'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Form Header */}
            <div className="flex flex-col gap-3 pb-6">
              <h1 className="text-[#121416] text-[32px] font-bold leading-tight text-center">
                {isLogin ? 'Welcome Back' : 'Join SponZilla'}
              </h1>
              <p className="text-[#617689] text-base font-normal leading-normal text-center">
                {isLogin 
                  ? 'Sign in to your account to continue' 
                  : 'Create your account to get started'
                }
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Name field for Sign Up only */}
              {!isLogin && (
                <div className="flex flex-col gap-2">
                  <label className="text-[#121416] text-sm font-medium leading-normal">
                    Full Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    className="form-input flex w-full resize-none overflow-hidden rounded-xl text-[#121416] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#1383eb] h-14 placeholder:text-[#617689] p-[15px] text-base font-normal leading-normal"
                    value={formData.name}
                    onChange={handleInputChange}
                    required={!isLogin}
                  />
                </div>
              )}

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="text-[#121416] text-sm font-medium leading-normal">
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="form-input flex w-full resize-none overflow-hidden rounded-xl text-[#121416] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#1383eb] h-14 placeholder:text-[#617689] p-[15px] text-base font-normal leading-normal"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2">
                <label className="text-[#121416] text-sm font-medium leading-normal">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="form-input flex w-full resize-none overflow-hidden rounded-xl text-[#121416] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#1383eb] h-14 placeholder:text-[#617689] p-[15px] text-base font-normal leading-normal"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Confirm Password for Sign Up only */}
              {!isLogin && (
                <div className="flex flex-col gap-2">
                  <label className="text-[#121416] text-sm font-medium leading-normal">
                    Confirm Password
                  </label>
                  <input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    className="form-input flex w-full resize-none overflow-hidden rounded-xl text-[#121416] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#1383eb] h-14 placeholder:text-[#617689] p-[15px] text-base font-normal leading-normal"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required={!isLogin}
                  />
                </div>
              )}

              {/* User Type for Sign Up only */}
              {!isLogin && (
                <div className="flex flex-col gap-2">
                  <label className="text-[#121416] text-sm font-medium leading-normal">
                    I am signing up as:
                  </label>
                  <select
                    name="userType"
                    className="form-select flex w-full resize-none overflow-hidden rounded-xl text-[#121416] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#1383eb] h-14 placeholder:text-[#617689] p-[15px] text-base font-normal leading-normal"
                    value={formData.userType}
                    onChange={handleInputChange}
                    required={!isLogin}
                  >
                    <option value="club">Student Club/Organization</option>
                    <option value="brand">Brand/Sponsor</option>
                  </select>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-4 bg-[#1383eb] text-white text-base font-bold leading-normal tracking-[0.015em] mt-4"
              >
                <span className="truncate">
                  {isLogin ? 'Sign In' : 'Create Account'}
                </span>
              </button>

              {/* Forgot Password for Login */}
              {isLogin && (
                <div className="text-center mt-4">
                  <a href="#" className="text-[#1383eb] text-sm font-medium leading-normal hover:underline">
                    Forgot your password?
                  </a>
                </div>
              )}
            </form>

            {/* Footer Text */}
            <div className="text-center mt-8 pt-6 border-t border-[#f1f2f4]">
              <p className="text-[#617689] text-sm font-normal leading-normal">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-[#1383eb] font-medium hover:underline"
                >
                  {isLogin ? 'Sign up here' : 'Sign in here'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
