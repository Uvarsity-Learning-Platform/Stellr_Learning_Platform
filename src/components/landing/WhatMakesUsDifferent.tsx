import React from 'react';
import { CircleCheck } from 'lucide-react';
import different from "@/assets/different.png";
import { ArrowRight } from 'lucide-react';

const WhatMakesUsDifferent: React.FC = () => (
  <section className="py-20 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col-reverse lg:flex-row md:gap-52 items-center">
        <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
          <img src={different} alt="Students learning together" className="rounded-2xl shadow-lg w-full h-auto" />
        </div>
        <div className="w-full lg:w-1/2">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">What Makes Us Different</h2>
          <p className="text-gray-400 mb-8">Learn design and tech skills with expert mentorship, offline access, and career pathways tailored to African learners.</p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-6 h-6 bg-transparent rounded-full">
                <CircleCheck size={16} className="text-blue-700" />
              </span>
              <span className="text-gray-700">Transformational Power of Technology</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-6 h-6 bg-transparent rounded-full">
                <CircleCheck size={16} className="text-blue-700" />
              </span>
              <span className="text-gray-700">Mentoring and Resources</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-6 h-6 bg-transparent rounded-full">
                <CircleCheck size={16} className="text-blue-700" />
              </span>
              <span className="text-gray-700">Internship & Job Pipeline</span>
            </div>
          </div>
          <button className="mt-8 bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all flex items-center">
            <span>Read More</span>
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  </section>
);

export default WhatMakesUsDifferent;
