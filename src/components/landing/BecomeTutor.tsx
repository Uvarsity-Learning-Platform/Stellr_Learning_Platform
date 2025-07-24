import React from 'react';
import { Link } from 'react-router-dom';

const BecomeTutor: React.FC = () => (
  <section className="bg-gradient-to-r from-blue-600 to-primary-700 py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-3xl font-bold text-white mb-4">Become A Tutor</h2>
      <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">Join our experienced tutors and share your knowledge with ambitious learners. Help shape the next generation of tech professionals while earning a great income.</p>
      <Link to="/become-tutor" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-flex items-center">Become A Tutor</Link>
    </div>
  </section>
);

export default BecomeTutor;
