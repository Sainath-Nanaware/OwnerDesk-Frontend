// components/room-management/AddPaymentModal.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FaTimes, FaSave, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { additionalPaymentSchema, PAYMENT_TYPES, PAYMENT_STATUS } from '../../validations/roomManagementValidation';

/**
 * ============================================
 * ADD PAYMENT MODAL COMPONENT
 * ============================================
 * Modal for adding additional payments (wifi, water, etc.)
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Modal visibility
 * @param {Function} props.onClose - Close handler
 * @param {Function} props.onSubmit - Submit handler
 * @param {boolean} props.isSubmitting - Loading state
 */

const AddPaymentModal = ({ isOpen, onClose, onSubmit, isSubmitting = false }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid },
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(additionalPaymentSchema),
    mode: 'onChange',
    defaultValues: {
      type: '',
      amount: '',
      paidAmount: '',
      status: 'unpaid',
      paymentDate: new Date().toISOString().split('T')[0],
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

  const handleFormSubmit = (data) => {
    onSubmit(data);
    reset();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden animate-fade-in-down">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Add Payment</h2>
              <p className="text-sm text-gray-500">Add additional payment type</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <FaTimes className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            {/* Payment Type */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">
                Payment Type <span className="text-red-500">*</span>
              </label>
              <select
                {...register('type')}
                className={`
                  w-full px-4 py-2.5 bg-gray-50 border-2 rounded-xl 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 
                  transition-all duration-200
                  ${errors.type && touchedFields.type
                    ? 'border-red-400 focus:ring-red-400'
                    : touchedFields.type && watch('type')
                      ? 'border-green-500 focus:ring-green-500'
                      : 'border-gray-200 focus:border-indigo-400 focus:ring-indigo-400'
                  }
                `}
              >
                <option value="">Select payment type</option>
                {PAYMENT_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              {errors.type && touchedFields.type && (
                <p className="text-sm text-red-500 mt-1">{errors.type.message}</p>
              )}
            </div>

            {/* Amount */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">
                Total Amount (₹) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  {...register('amount')}
                  type="number"
                  placeholder="Enter total amount"
                  className={`
                    w-full px-4 py-2.5 bg-gray-50 border-2 rounded-xl 
                    focus:outline-none focus:ring-2 focus:ring-offset-2 
                    transition-all duration-200
                    ${errors.amount && touchedFields.amount
                      ? 'border-red-400 focus:ring-red-400'
                      : touchedFields.amount && watch('amount')
                        ? 'border-green-500 focus:ring-green-500'
                        : 'border-gray-200 focus:border-indigo-400 focus:ring-indigo-400'
                    }
                  `}
                />
                {touchedFields.amount && !errors.amount && watch('amount') && (
                  <FaCheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 w-5 h-5" />
                )}
              </div>
              {errors.amount && touchedFields.amount && (
                <p className="text-sm text-red-500 mt-1">{errors.amount.message}</p>
              )}
            </div>

            {/* Paid Amount */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">
                Paid Amount (₹) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  {...register('paidAmount')}
                  type="number"
                  placeholder="Enter paid amount"
                  className={`
                    w-full px-4 py-2.5 bg-gray-50 border-2 rounded-xl 
                    focus:outline-none focus:ring-2 focus:ring-offset-2 
                    transition-all duration-200
                    ${errors.paidAmount && touchedFields.paidAmount
                      ? 'border-red-400 focus:ring-red-400'
                      : touchedFields.paidAmount && watch('paidAmount')
                        ? 'border-green-500 focus:ring-green-500'
                        : 'border-gray-200 focus:border-indigo-400 focus:ring-indigo-400'
                    }
                  `}
                />
                {touchedFields.paidAmount && !errors.paidAmount && watch('paidAmount') && (
                  <FaCheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 w-5 h-5" />
                )}
              </div>
              {errors.paidAmount && touchedFields.paidAmount && (
                <p className="text-sm text-red-500 mt-1">{errors.paidAmount.message}</p>
              )}
            </div>

            {/* Status */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                {...register('status')}
                className="w-full px-4 py-2.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              >
                {PAYMENT_STATUS.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Payment Date */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">
                Payment Date <span className="text-red-500">*</span>
              </label>
              <input
                {...register('paymentDate')}
                type="date"
                className="w-full px-4 py-2.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
              {errors.paymentDate && touchedFields.paymentDate && (
                <p className="text-sm text-red-500 mt-1">{errors.paymentDate.message}</p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
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
                    Adding...
                  </>
                ) : (
                  <>
                    <FaSave className="w-4 h-4" />
                    Add Payment
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPaymentModal;