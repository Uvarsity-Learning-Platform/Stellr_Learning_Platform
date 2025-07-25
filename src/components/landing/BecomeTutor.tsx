import { ArrowRight } from 'lucide-react';

const BecomeTutor = () => {
  return (
    <section className="bg-gradient-to-r from-blue-900 via-indigo-800 to-indigo-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">Become A Tutor</h2>
        <p className="text-lg text-purple-100 mb-10 max-w-3xl mx-auto leading-relaxed">
          Join our community of expert tutors passionate about empowering 
          the next generation of African talent. At Uvarsity, we give you the 
          platform, tools, and support to make an impact.
        </p>
        <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-purple-900 font-semibold py-3 px-8 rounded-lg transition-all duration-300 inline-flex items-center gap-2 group">
          Read More
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>
    </section>
  );
};

export default BecomeTutor;