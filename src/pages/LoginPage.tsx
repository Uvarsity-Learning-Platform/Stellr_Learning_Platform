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
          <div className="w-32 h-9 relative">
            <div className="w-4 h-5 left-0 top-[7.41px] absolute bg-slate-950" />
            <div className="w-5 h-5 left-[19.47px] top-[7.41px] absolute bg-slate-950" />
            <div className="w-4 h-6 left-[39.59px] top-[6.81px] absolute bg-slate-950" />
            <div className="w-3 h-5 left-[60.51px] top-[7.41px] absolute bg-slate-950" />
            <div className="w-4 h-6 left-[72.52px] top-[6.81px] absolute bg-slate-950" />
            <div className="w-[5.07px] h-7 left-[92.66px] top-[1.16px] absolute bg-slate-950" />
            <div className="w-5 h-7 left-[111.29px] top-[7.39px] absolute bg-slate-950" />
            <div className="w-2.5 h-6 left-[100.03px] top-[2.57px] absolute bg-slate-950" />
          </div>
          <div className="w-96 flex flex-col justify-start items-center gap-4">
            <div className="self-stretch flex flex-col justify-center items-start gap-4">
              <div className="self-stretch flex flex-col justify-start items-start gap-4">
                <div className="w-52 flex flex-col justify-start items-start">
                  <div className="self-stretch justify-start text-slate-950 text-xl font-semibold font-['Roboto'] leading-loose">Welcome Back</div>
                  <div className="self-stretch justify-start text-slate-950 text-xs font-normal font-['Roboto'] leading-none">Continue your journey with us</div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="self-stretch flex flex-col justify-start items-start gap-8">
                  <div className="self-stretch h-14 relative opacity-80 flex flex-col justify-start items-start gap-2">
                    <label className="justify-start text-slate-950 text-xs font-normal font-['Roboto'] leading-none">Email Address *</label>
                    <input
                      {...register('emailOrPhone')}
                      type="email"
                      placeholder="you@example.com"
                      className="self-stretch h-8 px-4 py-3 rounded outline outline-1 outline-offset-[-0.50px] outline-neutral-400 text-neutral-600 text-sm font-normal font-['Roboto'] leading-tight"
                    />
                    {errors.emailOrPhone && (
                      <p className="mt-1 text-xs text-red-600">{errors.emailOrPhone.message}</p>
                    )}
                    <Link to="/auth/forgot-password" className="left-[276px] top-[66px] absolute justify-start text-neutral-600 text-xs font-normal font-['Roboto'] leading-none hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="self-stretch h-14 opacity-80 flex flex-col justify-start items-start gap-2">
                    <label className="justify-start text-slate-950 text-xs font-normal font-['Roboto'] leading-none">Password *</label>
                    <div className="self-stretch h-8 px-4 py-3 rounded outline outline-1 outline-offset-[-0.50px] outline-neutral-400 inline-flex justify-start items-center gap-2.5 overflow-hidden relative">
                      <input
                        {...register('password')}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="********"
                        className="w-full bg-transparent border-none outline-none text-neutral-600 text-sm font-normal font-['Roboto'] leading-tight"
                      />
                      <button
                        type="button"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex={-1}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
                    )}
                  </div>
                  <div className="inline-flex justify-start items-center gap-2">
                    <input
                      type="checkbox"
                      id="remember-me"
                      className="w-3 h-3 rounded-sm border border-neutral-400"
                    />
                    <label htmlFor="remember-me" className="justify-center text-slate-950 text-[10px] font-normal font-['Roboto'] leading-none ml-1">
                      Remember Me
                    </label>
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="self-stretch h-12 px-8 py-4 bg-violet-600 rounded-lg shadow-[0px_8px_12px_0px_rgba(127,35,255,0.16)] inline-flex justify-center items-center gap-2 text-white text-base font-semibold font-['Poppins'] leading-relaxed hover:bg-violet-700 transition-colors"
                  >
                    {isLoading ? 'Signing In...' : 'Log In'}
                  </button>
                  <div className="self-stretch h-0.5 bg-neutral-400 rounded-lg" />
                  <div className="inline-flex justify-start items-center gap-1 w-full">
                    <span className="justify-center text-slate-950 text-xs font-normal font-['Poppins'] leading-none">Don’t have an account?</span>
                    <Link to="/register" className="justify-center text-amber-500 text-xs font-normal font-['Poppins'] underline leading-none ml-1">
                      Register
                    </Link>
                  </div>
                </form>
              </div>
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