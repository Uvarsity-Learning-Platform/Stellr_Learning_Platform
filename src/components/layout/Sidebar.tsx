import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  BookOpen, 
  Award, 
  Settings, 
  BarChart3,
  Users
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/app/dashboard', icon: Home },
    { name: 'Courses', href: '/app/courses', icon: BookOpen },
    { name: 'Certificates', href: '/app/certificates', icon: Award },
    { name: 'Progress', href: '/app/dashboard', icon: BarChart3 },
    { name: 'Settings', href: '/app/settings', icon: Settings },
  ];

  const isActive = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:pt-16 lg:bg-white lg:border-r lg:border-gray-200">
        <div className="flex flex-col flex-1 overflow-y-auto">
          <nav className="flex-1 px-4 py-6 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                    ${isActive(item.href)
                      ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }
                  `}
                >
                  <Icon
                    className={`
                      mr-3 h-5 w-5 transition-colors duration-200
                      ${isActive(item.href) ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500'}
                    `}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Bottom section with user stats */}
          <div className="px-4 py-6 border-t border-gray-200">
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg p-4 text-white">
              <div className="flex items-center">
                <Users size={24} className="mr-3" />
                <div>
                  <p className="text-sm font-medium">Join our community</p>
                  <p className="text-xs opacity-90">1,000+ students</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar - This would be shown when mobile menu is open */}
      <div className="lg:hidden">
        {/* Mobile navigation will be handled by Header component */}
      </div>
    </>
  );
};

export default Sidebar;