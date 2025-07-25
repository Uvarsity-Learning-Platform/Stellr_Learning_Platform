import React, { useState } from 'react';
import Header from '../components/landing/Header';
import Footer from '../components/landing/Footer';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, MessageCircle, ArrowRight } from 'lucide-react';

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Contact us
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have a question or want to connect with the Uvarsity team? We're here
            to support your learning journey.
          </p>
        </div>
      </section>

      {/* Get in Touch Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16">
          {/* Left Side - Contact Info */}
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Get in touch</h2>
            <p className="text-gray-600 mb-8">
              Fill out the form below or use our contact details
              to reach the Uvarsity team.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-purple-600 rounded-full p-3">
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
                <div className="bg-purple-600 rounded-full p-3">
                  <Mail className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email Us</h3>
                  <a href="mailto:support@uvarsity.com" className="text-gray-600 hover:text-gray-900">
                    support@uvarsity.com
                  </a>
                  <br />
                  <a href="mailto:fuavrsity@letu.com" className="text-gray-600 hover:text-gray-900">
                    fuavrsity@letu.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-purple-600 rounded-full p-3">
                  <Phone className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Call Us</h3>
                  <p className="text-gray-600">
                    GH: +233 1234567<br />
                    USA: +1 1234567
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-sm font-semibold text-gray-900 mb-4">Follow our social media</p>
              <div className="flex space-x-3">
                <div className="bg-purple-600 rounded-full p-2">
                  <div className="w-5 h-5 bg-white rounded-full"></div>
                </div>
                <div className="bg-purple-600 rounded-full p-2">
                  <div className="w-5 h-5 bg-white rounded-full"></div>
                </div>
                <div className="bg-purple-600 rounded-full p-2">
                  <div className="w-5 h-5 bg-white rounded-full"></div>
                </div>
                <div className="bg-purple-600 rounded-full p-2">
                  <div className="w-5 h-5 bg-white rounded-full"></div>
                </div>
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
                    placeholder="john@example.com"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="eg: +233 XX XXX XXXX"
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

              <div className="card p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Can I access courses offline?</h3>
                <p className="text-gray-600">
                  Currently, our courses are online-only. However, we're working on downloadable content 
                  for offline learning. Stay tuned for updates!
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="card p-6">
                <h3 className="font-semibold text-gray-900 mb-2">What's your refund policy?</h3>
                <p className="text-gray-600">
                  We offer a 30-day money-back guarantee on all courses. If you're not satisfied, 
                  contact us within 30 days for a full refund.
                </p>
              </div>

              <div className="card p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Do you offer student discounts?</h3>
                <p className="text-gray-600">
                  Yes! We offer special pricing for students. Contact us with your student ID 
                  to learn more about our educational discounts.
                </p>
              </div>

              <div className="card p-6">
                <h3 className="font-semibold text-gray-900 mb-2">How do I reset my password?</h3>
                <p className="text-gray-600">
                  Click on "Forgot Password" on the login page and follow the instructions. 
                  You'll receive an email with a link to reset your password.
                </p>
              </div>
            </div>
          </div>
      
      </section>

      {/* Support Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Need More Help?</h2>
            <p className="text-xl text-gray-600">
              Our support team is here to help you succeed
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card p-6 text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="text-primary-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Chat</h3>
              <p className="text-gray-600 mb-4">
                Get instant help with our live chat support available 24/7.
              </p>
              <button className="btn-primary">Start Chat</button>
            </div>

            <div className="card p-6 text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="text-primary-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Support</h3>
              <p className="text-gray-600 mb-4">
                Send us an email and we'll respond within 24 hours.
              </p>
              <a href="mailto:support@Stellr.com" className="btn-outline">
                Email Us
              </a>
            </div>

            <div className="card p-6 text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="text-primary-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone Support</h3>
              <p className="text-gray-600 mb-4">
                Call us during business hours for immediate assistance.
              </p>
              <a href="tel:+1234567890" className="btn-outline">
                Call Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of learners who are already advancing their careers with Stellr.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-flex items-center justify-center"
            >
              Get Started Free
              <ArrowRight className="ml-2" size={20} />
            </Link>
            <Link
              to="/courses"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              Browse Courses
            </Link>

          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactPage;
