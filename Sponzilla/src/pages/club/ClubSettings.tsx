import React, { useState, useEffect } from 'react';
import { SmartNavbar } from '../../components/layout/Navbar';
import { profilesAPI, authAPI, type ClubProfile, type UserSettings } from '../../services/api';

const ClubSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Account Settings');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [clubProfile, setClubProfile] = useState<ClubProfile | null>(null);
  const [userSettings, setUserSettings] = useState<UserSettings | null>(null);
  const [formData, setFormData] = useState({
    // Account fields
    accountEmail: '',
    accountName: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    
    // Club Information fields  
    clubName: '',
    logo: '',
    description: '',
    category: '',
    university: '',
    website: '',
    contactEmail: '',
    contactName: '',
    phoneNumber: '',
    memberCount: '',
    establishedYear: '',
    
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

  // Load current profile and settings data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Load user profile
        const userResponse = await authAPI.getProfile();
        const user = userResponse.user;
        
        // Load club profile if it exists
        try {
          const clubResponse = await profilesAPI.getMyProfile();
          if (clubResponse.profile && 'clubName' in clubResponse.profile) {
            setClubProfile(clubResponse.profile as ClubProfile);
          }
        } catch (err) {
          console.log('No club profile found - this is OK for new users');
        }
        
        // Load user settings
        try {
          const settingsResponse = await authAPI.getSettings();
          setUserSettings(settingsResponse);
        } catch (err) {
          console.log('No settings found - using defaults');
        }
        
        // Populate form with existing data
        setFormData(prev => ({
          ...prev,
          // Account data
          accountEmail: user.email || '',
          accountName: user.name || '',
          // Club data
          clubName: clubProfile?.clubName || '',
          description: clubProfile?.description || '',
          category: clubProfile?.category || '',
          university: clubProfile?.university || '',
          website: clubProfile?.website || '',
          contactEmail: clubProfile?.contactPerson?.email || '',
          contactName: clubProfile?.contactPerson?.name || '',
          phoneNumber: clubProfile?.contactPerson?.phone || '',
          memberCount: clubProfile?.memberCount?.toString() || '',
          establishedYear: clubProfile?.establishedYear?.toString() || '',
          // Settings data
          emailNotifications: userSettings?.notifications?.emailNotifications ?? true,
          pushNotifications: userSettings?.notifications?.pushNotifications ?? true,
          eventReminders: userSettings?.notifications?.eventReminders ?? true,
          messageNotifications: userSettings?.notifications?.messageNotifications ?? true,
          twoFactorAuth: userSettings?.security?.twoFactorAuth ?? false,
          loginAlerts: userSettings?.security?.loginAlerts ?? true,
          sessionTimeout: userSettings?.security?.sessionTimeout || '30'
        }));
        
      } catch (err) {
        setError('Failed to load settings data');
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    
    try {
      setLoading(true);
      
      switch (activeTab) {
        case 'Account Settings':
          // Handle password change if provided
          if (formData.newPassword) {
            if (formData.newPassword !== formData.confirmPassword) {
              setError('New passwords do not match');
              return;
            }
            if (formData.newPassword.length < 6) {
              setError('Password must be at least 6 characters');
              return;
            }
            if (!formData.currentPassword) {
              setError('Current password is required');
              return;
            }
            
            await authAPI.changePassword({
              currentPassword: formData.currentPassword,
              newPassword: formData.newPassword
            });
          }
          
          // Handle account info update
          if (formData.accountName || formData.accountEmail) {
            await authAPI.updateAccount({
              name: formData.accountName,
              email: formData.accountEmail
            });
          }
          
          setSuccess('Account settings updated successfully!');
          // Clear password fields
          setFormData(prev => ({
            ...prev,
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
          }));
          break;
          
        case 'Club Information':
          const clubData = {
            clubName: formData.clubName,
            description: formData.description,
            category: formData.category,
            university: formData.university,
            website: formData.website,
            memberCount: parseInt(formData.memberCount) || 0,
            establishedYear: parseInt(formData.establishedYear) || new Date().getFullYear(),
            contactPerson: {
              name: formData.contactName,
              email: formData.contactEmail,
              phone: formData.phoneNumber
            }
          };
          
          if (clubProfile) {
            await profilesAPI.updateClubProfile(clubData);
          } else {
            await profilesAPI.createClubProfile(clubData);
          }
          
          setSuccess('Club information updated successfully!');
          break;
          
        case 'Team Management':
          // For now, just save any team-related settings
          setSuccess('Team management settings updated successfully!');
          break;
          
        case 'Notifications':
          await authAPI.updateSettings({
            notifications: {
              emailNotifications: formData.emailNotifications,
              pushNotifications: formData.pushNotifications,
              eventReminders: formData.eventReminders,
              messageNotifications: formData.messageNotifications
            }
          });
          
          setSuccess('Notification settings updated successfully!');
          break;
          
        case 'Security':
          await authAPI.updateSettings({
            security: {
              twoFactorAuth: formData.twoFactorAuth,
              loginAlerts: formData.loginAlerts,
              sessionTimeout: formData.sessionTimeout
            }
          });
          
          setSuccess('Security settings updated successfully!');
          break;
          
        default:
          setError('Unknown settings tab');
      }
      
    } catch (err: any) {
      setError(err.message || 'Failed to save settings');
      console.error('Error saving settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const tabs = ['Account Settings', 'Club Information', 'Team Management', 'Notifications', 'Security'];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Account Settings':
        return (
          <div className="space-y-6">
            <div className="flex flex-col gap-3">
              <label className="text-[#111518] text-base font-medium text-left">Full Name</label>
              <input
                type="text"
                name="accountName"
                value={formData.accountName}
                onChange={handleInputChange}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#617989] p-[15px] text-base font-normal leading-normal"
                placeholder="Your full name"
              />
            </div>
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
            <hr className="border-t border-[#dbe1e6] my-6" />
            <h3 className="text-[#111518] text-lg font-semibold">Change Password</h3>
            <div className="flex flex-col gap-3">`
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

      case 'Team Management':
        return (
          <div className="space-y-6">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="text-[#111518] text-lg font-semibold mb-2">Team Management</h3>
              <p className="text-[#617989] text-sm mb-4">Manage your club's team members, roles, and permissions.</p>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-[#dbe1e6]">
                  <h4 className="text-[#111518] text-base font-medium mb-2">Current Team Members</h4>
                  <p className="text-[#617989] text-sm mb-3">View and manage existing team members</p>
                  <button className="px-4 py-2 bg-[#f0f3f4] text-[#111518] rounded-lg text-sm font-medium hover:bg-[#e8f0f5] transition-colors">
                    View Team Members
                  </button>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-[#dbe1e6]">
                  <h4 className="text-[#111518] text-base font-medium mb-2">Invite New Members</h4>
                  <p className="text-[#617989] text-sm mb-3">Send invitations to new team members</p>
                  <button className="px-4 py-2 bg-[#617989] text-white rounded-lg text-sm font-medium hover:bg-[#4a6675] transition-colors">
                    Send Invitations
                  </button>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-[#dbe1e6]">
                  <h4 className="text-[#111518] text-base font-medium mb-2">Role Permissions</h4>
                  <p className="text-[#617989] text-sm mb-3">Configure permissions for different roles</p>
                  <button className="px-4 py-2 bg-[#f0f3f4] text-[#111518] rounded-lg text-sm font-medium hover:bg-[#e8f0f5] transition-colors">
                    Manage Roles
                  </button>
                </div>
              </div>
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

            {/* Error/Success Messages */}
            {error && (
              <div className="mx-4 mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm font-medium">⚠ {error}</p>
              </div>
            )}
            
            {success && (
              <div className="mx-4 mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-600 text-sm font-medium">✅ {success}</p>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="mx-4 mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-600 text-sm font-medium">💾 Saving settings...</p>
              </div>
            )}

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
