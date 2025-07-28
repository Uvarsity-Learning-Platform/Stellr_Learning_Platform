import { useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import logo from '@/assets/Stellr.svg';

type HeaderProps = object;

const Header: React.FC<HeaderProps> = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const isLogin = currentPath === '/login';
  const isRegister = currentPath === '/register';

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/courses', label: 'Courses' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header className="bg-white shadow-sm relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Stellr Logo" className="ml-2 h-7 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`relative font-medium transition-colors text-gray-600 hover:text-purple-700 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-purple-600 after:w-0 hover:after:w-full after:transition-all after:duration-300 ${
                  currentPath === to ? 'text-gray-900 after:w-full' : ''
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {!isLogin && (
              <Link
                to="/login"
                className="group text-gray-600 hover:text-gray-900 font-medium transition-colors px-4 py-2 border border-gray-300 rounded-lg flex items-center"
              >
                <span>Log in</span>
                <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            )}
            {!isRegister && (
              <Link
                to="/register"
                className="text-white px-4 py-2 rounded-lg font-medium transition-all bg-purple-600 hover:text-white hover:bg-purple-800 flex items-center justify-center"
                
              >
                Register
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg border-t border-gray-200 z-40 animate-slide-down">
          <nav className="flex flex-col space-y-4 px-6 py-4">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`relative text-gray-700 font-medium py-1 transition-colors hover:text-purple-700 after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:bg-purple-600 after:w-0 hover:after:w-full after:transition-all after:duration-300 ${
                  currentPath === to ? 'text-purple-800 after:w-full' : ''
                }`}
                onClick={() => setIsMobileMenuOpen(false)} // close menu on click
              >
                {label}
              </Link>
            ))}

            {/* Mobile Auth Buttons */}
            {!isLogin && (
              <Link
                to="/login"
                className="group flex items-center text-gray-700 border border-gray-300 px-4 py-2 rounded-lg hover:text-gray-900 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>Log in</span>
                <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            )}
            {!isRegister && (
              <Link
                to="/register"
                className="text-white bg-purple-700 hover:bg-purple-800 px-4 py-2 rounded-lg text-center font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Register
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
