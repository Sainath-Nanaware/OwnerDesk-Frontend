// pages/SignUp.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { 
  FaUser, 
  FaEye, 
  FaEyeSlash,
  FaArrowRight,
  FaCheckCircle,
  FaExclamationCircle
} from 'react-icons/fa';
import { MdEmail, MdPhone, MdLock } from 'react-icons/md';
import { signUpSchema } from '../validations/authSchema';
import { useDispatch } from 'react-redux';
import { signUp } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// ============================================
// SIGN UP COMPONENT
// ============================================
const SignUp = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  // State management
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

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
    resolver: yupResolver(signUpSchema),
    mode: 'onChange', // Validate on every change
    defaultValues: {
      username: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    },
  });

  // Watch password field for strength indicator
  const password = watch('password');

  // ============================================
  // PASSWORD STRENGTH INDICATOR
  // ============================================
  const getPasswordStrength = (pwd) => {
    if (!pwd) return { level: 0, label: 'None', color: 'text-gray-400', bg: 'bg-gray-200' };
    
    let strength = 0;
    if (pwd.length >= 8) strength++;
    
    const levels = [
      { level: 0, label: 'Too Short', color: 'text-red-500', bg: 'bg-red-500' },
      { level: 1, label: 'Weak', color: 'text-red-500', bg: 'bg-red-500' },
      { level: 2, label: 'Fair', color: 'text-yellow-500', bg: 'bg-yellow-500' },
      { level: 3, label: 'Good', color: 'text-blue-500', bg: 'bg-blue-500' },
      { level: 4, label: 'Strong', color: 'text-green-500', bg: 'bg-green-500' },
    ];
    
    const levelIndex = pwd.length >= 8 ? Math.min(strength + 1, 4) : strength;
    return levels[levelIndex] || levels[0];
  };

  const passwordStrength = getPasswordStrength(password);

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
      console.log('📝 Sign Up Data:', data);
      const userData={
        username:data.username,
        email:data.email,
        password:data.password,
        mobile:data.phoneNumber
      }
      const  resultAction=await dispatch(signUp(userData))

      console.log("result action:",resultAction)
      if (signUp.fulfilled.match(resultAction)) {
        console.log("user register successfully")
       
            // ============================================
        // SUCCESS - Handle successful sign up
        // ============================================
        toast.success("User register successfully")
        reset(); // Clear the form
        navigate('/login')
        
        // Redirect to login or dashboard
        // window.location.href = '/login';
      } else {
        console.error("Sign up failed:", resultAction.payload);
        toast.error("User Registration Fail!, Please try again. ")
      }
      
      
    } catch (error) {
      // ============================================
      // ERROR - Handle API errors
      // ============================================
      setServerError(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
  // TOGGLE PASSWORD VISIBILITY
  // ============================================
  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else if (field === 'confirmPassword') {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  // ============================================
  // FORM FIELD CONFIGURATION
  // ============================================
  const fields = [
    {
      name: 'username',
      label: 'Username',
      type: 'text',
      icon: <FaUser className="w-5 h-5" />,
      placeholder: 'Enter your username',
      autoComplete: 'username',
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      icon: <MdEmail className="w-5 h-5" />,
      placeholder: 'Enter your email address',
      autoComplete: 'email',
    },
    {
      name: 'phoneNumber',
      label: 'Phone Number',
      type: 'tel',
      icon: <MdPhone className="w-5 h-5" />,
      placeholder: 'Enter 10-digit phone number',
      autoComplete: 'tel',
    },
    {
      name: 'password',
      label: 'Password',
      type: showPassword ? 'text' : 'password',
      icon: <MdLock className="w-5 h-5" />,
      placeholder: 'Enter your password (min 8 characters)',
      autoComplete: 'new-password',
      isPassword: true,
    },
    {
      name: 'confirmPassword',
      label: 'Confirm Password',
      type: showConfirmPassword ? 'text' : 'password',
      icon: <MdLock className="w-5 h-5" />,
      placeholder: 'Confirm your password',
      autoComplete: 'new-password',
      isConfirmPassword: true,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-4 py-12">
      {/* ===== MAIN CONTAINER ===== */}
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* ===== LEFT SIDE - FORM ===== */}
        <div className="flex-1 p-8 md:p-12">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-8 bg-linear-to-b from-indigo-600 to-purple-600 rounded-full" />
              <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
            </div>
            <p className="text-gray-500 ml-4">
              Join OwnerDesk and start managing your rentals smarter
            </p>
          </div>

          {/* Server Error */}
          {serverError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
              <FaExclamationCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
              <p className="text-sm text-red-600">{serverError}</p>
            </div>
          )}

          {/* ===== FORM ===== */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {fields.map((field) => {
              const fieldError = errors[field.name];
              const isFieldValid = showSuccessIcon(field.name);
              const isFieldError = touchedFields[field.name] && fieldError;
              const isPasswordField = field.isPassword || field.isConfirmPassword;

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
                    
                    {/* Password visibility toggle - For password field */}
                    {field.isPassword && (
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('password')}
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
                    
                    {/* Password visibility toggle - For confirm password field */}
                    {field.isConfirmPassword && (
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('confirmPassword')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors z-10"
                        tabIndex="-1"
                      >
                        {showConfirmPassword ? (
                          <FaEyeSlash className="w-5 h-5" />
                        ) : (
                          <FaEye className="w-5 h-5" />
                        )}
                      </button>
                    )}

                    {/* Success/Error icons - Only show when field is touched */}
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

                  {/* Password strength indicator */}
                  {field.isPassword && password && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-500">Password length:</span>
                        <span className={`text-xs font-medium ${
                          password.length >= 8 ? 'text-green-500' : 'text-red-500'
                        }`}>
                          {password.length}/8 characters
                        </span>
                      </div>
                      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-500 ${
                            password.length >= 8 ? 'bg-green-500' : 'bg-red-500'
                          }`}
                          style={{ 
                            width: `${Math.min((password.length / 8) * 100, 100)}%` 
                          }}
                        />
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        {password.length >= 8 
                          ? '✅ Password meets minimum requirement' 
                          : `⚠️ Need ${8 - password.length} more character${8 - password.length > 1 ? 's' : ''}`}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}

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
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <FaArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* ===== LOGIN LINK ===== */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <a href="/login" className="text-indigo-600 font-semibold hover:text-indigo-700 hover:underline transition-colors">
              Sign In
            </a>
          </p>
        </div>

        {/* ===== RIGHT SIDE - BRANDING ===== */}
        <div className="hidden md:flex md:w-[40%] bg-linear-to-br from-indigo-600 via-purple-600 to-indigo-700 p-12 flex-col justify-between text-white relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-white/5 rounded-full blur-2xl" />

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
              Start Managing Your Rentals Smartly
            </h3>
            
            <ul className="space-y-4">
              {[
                'Track rent payments effortlessly',
                'Manage tenants and properties',
                'Get real-time analytics',
                'Secure and reliable platform',
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

          <div className="relative z-10 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
              <p className="text-sm opacity-80">
                "Join 10,000+ property owners already using OwnerDesk"
              </p>
              <div className="flex mt-3">
                <div className="flex -space-x-2">
                  {['R', 'P', 'A', 'S', 'M'].map((letter, i) => (
                    <div 
                      key={i}
                      className="w-8 h-8 rounded-full bg-white/20 border-2 border-purple-600 flex items-center justify-center text-xs font-bold"
                    >
                      {letter}
                    </div>
                  ))}
                </div>
                <span className="ml-3 text-xs opacity-75 self-center">+5,000 more</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;