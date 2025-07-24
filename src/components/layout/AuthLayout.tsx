import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary-900 mb-2">
            Stellr
          </h1>
          <p className="text-primary-600">
            Your journey to excellence starts here
          </p>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;