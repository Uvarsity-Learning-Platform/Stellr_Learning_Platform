import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import logo from '@/assets/Stellr.svg';


interface HeaderProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => (
  <header className="bg-white shadow-sm relative z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            
            <img src={logo} alt="Stellr Logo" className="ml-2 h-7 w-auto" />
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-900 font-medium hover:text-purple-600 transition-colors">Home</Link>
          <Link to="/courses" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Courses</Link>
          <Link to="/about" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">About</Link>
          <Link to="/contact" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Contact</Link>
        </nav>
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/auth/login" className="text-gray-600 hover:text-gray-900 font-medium transition-colors px-4 py-2 border border-gray-300 rounded-lg flex items-center">
            <span>Log in</span>
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          <Link to="/auth/register" className="text-white px-4 py-2 rounded-lg font-medium transition-all" style={{ background: '#7F23FF' }}>Register</Link>
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
