import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Phone, Eye, EyeOff, Loader2 } from 'lucide-react';
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
      <div className='bg-gray-50 min-h-screen flex flex-col justify-between'>
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 md:px-8">
        <div className="flex flex-col lg:flex-row w-full max-w-7xl gap-6 lg:gap-12 items-center justify-center py-12">
          {/* Left side - Image */}
          <div className="relative w-full lg:w-1/2 min-h-[300px] lg:min-h-[600px]">
            <img 
              src="src/assets/register.png"
              alt="Coding workspace with laptop"
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Right side - Form */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
            <div className="w-full max-w-md">
              {/* Uvarsity Logo and Title */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">stellr</h1>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Create Account</h2>
                <p className="text-sm text-gray-600">Begin your logistics journey here</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">First Name *</label>
                    <input
                      {...register('firstName')}
                      type="text"
                      placeholder="John"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                    />
                    {errors.firstName && <p className="mt-1 text-xs text-red-600">{errors.firstName.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Last Name *</label>
                    <input
                      {...register('lastName')}
                      type="text"
                      placeholder="Doe"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                    />
                    {errors.lastName && <p className="mt-1 text-xs text-red-600">{errors.lastName.message}</p>}
                  </div>
                </div>

                {/* Registration Method Toggle */}
                <div>
                  <div className="flex rounded-lg border border-gray-300 p-1 bg-gray-50 mb-4">
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
                    <label className="block text-sm text-gray-600 mb-1">Email Address *</label>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="you@example.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Phone Number *</label>
                    <div className="flex">
                      <select className="px-3 py-2 border border-gray-300 border-r-0 rounded-l-md bg-gray-50 text-sm">
                        <option>+1 US</option>
                      </select>
                      <input
                        {...register('phone')}
                        type="tel"
                        placeholder="(555) 000-0000"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                    {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
                  </div>
                )}

                {/* Password Fields - Only for email registration */}
                {registrationMethod === 'email' && (
                  <>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Password *</label>
                      <div className="relative">
                        <input
                          {...register('password')}
                          type={showPassword ? 'text' : 'password'}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                        </button>
                      </div>
                      {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Confirm Password *</label>
                      <div className="relative">
                        <input
                          {...register('confirmPassword')}
                          type={showConfirmPassword ? 'text' : 'password'}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                        </button>
                      </div>
                      {errors.confirmPassword && <p className="mt-1 text-xs text-red-600">{errors.confirmPassword.message}</p>}
                    </div>
                  </>
                )}

                {/* Terms and Marketing Checkboxes */}
                <div className="space-y-2 text-xs">
                  <label className="flex items-start">
                    <input type="checkbox" className="mt-1 mr-2" required />
                    <span className="text-gray-600">
                      I agree to the{' '}
                      <Link to="/terms" className="text-purple-600 hover:underline">Terms of Service</Link>
                    </span>
                  </label>
                  <label className="flex items-start">
                    <input type="checkbox" className="mt-1 mr-2" />
                    <span className="text-gray-600">
                      I agree to receive marketing communications from Stellr and can unsubscribe at any time.
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 transition-colors disabled:bg-purple-300 flex items-center justify-center font-medium"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={18} />
                      {registrationMethod === 'phone' ? 'Sending OTP...' : 'Creating Account...'}
                    </>
                  ) : 'Create Account'}
                </button>

                {/* Sign In Link */}
                <div className="text-center pt-4">
                  <p className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="text-purple-600 hover:underline font-medium">Log In</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      </div>
    </>
  );
};

export default RegisterPage;