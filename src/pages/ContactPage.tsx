import React, { useState } from 'react';
import Header from '../components/landing/Header';
import Footer from '../components/landing/Footer';
import { Mail, Phone, MapPin, Facebook, Linkedin, Twitter, Instagram } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    telephone: '',
    role: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', telephone: '', role: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Hero Section with Background Image */}
      <section className="relative h-[600px] px-4 flex items-center justify-center text-white overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full"
        >
          <img
            src="src/assets/contact.png"
            alt="Contact background"
            className="w-full h-full left-[10px] top-[0] object-cover"
            style={{ width: '100%', height: '90%', minHeight: 300, maxHeight: 500 }}
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative text-center z-10">
          <h1 className="text-5xl font-bold mb-4">Contact us</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Have a question or want to connect with the Stellr team? We're here
            to support your learning journey.
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left Side - Contact Info */}
            <div className="bg-gray-100 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Get in touch</h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below or use our contact details
                to reach the Stellr team.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 rounded-full p-3 flex-shrink-0">
                    <MapPin className="text-white" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Head Office</h3>
                    <p className="text-gray-600">
                      East Legon Street No.25<br />
                      Accra - Ghana
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 rounded-full p-3 flex-shrink-0">
                    <Mail className="text-white" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email Us</h3>
                    <div className="space-y-1">
                      <p className="text-gray-600">support@Stellr.com</p>
                      <p className="text-gray-600">fuavarsity@letu.com</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 rounded-full p-3 flex-shrink-0">
                    <Phone className="text-white" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Call Us</h3>
                    <div className="space-y-1">
                      <p className="text-gray-600">GH: +233 1234567</p>
                      <p className="text-gray-600">USA: +1 1234567</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-sm font-semibold text-gray-900 mb-4">Follow our social media</p>
                <div className="flex space-x-3">
                  <a
                    href="https://facebook.com/Stellr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-purple-600 rounded-full p-2 hover:bg-purple-700 cursor-pointer transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-5 h-5 text-white" />
                  </a>
                  <a
                    href="https://linkedin.com/company/Stellr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-purple-600 rounded-full p-2 hover:bg-purple-700 cursor-pointer transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5 text-white" />
                  </a>
                  <a
                    href="https://twitter.com/Stellr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-purple-600 rounded-full p-2 hover:bg-purple-700 cursor-pointer transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-5 h-5 text-white" />
                  </a>
                  <a
                    href="https://instagram.com/Stellr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-purple-600 rounded-full p-2 hover:bg-purple-700 cursor-pointer transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5 text-white" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="bg-white">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="johnDoe@gmail.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-2">
                      Telephone
                    </label>
                    <input
                      type="tel"
                      id="telephone"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="+233 XX XXX XXXX"
                    />
                  </div>
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                      Role
                    </label>
                    <input
                      type="text"
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="eg: Learner"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Subject"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    placeholder="Your message"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-purple-700 transition duration-200"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactPage;
