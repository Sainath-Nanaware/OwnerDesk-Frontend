// components/rooms/RoomForm.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FaSave, FaTimes, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { roomSchema, ROOM_TYPES } from '../../validations/roomValidation';

/**
 * ============================================
 * ROOM FORM COMPONENT
 * ============================================
 * Form for creating new rooms only
 * 
 * @param {Object} props
 * @param {Function} props.onSubmit - Submit handler
 * @param {Function} props.onCancel - Cancel handler
 * @param {boolean} props.isSubmitting - Loading state
 */

const RoomForm = ({ onSubmit, onCancel, isSubmitting = false }) => {
  // ============================================
  // REACT HOOK FORM SETUP
  // ============================================
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid },
    watch,
  } = useForm({
    resolver: yupResolver(roomSchema),
    mode: 'onChange',
    defaultValues: {
      roomNumber: '',
      roomType: '',
      floor: '',
      monthlyRent: '',
      deposit: '',
    },
  });

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
  // FORM FIELDS CONFIGURATION
  // ============================================
  const fields = [
    {
      name: 'roomNumber',
      label: 'Room Number',
      type: 'text',
      placeholder: 'e.g., 101, A-01, 2B',
      required: true,
      colSpan: 'md:col-span-1',
    },
    {
      name: 'roomType',
      label: 'Room Type',
      type: 'select',
      placeholder: 'Select room type',
      required: true,
      colSpan: 'md:col-span-1',
      options: ROOM_TYPES,
    },
    {
      name: 'floor',
      label: 'Floor Number',
      type: 'number',
      placeholder: 'e.g., 0, 1, 2',
      required: true,
      colSpan: 'md:col-span-1',
    },
    {
      name: 'monthlyRent',
      label: 'Monthly Rent (₹)',
      type: 'number',
      placeholder: 'Enter monthly rent',
      required: true,
      colSpan: 'md:col-span-1',
    },
    {
      name: 'deposit',
      label: 'Deposit Amount (₹)',
      type: 'number',
      placeholder: 'Enter deposit amount',
      required: true,
      colSpan: 'md:col-span-1',
    },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((field) => {
          const fieldError = errors[field.name];
          const isFieldValid = showSuccessIcon(field.name);
          const isFieldError = touchedFields[field.name] && fieldError;

          return (
            <div key={field.name} className={field.colSpan || ''}>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              
              <div className="relative">
                {field.type === 'select' ? (
                  <select
                    {...register(field.name)}
                    className={`
                      w-full px-4 py-2.5 bg-gray-50 border-2 rounded-xl 
                      focus:outline-none focus:ring-2 focus:ring-offset-2 
                      transition-all duration-200
                      ${isFieldError 
                        ? 'border-red-400 focus:ring-red-400 focus:border-red-400' 
                        : isFieldValid
                          ? 'border-green-500 focus:ring-green-500 focus:border-green-500'
                          : 'border-gray-200 focus:border-indigo-400 focus:ring-indigo-400'
                      }
                    `}
                  >
                    <option value="">Select {field.label}</option>
                    {field.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    {...register(field.name)}
                    type={field.type}
                    placeholder={field.placeholder}
                    className={`
                      w-full px-4 py-2.5 bg-gray-50 border-2 rounded-xl 
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
                )}
                
                {/* Success/Error icons */}
                {touchedFields[field.name] && field.type !== 'select' && (
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
                  <FaExclamationCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-red-500">{fieldError.message}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ===== FORM BUTTONS ===== */}
      <div className="flex gap-3 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting || !isValid}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Creating...
            </>
          ) : (
            <>
              <FaSave className="w-4 h-4" />
              Create Room
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default RoomForm;