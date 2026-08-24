// components/room-management/PaymentSummary.jsx
import React from 'react';
import { FaMoneyBillWave, FaCheckCircle, FaExclamationCircle, FaClock } from 'react-icons/fa';

/**
 * ============================================
 * PAYMENT SUMMARY COMPONENT
 * ============================================
 * Shows overall payment status summary
 * 
 * @param {Object} props
 * @param {Object} props.summary - Payment summary data
 */

const PaymentSummary = ({ summary }) => {
  const getStatusColor = (status) => {
    switch(status) {
      case 'paid': return 'border-green-500 bg-green-50 text-green-700';
      case 'partial': return 'border-yellow-500 bg-yellow-50 text-yellow-700';
      case 'unpaid': return 'border-red-500 bg-red-50 text-red-700';
      default: return 'border-gray-300 bg-gray-50 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'paid': return <FaCheckCircle className="w-5 h-5 text-green-500" />;
      case 'partial': return <FaClock className="w-5 h-5 text-yellow-500" />;
      case 'unpaid': return <FaExclamationCircle className="w-5 h-5 text-red-500" />;
      default: return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
          <FaMoneyBillWave className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">Payment Summary</h3>
          <p className="text-sm text-gray-500">Overall payment status for this room</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {/* Total Amount */}
        <div className="bg-gray-50 rounded-xl p-4 text-center">
          <p className="text-xs text-gray-500 mb-1">Total Amount</p>
          <p className="text-xl font-bold text-gray-900">₹{summary.totalAmount?.toLocaleString() || 0}</p>
        </div>

        {/* Paid Amount */}
        <div className="bg-green-50 rounded-xl p-4 text-center border border-green-200">
          <p className="text-xs text-green-600 mb-1">Paid Amount</p>
          <p className="text-xl font-bold text-green-700">₹{summary.paidAmount?.toLocaleString() || 0}</p>
        </div>

        {/* Remaining Amount */}
        <div className="bg-red-50 rounded-xl p-4 text-center border border-red-200">
          <p className="text-xs text-red-600 mb-1">Remaining Amount</p>
          <p className="text-xl font-bold text-red-700">₹{summary.remainingAmount?.toLocaleString() || 0}</p>
        </div>

        {/* Status */}
        <div className={`rounded-xl p-4 text-center border-2 ${getStatusColor(summary.status)}`}>
          <div className="flex items-center justify-center gap-2 mb-1">
            {getStatusIcon(summary.status)}
            <p className="text-xs font-medium">Payment Status</p>
          </div>
          <p className="text-lg font-bold capitalize">
            {summary.status || 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSummary;