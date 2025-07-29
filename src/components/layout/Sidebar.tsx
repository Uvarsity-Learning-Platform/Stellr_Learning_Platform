import { forwardRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  BookOpen, 
  UserCheck,
  Settings,
  LogOut,
  X,
  Users
} from 'lucide-react';

const Sidebar = forwardRef<HTMLDivElement, { isOpen: boolean; onClose: () => void }>(({ isOpen, onClose }, ref) => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/app/dashboard', icon: Home },
    { name: 'Courses', href: '/app/courses', icon: BookOpen },
    { name: 'My Courses', href: '/app/my-courses', icon: UserCheck }, // Now links to MyCoursesPage
  ];

  const secondaryLinks = [
    { name: 'Settings', href: '/app/settings', icon: Settings },
    { name: 'Logout', href: '/', icon: LogOut, onClick: onClose },
  ];

  const isActive = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:pt-16 lg:bg-white lg:border-r lg:border-gray-200">
        <div className="flex flex-col flex-1 overflow-y-auto">
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    group flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                    ${isActive(item.href)
                      ? 'bg-[#F5EFFF] text-[#8B2CF5] border-l-4 border-[#8B2CF5]'
                      : 'text-[#1F2937] hover:text-[#8B2CF5] hover:bg-gray-50'
                    }
                  `}
                  style={{ width: '256px' }} // Matches Figma width
                >
                  <Icon
                    className={`
                      mr-3 h-6 w-6 transition-colors duration-200
                      ${isActive(item.href) ? 'text-[#8B2CF5]' : 'text-[#9CA3AF] group-hover:text-[#8B2CF5]'}
                    `}
                    size={24} // Matches Figma icon size
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Secondary Links Section */}
          <div className="px-4 py-6 border-t border-[#E5E7EB]">
            {secondaryLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={item.onClick}
                  className={`
                    group flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                    ${isActive(item.href)
                      ? 'bg-[#F5EFFF] text-[#8B2CF5] border-l-4 border-[#8B2CF5]'
                      : 'text-[#1F2937] hover:text-[#8B2CF5] hover:bg-gray-50'
                    }
                  `}
                  style={{ width: '256px' }}
                >
                  <Icon
                    className={`
                      mr-3 h-6 w-6 transition-colors duration-200
                      ${isActive(item.href) ? 'text-[#8B2CF5]' : 'text-[#9CA3AF] group-hover:text-[#8B2CF5]'}
                    `}
                    size={24}
                  />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Community Stats Section */}
          <div className="px-4 py-6">
            <div className="bg-gradient-to-r from-[#8B2CF5] to-[#C26DFF] rounded-lg p-4 text-white">
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

      {/* Mobile Sidebar */}
      <div
        ref={ref}
        className={`
          fixed inset-y-0 left-0 w-64 bg-white border-r border-[#E5E7EB] shadow-lg transform transition-transform duration-300 ease-in-out z-50
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:hidden
        `}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 flex justify-end">
            <button onClick={onClose} className="text-[#9CA3AF] hover:text-[#8B2CF5]">
              <X size={24} />
            </button>
          </div>
          <nav className="flex-1 px-4 py-6 space-y-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={onClose}
                  className={`
                    group flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                    ${isActive(item.href)
                      ? 'bg-[#F5EFFF] text-[#8B2CF5] border-l-4 border-[#8B2CF5]'
                      : 'text-[#1F2937] hover:text-[#8B2CF5] hover:bg-gray-50'
                    }
                  `}
                >
                  <Icon
                    className={`
                      mr-3 h-6 w-6 transition-colors duration-200
                      ${isActive(item.href) ? 'text-[#8B2CF5]' : 'text-[#9CA3AF] group-hover:text-[#8B2CF5]'}
                    `}
                    size={24}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <div className="px-4 py-6 border-t border-[#E5E7EB]">
            {secondaryLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={item.onClick}
                  className={`
                    group flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                    ${isActive(item.href)
                      ? 'bg-[#F5EFFF] text-[#8B2CF5] border-l-4 border-[#8B2CF5]'
                      : 'text-[#1F2937] hover:text-[#8B2CF5] hover:bg-gray-50'
                    }
                  `}
                >
                  <Icon
                    className={`
                      mr-3 h-6 w-6 transition-colors duration-200
                      ${isActive(item.href) ? 'text-[#8B2CF5]' : 'text-[#9CA3AF] group-hover:text-[#8B2CF5]'}
                    `}
                    size={24}
                  />
                  {item.name}
                </Link>
              );
            })}
          </div>
          <div className="px-4 py-6">
            <div className="bg-gradient-to-r from-[#8B2CF5] to-[#C26DFF] rounded-lg p-4 text-white">
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
    </>
  );
});

export default Sidebar;