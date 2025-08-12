import React from 'react';
import DynamicNavbar from './DynamicNavbar';
import { useUserType } from '../../contexts/UserContext';

interface SmartNavbarProps {
  className?: string;
}

const SmartNavbar: React.FC<SmartNavbarProps> = ({ className }) => {
  const userType = useUserType();
  
  return <DynamicNavbar userType={userType} className={className} />;
};

export default SmartNavbar;
