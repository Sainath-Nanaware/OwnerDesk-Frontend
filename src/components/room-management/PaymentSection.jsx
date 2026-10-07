// components/room-management/PaymentSection.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { 
  FaMoneyBillWave, 
  FaEdit, 
  FaSave, 
  FaTimes, 
  FaPlus,
  FaCheckCircle,
  FaExclamationCircle,
  FaTrash,
  FaWifi,
  FaWater,
  FaCog,
  FaHome
} from 'react-icons/fa';
import { MdElectricBolt } from 'react-icons/md';
import { electricityBillSchema, PAYMENT_STATUS } from '../../validations/roomManagementValidation';
import AddPaymentModal from './AddPaymentModal';
import PaymentSummary from './PaymentSummary';

/**
 * ============================================
 * PAYMENT SECTION COMPONENT
 * ============================================
 * Manages electricity bill and additional payments
 * 
 * @param {Object} props
 * @param {Object} props.paymentData - Payment data object
 * @param {Array} props.additionalPayments - Additional payments list
 * @param {Function} props.onUpdateElectricity - Update electricity bill handler
 * @param {Function} props.onAddPayment - Add payment handler
 * @param {Function} props.onUpdatePayment - Update payment handler
 * @param {Function} props.onDeletePayment - Delete payment handler
 */

const PaymentSection = ({ 
  paymentData,
  electricityBill,
  additionalPayments = [],
  onUpdateElectricity,
  onAddPayment,
  onUpdatePayment,
  onDeletePayment
}) => {
  const [isEditingElectricity, setIsEditingElectricity] = useState(false);
  const [editingPaymentId, setEditingPaymentId] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  //for update additional payment we create state for form data
  const [additionalChargeUpdateData,setAddChargeUpdatedData]=useState({
    amount:0,
    paidAmount:0,
    status:null,
    date:null,
    
  })

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
    resolver: yupResolver(electricityBillSchema),
    mode: 'onChange',
  });

  // ============================================
  // SHOW SUCCESS ICON
  // ============================================
  const showSuccessIcon = (fieldName) => {
    return touchedFields[fieldName] && 
           !errors[fieldName] && 
           watch(fieldName) && 
           watch(fieldName).length > 0;
  };

  // ============================================
  // HANDLE EDIT ELECTRICITY
  // ============================================
  // console.log("elecBill",electricityBill);
  const handleEditElectricity = () => {
    reset({
      currentReading: electricityBill.currentReading || 0,
      previousReading: electricityBill.previousReading || 0,
      ratePerUnit: electricityBill.rate || 0,
      paidAmount: paymentData.paidAmount || 0,
      paymentDate: paymentData.paymentDate || new Date().toISOString().split('T')[0],
      status: paymentData.status || 'unpaid',
    });
    setIsEditingElectricity(true);
  };

  // ============================================
  // HANDLE CANCEL ELECTRICITY EDIT
  // ============================================
  const handleCancelElectricity = () => {
    setIsEditingElectricity(false);
    reset();
  };

  // ============================================
  // HANDLE ELECTRICITY FORM SUBMIT
  // ============================================
  const handleElectricitySubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await onUpdateElectricity(data);
      setIsEditingElectricity(false);
    } catch (error) {
      console.error('Error updating electricity bill:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ============================================
  // GET PAYMENT TYPE ICON
  // ============================================
  const getPaymentIcon = (type) => {
    const icons = {
      wifi: <FaWifi className="w-5 h-5" />,
      water: <FaWater className="w-5 h-5" />,
      motor: <FaCog className="w-5 h-5" />,
      maintenance: <FaHome className="w-5 h-5" />,
      other: <FaMoneyBillWave className="w-5 h-5" />,
    };
    return icons[type] || icons.other;
  };

  // ============================================
  // GET STATUS COLOR
  // ============================================
  const getStatusColor = (status) => {
    switch(status) {
      case 'paid': return 'border-green-500 bg-green-50 text-green-700';
      case 'partial': return 'border-yellow-500 bg-yellow-50 text-yellow-700';
      case 'unpaid': return 'border-red-500 bg-red-50 text-red-700';
      default: return 'border-gray-300 bg-gray-50 text-gray-700';
    }
  };

  // ============================================
  // RENDER ELECTRICITY FIELD
  // ============================================
  const renderElectricityField = (label, name, type = 'text',displayValue = '') => {
    const isFieldValid = showSuccessIcon(name);
    const isFieldError = touchedFields[name] && errors[name];

    return (
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1.5">
          {label}
        </label>
        <div className="relative">
          {isEditingElectricity ? (
            <input
              {...register(name || '')}
              type={type}
              className={`
                w-full px-4 py-2.5 bg-gray-50 border-2 rounded-xl 
                focus:outline-none focus:ring-2 focus:ring-offset-2 
                transition-all duration-200
                ${isFieldError 
                  ? 'border-red-400 focus:ring-red-400' 
                  : isFieldValid
                    ? 'border-green-500 focus:ring-green-500'
                    : 'border-gray-200 focus:border-indigo-400 focus:ring-indigo-400'
                }
              `}
            />
          ) : (
            <div className="w-full px-4 py-2.5 bg-gray-50 rounded-xl text-gray-700">
              {/* {name || 'N/A'} */}
              {displayValue !== null && displayValue !== undefined && displayValue !== '' ? displayValue : 0}
            </div>
          )}
          
          {isEditingElectricity && touchedFields[name] && !isFieldError && isFieldValid && (
            <FaCheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 w-5 h-5" />
          )}
          {isEditingElectricity && isFieldError && (
            <FaExclamationCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 w-5 h-5" />
          )}
        </div>
        {isEditingElectricity && errors[name] && touchedFields[name] && (
          <p className="text-sm text-red-500 mt-1">{errors[name].message}</p>
        )}
      </div>
    );
  };

  // ============================================
  // RENDER ADDITIONAL PAYMENT ITEMS
  // ============================================
  const renderPaymentItem = (payment) => {
    const isEditing = editingPaymentId === payment._id;
    const statusClass = getStatusColor(payment.status);

    return (
      <div key={payment._id} className={`bg-white rounded-xl p-4 border-2 ${statusClass} shadow-sm`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-indigo-600">
              {getPaymentIcon(payment.type)}
            </div>
            <div>
              <p className="font-semibold text-gray-900 capitalize">{payment.type} Bill</p>
              <p className="text-xs text-gray-500">Date: {payment.paidDate ? new Date(payment.paidDate).toISOString().split("T")[0] : "-"}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${statusClass}`}>
              {payment.status}
            </span>
            <button
              onClick={() => setEditingPaymentId(isEditing ? null : payment._id)}
              className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
            >
              <FaEdit className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDeletePayment(payment._id)}
              className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <FaTrash className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3 pt-3 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-500">Total Amount</p>
            <p className="text-sm font-bold text-gray-900">₹{payment.amount}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Paid Amount</p>
            <p className="text-sm font-bold text-green-600">₹{payment.paidAmount}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Remaining</p>
            <p className="text-sm font-bold text-red-600">₹{payment.amount - payment.paidAmount}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Payment Date</p>
            <p className="text-sm font-medium text-gray-700">{payment.paidDate ? new Date(payment.paidDate).toISOString().split("T")[0] : "-"}</p>
          </div>
        </div>

        {/* Edit mode for payment */}
        {isEditing && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <label className="text-xs text-gray-500 block">Amount</label>
                <input
                  type="number"
                  defaultValue={0}
                  className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onChange={(e) => setAddChargeUpdatedData((prev) => ({
                                ...prev,
                              amount: parseFloat(e.target.value),
                            }))}
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 block">Paid Amount</label>
                <input
                  type="number"
                  defaultValue={0}
                  className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onChange={(e) =>
                            setAddChargeUpdatedData((prev) => ({
                              ...prev,
                              paidAmount: parseFloat(e.target.value),
                            }))
                          }
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 block">Status</label>
                <select
                  // defaultValue={payment.status}
                  className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onChange={(e) =>
                                  setAddChargeUpdatedData((prev) => ({
                                    ...prev,
                                    status: e.target.value,
                                  }))
                                }
                >
                  {PAYMENT_STATUS.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 block">Date</label>
                <input
                  type="date"
                  // defaultValue={payment.paidDate ? new Date(payment.paidDate).toISOString().split("T")[0] : "-"}
                  className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onChange={(e) =>
                            setAddChargeUpdatedData((prev) => ({
                              ...prev,
                              paidDate: e.target.value,
                            }))
                          }
                />
              </div>
            </div>
            <button
              onClick={() =>{
                //sen updated data 
                onUpdatePayment(payment._id,additionalChargeUpdateData)
                // Reset state after successful API call
                setAddChargeUpdatedData({
                  amount: 0,
                  paidAmount: 0,
                  status: null,
                  paidDate: null,
                });
                // Close edit mode
                setEditingPaymentId(null)

              }}
              className="mt-2 px-4 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              Done Editing
            </button>
          </div>
        )}
      </div>
    );
  };

  // ============================================
  // CALCULATE SUMMARY
  // ============================================
  const calculateSummary = () => {
    let totalAmount = 0;
    let paidAmount = 0;
    let status = 'unpaid';

    // Electricity bill
    if (paymentData) {
      const electricityTotal = electricityBill.currentReading && electricityBill.previousReading && paymentData.rate
        ? (electricityBill.currentReading - electricityBill.previousReading) * electricityBill.rate
        : 0;
      totalAmount += electricityTotal;
      paidAmount += paymentData.paidAmount || 0;
    }

    // Additional payments
    additionalPayments.forEach(p => {
      totalAmount += p.amount || 0;
      paidAmount += p.paidAmount || 0;
    });

    const remainingAmount = totalAmount - paidAmount;
    
    if (remainingAmount <= 0) {
      status = 'paid';
    } else if (paidAmount > 0) {
      status = 'partial';
    } else {
      status = 'unpaid';
    }

    return { totalAmount, paidAmount, remainingAmount, status };
  };

  const summary = calculateSummary();

  const getPaymentValue = (paymentsArray = [], typeName = '', fieldKey = '') => {
  if (!Array.isArray(paymentsArray) || !typeName || !fieldKey) return '';

  const targetType = typeName.trim().toLowerCase();

  // Find matching payment item
  const foundItem = paymentsArray.find(
    (item) => item?.type?.trim().toLowerCase() === targetType
  );

  // Return specific property or empty string if not found
  return foundItem?.[fieldKey] || '';
};
// console.log("electrcity payment amount:",getPaymentValue(paymentData?.charges,'Electricity','paidAmount'));


  return (
    <div className="space-y-6">
      {/* ===== ELECTRICITY BILL ===== */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
              <MdElectricBolt className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Electricity Bill</h2>
              <p className="text-sm text-gray-500">Manage electricity usage and payment</p>
            </div>
          </div>
          {!isEditingElectricity && (
            <button
              onClick={handleEditElectricity}
              className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl font-medium hover:bg-indigo-100 transition-colors flex items-center gap-2"
            >
              <FaEdit className="w-4 h-4" />
              Edit
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit(handleElectricitySubmit)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
           {renderElectricityField('Current Reading', 'currentReading', 'number', electricityBill?.currentReading)}
            {renderElectricityField('Previous Reading', 'previousReading', 'number', electricityBill?.previousReading)}
            {renderElectricityField('Rate Per Unit (₹)', 'ratePerUnit', 'number', electricityBill?.rate)}
            
            {/* Calculated fields */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">Total Units</label>
              <div className="w-full px-4 py-2.5 bg-gray-100 rounded-xl text-gray-700 font-semibold">
                {(electricityBill.currentReading || 0) - (electricityBill.previousReading || 0)}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">Total Amount (₹)</label>
              <div className="w-full px-4 py-2.5 bg-gray-100 rounded-xl font-bold text-indigo-600">
                ₹{((electricityBill.currentReading || 0) - (electricityBill.previousReading || 0)) * (electricityBill.rate || 0)}
              </div>
            </div>
            {renderElectricityField('Paid Amount (₹)', 'paidAmount', 'number',  getPaymentValue(paymentData?.charges,'Electricity','paidAmount')|| "N/A")}
            {renderElectricityField('Payment Date', 'paymentDate', 'date', getPaymentValue(paymentData?.charges,'Electricity','paidDate').slice(0, 10)|| "N/A")}
            
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1.5">Status</label>
              {isEditingElectricity ? (
                <select
                  {...register('status')}
                  className="w-full px-4 py-2.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                >
                  {PAYMENT_STATUS.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              ) : (
                <div className={`w-full px-4 py-2.5 rounded-xl text-center font-semibold ${getStatusColor(paymentData.status)}`}>
                  { getPaymentValue(paymentData?.charges,'Electricity','status')|| 'N/A'}
                </div>
              )}
            </div>
          </div>

          {isEditingElectricity && (
            <div className="flex gap-3 mt-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={handleCancelElectricity}
                className="flex-1 px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
              >
                <FaTimes className="w-4 h-4" />
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !isValid}
                className="flex-1 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-indigo-500/25 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                ) : (
                  <>
                    <FaSave className="w-4 h-4" />
                    Save Bill
                  </>
                )}
              </button>
            </div>
          )}
        </form>
      </div>

      {/* ===== ADDITIONAL PAYMENTS ===== */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <FaMoneyBillWave className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Additional Payments</h2>
              <p className="text-sm text-gray-500">Manage water, wifi, motor bills etc.</p>
            </div>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-indigo-500/25 transition-all flex items-center gap-2"
          >
            <FaPlus className="w-4 h-4" />
            Add Payment
          </button>
        </div>

        <div className="space-y-3">
          {additionalPayments.length > 0 ? (
            additionalPayments.map(renderPaymentItem)
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-300">
              <FaMoneyBillWave className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No additional payments added</p>
              <p className="text-sm text-gray-400">Click "Add Payment" to add a new payment</p>
            </div>
          )}
        </div>
      </div>

      {/* ===== PAYMENT SUMMARY ===== */}
      <PaymentSummary summary={summary} />

      {/* ===== ADD PAYMENT MODAL ===== */}
      <AddPaymentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={onAddPayment}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default PaymentSection;