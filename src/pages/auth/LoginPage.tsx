import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '@/store/authStore';
import { AuthService } from '@/services/authService';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Phone, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
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
    defaultValues: { emailOrPhone: '', password: '' },
  });

  const emailOrPhone = watch('emailOrPhone');

  useEffect(() => {
    if (emailOrPhone) {
      const isEmail = emailOrPhone.includes('@');
      setLoginMethod(isEmail ? 'email' : 'phone');
    }
  }, [emailOrPhone]);

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      if (loginMethod === 'phone') {
        await AuthService.sendOTP(data.emailOrPhone);
        navigate('/auth/verify-otp', { state: { phone: data.emailOrPhone } });
        toast.success('OTP sent to your phone');
        return;
      }
      const response = await AuthService.login(data);
      if (response.success) {
        login(response.data.user);
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
    <>
      <Header />
      <main className="flex items-center justify-center min-h-[80vh] py-8 px-4 bg-gradient-to-br from-purple-50 to-purple-100">
        <div className="w-full max-w-md rounded-2xl shadow-xl border border-gray-100 bg-white/90 backdrop-blur-lg p-8 mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-purple-100">
                <Lock className="h-8 w-8 text-purple-500" />
              </span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Welcome Back</h2>
            <p className="text-base text-gray-600">Sign in to continue your learning journey</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email or Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {loginMethod === 'email' ? <Mail className="h-5 w-5 text-purple-400" /> : <Phone className="h-5 w-5 text-purple-400" />}
                </div>
                <input
                  {...register('emailOrPhone')}
                  type={loginMethod === 'email' ? 'email' : 'tel'}
                  placeholder={loginMethod === 'email' ? 'Enter your email' : 'Enter your phone number'}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-purple-50 text-gray-900 placeholder-gray-400"
                />
              </div>
              {errors.emailOrPhone && <p className="mt-1 text-sm text-red-600">{errors.emailOrPhone.message}</p>}
            </div>
            {loginMethod === 'email' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-purple-400" />
                  </div>
                  <input
                    {...register('password')}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-purple-50 text-gray-900 placeholder-gray-400"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5 text-purple-400" /> : <Eye className="h-5 w-5 text-purple-400" />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
              </div>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-2 rounded-lg shadow-md hover:from-purple-600 hover:to-purple-700 transition-colors disabled:bg-purple-300 flex items-center justify-center font-semibold text-base"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={18} />
                  {loginMethod === 'phone' ? 'Sending OTP...' : 'Signing In...'}
                </>
              ) : loginMethod === 'phone' ? 'Send OTP' : 'Sign In'}
            </button>
          </form>
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/auth/register" className="font-medium text-purple-600 hover:text-purple-500">Sign up</Link>
            </p>
          </div>
          {loginMethod === 'email' && (
            <div className="mt-4 text-center">
              <Link to="/auth/forgot-password" className="text-sm text-purple-600 hover:text-purple-500">Forgot your password?</Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default LoginPage;