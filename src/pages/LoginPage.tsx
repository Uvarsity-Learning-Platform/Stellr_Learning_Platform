"use strict";

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { AuthService } from '@/services/authService';
import { useAuthStore } from '@/store/authStore';
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
  const { login } = useAuthStore();

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
      // --- Real Auth Logic (to restore when backend is ready) ---
      // // If phone number, redirect to OTP verification
      // if (loginMethod === 'phone') {
      //   await AuthService.sendOTP(data.emailOrPhone);
      //   navigate('/auth/verify-otp', { 
      //     state: { phone: data.emailOrPhone } 
      //   });
      //   toast.success('OTP sent to your phone');
      //   return;
      // }
      // // Email login
      // const response = await AuthService.login(data);
      // if (response.success) {
      //   login(response.data.user);
      //   toast.success('Welcome back!');
      //   navigate('/app/dashboard');
      // }

      // --- Mock login: set auth state so ProtectedRoute allows access ---
      login({
        id: 'mock-id',
        firstName: 'Demo',
        lastName: 'User',
        email: data.emailOrPhone.includes('@') ? data.emailOrPhone : '',
        phone: data.emailOrPhone.includes('@') ? '' : data.emailOrPhone,
      });
      navigate('/app/dashboard', { replace: true });
      toast.success('Welcome back!');
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
    {/* Main Content */}
    <main className="flex-1 flex items-center justify-center px-4 md:px-8">
      <div className="bg-white flex flex-col lg:flex-row w-full max-w-[1120px] gap-6 lg:gap-12 items-center justify-center py-12">
        {/* Left Side - Hero Image */}
        <div className="relative max-w-[642px]">
          <img 
            src={loginImage} 
            alt="Laptop with data visualization - Your journey to tech excellence"
            className="max-w-[1120px] rounded-1xl shadow-lg w-full h-auto"
          />
        </div>

        {/* Right Side - Login Form (Custom Design) */}
        <div className="w-[478px] h-[593px] p-3 bg-white rounded-tr-lg rounded-br-lg inline-flex flex-col justify-center items-center gap-6 overflow-hidden">
        <div className="w-32 h-9 relative text-center mb-2">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">stellr</h1>
        </div>
          <div className="w-96 flex flex-col justify-start items-center gap-4">
            <div className="self-stretch flex flex-col justify-center items-start gap-4">
              
                <div className="w-52 flex flex-col justify-start items-start">

                  <div className="self-stretch text-xl font-semibold text-gray-800 mb-2">Welcome Back</div>
                  <div className="self-stretch text-sm text-gray-600 mb-2">Continue your journey with us</div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="self-stretch flex flex-col justify-start items-start gap-4">
                  <div className="self-stretch flex flex-col justify-start items-start gap-2">
                    <label className="block text-sm text-gray-600 mb-1">Email Address <span className="text-red-500">*</span></label>
                    <input
                      {...register('emailOrPhone')}
                      type="email"
                      placeholder="you@example.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                    />
                    {errors.emailOrPhone && (
                      <p className="mt-1 text-xs text-red-600">{errors.emailOrPhone.message}</p>
                    )}
                  </div>
                  <div className="self-stretch flex flex-col justify-start items-start gap-2">
                    <label className="block text-sm text-gray-600 mb-1">Password <span className="text-red-500">*</span></label>
                    <div className="relative w-full">
                      <input
                        {...register('password')}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="********"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex={-1}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
                    )}
                    <div className="w-full flex justify-end mt-1">
                      <Link to="/auth/forgot-password" className="text-purple-600 text-xs font-semibold leading-none hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                  </div>
                  <div className="inline-flex justify-start items-center gap-2">
                    <input
                      type="checkbox"
                      id="remember-me"
                      className="w-3 h-3 rounded-sm border border-neutral-400"
                    />
                    <label htmlFor="remember-me" className="text-xs font-medium text-gray-600 ml-1">
                      Remember Me
                    </label>
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 transition-colors disabled:bg-purple-300 flex items-center justify-center font-medium"
                  >
                    {isLoading ? 'Signing In...' : 'Log In'}
                  </button>
                  <div className="self-stretch h-0.5 bg-neutral-400 rounded-lg" />
                  <div className="inline-flex justify-center items-center gap-1 w-full">
                    <span className="text-sm text-gray-600">Don't have an account?</span>
                    <Link to="/register" className="text-purple-600 text-sm font-medium hover:underline leading-none">
                      Register
                    </Link>
                  </div>
                </form>
              
            </div>
          </div>
        </div>
      </div>
    </main>
    {/* Footer */}
    <Footer />
    
  </div>
);
};

export default LoginPage;