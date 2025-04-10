
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BarcodeScan, Plus, ClipboardList } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 py-2 px-4 md:static md:border-b md:border-t-0 md:flex md:justify-between md:items-center md:px-8 md:py-3 z-10">
      <div className="hidden md:block">
        <Link to="/" className="text-xl font-bold text-primary">Smart Food Tracker</Link>
      </div>
      
      <div className="flex justify-around items-center md:space-x-4">
        <NavItem to="/" icon={<Home />} label="Home" isActive={isActive('/')} />
        <NavItem to="/scan" icon={<BarcodeScan />} label="Scan" isActive={isActive('/scan')} />
        <NavItem to="/add" icon={<Plus />} label="Add" isActive={isActive('/add')} />
        <NavItem to="/dashboard" icon={<ClipboardList />} label="Items" isActive={isActive('/dashboard')} />
      </div>
    </nav>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const NavItem = ({ to, icon, label, isActive }: NavItemProps) => {
  return (
    <Link
      to={to}
      className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
        isActive ? 'text-primary' : 'text-gray-500 hover:text-primary'
      }`}
    >
      <span className="mb-1">{icon}</span>
      <span className="text-xs">{label}</span>
    </Link>
  );
};

export default Navbar;
