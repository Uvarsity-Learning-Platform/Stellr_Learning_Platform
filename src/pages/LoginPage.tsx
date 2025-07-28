"use strict";

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { AuthService } from '@/services/authService';
import loginImage from '@/assets/login_image.png';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';



const loginSchema = z.object({
  emailOrPhone: z.string().min(1, 'Email or phone is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  // const { login } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const emailOrPhone = watch('emailOrPhone');

  // Auto-detect if input is email or phone
  React.useEffect(() => {
    if (emailOrPhone) {
      const isEmail = emailOrPhone.includes('@');
      setLoginMethod(isEmail ? 'email' : 'phone');
    }
  }, [emailOrPhone]);

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    
    try {
      // If phone number, redirect to OTP verification
      if (loginMethod === 'phone') {
        await AuthService.sendOTP(data.emailOrPhone);
        navigate('/auth/verify-otp', { 
          state: { phone: data.emailOrPhone } 
        });
        toast.success('OTP sent to your phone');
        return;
      }

      // Email login
      const response = await AuthService.login(data);
      
      if (response.success) {
        // login(response.data.user); // Do not set auth state here for landing-style login
        toast.success('Welcome back!');
        navigate('/app/dashboard');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
  <div className="bg-gray-50 min-h-screen flex flex-col justify-between">
    {/* Header Navigation */}
    <Header />

    {/* Mobile Menu - Optional, can be added later */}
    {/* {isMobileMenuOpen && <MobileMenu setIsMobileMenuOpen={setIsMobileMenuOpen} />} */}
    {/* Main Content */}
    <main className="flex-1 flex items-center justify-center px-4 md:px-8">
      <div className="flex flex-col lg:flex-row w-full max-w-7xl gap-6 lg:gap-12 items-center justify-center py-12">
        {/* Left Side - Hero Image */}
        <div className="relative w-full lg:w-1/2 min-h-[300px] lg:min-h-[600px]">
          <img 
            src={loginImage} 
            alt="Laptop with data visualization - Your journey to tech excellence"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Right Side - Login Form */}
        <div className="bg-white p-6 md:p-8 lg:p-12 rounded-lg shadow-lg w-full lg:w-1/2 flex flex-col justify-center">
          <div className="mb-6 lg:mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Stellr</h2>
            <h3 className="text-lg lg:text-xl font-semibold text-gray-700 mb-1">Welcome Back</h3>
            <p className="text-gray-600">Continue your journey with us</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                {...register('emailOrPhone')}
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
              />
              {errors.emailOrPhone && (
                <p className="mt-1 text-sm text-red-600">{errors.emailOrPhone.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password *
              </label>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember-me"
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember Me
                </label>
              </div>
              <Link to="/auth/forgot-password" className="text-sm text-purple-600 hover:text-purple-500" replace={false} reloadDocument={false}>
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors font-medium"
            >
              {isLoading ? 'Signing In...' : 'Log In'}
            </button>

            <p className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-purple-600 hover:text-purple-500">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
    {/* Footer */}
    <Footer />
    
  </div>
);
};

export default LoginPage;