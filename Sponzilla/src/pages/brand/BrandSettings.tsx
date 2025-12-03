import React, { useState, useEffect } from 'react';
import { SmartNavbar } from '../../components/layout/Navbar';
import { profilesAPI, authAPI, type BrandProfile, type UserSettings } from '../../services/api';

const BrandSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Account Settings');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [brandProfile, setBrandProfile] = useState<BrandProfile | null>(null);
  const [userSettings, setUserSettings] = useState<UserSettings | null>(null);
  const [formData, setFormData] = useState({
    // Account fields
    accountEmail: '',
    accountName: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    
    // Brand Information fields
    brandName: '',
    logo: '',
    description: '',
    industry: '',
    website: '',
    contactEmail: '',
    contactName: '',
    phoneNumber: '',
    
    // Social Media fields
    instagram: '',
    twitter: '',
    linkedin: '',
    
    // Sponsorship fields
    minBudget: '',
    maxBudget: '',
    targetAudience: '',
    preferredEventTypes: '',
    
    // Notifications fields
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    sponsorshipUpdates: true,
    eventNotifications: true,
    messageNotifications: true,
    clubApplications: true,
    
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
        
        // Load brand profile if it exists
        try {
          const brandResponse = await profilesAPI.getMyProfile();
          if (brandResponse.profile && 'brandName' in brandResponse.profile) {
            setBrandProfile(brandResponse.profile as BrandProfile);
          }
        } catch (err) {
          console.log('No brand profile found - this is OK for new users');
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
          // Brand data
          brandName: brandProfile?.brandName || '',
          description: brandProfile?.description || '',
          industry: brandProfile?.industry || '',
          website: brandProfile?.website || '',
          contactEmail: brandProfile?.contactPerson?.email || '',
          contactName: brandProfile?.contactPerson?.name || '',
          phoneNumber: brandProfile?.contactPerson?.phone || '',
          // Social media
          instagram: brandProfile?.socialMedia?.instagram || '',
          twitter: brandProfile?.socialMedia?.twitter || '',
          linkedin: brandProfile?.socialMedia?.linkedin || '',
          // Sponsorship
          minBudget: brandProfile?.sponsorshipBudget?.min?.toString() || '',
          maxBudget: brandProfile?.sponsorshipBudget?.max?.toString() || '',
          targetAudience: Array.isArray(brandProfile?.targetAudience) ? brandProfile.targetAudience.join(', ') : '',
          preferredEventTypes: Array.isArray(brandProfile?.preferredEventTypes) ? brandProfile.preferredEventTypes.join(', ') : '',
          // Settings data
          emailNotifications: userSettings?.notifications?.emailNotifications ?? true,
          pushNotifications: userSettings?.notifications?.pushNotifications ?? true,
          eventNotifications: userSettings?.notifications?.eventReminders ?? true,
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
    
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      
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
          
        case 'Brand Information':
          const brandData = {
            brandName: formData.brandName,
            description: formData.description,
            industry: formData.industry,
            website: formData.website,
            contactPerson: {
              name: formData.contactName,
              email: formData.contactEmail,
              phone: formData.phoneNumber
            },
            socialMedia: {
              instagram: formData.instagram,
              twitter: formData.twitter,
              linkedin: formData.linkedin
            },
            sponsorshipBudget: {
              min: parseInt(formData.minBudget) || 0,
              max: parseInt(formData.maxBudget) || 0
            },
            targetAudience: formData.targetAudience.split(',').map(s => s.trim()).filter(Boolean),
            preferredEventTypes: formData.preferredEventTypes.split(',').map(s => s.trim()).filter(Boolean)
          };
          
          if (brandProfile) {
            await profilesAPI.updateBrandProfile(brandData);
          } else {
            await profilesAPI.createBrandProfile(brandData);
          }
          
          setSuccess('Brand information updated successfully!');
          break;
          
        case 'Sponsorship Preferences':
          const sponsorshipData = {
            sponsorshipBudget: {
              min: parseInt(formData.minBudget) || 0,
              max: parseInt(formData.maxBudget) || 0
            },
            targetAudience: formData.targetAudience.split(',').map(s => s.trim()).filter(Boolean),
            preferredEventTypes: formData.preferredEventTypes.split(',').map(s => s.trim()).filter(Boolean)
          };
          
          if (brandProfile) {
            await profilesAPI.updateBrandProfile(sponsorshipData);
          }
          
          setSuccess('Sponsorship preferences updated successfully!');
          break;
          
        case 'Notifications':
          await authAPI.updateSettings({
            notifications: {
              emailNotifications: formData.emailNotifications,
              pushNotifications: formData.pushNotifications,
              eventReminders: formData.eventNotifications,
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

  const tabs = ['Account Settings', 'Brand Information', 'Sponsorship Preferences', 'Notifications', 'Security'];

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
                placeholder="partnerships@company.com"
              />
            </div>
            <hr className="border-t border-[#dbe1e6] my-6" />
            <h3 className="text-[#111518] text-lg font-semibold">Change Password</h3>
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

      case 'Brand Information':
        return (
          <div className="space-y-6">
            <div className="flex flex-col gap-3">
              <label className="text-[#111518] text-base font-medium text-left">Brand Name</label>
              <input
                type="text"
                name="brandName"
                value={formData.brandName}
                onChange={handleInputChange}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#617989] p-[15px] text-base font-normal leading-normal"
                placeholder="Your brand/company name"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-[#111518] text-base font-medium text-left">Industry</label>
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
                <option value="food">Food & Beverage</option>
                <option value="automotive">Automotive</option>
                <option value="sports">Sports & Recreation</option>
                <option value="entertainment">Entertainment</option>
                <option value="nonprofit">Non-profit</option>
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
                placeholder="Tell us about your brand and what you do"
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
                placeholder="https://yourbrand.com"
              />
            </div>
            <hr className="border-t border-[#dbe1e6] my-6" />
            <h4 className="text-[#111518] text-base font-semibold">Contact Information</h4>
            <div className="flex flex-col gap-3">
              <label className="text-[#111518] text-base font-medium text-left">Contact Person Name</label>
              <input
                type="text"
                name="contactName"
                value={formData.contactName}
                onChange={handleInputChange}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#617989] p-[15px] text-base font-normal leading-normal"
                placeholder="Marketing Manager"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-[#111518] text-base font-medium text-left">Contact Email</label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleInputChange}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#617989] p-[15px] text-base font-normal leading-normal"
                placeholder="partnerships@company.com"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-[#111518] text-base font-medium text-left">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#617989] p-[15px] text-base font-normal leading-normal"
                placeholder="(555) 123-4567"
              />
            </div>
            <hr className="border-t border-[#dbe1e6] my-6" />
            <h4 className="text-[#111518] text-base font-semibold">Social Media</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="flex flex-col gap-2">
                <label className="text-[#111518] text-sm font-medium text-left">Instagram</label>
                <input
                  type="text"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleInputChange}
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-12 placeholder:text-[#617989] p-[12px] text-sm font-normal leading-normal"
                  placeholder="@yourbrand"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[#111518] text-sm font-medium text-left">Twitter</label>
                <input
                  type="text"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleInputChange}
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-12 placeholder:text-[#617989] p-[12px] text-sm font-normal leading-normal"
                  placeholder="@yourbrand"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[#111518] text-sm font-medium text-left">LinkedIn</label>
                <input
                  type="text"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleInputChange}
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-12 placeholder:text-[#617989] p-[12px] text-sm font-normal leading-normal"
                  placeholder="company/yourbrand"
                />
              </div>
            </div>
          </div>
        );

      case 'Sponsorship Preferences':
        return (
          <div className="space-y-6">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="text-[#111518] text-lg font-semibold mb-2">Sponsorship Budget Range</h3>
              <p className="text-[#617989] text-sm mb-4">Set your sponsorship budget range to help clubs understand your investment capacity.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-3">
                  <label className="text-[#111518] text-base font-medium text-left">Minimum Budget ($)</label>
                  <input
                    type="number"
                    name="minBudget"
                    value={formData.minBudget}
                    onChange={handleInputChange}
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#617989] p-[15px] text-base font-normal leading-normal"
                    placeholder="1000"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-[#111518] text-base font-medium text-left">Maximum Budget ($)</label>
                  <input
                    type="number"
                    name="maxBudget"
                    value={formData.maxBudget}
                    onChange={handleInputChange}
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#617989] p-[15px] text-base font-normal leading-normal"
                    placeholder="10000"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-3">
              <label className="text-[#111518] text-base font-medium text-left">Target Audience</label>
              <textarea
                name="targetAudience"
                value={formData.targetAudience}
                onChange={handleInputChange}
                rows={3}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] placeholder:text-[#617989] p-[15px] text-base font-normal leading-normal"
                placeholder="Students, Young Professionals, Tech Enthusiasts (separate with commas)"
              />
              <p className="text-[#617989] text-sm">Describe your target demographics (separate multiple audiences with commas)</p>
            </div>
            
            <div className="flex flex-col gap-3">
              <label className="text-[#111518] text-base font-medium text-left">Preferred Event Types</label>
              <textarea
                name="preferredEventTypes"
                value={formData.preferredEventTypes}
                onChange={handleInputChange}
                rows={3}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] placeholder:text-[#617989] p-[15px] text-base font-normal leading-normal"
                placeholder="Tech Conferences, Career Fairs, Networking Events, Workshops (separate with commas)"
              />
              <p className="text-[#617989] text-sm">Types of events you're most interested in sponsoring (separate multiple types with commas)</p>
            </div>
            
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="text-[#111518] text-base font-semibold mb-2">💡 Sponsorship Tips</h4>
              <ul className="text-[#617989] text-sm space-y-1">
                <li>• Be specific about your target audience to get better matches</li>
                <li>• Consider different event types to maximize reach</li>
                <li>• Set realistic budget ranges based on your marketing goals</li>
                <li>• Update preferences regularly to reflect changing priorities</li>
              </ul>
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
                <h3 className="text-[#111518] text-base font-medium text-left">Push Notifications</h3>
                <p className="text-[#617989] text-sm">Receive push notifications in browser</p>
              </div>
              <input
                type="checkbox"
                name="pushNotifications"
                checked={formData.pushNotifications}
                onChange={handleInputChange}
                className="w-5 h-5 text-[#617989] rounded focus:ring-[#617989]"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[#111518] text-base font-medium text-left">Sponsorship Updates</h3>
                <p className="text-[#617989] text-sm">Updates on your sponsorship opportunities and applications</p>
              </div>
              <input
                type="checkbox"
                name="sponsorshipUpdates"
                checked={formData.sponsorshipUpdates}
                onChange={handleInputChange}
                className="w-5 h-5 text-[#617989] rounded focus:ring-[#617989]"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[#111518] text-base font-medium text-left">Event Notifications</h3>
                <p className="text-[#617989] text-sm">Notifications about events from clubs you sponsor</p>
              </div>
              <input
                type="checkbox"
                name="eventNotifications"
                checked={formData.eventNotifications}
                onChange={handleInputChange}
                className="w-5 h-5 text-[#617989] rounded focus:ring-[#617989]"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[#111518] text-base font-medium text-left">Message Notifications</h3>
                <p className="text-[#617989] text-sm">Notifications for new messages from clubs</p>
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
                <h3 className="text-[#111518] text-base font-medium text-left">Club Applications</h3>
                <p className="text-[#617989] text-sm">Notifications when clubs apply for your sponsorship opportunities</p>
              </div>
              <input
                type="checkbox"
                name="clubApplications"
                checked={formData.clubApplications}
                onChange={handleInputChange}
                className="w-5 h-5 text-[#617989] rounded focus:ring-[#617989]"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[#111518] text-base font-medium text-left">Marketing Emails</h3>
                <p className="text-[#617989] text-sm">Receive marketing emails and newsletter updates</p>
              </div>
              <input
                type="checkbox"
                name="marketingEmails"
                checked={formData.marketingEmails}
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
                <option value="240">4 hours</option>
                <option value="480">8 hours</option>
                <option value="never">Never</option>
              </select>
              <p className="text-[#617989] text-sm">How long to stay logged in when inactive</p>
            </div>
            
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="text-[#111518] text-base font-semibold mb-2">🔒 Security Recommendations</h4>
              <ul className="text-[#617989] text-sm space-y-1">
                <li>• Enable two-factor authentication for better security</li>
                <li>• Use a strong, unique password for your account</li>
                <li>• Keep login alerts enabled to monitor account access</li>
                <li>• Set appropriate session timeout for your usage pattern</li>
                <li>• Regularly review and update your security settings</li>
              </ul>
            </div>
          </div>
        );

      default:
        return <div>Select a tab to view settings</div>;
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
                <p className="text-[#111518] tracking-light text-[32px] font-bold leading-tight text-left">Brand Settings</p>
                <p className="text-[#617989] text-sm font-normal leading-normal text-left">Manage your brand's account, profile, and sponsorship preferences.</p>
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

export default BrandSettings;
