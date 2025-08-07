import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ProfileDropdown } from '../components/ui';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Account');
  const [formData, setFormData] = useState({
    // Account fields
    accountEmail: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    
    // Profile Information fields
    companyName: '',
    logo: '',
    description: '',
    industry: '',
    website: '',
    contactEmail: '',
    phoneNumber: '',
    address: '',
    
    // Notifications fields
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    sponsorshipUpdates: true,
    eventReminders: true,
    messageNotifications: true,
    
    // Security fields
    twoFactorAuth: false,
    loginAlerts: true,
    sessionTimeout: '30'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSaveChanges = () => {
    // Handle save changes logic here
    console.log('Saving changes:', formData);
  };

  const tabs = ['Account', 'Profile Information', 'Notifications', 'Security'];

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        {/* Header - Same as Brand Dashboard */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f3f4] px-10 py-3">
          <div className="flex items-center gap-4 text-[#111518]">
            <div className="size-4">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path>
              </svg>
            </div>
            <h2 className="text-[#111518] text-lg font-bold leading-tight tracking-[-0.015em] text-left">SponZilla</h2>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9">
              <Link to="/browse-events" className="text-[#111518] text-sm font-medium leading-normal text-left">Event Browser</Link>
              <Link to="/find-clubs" className="text-[#111518] text-sm font-medium leading-normal text-left">Find Clubs</Link>
              <Link to="/brand-dashboard" className="text-[#111518] text-sm font-medium leading-normal text-left">Analytics Dashboard</Link>
            </div>
            <div className="flex gap-2">
              <Link to="/messages" className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 bg-[#f0f3f4] text-[#111518] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
                <div className="text-[#111518]" data-icon="ChatCircleDots" data-size="20px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM84,116a12,12,0,1,0,12,12A12,12,0,0,0,84,116Zm88,0a12,12,0,1,0,12,12A12,12,0,0,0,172,116Zm60,12A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Zm-16,0A88,88,0,1,0,51.81,172.06a8,8,0,0,1,.66,6.54L40,216,77.4,203.53a7.85,7.85,0,0,1,2.53-.42,8,8,0,0,1,4,1.08A88,88,0,0,0,216,128Z"></path>
                  </svg>
                </div>
              </Link>
              <Link to="/help" className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 bg-[#f0f3f4] text-[#111518] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
                <div className="text-[#111518]" data-icon="Question" data-size="20px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M140,180a12,12,0,1,1-12-12A12,12,0,0,1,140,180ZM128,72c-22.06,0-40,16.15-40,36v4a8,8,0,0,0,16,0v-4c0-11,10.77-20,24-20s24,9,24,20-10.77,20-24,20a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-.72c18.24-3.35,32-17.9,32-35.28C168,88.15,150.06,72,128,72Zm104,56A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
                  </svg>
                </div>
              </Link>
            </div>
            <ProfileDropdown />
          </div>
        </header>

        {/* Main Content */}
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            {/* Settings Header */}
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-[#111518] tracking-light text-[32px] font-bold leading-tight min-w-72 text-left">Settings</p>
            </div>

            {/* Tab Navigation */}
            <div className="pb-3">
              <div className="flex border-b border-[#dbe1e6] px-4 gap-8">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 ${
                      activeTab === tab
                        ? 'border-b-[#111518] text-[#111518]'
                        : 'border-b-transparent text-[#617989]'
                    }`}
                  >
                    <p className={`text-sm font-bold leading-normal tracking-[0.015em] text-left ${
                      activeTab === tab ? 'text-[#111518]' : 'text-[#617989]'
                    }`}>
                      {tab}
                    </p>
                  </button>
                ))}
              </div>
            </div>
            {activeTab === 'Account' && (
              <>
                <h3 className="text-[#111518] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4 text-left">Account Settings</h3>
                
                <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                  <label className="flex flex-col min-w-40 flex-1">
                    <p className="text-[#111518] text-base font-medium leading-normal pb-2 text-left">Email Address</p>
                    <input
                      name="accountEmail"
                      value={formData.accountEmail}
                      onChange={handleInputChange}
                      type="email"
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#617989] p-[15px] text-base font-normal leading-normal"
                      placeholder="Enter your email address"
                    />
                  </label>
                </div>

                <h4 className="text-[#111518] text-base font-bold leading-tight px-4 pb-2 pt-4 text-left">Change Password</h4>
                
                <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                  <label className="flex flex-col min-w-40 flex-1">
                    <p className="text-[#111518] text-base font-medium leading-normal pb-2 text-left">Current Password</p>
                    <input
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleInputChange}
                      type="password"
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#617989] p-[15px] text-base font-normal leading-normal"
                      placeholder="Enter current password"
                    />
                  </label>
                </div>

                <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                  <label className="flex flex-col min-w-40 flex-1">
                    <p className="text-[#111518] text-base font-medium leading-normal pb-2 text-left">New Password</p>
                    <input
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      type="password"
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#617989] p-[15px] text-base font-normal leading-normal"
                      placeholder="Enter new password"
                    />
                  </label>
                </div>

                <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                  <label className="flex flex-col min-w-40 flex-1">
                    <p className="text-[#111518] text-base font-medium leading-normal pb-2 text-left">Confirm New Password</p>
                    <input
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      type="password"
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#617989] p-[15px] text-base font-normal leading-normal"
                      placeholder="Confirm new password"
                    />
                  </label>
                </div>
              </>
            )}

            {activeTab === 'Profile Information' && (
              <>
                <h3 className="text-[#111518] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4 text-left">Company Information</h3>
                
                <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                  <label className="flex flex-col min-w-40 flex-1">
                    <p className="text-[#111518] text-base font-medium leading-normal pb-2 text-left">Company Name</p>
                    <input
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#617989] p-[15px] text-base font-normal leading-normal"
                      placeholder="Enter company name"
                    />
                  </label>
                </div>

                <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                  <label className="flex flex-col min-w-40 flex-1">
                    <p className="text-[#111518] text-base font-medium leading-normal pb-2 text-left">Industry</p>
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#617989] p-[15px] text-base font-normal leading-normal"
                    >
                      <option value="">Select industry</option>
                      <option value="technology">Technology</option>
                      <option value="finance">Finance</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="education">Education</option>
                      <option value="retail">Retail</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="other">Other</option>
                    </select>
                  </label>
                </div>

                <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                  <label className="flex flex-col min-w-40 flex-1">
                    <p className="text-[#111518] text-base font-medium leading-normal pb-2 text-left">Company Logo URL</p>
                    <input
                      name="logo"
                      value={formData.logo}
                      onChange={handleInputChange}
                      type="url"
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#617989] p-[15px] text-base font-normal leading-normal"
                      placeholder="https://example.com/logo.png"
                    />
                  </label>
                </div>

                <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                  <label className="flex flex-col min-w-40 flex-1">
                    <p className="text-[#111518] text-base font-medium leading-normal pb-2 text-left">Website</p>
                    <input
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      type="url"
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#617989] p-[15px] text-base font-normal leading-normal"
                      placeholder="https://example.com"
                    />
                  </label>
                </div>

                <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                  <label className="flex flex-col min-w-40 flex-1">
                    <p className="text-[#111518] text-base font-medium leading-normal pb-2 text-left">Company Description</p>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] min-h-36 placeholder:text-[#617989] p-[15px] text-base font-normal leading-normal"
                      placeholder="Describe your company and what you do..."
                    />
                  </label>
                </div>

                <h4 className="text-[#111518] text-base font-bold leading-tight px-4 pb-2 pt-4 text-left">Contact Information</h4>
                
                <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                  <label className="flex flex-col min-w-40 flex-1">
                    <p className="text-[#111518] text-base font-medium leading-normal pb-2 text-left">Contact Email</p>
                    <input
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      type="email"
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#617989] p-[15px] text-base font-normal leading-normal"
                      placeholder="contact@company.com"
                    />
                  </label>
                </div>

                <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                  <label className="flex flex-col min-w-40 flex-1">
                    <p className="text-[#111518] text-base font-medium leading-normal pb-2 text-left">Phone Number</p>
                    <input
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      type="tel"
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#617989] p-[15px] text-base font-normal leading-normal"
                      placeholder="+1 (555) 123-4567"
                    />
                  </label>
                </div>

                <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                  <label className="flex flex-col min-w-40 flex-1">
                    <p className="text-[#111518] text-base font-medium leading-normal pb-2 text-left">Address</p>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] min-h-24 placeholder:text-[#617989] p-[15px] text-base font-normal leading-normal"
                      placeholder="123 Main St, City, State, ZIP"
                    />
                  </label>
                </div>
              </>
            )}

            {activeTab === 'Notifications' && (
              <>
                <h3 className="text-[#111518] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4 text-left">Notification Preferences</h3>
                
                <div className="flex flex-col gap-4 px-4 py-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[#111518] text-base font-medium leading-normal text-left">Email Notifications</p>
                      <p className="text-[#617989] text-sm font-normal leading-normal text-left">Receive notifications via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="emailNotifications"
                        checked={formData.emailNotifications}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#118ee8]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[#111518] text-base font-medium leading-normal text-left">Push Notifications</p>
                      <p className="text-[#617989] text-sm font-normal leading-normal text-left">Receive push notifications in browser</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="pushNotifications"
                        checked={formData.pushNotifications}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#118ee8]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[#111518] text-base font-medium leading-normal text-left">Sponsorship Updates</p>
                      <p className="text-[#617989] text-sm font-normal leading-normal text-left">Get notified about sponsorship opportunities</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="sponsorshipUpdates"
                        checked={formData.sponsorshipUpdates}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#118ee8]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[#111518] text-base font-medium leading-normal text-left">Event Reminders</p>
                      <p className="text-[#617989] text-sm font-normal leading-normal text-left">Reminders for upcoming events you're sponsoring</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="eventReminders"
                        checked={formData.eventReminders}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#118ee8]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[#111518] text-base font-medium leading-normal text-left">Message Notifications</p>
                      <p className="text-[#617989] text-sm font-normal leading-normal text-left">Get notified when you receive new messages</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="messageNotifications"
                        checked={formData.messageNotifications}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#118ee8]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[#111518] text-base font-medium leading-normal text-left">Marketing Emails</p>
                      <p className="text-[#617989] text-sm font-normal leading-normal text-left">Receive marketing and promotional emails</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="marketingEmails"
                        checked={formData.marketingEmails}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#118ee8]"></div>
                    </label>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'Security' && (
              <>
                <h3 className="text-[#111518] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4 text-left">Security Settings</h3>
                
                <div className="flex flex-col gap-4 px-4 py-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[#111518] text-base font-medium leading-normal text-left">Two-Factor Authentication</p>
                      <p className="text-[#617989] text-sm font-normal leading-normal text-left">Add an extra layer of security to your account</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="twoFactorAuth"
                        checked={formData.twoFactorAuth}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#118ee8]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[#111518] text-base font-medium leading-normal text-left">Login Alerts</p>
                      <p className="text-[#617989] text-sm font-normal leading-normal text-left">Get notified when someone logs into your account</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="loginAlerts"
                        checked={formData.loginAlerts}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#118ee8]"></div>
                    </label>
                  </div>

                  <div className="flex max-w-[480px] flex-wrap items-end gap-4 py-3">
                    <label className="flex flex-col min-w-40 flex-1">
                      <p className="text-[#111518] text-base font-medium leading-normal pb-2 text-left">Session Timeout</p>
                      <select
                        name="sessionTimeout"
                        value={formData.sessionTimeout}
                        onChange={handleInputChange}
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#617989] p-[15px] text-base font-normal leading-normal"
                      >
                        <option value="15">15 minutes</option>
                        <option value="30">30 minutes</option>
                        <option value="60">1 hour</option>
                        <option value="120">2 hours</option>
                        <option value="never">Never</option>
                      </select>
                    </label>
                  </div>
                </div>

                <h4 className="text-[#111518] text-base font-bold leading-tight px-4 pb-2 pt-4 text-left">Account Actions</h4>
                
                <div className="flex flex-col gap-3 px-4 py-3">
                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f0f3f4] text-[#111518] text-sm font-bold leading-normal tracking-[0.015em]">
                    <span className="truncate">Download Account Data</span>
                  </button>
                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#e73908] text-white text-sm font-bold leading-normal tracking-[0.015em]">
                    <span className="truncate">Delete Account</span>
                  </button>
                </div>
              </>
            )}

            {/* Save Button */}
            <div className="flex px-4 py-3 justify-end">
              <button
                onClick={handleSaveChanges}
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#118ee8] text-white text-sm font-bold leading-normal tracking-[0.015em]"
              >
                <span className="truncate">Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
