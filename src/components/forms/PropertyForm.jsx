// components/dashboard/PropertyForm.jsx
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FaSave, FaTimes, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { propertySchema } from '../../validations/propertyValidation';

/**
 * ============================================
 * PROPERTY FORM COMPONENT
 * ============================================
 * Reusable form for adding/editing properties
 * 
 * @param {Object} props
 * @param {Object} props.initialData - Initial form data for editing
 * @param {Function} props.onSubmit - Submit handler
 * @param {Function} props.onCancel - Cancel handler
 * @param {boolean} props.isEditing - Edit mode flag
 * @param {boolean} props.isSubmitting - Loading state
 */

const PropertyForm = ({ 
  initialData, 
  onSubmit, 
  onCancel, 
  isEditing = false,
  isSubmitting = false 
}) => {
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
    resolver: yupResolver(propertySchema),
    mode: 'onChange',
    defaultValues: initialData || {
      propertyName: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      totalRooms: '',
      occupiedRooms: '',
    },
  });
 // ============================================
  // 🔥 IMPORTANT: FILL FORM WHEN EDITING
  // ============================================
  // This useEffect runs whenever initialData changes
  // It populates the form with existing property data
  // ============================================
  useEffect(() => {
    if (initialData && isEditing) {
      /**
       * ============================================
       * POPULATE FORM WITH EXISTING DATA
       * ============================================
       * Map API field names to form field names
       * If your API returns different field names,
       * update the mapping below
       */
      reset({
        propertyName: initialData.propertyName || '',
        address: initialData.address || '',
        city: initialData.city || '',
        state: initialData.state || '',
        pincode: initialData.pincode || '',
        totalRooms: initialData.totalRooms || '',
        occupiedRooms: initialData.occupiedRooms || '',
      });
    }
  }, [initialData, isEditing, reset]); // Dependencies: runs when initialData changes

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
      name: 'propertyName',
      label: 'Property Name',
      type: 'text',
      placeholder: 'Enter property name (e.g., Sunshine PG)',
      required: true,
      colSpan: 'md:col-span-2',
    },
    {
      name: 'address',
      label: 'Address',
      type: 'text',
      placeholder: 'Enter street address',
      required: true,
      colSpan: 'md:col-span-2',
    },
    {
      name: 'city',
      label: 'City',
      type: 'text',
      placeholder: 'Enter city',
      required: true,
      colSpan: '',
    },
    {
      name: 'state',
      label: 'State',
      type: 'text',
      placeholder: 'Enter state',
      required: true,
      colSpan: '',
    },
    {
      name: 'pincode',
      label: 'Pincode',
      type: 'text',
      placeholder: 'Enter 6-digit pincode',
      required: true,
      colSpan: '',
    },
    {
      name: 'totalRooms',
      label: 'Total Rooms',
      type: 'number',
      placeholder: 'Enter total rooms',
      required: true,
      colSpan: '',
    },
    {
      name: 'occupiedRooms',
      label: 'Occupied Rooms',
      type: 'number',
      placeholder: 'Enter occupied rooms',
      required: false,
      colSpan: '',
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
                
                {/* Success/Error icons */}
                {touchedFields[field.name] && (
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
          className="flex-1 px-6 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              {isEditing ? 'Updating...' : 'Adding...'}
            </>
          ) : (
            <>
              <FaSave className="w-4 h-4" />
              {isEditing ? 'Update Property' : 'Add Property'}
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default PropertyForm;