import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Phone, Lock, Eye, EyeOff, User, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '@/store/authStore';
import { AuthService } from '@/services/authService';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';

const registerSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  phone: z.string().min(10, 'Phone number must be at least 10 digits').optional().or(z.literal('')),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
}).refine((data) => data.email || data.phone, {
  message: "Either email or phone number is required",
  path: ["email"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registrationMethod, setRegistrationMethod] = useState<'email' | 'phone'>('email');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: '' },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    
    try {
      const registerData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: registrationMethod === 'email' ? data.email : undefined,
        phone: registrationMethod === 'phone' ? data.phone : undefined,
        password: registrationMethod === 'email' ? data.password : undefined,
      };

      // If phone registration, send OTP
      if (registrationMethod === 'phone' && data.phone) {
        await AuthService.sendOTP(data.phone);
        navigate('/auth/verify-otp', { 
          state: { 
            phone: data.phone,
            userData: registerData
          } 
        });
        toast.success('OTP sent to your phone');
        return;
      }

      // Email registration
      const response = await AuthService.register(registerData);
      
      if (response.success) {
        login(response.data.user);
        toast.success('Welcome to Stellr!');
        navigate('/app/dashboard');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMethodChange = (method: 'email' | 'phone') => {
    setRegistrationMethod(method);
    // Clear the other field when switching methods
    if (method === 'email') {
      setValue('phone', '');
    } else {
      setValue('email', '');
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
                <User className="h-8 w-8 text-purple-500" />
              </span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Create Your Account</h2>
            <p className="text-base text-gray-600">Join thousands of learners on Stellr</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-purple-400" />
                  </div>
                  <input
                    {...register('firstName')}
                    type="text"
                    placeholder="First name"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-purple-50 text-gray-900 placeholder-gray-400"
                  />
                </div>
                {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  {...register('lastName')}
                  type="text"
                  placeholder="Last name"
                  className="w-full pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-purple-50 text-gray-900 placeholder-gray-400"
                />
                {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>}
              </div>
            </div>
            {/* Registration Method Toggle */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">How would you like to sign up?</label>
              <div className="flex rounded-lg border border-gray-300 p-1 bg-gray-50">
                <button
                  type="button"
                  onClick={() => handleMethodChange('email')}
                  className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${registrationMethod === 'email' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <Mail className="h-4 w-4 inline mr-2" />Email
                </button>
                <button
                  type="button"
                  onClick={() => handleMethodChange('phone')}
                  className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${registrationMethod === 'phone' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <Phone className="h-4 w-4 inline mr-2" />Phone
                </button>
              </div>
            </div>
            {/* Email or Phone Field */}
            {registrationMethod === 'email' ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-purple-400" />
                  </div>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-purple-50 text-gray-900 placeholder-gray-400"
                  />
                </div>
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-purple-400" />
                  </div>
                  <input
                    {...register('phone')}
                    type="tel"
                    placeholder="Enter your phone number"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-purple-50 text-gray-900 placeholder-gray-400"
                  />
                </div>
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
              </div>
            )}
            {/* Password Fields - Only for email registration */}
            {registrationMethod === 'email' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-purple-400" />
                    </div>
                    <input
                      {...register('password')}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a password"
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-purple-400" />
                    </div>
                    <input
                      {...register('confirmPassword')}
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-purple-50 text-gray-900 placeholder-gray-400"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5 text-purple-400" /> : <Eye className="h-5 w-5 text-purple-400" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>}
                </div>
              </>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-2 rounded-lg shadow-md hover:from-purple-600 hover:to-purple-700 transition-colors disabled:bg-purple-300 flex items-center justify-center font-semibold text-base"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={18} />
                  {registrationMethod === 'phone' ? 'Sending OTP...' : 'Creating Account...'}
                </>
              ) : registrationMethod === 'phone' ? 'Send OTP' : 'Create Account'}
            </button>
          </form>
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/auth/login" className="font-medium text-purple-600 hover:text-purple-500">Sign in</Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default RegisterPage;