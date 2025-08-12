import React from 'react';
import { useUser } from '../../contexts/UserContext';

const UserTypeSwitcher: React.FC = () => {
  const { user, login, logout } = useUser();

  const switchToGuest = () => {
    logout();
  };

  const switchToClub = () => {
    login({
      id: 'club1',
      name: 'Tech Club',
      email: 'tech@club.com',
      type: 'club',
      profileImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCanujA-hYauxn7UOxEnRuAOBOGGHlSFrhJUNhwNXcl5X95OIFQAZudPUYMixDbuQM8suLs726Zo_B5B1QA6nq5WY0hqUxLQeCYztr2UXCAGK4WjdagCfjo_3pcjfE7QWae-YqdfJcx7fqhXrpNP7tC82R7LlOUJkq_5PkLW_SkZ9NX5QMV14oPQiXITX2PeC9iJNRpjOrwDBZFxmlW3J2CTNSiLkkTeB3bhm_Fuy_i6YY2pxfYY8Qi_t8QXCwnh0fcZAr4X2fJg-U'
    });
  };

  const switchToBrand = () => {
    login({
      id: 'brand1',
      name: 'Nike',
      email: 'partnerships@nike.com',
      type: 'brand',
      profileImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCanujA-hYauxn7UOxEnRuAOBOGGHlSFrhJUNhwNXcl5X95OIFQAZudPUYMixDbuQM8suLs726Zo_B5B1QA6nq5WY0hqUxLQeCYztr2UXCAGK4WjdagCfjo_3pcjfE7QWae-YqdfJcx7fqhXrpNP7tC82R7LlOUJkq_5PkLW_SkZ9NX5QMV14oPQiXITX2PeC9iJNRpjOrwDBZFxmlW3J2CTNSiLkkTeB3bhm_Fuy_i6YY2pxfYY8Qi_t8QXCwnh0fcZAr4X2fJg-U'
    });
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-50">
      <h3 className="text-sm font-bold mb-2">User Type Demo</h3>
      <div className="text-xs mb-2">
        Current: <span className="font-semibold">{user.type}</span>
        {user.name && ` (${user.name})`}
      </div>
      <div className="flex gap-2">
        <button
          onClick={switchToGuest}
          className={`px-2 py-1 text-xs rounded ${
            user.type === 'guest' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Guest
        </button>
        <button
          onClick={switchToClub}
          className={`px-2 py-1 text-xs rounded ${
            user.type === 'club' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Club
        </button>
        <button
          onClick={switchToBrand}
          className={`px-2 py-1 text-xs rounded ${
            user.type === 'brand' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Brand
        </button>
      </div>
    </div>
  );
};

export default UserTypeSwitcher;
