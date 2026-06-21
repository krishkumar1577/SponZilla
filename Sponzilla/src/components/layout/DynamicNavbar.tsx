import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ProfileDropdown } from '../ui';
import { useNotifications } from '../../contexts/NotificationContext';
import { type UserType } from '../../contexts/UserContext';

interface DynamicNavbarProps {
  userType: UserType;
  className?: string;
}

interface NavLink {
  label: string;
  href: string;
  isActive?: boolean;
}

const DynamicNavbar: React.FC<DynamicNavbarProps> = ({ userType, className = "" }) => {
  const location = useLocation();
  const { unreadMessageCount, unreadSystemCount, notifications, markAsRead, markAllAsRead } = useNotifications();

  // Define navigation links for each user type
  const getNavigationLinks = (type: UserType): NavLink[] => {
    switch (type) {
      case 'club':
        return [
          { label: 'Dashboard', href: '/club-dashboard' },
          { label: 'Find Brands', href: '/find-brands' },
          { label: 'AI Pitch Deck Generator', href: '/ai-pitch-deck' },
        ];
      case 'brand':
        return [
          { label: 'Event Browser', href: '/browse-events' },
          { label: 'Find Clubs', href: '/find-clubs' },
          { label: 'Analytics Dashboard', href: '/brand-dashboard' },
        ];
      case 'guest':
      default:
        return [
          { label: 'For Clubs', href: '/club-landing' },
          { label: 'For Brands', href: '/brand-landing' },
          { label: 'Pricing', href: '/pricing' },
          { label: 'Help Center', href: '/help' },
        ];
    }
  };

  const [isNotifDropdownOpen, setIsNotifDropdownOpen] = React.useState(false);

  // Define action buttons for each user type
  const getActionButtons = (type: UserType) => {
    switch (type) {
      case 'club':
      case 'brand':
        return (
          <div className="flex gap-2 items-center">
            {/* System Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsNotifDropdownOpen(!isNotifDropdownOpen)}
                className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 bg-[#f0f3f4] text-[#111518] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 relative hover:bg-[#e8ecef] transition-colors"
              >
                <div className="text-[#111518]" data-icon="Bell" data-size="20px" data-weight="regular">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"></path>
                  </svg>
                </div>
                {unreadSystemCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 border-2 border-white"></span>
                )}
              </button>

              {/* Dropdown Menu */}
              {isNotifDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 className="font-bold text-gray-900">Notifications</h3>
                    {unreadSystemCount > 0 && (
                      <button 
                        onClick={() => markAllAsRead()}
                        className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="max-h-[320px] overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-gray-500 text-sm">
                        No notifications yet
                      </div>
                    ) : (
                      notifications.map(notif => (
                        <div 
                          key={notif._id} 
                          onClick={() => {
                            if (!notif.read) markAsRead(notif._id);
                            if (notif.link) window.location.href = notif.link;
                            setIsNotifDropdownOpen(false);
                          }}
                          className={`p-4 border-b border-gray-50 cursor-pointer hover:bg-gray-50 transition-colors ${!notif.read ? 'bg-blue-50/50' : ''}`}
                        >
                          <div className="flex gap-3">
                            <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${!notif.read ? 'bg-blue-500' : 'bg-transparent'}`}></div>
                            <div>
                              <p className="text-sm font-bold text-gray-900">{notif.title}</p>
                              <p className="text-xs text-gray-600 mt-1 line-clamp-2">{notif.message}</p>
                              <p className="text-[10px] text-gray-400 mt-2">
                                {new Date(notif.createdAt).toLocaleDateString()} at {new Date(notif.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Chat Dropdown */}
            <Link
              to="/messages"
              className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 bg-[#f0f3f4] text-[#111518] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 relative hover:bg-[#e8ecef] transition-colors"
            >
              <div className="text-[#111518]" data-icon="ChatCircleDots" data-size="20px" data-weight="regular">
                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM84,116a12,12,0,1,0,12,12A12,12,0,0,0,84,116Zm88,0a12,12,0,1,0,12,12A12,12,0,0,0,172,116Zm60,12A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Zm-16,0A88,88,0,1,0,51.81,172.06a8,8,0,0,1,.66,6.54L40,216,77.4,203.53a7.85,7.85,0,0,1,2.53-.42,8,8,0,0,1,4,1.08A88,88,0,0,0,216,128Z"></path>
                </svg>
              </div>
              {unreadMessageCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 border-2 border-white"></span>
              )}

            </Link>
            <Link
              to="/help"
              className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 bg-[#f0f3f4] text-[#111518] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5"
            >
              <div className="text-[#111518]" data-icon="Question" data-size="20px" data-weight="regular">
                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M140,180a12,12,0,1,1-12-12A12,12,0,0,1,140,180ZM128,72c-22.06,0-40,16.15-40,36v4a8,8,0,0,0,16,0v-4c0-11,10.77-20,24-20s24,9,24,20-10.77,20-24,20a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-.72c18.24-3.35,32-17.9,32-35.28C168,88.15,150.06,72,128,72Zm104,56A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
                </svg>
              </div>
            </Link>
          </div>
        );
      case 'guest':
      default:
        return (
          <div className="flex gap-2">
            <Link to="/list-event" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#dce8f3] text-[#121416] text-sm font-bold leading-normal tracking-[0.015em]">
              <span className="truncate">List Your Event</span>
            </Link>
            <Link to="/browse-events" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f1f2f4] text-[#121416] text-sm font-bold leading-normal tracking-[0.015em]">
              <span className="truncate">Find Events</span>
            </Link>
            <Link to="/login" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f1f2f4] text-[#121416] text-sm font-bold leading-normal tracking-[0.015em]">
              <span className="truncate">Login / Sign Up</span>
            </Link>
          </div>
        );
    }
  };

  const navigationLinks = getNavigationLinks(userType);

  return (
    <header className={`flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f3f4] px-10 py-3 ${className}`}>
      {/* Logo Section */}
      <div className="flex items-center gap-4 text-[#111518]">
        <Link to="/" className="flex items-center gap-4 cursor-pointer">
          <div className="size-8 overflow-hidden rounded-lg">
            <img 
              src="/sponzilla_favicon.ico" 
              alt="SponZilla Logo" 
              className="size-full object-cover"
            />
          </div>
          <h2 className="text-[#111518] text-lg font-bold leading-tight tracking-[-0.015em]">SponZilla</h2>
        </Link>
      </div>

      {/* Navigation and Actions Section */}
      <div className="flex flex-1 justify-end gap-8">
        {/* Navigation Links */}
        <div className="flex items-center gap-9">
          {navigationLinks.map((link, index) => (
            <Link 
              key={index}
              to={link.href} 
              className={`text-sm font-medium leading-normal ${
                location.pathname === link.href 
                  ? 'text-[#617989] font-bold' 
                  : 'text-[#111518] hover:text-[#617989]'
              } transition-colors duration-200`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Action Buttons */}
        {getActionButtons(userType)}

        {/* Profile Dropdown for Authenticated Users */}
        {(userType === 'club' || userType === 'brand') && (
          <ProfileDropdown />
        )}
      </div>
    </header>
  );
};

export default DynamicNavbar;
