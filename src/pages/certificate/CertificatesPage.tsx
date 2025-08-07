import React from 'react';
import { Download, Award, Calendar } from 'lucide-react';
import noCertificatesImg from '@/assets/no-certificates.png';

type Certificate = {
  id: string;
  courseName: string;
  completedAt: string;
  certificateUrl: string;
};

const certificates: Certificate[] = []; // Replace with your actual data

const CertificatesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold font-['roboto'] text-gray-900 mb-2">Certificates</h1>
        <p className="text-gray-600 mb-6">View and download certificates for completed courses.</p>

        {/* Filter bar */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8">
          {['All', 'Web Development', 'UX Design', 'Merch Design', 'Motion Design', 'Brand Experience', 'Marketing'].map(category => (
            <button
              key={category}
              className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Certificates grid or empty state */}
        {certificates.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {certificates.map(cert => (
              <div key={cert.id} className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Award className="text-yellow-600" size={28} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{cert.courseName}</h3>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <Calendar size={16} className="mr-1" />
                      Completed on {new Date(cert.completedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <a
                  href={cert.certificateUrl}
                  download
                  className="mt-2 w-full flex items-center justify-center bg-violet-600 text-white py-2 rounded-lg font-semibold hover:bg-violet-700 transition-colors"
                >
                  <Download size={16} className="mr-2" />
                  Download
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <img
              src={noCertificatesImg}
              alt="No certificates found"
              className="w-44 h-44 mb-6"
            />
            <h2 className="text-2xl font-bold font-['Roboto'] text-gray-900 mb-2">No Certificates found</h2>
            <p className="text-gray-500 text-base mb-2">
              You haven't earned any certificates yet. Complete a course to unlock one.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificatesPage;