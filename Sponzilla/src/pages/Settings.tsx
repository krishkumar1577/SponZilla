import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import { useUser } from '../contexts/UserContext';
import { authAPI } from '../services/api';

const SettingsPage: React.FC = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('Account');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    accountEmail: '',
    accountName: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      accountEmail: user.email || '',
      accountName: user.name || '',
    }));
  }, [user.email, user.name]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
    setSuccess(null);
  };

  const handleSaveAccount = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      if (formData.accountEmail !== user.email || formData.accountName !== user.name) {
        await authAPI.updateAccount({
          name: formData.accountName,
          email: formData.accountEmail,
        });
      }

      if (formData.currentPassword && formData.newPassword) {
        if (formData.newPassword !== formData.confirmPassword) {
          setError('New passwords do not match');
          setSaving(false);
          return;
        }
        await authAPI.changePassword({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        });
        setFormData(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
      }

      setSuccess('Settings saved successfully');
    } catch (err: any) {
      setError(err.message || 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const tabs = ['Account', 'Notifications', 'Security'];

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <Navbar />

        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-[#111518] tracking-light text-[32px] font-bold leading-tight min-w-72 text-left">Settings</p>
            </div>

            <div className="pb-3">
              <div className="flex border-b border-[#dbe1e6] px-4 gap-8">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => { setActiveTab(tab); setError(null); setSuccess(null); }}
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

            {error && (
              <div className="mx-4 mb-2 p-3 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}
            {success && (
              <div className="mx-4 mb-2 p-3 bg-green-50 border border-green-200 rounded-xl">
                <p className="text-green-700 text-sm">{success}</p>
              </div>
            )}

            {activeTab === 'Account' && (
              <>
                <h3 className="text-[#111518] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4 text-left">Account Settings</h3>

                <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                  <label className="flex flex-col min-w-40 flex-1">
                    <p className="text-[#111518] text-base font-medium leading-normal pb-2 text-left">Name</p>
                    <input
                      name="accountName"
                      value={formData.accountName}
                      onChange={handleInputChange}
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#617989] p-[15px] text-base font-normal leading-normal"
                      placeholder="Your name"
                    />
                  </label>
                </div>

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

                <div className="flex px-4 py-3 justify-end">
                  <button
                    onClick={handleSaveAccount}
                    disabled={saving}
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#118ee8] text-white text-sm font-bold leading-normal tracking-[0.015em] disabled:opacity-50"
                  >
                    <span className="truncate">{saving ? 'Saving...' : 'Save Changes'}</span>
                  </button>
                </div>
              </>
            )}

            {activeTab === 'Notifications' && (
              <div className="flex flex-col items-center justify-center py-16 px-4">
                <div className="w-16 h-16 rounded-full bg-[#f0f3f4] flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-[#617989]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                  </svg>
                </div>
                <p className="text-[#111518] text-lg font-bold">Coming Soon</p>
                <p className="text-[#617989] text-sm mt-1 text-center max-w-sm">Notification preferences will be available here soon. You'll be able to control email, push, and marketing notifications.</p>
              </div>
            )}

            {activeTab === 'Security' && (
              <div className="flex flex-col items-center justify-center py-16 px-4">
                <div className="w-16 h-16 rounded-full bg-[#f0f3f4] flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-[#617989]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <p className="text-[#111518] text-lg font-bold">Coming Soon</p>
                <p className="text-[#617989] text-sm mt-1 text-center max-w-sm">Two-factor authentication, login alerts, and session management will be available here soon.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
