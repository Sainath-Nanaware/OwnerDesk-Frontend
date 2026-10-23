// components/profile/ChangePasswordCard.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaExclamationCircle,
  FaSave,
  FaTimes, // ✅ ADDED: For cancel button icon
} from 'react-icons/fa';
import { changePasswordSchema } from '../../validations/ownerProfileValidation';

/**
 * ============================================
 * CHANGE PASSWORD CARD COMPONENT
 * ============================================
 * Form for changing password with validation
 *
 * @param {Object} props
 * @param {Function} props.onSubmit - Called with { oldPassword, newPassword }
 * @param {boolean} props.isSubmitting - API loading state
 */

const ChangePasswordCard = ({ onSubmit, isSubmitting = false }) => {
  // ============================================
  // PASSWORD VISIBILITY STATE
  // ============================================
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    resolver: yupResolver(changePasswordSchema),
    mode: 'onChange',
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  // ============================================
  // SUCCESS ICON HELPER
  // ============================================
  const showSuccessIcon = (fieldName) => {
    return (
      touchedFields[fieldName] &&
      !errors[fieldName] &&
      watch(fieldName) &&
      watch(fieldName).length > 0
    );
  };

  // ============================================
  // HANDLE SUBMIT
  // ============================================
  const handleFormSubmit = async (data) => {
    try {
      await onSubmit({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });
      reset(); // Clear form on success
    } catch (error) {
      // Error handled in parent
    }
  };

  // ============================================
  // ✅ ADDED: HANDLE CANCEL
  // ============================================
  // Clears all form fields and resets validation state.
  // Also hides password visibility so next visit starts fresh.
  const handleCancel = () => {
    reset(); // Clear form values + validation errors
    setShowOldPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
  };

  // ============================================
  // FIELD CONFIGURATION
  // ============================================
  const fields = [
    {
      name: 'oldPassword',
      label: 'Old Password',
      type: showOldPassword ? 'text' : 'password',
      placeholder: 'Enter your old password',
      show: showOldPassword,
      toggle: () => setShowOldPassword(!showOldPassword),
       // ✅ ADDED: restricts input to exactly 8 chars
      inputProps: { minLength: 8, maxLength: 8 },
    },
    {
      name: 'newPassword',
      label: 'New Password',
      type: showNewPassword ? 'text' : 'password',
      placeholder: 'Enter new password (8 chars)',
      show: showNewPassword,
      toggle: () => setShowNewPassword(!showNewPassword),
      // ✅ ADDED: restricts input to exactly 8 chars
      inputProps: { minLength: 8, maxLength: 8 },
    },
    {
      name: 'confirmNewPassword',
      label: 'Confirm New Password',
      type: showConfirmPassword ? 'text' : 'password',
      placeholder: 'Re-enter new password',
      show: showConfirmPassword,
      toggle: () => setShowConfirmPassword(!showConfirmPassword),
      // ✅ ADDED: restricts input to exactly 8 chars
      inputProps: { minLength: 8, maxLength: 8 },
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* ===== HEADER ===== */}
      <div className="bg-linear-to-r from-orange-500 to-red-500 p-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <FaLock className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Change Password</h2>
            <p className="text-orange-100 text-xs">
              Update your account password
            </p>
          </div>
        </div>
      </div>

      {/* ===== BODY ===== */}
      <div className="p-6">
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {fields.map((field) => {
            const fieldError = errors[field.name];
            const isFieldValid = showSuccessIcon(field.name);
            const isFieldError = touchedFields[field.name] && fieldError;

            return (
              <div key={field.name}>
                <label className="text-sm font-medium text-gray-700 block mb-1.5 items-center gap-2">
                  <FaLock className="w-3.5 h-3.5 text-orange-500" />
                  {field.label}
                  <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <input
                    {...register(field.name)}
                    {...(field.inputProps || {})} // ✅ ADDED: spreads min/max length
                    type={field.type}
                    placeholder={field.placeholder}
                    autoComplete="off"
                    className={`
                      w-full px-4 py-2.5 pr-20 bg-gray-50 border-2 rounded-xl 
                      focus:outline-none focus:ring-2 focus:ring-offset-2 
                      transition-all duration-200
                      ${isFieldError
                        ? 'border-red-400 focus:ring-red-400 focus:border-red-400'
                        : isFieldValid
                          ? 'border-green-500 focus:ring-green-500 focus:border-green-500'
                          : 'border-gray-200 focus:border-indigo-400 focus:ring-indigo-400'
                      }
                    `}
                  />

                  {/* Toggle visibility */}
                  <button
                    type="button"
                    onClick={field.toggle}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    tabIndex="-1"
                  >
                    {field.show ? (
                      <FaEyeSlash className="w-4 h-4" />
                    ) : (
                      <FaEye className="w-4 h-4" />
                    )}
                  </button>

                  {/* Success / error icon */}
                  {touchedFields[field.name] && !isFieldError && isFieldValid && (
                    <FaCheckCircle className="absolute right-10 top-1/2 -translate-y-1/2 text-green-500 w-4 h-4" />
                  )}
                </div>

                {fieldError && touchedFields[field.name] && (
                  <div className="flex items-start gap-1.5 mt-1">
                    <FaExclamationCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                    <p className="text-sm text-red-500">{fieldError.message}</p>
                  </div>
                )}
              </div>
            );
          })}

          {/* ============================================
              ✅ UPDATED: BUTTONS (Save + Cancel)
              ============================================ */}
          <div className="flex gap-3 pt-2">
            {/* ✅ ADDED: Cancel button - clears form */}
            <button
              type="button"
              onClick={handleCancel}
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <FaTimes className="w-4 h-4" />
              Cancel
            </button>

            {/* Save / Update button */}
            <button
              type="submit"
              disabled={isSubmitting || !isValid}
              className="flex-1 px-6 py-3 bg-linear-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-orange-500/25 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Updating...
                </>
              ) : (
                <>
                  <FaSave className="w-4 h-4" />
                  Update Password
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordCard;