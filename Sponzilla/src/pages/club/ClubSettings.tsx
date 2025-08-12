import React, { useState } from 'react';
import { SmartNavbar } from '../../components/layout/Navbar';

const ClubSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Account Settings');
  const [formData, setFormData] = useState({
    // Account fields
    accountEmail: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    
    // Club Information fields
    clubName: '',
    logo: '',
    description: '',
    category: '',
    website: '',
    contactEmail: '',
    phoneNumber: '',
    campusLocation: '',
    memberCount: '',
    foundedYear: '',
    
    // Notifications fields
    emailNotifications: true,
    pushNotifications: true,
    sponsorshipOpportunities: true,
    eventReminders: true,
    messageNotifications: true,
    memberUpdates: true,
    
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Club settings saved:', formData);
    // Add save logic here
  };

  const tabs = ['Account', 'Club Information', 'Notifications', 'Security'];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Account':
        return (
          <div className="space-y-6">
            <div className="flex flex-col gap-3">
              <label className="text-[#111518] text-base font-medium text-left">Email Address</label>
              <input
                type="email"
                name="accountEmail"
                value={formData.accountEmail}
                onChange={handleInputChange}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#617989] p-[15px] text-base font-normal leading-normal"
                placeholder="your.email@university.edu"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-[#111518] text-base font-medium text-left">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleInputChange}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#617989] p-[15px] text-base font-normal leading-normal"
                placeholder="Enter current password"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-[#111518] text-base font-medium text-left">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#617989] p-[15px] text-base font-normal leading-normal"
                placeholder="Enter new password"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-[#111518] text-base font-medium text-left">Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#617989] p-[15px] text-base font-normal leading-normal"
                placeholder="Confirm new password"
              />
            </div>
          </div>
        );

      case 'Club Information':
        return (
          <div className="space-y-6">
            <div className="flex flex-col gap-3">
              <label className="text-[#111518] text-base font-medium text-left">Club Name</label>
              <input
                type="text"
                name="clubName"
                value={formData.clubName}
                onChange={handleInputChange}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#617989] p-[15px] text-base font-normal leading-normal"
                placeholder="Tech Innovation Club"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-[#111518] text-base font-medium text-left">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#617989] p-[15px] text-base font-normal leading-normal"
              >
                <option value="">Select category</option>
                <option value="academic">Academic</option>
                <option value="sports">Sports</option>
                <option value="technology">Technology</option>
                <option value="arts">Arts & Culture</option>
                <option value="service">Community Service</option>
                <option value="professional">Professional</option>
                <option value="social">Social</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-[#111518] text-base font-medium text-left">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] placeholder:text-[#617989] p-[15px] text-base font-normal leading-normal"
                placeholder="Describe your club's mission and activities..."
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-[#111518] text-base font-medium text-left">Member Count</label>
              <input
                type="number"
                name="memberCount"
                value={formData.memberCount}
                onChange={handleInputChange}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#617989] p-[15px] text-base font-normal leading-normal"
                placeholder="50"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-[#111518] text-base font-medium text-left">Campus Location</label>
              <input
                type="text"
                name="campusLocation"
                value={formData.campusLocation}
                onChange={handleInputChange}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#617989] p-[15px] text-base font-normal leading-normal"
                placeholder="Student Union Building, Room 201"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-[#111518] text-base font-medium text-left">Website</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#617989] p-[15px] text-base font-normal leading-normal"
                placeholder="https://techclub.university.edu"
              />
            </div>
          </div>
        );

      case 'Notifications':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[#111518] text-base font-medium text-left">Email Notifications</h3>
                <p className="text-[#617989] text-sm">Receive notifications via email</p>
              </div>
              <input
                type="checkbox"
                name="emailNotifications"
                checked={formData.emailNotifications}
                onChange={handleInputChange}
                className="w-5 h-5 text-[#617989] rounded focus:ring-[#617989]"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[#111518] text-base font-medium text-left">Sponsorship Opportunities</h3>
                <p className="text-[#617989] text-sm">Get notified about new sponsorship opportunities</p>
              </div>
              <input
                type="checkbox"
                name="sponsorshipOpportunities"
                checked={formData.sponsorshipOpportunities}
                onChange={handleInputChange}
                className="w-5 h-5 text-[#617989] rounded focus:ring-[#617989]"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[#111518] text-base font-medium text-left">Event Reminders</h3>
                <p className="text-[#617989] text-sm">Reminders for upcoming club events</p>
              </div>
              <input
                type="checkbox"
                name="eventReminders"
                checked={formData.eventReminders}
                onChange={handleInputChange}
                className="w-5 h-5 text-[#617989] rounded focus:ring-[#617989]"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[#111518] text-base font-medium text-left">Message Notifications</h3>
                <p className="text-[#617989] text-sm">Notifications for new messages</p>
              </div>
              <input
                type="checkbox"
                name="messageNotifications"
                checked={formData.messageNotifications}
                onChange={handleInputChange}
                className="w-5 h-5 text-[#617989] rounded focus:ring-[#617989]"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[#111518] text-base font-medium text-left">Member Updates</h3>
                <p className="text-[#617989] text-sm">Updates about club membership changes</p>
              </div>
              <input
                type="checkbox"
                name="memberUpdates"
                checked={formData.memberUpdates}
                onChange={handleInputChange}
                className="w-5 h-5 text-[#617989] rounded focus:ring-[#617989]"
              />
            </div>
          </div>
        );

      case 'Security':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[#111518] text-base font-medium text-left">Two-Factor Authentication</h3>
                <p className="text-[#617989] text-sm">Add an extra layer of security to your account</p>
              </div>
              <input
                type="checkbox"
                name="twoFactorAuth"
                checked={formData.twoFactorAuth}
                onChange={handleInputChange}
                className="w-5 h-5 text-[#617989] rounded focus:ring-[#617989]"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[#111518] text-base font-medium text-left">Login Alerts</h3>
                <p className="text-[#617989] text-sm">Get notified when someone logs into your account</p>
              </div>
              <input
                type="checkbox"
                name="loginAlerts"
                checked={formData.loginAlerts}
                onChange={handleInputChange}
                className="w-5 h-5 text-[#617989] rounded focus:ring-[#617989]"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-[#111518] text-base font-medium text-left">Session Timeout</label>
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
                <option value="0">Never</option>
              </select>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <SmartNavbar />
        
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            {/* Header */}
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <p className="text-[#111518] tracking-light text-[32px] font-bold leading-tight text-left">Club Settings</p>
                <p className="text-[#617989] text-sm font-normal leading-normal text-left">Manage your club's account, profile, and preferences.</p>
              </div>
            </div>

            {/* Settings Content */}
            <div className="flex gap-6 p-4">
              {/* Sidebar */}
              <div className="flex flex-col w-64 space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex items-center px-4 py-3 text-left rounded-xl transition-colors ${
                      activeTab === tab
                        ? 'bg-[#f0f3f4] text-[#111518] font-medium'
                        : 'text-[#617989] hover:bg-[#f8f9fa] hover:text-[#111518]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="bg-white border border-[#dbe1e6] rounded-xl p-6">
                  <form onSubmit={handleSubmit}>
                    {renderTabContent()}
                    
                    <div className="flex justify-end pt-6 mt-6 border-t border-[#dbe1e6]">
                      <button
                        type="submit"
                        className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#617989] text-white text-sm font-bold leading-normal tracking-[0.015em]"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubSettings;
