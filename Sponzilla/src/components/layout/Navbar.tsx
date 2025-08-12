
import React from 'react';
import DynamicNavbar from './DynamicNavbar';

// Backward compatibility - renders guest navbar by default
const Navbar: React.FC = () => {
    return <DynamicNavbar userType="guest" />;
};

export default Navbar;

// Export other navbar components for flexibility
export { default as DynamicNavbar } from './DynamicNavbar';
export { default as SmartNavbar } from './SmartNavbar';