// pages/Login.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { 
  FaEye, 
  FaEyeSlash,
  FaArrowRight,
  FaCheckCircle,
  FaExclamationCircle,
  FaEnvelope,
  FaLock
} from 'react-icons/fa';
import { MdEmail, MdLock } from 'react-icons/md';
import { loginSchema } from '../validations/authSchema';
import { useDispatch } from 'react-redux';
import { loginAsyncThunk } from '../features/auth/authSlice';
import { toast } from 'react-toastify';

// ============================================
// LOGIN COMPONENT
// ============================================
const Login = () => {
  const dispatch=useDispatch()
  // State management
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
//   const [rememberMe, setRememberMe] = useState(false);

  // ============================================
  // REACT HOOK FORM SETUP
  // ============================================
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid },
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onChange', // Validate on every change
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // ============================================
  // TOGGLE PASSWORD VISIBILITY
  // ============================================
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // ============================================
  // CHECK IF FIELD SHOULD SHOW SUCCESS STATE
  // ============================================
  const showSuccessIcon = (fieldName) => {
    return touchedFields[fieldName] && 
           !errors[fieldName] && 
           watch(fieldName) && 
           watch(fieldName).length > 0;
  };

  // ============================================
  // FORM SUBMISSION HANDLER
  // ============================================
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setServerError('');
    
    try {
      // ============================================
      // API CALL - Replace with your actual API endpoint
      // ============================================
      console.log('🔐 Login Data:', data);
    //   console.log('Remember Me:', rememberMe);
      
      const resultAction=await dispatch(loginAsyncThunk(data))

      if (loginAsyncThunk.fulfilled.match(resultAction)){
        // ============================================
        // SUCCESS - Handle successful login
        // ============================================
        toast.success('✅ Welcome back! Redirecting to dashboard... 🎉');
        reset(); // Clear the form
        
        // Redirect to owner dashboard
        window.location.href = '/ownerhome';

      }else {
        console.error("Login failed:", resultAction.payload);
        toast.error('Login failed! invalid credential')
      }
            
    } catch (error) {
      // ============================================
      // ERROR - Handle API errors
      // ============================================
      setServerError(error.message || 'Invalid email or password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ============================================
  // FORM FIELD CONFIGURATION
  // ============================================
  const fields = [
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      icon: <MdEmail className="w-5 h-5" />,
      placeholder: 'Enter your email address',
      autoComplete: 'email',
    },
    {
      name: 'password',
      label: 'Password',
      type: showPassword ? 'text' : 'password',
      icon: <MdLock className="w-5 h-5" />,
      placeholder: 'Enter your password',
      autoComplete: 'current-password',
      isPassword: true,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-4 py-12">
      {/* ===== MAIN CONTAINER ===== */}
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* ===== LEFT SIDE - FORM ===== */}
        <div className="flex-1 p-8 md:p-12">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-8 bg-linear-to-b from-indigo-600 to-purple-600 rounded-full" />
              <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
            </div>
            <p className="text-gray-500 ml-4">
              Sign in to your OwnerDesk account
            </p>
          </div>

          {/* Server Error */}
          {serverError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 animate-shake">
              <FaExclamationCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
              <p className="text-sm text-red-600">{serverError}</p>
            </div>
          )}

          {/* ===== FORM ===== */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {fields.map((field) => {
              const fieldError = errors[field.name];
              const isFieldValid = showSuccessIcon(field.name);
              const isFieldError = touchedFields[field.name] && fieldError;
              const isPasswordField = field.isPassword;

              return (
                <div key={field.name} className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    {field.icon}
                    {field.label}
                    <span className="text-red-500">*</span>
                  </label>
                  
                  <div className="relative">
                    <input
                      {...register(field.name)}
                      type={field.type}
                      placeholder={field.placeholder}
                      autoComplete={field.autoComplete}
                      className={`
                        w-full px-4 py-3 bg-gray-50 border-2 rounded-xl 
                        focus:outline-none focus:ring-2 focus:ring-offset-2 
                        transition-all duration-200
                        ${isFieldError 
                          ? 'border-red-400 focus:ring-red-400 focus:border-red-400' 
                          : isFieldValid
                            ? 'border-green-500 focus:ring-green-500 focus:border-green-500'
                            : 'border-gray-200 focus:border-indigo-400 focus:ring-indigo-400'
                        }
                        ${isPasswordField ? 'pr-12' : 'pr-4'}
                      `}
                    />
                    
                    {/* Password visibility toggle */}
                    {field.isPassword && (
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors z-10"
                        tabIndex="-1"
                      >
                        {showPassword ? (
                          <FaEyeSlash className="w-5 h-5" />
                        ) : (
                          <FaEye className="w-5 h-5" />
                        )}
                      </button>
                    )}

                    {/* Success/Error icons */}
                    {touchedFields[field.name] && !isPasswordField && (
                      <>
                        {isFieldValid && (
                          <FaCheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 w-5 h-5" />
                        )}
                        {isFieldError && (
                          <FaExclamationCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 w-5 h-5" />
                        )}
                      </>
                    )}
                  </div>

                  {/* Error message */}
                  {fieldError && touchedFields[field.name] && (
                    <div className="flex items-start gap-1.5 mt-1">
                      <FaExclamationCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                      <p className="text-sm text-red-500">{fieldError.message}</p>
                    </div>
                  )}
                </div>
              );
            })}

            {/* ===== REMEMBER ME & FORGOT PASSWORD ===== */}
            <div className="flex items-center justify-between">
              {/* <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`
                    w-5 h-5 border-2 rounded-md transition-all duration-200
                    flex items-center justify-center
                    ${rememberMe 
                      ? 'bg-indigo-600 border-indigo-600' 
                      : 'bg-white border-gray-300 group-hover:border-indigo-400'
                    }
                  `}>
                    {rememberMe && (
                      <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                  Remember me
                </span>
              </label>
               */}
              <a 
                href="/forgot-password" 
                className="text-sm text-indigo-600 hover:text-indigo-700 font-semibold hover:underline transition-colors"
              >
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !isValid}
              className="w-full py-3.5 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-indigo-500/25 hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing In...
                </>
              ) : (
                <>
                  Sign In
                  <FaArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* ===== SIGN UP LINK ===== */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <a href="/signup" className="text-indigo-600 font-semibold hover:text-indigo-700 hover:underline transition-colors">
              Create Account
            </a>
          </p>
        </div>

        {/* ===== RIGHT SIDE - BRANDING ===== */}
        <div className="hidden md:flex md:w-[40%] bg-linear-to-br from-indigo-600 via-purple-600 to-indigo-700 p-12 flex-col justify-between text-white relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-white/5 rounded-full blur-2xl" />

          {/* Decorative dots */}
          <div className="absolute top-10 right-10 opacity-20">
            <div className="grid grid-cols-3 gap-2">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 bg-white rounded-full" />
              ))}
            </div>
          </div>
          <div className="absolute bottom-10 left-10 opacity-20">
            <div className="grid grid-cols-3 gap-2">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 bg-white rounded-full" />
              ))}
            </div>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3L3 10L4 21H20L21 10L12 3Z" stroke="white" strokeWidth="2" />
                  <rect x="9" y="12" width="6" height="9" fill="white" opacity="0.3" />
                </svg>
              </div>
              <span className="text-2xl font-bold">OwnerDesk</span>
            </div>

            <h3 className="text-3xl font-bold mb-4 leading-tight">
              Welcome Back to Smart Rental Management
            </h3>
            
            <ul className="space-y-4">
              {[
                'Access your dashboard instantly',
                'Track rent payments in real-time',
                'Manage tenants and properties',
                'Get actionable insights',
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                    <FaCheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm opacity-90">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Testimonial */}
          <div className="relative z-10 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
              <div className="flex text-yellow-400 mb-2">
                {'★'.repeat(5).split('').map((star, i) => (
                  <span key={i} className="text-sm">★</span>
                ))}
              </div>
              <p className="text-sm opacity-80">
                "OwnerDesk has simplified my rental management completely. I can track everything from one dashboard!"
              </p>
              <div className="flex items-center gap-3 mt-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">
                  RK
                </div>
                <div>
                  <p className="text-xs font-semibold">Rahul Kumar</p>
                  <p className="text-xs opacity-70">Property Owner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;