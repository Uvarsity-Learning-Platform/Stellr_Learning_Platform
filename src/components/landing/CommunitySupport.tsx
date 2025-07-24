import React from 'react';
import mentorship from "@/assets/mentorship.png"
import { ArrowRight } from 'lucide-react';




const CommunitySupport: React.FC = () => (
  <section className="py-20 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-block rounded-full mb-4">
            <span className="text-blue-600 font-medium text-sm">Mentorship & Community Support</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Grow With Support, Not Alone</h2>
          <p className="text-gray-600 mb-8">Join live office hours, book mentors, and connect with peers via discussion forums or local WhatsApp/Telegram groups.</p>
          <button className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all flex items-center">Read More
        <ArrowRight className="ml-2" size={16} />
       </button>
        </div>
        <div>
          <img src={mentorship} alt="Community support" className="rounded-2xl shadow-lg" />
        </div>
      </div>
    </div>
  </section>
);

export default CommunitySupport;
