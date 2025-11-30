import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import Navbar from '../components/layout/Navbar';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, register, loading } = useUser();
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [userType, setUserType] = useState<'club' | 'brand'>('club');
  const [error, setError] = useState<string>('');
  const [loginData, setLoginData] = useState({
    email: 'testuser@example.com',
    password: 'password123'
  });
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error on input change
  };

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error on input change
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!loginData.email || !loginData.password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const success = await login(loginData);
      if (success) {
        // Redirect based on user type - this will be determined by the API response
        navigate('/');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!signupData.name || !signupData.email || !signupData.password || !signupData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (signupData.password !== signupData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (signupData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      const success = await register({
        name: signupData.name,
        email: signupData.email,
        password: signupData.password,
        role: userType,
      });
      
      if (success) {
        // Redirect to appropriate dashboard
        if (userType === 'club') {
          navigate('/club-dashboard');
        } else {
          navigate('/brand-dashboard');
        }
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <Navbar />
        
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 flex-1">
            
            {/* Tab Navigation */}
            <div className="pb-3">
              <div className="flex border-b border-[#dde1e3] px-4 gap-8">
                <button 
                  onClick={() => setActiveTab('login')}
                  className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 ${
                    activeTab === 'login' 
                      ? 'border-b-[#121516] text-[#121516]' 
                      : 'border-b-transparent text-[#6a7781]'
                  }`}
                >
                  <p className={`text-sm font-bold leading-normal tracking-[0.015em] ${
                    activeTab === 'login' ? 'text-[#121516]' : 'text-[#6a7781]'
                  }`}>Login</p>
                </button>
                <button 
                  onClick={() => setActiveTab('signup')}
                  className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 ${
                    activeTab === 'signup' 
                      ? 'border-b-[#121516] text-[#121516]' 
                      : 'border-b-transparent text-[#6a7781]'
                  }`}
                >
                  <p className={`text-sm font-bold leading-normal tracking-[0.015em] ${
                    activeTab === 'signup' ? 'text-[#121516]' : 'text-[#6a7781]'
                  }`}>Sign Up</p>
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mx-4 mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* Login Form */}
            {activeTab === 'login' && (
              <form onSubmit={handleLoginSubmit}>
                <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                  <label className="flex flex-col min-w-40 flex-1">
                    <p className="text-[#121516] text-base font-medium leading-normal pb-2">Email</p>
                    <input
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121516] focus:outline-0 focus:ring-0 border border-[#dde1e3] bg-white focus:border-[#dde1e3] h-14 placeholder:text-[#6a7781] p-[15px] text-base font-normal leading-normal"
                      value={loginData.email}
                      onChange={handleLoginChange}
                      required
                    />
                  </label>
                </div>
                <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                  <label className="flex flex-col min-w-40 flex-1">
                    <p className="text-[#121516] text-base font-medium leading-normal pb-2">Password</p>
                    <input
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121516] focus:outline-0 focus:ring-0 border border-[#dde1e3] bg-white focus:border-[#dde1e3] h-14 placeholder:text-[#6a7781] p-[15px] text-base font-normal leading-normal"
                      value={loginData.password}
                      onChange={handleLoginChange}
                    />
                  </label>
                </div>
                <p className="text-[#6a7781] text-sm font-normal leading-normal pb-3 pt-1 px-4 underline cursor-pointer">Forgot Password?</p>
                <div className="flex px-4 py-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 flex-1 bg-[#121516] text-white text-sm font-bold leading-normal tracking-[0.015em] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="truncate">{loading ? 'Logging in...' : 'Login'}</span>
                  </button>
                </div>
              </form>
            )}

            {/* Sign Up Form */}
            {activeTab === 'signup' && (
              <form onSubmit={handleSignupSubmit}>
                {/* User Type Selection */}
                <div className="flex px-4 py-3">
                  <div className="flex h-10 flex-1 items-center justify-center rounded-xl bg-[#f1f2f4] p-1">
                    <label className={`flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-xl px-2 text-sm font-medium leading-normal ${
                      userType === 'Club' 
                        ? 'bg-white shadow-[0_0_4px_rgba(0,0,0,0.1)] text-[#121516]' 
                        : 'text-[#6a7781]'
                    }`}>
                      <span className="truncate">Club</span>
                      <input 
                        type="radio" 
                        name="userType" 
                        className="invisible w-0" 
                        value="Club" 
                        checked={userType === 'Club'}
                        onChange={() => setUserType('Club')}
                      />
                    </label>
                    <label className={`flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-xl px-2 text-sm font-medium leading-normal ${
                      userType === 'Brand' 
                        ? 'bg-white shadow-[0_0_4px_rgba(0,0,0,0.1)] text-[#121516]' 
                        : 'text-[#6a7781]'
                    }`}>
                      <span className="truncate">Brand</span>
                      <input 
                        type="radio" 
                        name="userType" 
                        className="invisible w-0" 
                        value="Brand" 
                        checked={userType === 'Brand'}
                        onChange={() => setUserType('Brand')}
                      />
                    </label>
                  </div>
                </div>

                <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                  <label className="flex flex-col min-w-40 flex-1">
                    <p className="text-[#121516] text-base font-medium leading-normal pb-2">
                      {userType === 'club' ? 'Club Name' : 'Brand Name'}
                    </p>
                    <input
                      name="name"
                      placeholder={userType === 'club' ? 'Enter club name' : 'Enter brand name'}
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121516] focus:outline-0 focus:ring-0 border border-[#dde1e3] bg-white focus:border-[#dde1e3] h-14 placeholder:text-[#6a7781] p-[15px] text-base font-normal leading-normal"
                      value={signupData.name}
                      onChange={handleSignupChange}
                      required
                    />
                  </label>
                </div>
                <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                  <label className="flex flex-col min-w-40 flex-1">
                    <p className="text-[#121516] text-base font-medium leading-normal pb-2">Email</p>
                    <input
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121516] focus:outline-0 focus:ring-0 border border-[#dde1e3] bg-white focus:border-[#dde1e3] h-14 placeholder:text-[#6a7681] p-[15px] text-base font-normal leading-normal"
                      value={signupData.email}
                      onChange={handleSignupChange}
                      required
                    />
                  </label>
                </div>
                <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                  <label className="flex flex-col min-w-40 flex-1">
                    <p className="text-[#121516] text-base font-medium leading-normal pb-2">Password</p>
                    <input
                      name="password"
                      type="password"
                      placeholder="Create a password (min 6 characters)"
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121516] focus:outline-0 focus:ring-0 border border-[#dde1e3] bg-white focus:border-[#dde1e3] h-14 placeholder:text-[#6a7781] p-[15px] text-base font-normal leading-normal"
                      value={signupData.password}
                      onChange={handleSignupChange}
                      required
                      minLength={6}
                    />
                  </label>
                </div>
                <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                  <label className="flex flex-col min-w-40 flex-1">
                    <p className="text-[#121516] text-base font-medium leading-normal pb-2">Confirm Password</p>
                    <input
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121516] focus:outline-0 focus:ring-0 border border-[#dde1e3] bg-white focus:border-[#dde1e3] h-14 placeholder:text-[#6a7781] p-[15px] text-base font-normal leading-normal"
                      value={signupData.confirmPassword}
                      onChange={handleSignupChange}
                      required
                    />
                  </label>
                </div>
                <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                  <label className="flex flex-col min-w-40 flex-1">
                    <p className="text-[#121516] text-base font-medium leading-normal pb-2">Contact Person</p>
                    <input
                      name="contactPerson"
                      placeholder="Enter contact person's name"
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121516] focus:outline-0 focus:ring-0 border border-[#dde1e3] bg-white focus:border-[#dde1e3] h-14 placeholder:text-[#6a7781] p-[15px] text-base font-normal leading-normal"
                      value={signupData.contactPerson}
                      onChange={handleSignupChange}
                    />
                  </label>
                </div>
                <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                  <label className="flex flex-col min-w-40 flex-1">
                    <p className="text-[#121516] text-base font-medium leading-normal pb-2">Contact Number</p>
                    <input
                      name="contactNumber"
                      type="tel"
                      placeholder="Enter contact number"
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121516] focus:outline-0 focus:ring-0 border border-[#dde1e3] bg-white focus:border-[#dde1e3] h-14 placeholder:text-[#6a7781] p-[15px] text-base font-normal leading-normal"
                      value={signupData.contactNumber}
                      onChange={handleSignupChange}
                    />
                  </label>
                </div>
                <div className="flex px-4 py-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 flex-1 bg-[#121516] text-white text-sm font-bold leading-normal tracking-[0.015em] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="truncate">{loading ? 'Creating Account...' : 'Sign Up'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
