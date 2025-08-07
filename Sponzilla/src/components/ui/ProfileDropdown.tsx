import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface ProfileDropdownProps {
  profileImageUrl?: string;
  className?: string;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ 
  profileImageUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuCanujA-hYauxn7UOxEnRuAOBOGGHlSFrhJUNhwNXcl5X95OIFQAZudPUYMixDbuQM8suLs726Zo_B5B1QA6nq5WY0hqUxLQeCYztr2UXCAGK4WjdagCfjo_3pcjfE7QWae-YqdfJcx7fqhXrpNP7tC82R7LlOUJkq_5PkLW_SkZ9NX5QMV14oPQiXITX2PeC9iJNRpjOrwDBZFxmlW3J2CTNSiLkkTeB3bhm_Fuy_i6YY2pxfYY8Qi_t8QXCwnh0fcZAr4X2fJg-U",
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // Add logout logic here (clear tokens, user data, etc.)
    console.log('Logging out...');
    // For now, just close the dropdown
    setIsOpen(false);
    // Redirect to landing page or logout confirmation
    // window.location.href = '/';
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Profile Icon Trigger */}
      <button
        onClick={toggleDropdown}
        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 hover:ring-2 hover:ring-[#617889] hover:ring-offset-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#617889] focus:ring-offset-2"
        style={{ backgroundImage: `url("${profileImageUrl}")` }}
        aria-label="Profile menu"
      />

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-12 w-48 bg-white rounded-lg shadow-lg border border-[#dbe1e6] py-2 z-50">
          {/* Arrow pointer */}
          <div className="absolute -top-2 right-3 w-4 h-4 bg-white border-l border-t border-[#dbe1e6] transform rotate-45"></div>
          
          {/* Menu Items */}
          <div className="py-1">
            <Link
              to="/brand-profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center px-4 py-2 text-sm text-[#111518] hover:bg-[#f0f3f4] transition-colors duration-150"
            >
              <div className="mr-3 text-[#617889]" data-icon="User" data-size="16px">
                <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
                </svg>
              </div>
              View Profile
            </Link>
            
            <Link
              to="/profile-settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center px-4 py-2 text-sm text-[#111518] hover:bg-[#f0f3f4] transition-colors duration-150"
            >
              <div className="mr-3 text-[#617889]" data-icon="Gear" data-size="16px">
                <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm88-29.84q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.21,107.21,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3.12-3.07L186.4,40.54a8,8,0,0,0-3.94-6,107.71,107.71,0,0,0-26.25-10.87,8,8,0,0,0-7.06,1.49L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3.07,3.12L40.54,69.6a8,8,0,0,0-6,3.94A107.71,107.71,0,0,0,23.63,99.79a8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.21,107.21,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3.12,3.07L69.6,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3.07-3.12L215.46,186.4a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06Zm-16.1-6.5a73.93,73.93,0,0,1,0,8.68,8,8,0,0,0,1.74,5.48l14.19,17.73a91.57,91.57,0,0,1-6.23,15L187,181.29a8,8,0,0,0-5.1,2.64,73.93,73.93,0,0,1-6.14,6.14,8,8,0,0,0-2.64,5.1l-2.51,22.58a91.32,91.32,0,0,1-15,6.23l-17.74-14.19a8,8,0,0,0-5-1.75h-.48a73.93,73.93,0,0,1-8.68,0,8,8,0,0,0-5.48,1.74L100.45,223.8a91.57,91.57,0,0,1-15-6.23L74.71,195a8,8,0,0,0-2.64-5.1,73.93,73.93,0,0,1-6.14-6.14,8,8,0,0,0-5.1-2.64L38.25,178.67a91.32,91.32,0,0,1-6.23-15l14.19-17.74a8,8,0,0,0,1.74-5.48,73.93,73.93,0,0,1,0-8.68,8,8,0,0,0-1.74-5.48L32.2,108.55a91.57,91.57,0,0,1,6.23-15L61,74.71a8,8,0,0,0,5.1-2.64,73.93,73.93,0,0,1,6.14-6.14,8,8,0,0,0,2.64-5.1L77.33,38.25a91.32,91.32,0,0,1,15-6.23l17.74,14.19a8,8,0,0,0,5.48,1.74,73.93,73.93,0,0,1,8.68,0,8,8,0,0,0,5.48-1.74L155.55,32.2a91.57,91.57,0,0,1,15,6.23L181.29,61a8,8,0,0,0,2.64,5.1,73.93,73.93,0,0,1,6.14,6.14,8,8,0,0,0,5.1,2.64l22.58,2.51a91.32,91.32,0,0,1,6.23,15l-14.19,17.74A8,8,0,0,0,199.9,123.66Z"></path>
                </svg>
              </div>
              Settings
            </Link>
            
            {/* Divider */}
            <div className="my-1 border-t border-[#dbe1e6]"></div>
            
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm text-[#e73908] hover:bg-[#f0f3f4] transition-colors duration-150"
            >
              <div className="mr-3 text-[#e73908]" data-icon="SignOut" data-size="16px">
                <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M124,216a12,12,0,0,1-12,12H48a20,20,0,0,1-20-20V48A20,20,0,0,1,48,28h64a12,12,0,0,1,0,24H52V204h60A12,12,0,0,1,124,216Zm108.49-96.49-40-40a12,12,0,0,0-17,17L195,116H112a12,12,0,0,0,0,24h83l-19.52,19.51a12,12,0,0,0,17,17l40-40A12,12,0,0,0,232.49,119.51Z"></path>
                </svg>
              </div>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
