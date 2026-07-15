// components/rooms/RoomCard.jsx
import React from 'react';
import { FaBed, FaUser, FaBuilding, FaMoneyBillWave, FaDoorOpen } from 'react-icons/fa';
import { MdPerson, MdLocationOn } from 'react-icons/md';

/**
 * ============================================
 * ROOM CARD COMPONENT
 * ============================================
 * Displays individual room in a card format with color coding
 * 
 * @param {Object} props
 * @param {Object} props.room - Room data object
 * @param {string} props.rentStatus - 'paid', 'partial', 'unpaid'
 */

const RoomCard = ({ room, rentStatus = 'unpaid' }) => {
  /**
   * ============================================
   * RENT STATUS COLOR CONFIGURATION
   * ============================================
   * Green: All rent received
   * Orange/Yellow: Partial payment received
   * Red: No payment received
   */
  const statusConfig = {
    paid: {
      borderColor: 'border-green-500',
      shadowColor: 'shadow-green-500/20 hover:shadow-green-500/30',
      bgColor: 'bg-green-50',
      statusText: 'All Received',
      statusColor: 'text-green-700',
      dotColor: 'bg-green-500',
    },
    partial: {
      borderColor: 'border-yellow-500',
      shadowColor: 'shadow-yellow-500/20 hover:shadow-yellow-500/30',
      bgColor: 'bg-yellow-50',
      statusText: 'Partial Received',
      statusColor: 'text-yellow-700',
      dotColor: 'bg-yellow-500',
    },
    unpaid: {
      borderColor: 'border-red-500',
      shadowColor: 'shadow-red-500/20 hover:shadow-red-500/30',
      bgColor: 'bg-red-50',
      statusText: 'Not Received',
      statusColor: 'text-red-700',
      dotColor: 'bg-red-500',
    },
  };

  const config = statusConfig[rentStatus] || statusConfig.unpaid;

  // Get room type label
  const getRoomTypeLabel = (type) => {
    const types = {
      single: 'Single',
      double: 'Double',
      triple: 'Triple',
      dormitory: 'Dormitory',
      studio: 'Studio',
    };
    return types[type] || type;
  };

  return (
    <div className={`
      group bg-white rounded-2xl border-2 ${config.borderColor} 
      shadow-md hover:shadow-xl ${config.shadowColor}
      transition-all duration-300 hover:-translate-y-2 cursor-pointer
      overflow-hidden
    `}>
      {/* ===== COLORED TOP BAR ===== */}
      <div className={`h-1.5 w-full ${config.bgColor}`} />

      <div className="p-5">
        {/* ===== HEADER ===== */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl ${config.bgColor} flex items-center justify-center`}>
              <FaDoorOpen className={`w-6 h-6 ${config.statusColor}`} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                Room {room.roomNumber}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <FaBuilding className="w-3.5 h-3.5" />
                <span>{getRoomTypeLabel(room.roomType)}</span>
                <span className="text-gray-300">|</span>
                <span>Floor {room.floor}</span>
              </div>
            </div>
          </div>
          
          {/* ===== RENT STATUS BADGE ===== */}
          <div className={`px-3 py-1 rounded-full text-xs font-semibold ${config.bgColor} ${config.statusColor} flex items-center gap-1.5`}>
            <span className={`w-1.5 h-1.5 rounded-full ${config.dotColor} animate-pulse`} />
            {config.statusText}
          </div>
        </div>

        {/* ===== DIVIDER ===== */}
        <div className="border-t border-gray-100 my-3" />

        {/* ===== TENANT INFO ===== */}
        <div className="space-y-2">
          {room.tenant ? (
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-sm">
                {room.tenant.name?.charAt(0) || 'T'}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">
                  {room.tenant.name || 'Unknown Tenant'}
                </p>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <MdPerson className="w-3 h-3" />
                  Tenant ID: {room.tenant.id || 'N/A'}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 border border-dashed border-gray-300">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
                <FaUser className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Vacant Room</p>
                <p className="text-xs text-gray-400">No tenant assigned</p>
              </div>
            </div>
          )}
        </div>

        {/* ===== FOOTER ===== */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-500">Monthly Rent</p>
            <p className="text-sm font-bold text-gray-900">₹{room.monthlyRent?.toLocaleString() || 0}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Deposit</p>
            <p className="text-sm font-bold text-gray-900">₹{room.deposit?.toLocaleString() || 0}</p>
          </div>
        </div>

        {/* ===== HOVER OVERLAY ===== */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    </div>
  );
};

export default RoomCard;