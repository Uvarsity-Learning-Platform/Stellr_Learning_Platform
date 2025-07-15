import React from 'react';
import { Download, Award, Calendar } from 'lucide-react';

const CertificatesPage: React.FC = () => {
  const certificates = [
    {
      id: '1',
      courseName: 'React for Beginners',
      completedAt: '2024-01-15',
      certificateUrl: '/certificates/react-basics.pdf',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Certificates</h1>
        <p className="text-gray-600">Download and share your achievements</p>
      </div>

      {certificates.length > 0 ? (
        <div className="grid gap-6">
          {certificates.map((cert) => (
            <div key={cert.id} className="card p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Award className="text-yellow-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{cert.courseName}</h3>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <Calendar size={16} className="mr-1" />
                      Completed on {new Date(cert.completedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <button className="btn-primary flex items-center">
                  <Download size={16} className="mr-2" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 card">
          <Award className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No certificates yet</h3>
          <p className="text-gray-600">Complete a course to earn your first certificate!</p>
        </div>
      )}
    </div>
  );
};

export default CertificatesPage;