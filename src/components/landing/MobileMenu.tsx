import React from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

interface MobileMenuProps {
  setIsMobileMenuOpen: (open: boolean) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ setIsMobileMenuOpen }) => (
  <>
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="bg-white h-full w-full">
        <div className="flex justify-between items-center h-16 px-4 border-b border-gray-200">
          <Link to="/" className="flex items-center">
            <div className="w-8 h-8 bg-primary-700 to-pink-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">U</span>
            </div>
            <span className="ml-2 text-xl font-bold text-gray-900">Stellr</span>
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex flex-col h-full">
          <div className="flex-1 px-4 py-8">
            <div className="flex flex-col space-y-6">
              <Link to="/" className="text-gray-900 font-medium text-lg py-2" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <Link to="/courses" className="text-gray-900 font-medium text-lg py-2" onClick={() => setIsMobileMenuOpen(false)}>Courses</Link>
              <Link to="/about" className="text-gray-900 font-medium text-lg py-2" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
              <Link to="/contact" className="text-gray-900 font-medium text-lg py-2" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-200">
              <Link to="/login" className="text-gray-900 font-medium text-lg py-2 block mb-4" onClick={() => setIsMobileMenuOpen(false)}>Log in</Link>
              <Link to="/register" className="bg-primary-700 to-pink-600 text-white text-center text-lg py-3 block rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>Get Started</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default MobileMenu;
