// components/tenants/TenantCard.jsx
import React from 'react';
import { FaUser, FaPhone, FaArrowRight, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

/**
 * ============================================
 * TENANT CARD COMPONENT
 * ============================================
 * Horizontal card showing brief tenant info
 * 
 * @param {Object} props
 * @param {Object} props.tenant - Tenant data object
 * @param {Function} props.onClick - Click handler
 */

const TenantCard = ({ tenant, onClick }) => {
  // ============================================
  // STATUS CONFIG
  // ============================================
  const statusConfig = {
    Active: {
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      borderColor: 'border-green-200',
      icon: <FaCheckCircle className="w-4 h-4" />,
      label: 'Active',
    },
    Inactive: {
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-600',
      borderColor: 'border-gray-200',
      icon: <FaTimesCircle className="w-4 h-4" />,
      label: 'Inactive',
    },
  };

  const config = statusConfig[tenant.status] || statusConfig.inactive;

  return (
    <div
      onClick={() => onClick(tenant._id)}
      className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-xl hover:border-indigo-200 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
    >
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center flex-shrink-0">
          <span className="text-xl font-bold text-indigo-600">
            {tenant.fullName?.charAt(0)?.toUpperCase() || 'T'}
          </span>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-gray-900 group-hover:text-indigo-600 transition-colors truncate">
            {tenant.fullName}
          </h3>
          <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-0.5">
            <FaPhone className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">{tenant.phone}</span>
          </div>
        </div>

        {/* Status Badge */}
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${config.bgColor} ${config.textColor} ${config.borderColor}`}>
          {config.icon}
          {config.label}
        </div>

        {/* Arrow */}
        <div className="text-gray-300 group-hover:text-indigo-500 transition-all group-hover:translate-x-1">
          <FaArrowRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default TenantCard;