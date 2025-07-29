import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, Menu } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import logo from '@/assets/Stellr.svg';

const Header: React.FC<{ onMenuToggle: (isOpen: boolean) => void; isSidebarOpen: boolean }> = ({ onMenuToggle, isSidebarOpen }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* App Logo/Name and Mobile Menu Toggle */}
          <div className="flex items-center">
            <button
              className="lg:hidden mr-2 p-2 rounded-lg hover:bg-gray-100"
              onClick={() => onMenuToggle(!isSidebarOpen)}
            >
              <Menu size={24} className="text-gray-600" />
            </button>
            <img src={logo} alt="Stellr Logo" className="ml-2 h-7 w-auto" />
          </div>

          {/* User Profile */}
          <div className="relative">
            <button
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <User size={16} className="text-primary-600" />
                )}
              </div>
              <span className="text-sm font-medium text-gray-700 hidden sm:block">
                {user?.firstName} {user?.lastName}
              </span>
            </button>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                <div className="py-1">
                  <button
                    onClick={() => { setIsProfileOpen(false); navigate('/app/settings'); }}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <User size={16} className="mr-2" />
                    Profile & Settings
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut size={16} className="mr-2" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;