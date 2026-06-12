
import React from 'react';
import DynamicNavbar from './DynamicNavbar';

import { useUserType } from '../../contexts/UserContext';

// Backward compatibility - uses SmartNavbar logic
const Navbar: React.FC = () => {
    const userType = useUserType();
    return <DynamicNavbar userType={userType} />;
};

export default Navbar;

// Export other navbar components for flexibility
export { default as DynamicNavbar } from './DynamicNavbar';
export { default as SmartNavbar } from './SmartNavbar';