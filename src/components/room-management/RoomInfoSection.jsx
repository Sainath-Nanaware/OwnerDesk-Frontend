// components/room-management/RoomInfoSection.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { 
  FaBed, 
  FaBuilding, 
  FaMoneyBillWave, 
  FaDoorOpen,
  FaEdit,
  FaSave,
  FaTimes,
  FaUser,
  FaUserPlus,
  FaPhone,
  FaCheckCircle,
  FaExclamationCircle
} from 'react-icons/fa';
import { MdLocationOn, MdPerson, MdEmail } from 'react-icons/md';
import { roomEditSchema, ROOM_TYPES } from '../../validations/roomManagementValidation';
import AllocateTenantModal from './AllocateTenantModal';

/**
 * ============================================
 * ROOM INFO SECTION COMPONENT
 * ============================================
 * Displays room details with edit, allocate, deallocate functionality
 * 
 * @param {Object} props
 * @param {Object} props.roomData - Room data object
 * @param {string} props.roomId - Room ID
 * @param {Function} props.onUpdate - Update handler
 * @param {Function} props.onAllocate - Allocate tenant handler
 * @param {Function} props.onDeallocate - Deallocate tenant handler
 * @param {boolean} props.isLoading - Loading state
 */

const RoomInfoSection = ({ 
  roomData, 
  roomId, 
  onUpdate, 
  onAllocate, 
  onDeallocate,
  isLoading = false 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isAllocateModalOpen, setIsAllocateModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    resolver: yupResolver(roomEditSchema),
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
  // HANDLE EDIT - Populate form with data
  // ============================================
  const handleEdit = () => {
    reset({
      roomNumber: roomData.roomNumber || '',
      roomType: roomData.roomType || '',
      floor: roomData.floor || '',
      monthlyRent: roomData.monthlyRent || '',
      deposit: roomData.deposit || '',
    });
    setIsEditing(true);
  };

  // ============================================
  // HANDLE CANCEL EDIT
  // ============================================
  const handleCancelEdit = () => {
    setIsEditing(false);
    reset();
  };

  // ============================================
  // HANDLE FORM SUBMIT
  // ============================================
  const handleFormSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await onUpdate(data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating room:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ============================================
  // RENDER FIELD
  // ============================================
  const renderField = (label, name, type = 'text', options = null) => {
    const isFieldValid = showSuccessIcon(name);
    const isFieldError = touchedFields[name] && errors[name];

    return (
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1.5">
          {label}
        </label>
        <div className="relative">
          {isEditing ? (
            type === 'select' ? (
              <select
                {...register(name)}
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
              >
                <option value="">Select {label}</option>
                {options.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            ) : (
              <input
                {...register(name)}
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
            )
          ) : (
            <div className="w-full px-4 py-2.5 bg-gray-50 rounded-xl text-gray-700">
              {roomData[name] || 'N/A'}
            </div>
          )}
          
          {isEditing && touchedFields[name] && !isFieldError && isFieldValid && (
            <FaCheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 w-5 h-5" />
          )}
          {isEditing && isFieldError && (
            <FaExclamationCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 w-5 h-5" />
          )}
        </div>
        {isEditing && errors[name] && touchedFields[name] && (
          <p className="text-sm text-red-500 mt-1">{errors[name].message}</p>
        )}
      </div>
    );
  };

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
            <FaBed className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Room Information</h2>
            <p className="text-sm text-gray-500">Room details and tenant management</p>
          </div>
        </div>
        <div className="flex gap-2">
          {!isEditing && (
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl font-medium hover:bg-indigo-100 transition-colors flex items-center gap-2"
            >
              <FaEdit className="w-4 h-4" />
              Edit
            </button>
          )}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {renderField('Room Number', 'roomNumber')}
          {renderField('Room Type', 'roomType', 'select', ROOM_TYPES)}
          {renderField('Floor', 'floor', 'number')}
          {renderField('Monthly Rent (₹)', 'monthlyRent', 'number')}
          {renderField('Deposit (₹)', 'deposit', 'number')}
          
          {/* Occupancy Status */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1.5">
              Occupancy Status
            </label>
            <div className="w-full px-4 py-2.5 bg-gray-50 rounded-xl flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${
                roomData.isOccupied ? 'bg-green-500' : 'bg-gray-400'
              }`} />
              <span className="text-gray-700">
                {roomData.isOccupied ? 'Occupied' : 'Vacant'}
              </span>
            </div>
          </div>
        </div>

        {/* ===== TENANT INFO ===== */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-700">Tenant Information</h3>
            {!isEditing && (
              <button
                type="button"
                onClick={() => setIsAllocateModalOpen(true)}
                className="px-4 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-green-500/25 transition-all flex items-center gap-2"
              >
                <FaUserPlus className="w-3.5 h-3.5" />
                {roomData.isOccupied ? 'Change Tenant' : 'Allocate Tenant'}
              </button>
            )}
          </div>

          {roomData.isOccupied && roomData.tenant ? (
            <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center text-lg font-bold text-indigo-600">
                {roomData.tenant.name?.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{roomData.tenant.name}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <FaPhone className="w-3.5 h-3.5" />
                    {roomData.tenant.phone}
                  </span>
                  <span className="flex items-center gap-1">
                    <MdEmail className="w-3.5 h-3.5" />
                    {roomData.tenant.email}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl p-4 text-center border border-dashed border-gray-300">
              <FaUser className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500">No tenant allocated</p>
              <p className="text-xs text-gray-400">Click "Allocate Tenant" to assign a tenant</p>
            </div>
          )}
        </div>

        {/* Edit Actions */}
        {isEditing && (
          <div className="flex gap-3 mt-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleCancelEdit}
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
                <>
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <FaSave className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        )}
      </form>

      {/* Allocate Tenant Modal */}
      <AllocateTenantModal
        isOpen={isAllocateModalOpen}
        onClose={() => setIsAllocateModalOpen(false)}
        onAllocate={(tenant) => {
          onAllocate(tenant);
          setIsAllocateModalOpen(false);
        }}
        onDeallocate={() => {
          onDeallocate();
          setIsAllocateModalOpen(false);
        }}
        currentTenant={roomData.tenant || null}
        roomId={roomId}
      />
    </div>
  );
};

export default RoomInfoSection;