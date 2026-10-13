// components/tenants/TenantInfoCard.jsx
import React from 'react';
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaIdCard,
  FaCheckCircle,
  FaTimesCircle,
} from 'react-icons/fa';

/**
 * ============================================
 * TENANT INFO CARD COMPONENT
 * ============================================
 * Displays full tenant information (read-only)
 * 
 * @param {Object} props
 * @param {Object} props.tenant - Tenant data object
 */

const TenantInfoCard = ({ tenant }) => {
  // ============================================
  // ID PROOF LABEL HELPER
  // ============================================
  const getIdProofLabel = (type) => {
    const labels = {
      aadhar: 'Aadhar Card',
      pan: 'PAN Card',
      passport: 'Passport',
      voterid: 'Voter ID',
      drivinglicence: 'Driving Licence',
      other: 'Other',
    };
    return labels[type] || type;
  };

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

  const config = statusConfig[tenant.status] || statusConfig.Inactive;

  // ============================================
  // INFO ROWS
  // ============================================
  const infoItems = [
    {
      icon: <FaUser className="w-4 h-4" />,
      label: 'Full Name',
      value: tenant.fullName,
    },
    {
      icon: <FaPhone className="w-4 h-4" />,
      label: 'Phone Number',
      value: tenant.phone,
    },
    {
      icon: <FaEnvelope className="w-4 h-4" />,
      label: 'Email Address',
      value: tenant.email,
    },
    {
      icon: <FaIdCard className="w-4 h-4" />,
      label: 'ID Proof Type',
      value: getIdProofLabel(tenant.idProofType),
    },
    {
      icon: <FaIdCard className="w-4 h-4" />,
      label: 'ID Proof Number',
      value: tenant.idProofNumber,
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* ===== HEADER ===== */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <span className="text-2xl font-bold text-white">
              {tenant.fullName?.charAt(0)?.toUpperCase() || 'T'}
            </span>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white">
              {tenant.fullName}
            </h2>
            <p className="text-indigo-100 text-sm">{tenant.email}</p>
          </div>
          <div className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border bg-white/20 backdrop-blur-sm text-white border-white/30`}>
            {config.icon}
            {config.label}
          </div>
        </div>
      </div>

      {/* ===== INFO BODY ===== */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {infoItems.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-4 flex items-start gap-3"
            >
              <div className="w-9 h-9 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 shrink-0">
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 mb-0.5">{item.label}</p>
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {item.value || 'N/A'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TenantInfoCard;