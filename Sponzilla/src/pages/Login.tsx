import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';

const LoginPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [userType, setUserType] = useState<'Club' | 'Brand'>('Club');
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [signupData, setSignupData] = useState({
    clubName: '',
    email: '',
    password: '',
    contactPerson: '',
    contactNumber: ''
  });

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login data:', loginData);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Signup data:', { ...signupData, userType });
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
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 flex-1 bg-[#c5dbeb] text-[#121516] text-sm font-bold leading-normal tracking-[0.015em]"
                  >
                    <span className="truncate">Login</span>
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
                      {userType === 'Club' ? 'Club Name' : 'Brand Name'}
                    </p>
                    <input
                      name="clubName"
                      placeholder={`Enter your ${userType.toLowerCase()} name`}
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121516] focus:outline-0 focus:ring-0 border border-[#dde1e3] bg-white focus:border-[#dde1e3] h-14 placeholder:text-[#6a7781] p-[15px] text-base font-normal leading-normal"
                      value={signupData.clubName}
                      onChange={handleSignupChange}
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
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121516] focus:outline-0 focus:ring-0 border border-[#dde1e3] bg-white focus:border-[#dde1e3] h-14 placeholder:text-[#6a7781] p-[15px] text-base font-normal leading-normal"
                      value={signupData.email}
                      onChange={handleSignupChange}
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
                      value={signupData.password}
                      onChange={handleSignupChange}
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
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 flex-1 bg-[#c5dbeb] text-[#121516] text-sm font-bold leading-normal tracking-[0.015em]"
                  >
                    <span className="truncate">Sign Up</span>
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
