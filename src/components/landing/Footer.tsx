import { Facebook, Linkedin, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Stellr</h2>
            </div>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              Revolutionizing African education through practical design and tech skills, mentorship, and opportunity.
            </p>

          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Navigation Links</h3>
            <div className="space-y-3 text-sm">
              <a href="#" className="text-gray-600 hover:text-purple-600 block transition-colors">Home</a>
              <a href="#" className="text-gray-600 hover:text-purple-600 block transition-colors">Courses</a>
              <a href="#" className="text-gray-600 hover:text-purple-600 block transition-colors">About Us</a>
              <a href="#" className="text-gray-600 hover:text-purple-600 block transition-colors">Contact Us</a>
            </div>
          </div>

          {/* Courses */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Courses</h3>
            <div className="space-y-3 text-sm">
              <a href="#" className="text-gray-600 hover:text-purple-600 block transition-colors">Web Development</a>
              <a href="#" className="text-gray-600 hover:text-purple-600 block transition-colors">User Experience Design (UX)</a>
              <a href="#" className="text-gray-600 hover:text-purple-600 block transition-colors">Brand Experience Design</a>
              <a href="#" className="text-gray-600 hover:text-purple-600 block transition-colors">Digital Marketing</a>
              <a href="#" className="text-gray-600 hover:text-purple-600 block transition-colors">Motion Design</a>
              <a href="#" className="text-gray-600 hover:text-purple-600 block transition-colors">Merch Design</a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>123 Edu Way</p>
              <p>Future City, FC 12345</p>
              <p className="mt-3">
                <span className="block">Email: info@uvarsity.com</span>
                <span className="block">Phone: (123) 456-7890</span>
              </p>
            </div>
            <div className="flex space-x-4 mt-4">
              <Facebook size={20} className="text-purple-600 cursor-pointer hover:text-purple-700 transition-colors" />
              <Linkedin size={20} className="text-purple-600 cursor-pointer hover:text-purple-700 transition-colors" />
              <Twitter size={20} className="text-purple-600 cursor-pointer hover:text-purple-700 transition-colors" />
              <Instagram size={20} className="text-purple-600 cursor-pointer hover:text-purple-700 transition-colors" />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © 2025 UvarsityEdu. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-blue-600 hover:text-blue-800 text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-blue-600 hover:text-blue-800 text-sm transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;