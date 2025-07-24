import React from 'react';
import { ArrowRight } from 'lucide-react';



const LearningToEarning: React.FC = () => (
  <section className="py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop" alt="People working together" className="rounded-2xl shadow-lg" />
        </div>
        <div>
          <div className="inline-block rounded-full mb-4">
            <span className="text-blue-600 font-medium text-sm">Internships & Job Pipeline</span>
          </div>
          <h2 className="text-3xl max-w-[291px] font-bold text-gray-900 mb-6">From Learning to Earning</h2>
          <p className="text-gray-600 max-w-[489px] mb-8">Build a portfolio, craft a resume, and unlock internships or job placements with our partner companies.</p>
          <button className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all flex items-center">Read More
        <ArrowRight className="ml-2" size={16} />
       </button>
        </div>
      </div>
    </div>
  </section>
);

export default LearningToEarning;
