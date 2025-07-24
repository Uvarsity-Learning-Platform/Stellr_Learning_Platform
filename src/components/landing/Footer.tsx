import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => (
  <footer className="bg-gray-900 text-white py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-primary-700 to-pink-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">U</span>
            </div>
            <span className="ml-2 text-xl font-bold">Stellr</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">Africa's Leading Online Learning Platform. Empowering the next generation of tech talents.</p>
          <div className="flex space-x-4">
            <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors">
              <span className="text-xs">f</span>
            </div>
            <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors">
              <span className="text-xs">t</span>
            </div>
            <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors">
              <span className="text-xs">in</span>
            </div>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Navigation Links</h3>
          <div className="space-y-2 text-sm">
            <Link to="/" className="text-gray-400 hover:text-white block">Home</Link>
            <Link to="/courses" className="text-gray-400 hover:text-white block">Courses</Link>
            <Link to="/about" className="text-gray-400 hover:text-white block">About Us</Link>
            <Link to="/contact" className="text-gray-400 hover:text-white block">Contact</Link>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Courses</h3>
          <div className="space-y-2 text-sm">
            <Link to="/courses/web-development" className="text-gray-400 hover:text-white block">Web Development</Link>
            <Link to="/courses/mobile-development" className="text-gray-400 hover:text-white block">Mobile Development</Link>
            <Link to="/courses/ux-design" className="text-gray-400 hover:text-white block">UX Design</Link>
            <Link to="/courses/digital-marketing" className="text-gray-400 hover:text-white block">Digital Marketing</Link>
            <Link to="/courses/motion-design" className="text-gray-400 hover:text-white block">Motion Design</Link>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Contact</h3>
          <div className="space-y-2 text-sm text-gray-400">
            <p>123 Tech Street</p>
            <p>Accra, Ghana</p>
            <p>+233 123 456 789</p>
            <p>info@Stellr.com</p>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-8 pt-8 text-center">
        <p className="text-gray-400 text-sm">© 2024 Stellr. All rights reserved. | Privacy Policy | Terms of Service</p>
      </div>
    </div>
  </footer>
);

export default Footer;
