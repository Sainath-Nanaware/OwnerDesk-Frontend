// components/tenants/TenantRoomInfo.jsx
import React from 'react';
import { FaBuilding, FaDoorOpen, FaMapMarkerAlt, FaHome } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';

/**
 * ============================================
 * TENANT ROOM INFO COMPONENT (READ-ONLY)
 * ============================================
 * Displays the room allocated to an active tenant
 * This section is NOT editable
 * 
 * @param {Object} props
 * @param {Object} props.roomInfo - Room & property details
 */

const TenantRoomInfo = ({ roomInfo }) => {
  if (!roomInfo) return null;

  // ============================================
  // ROOM TYPE LABEL HELPER
  // ============================================
  const getRoomTypeLabel = (type) => {
    const types = {
      '1rk': '1 RK',
      '1bhk': '1 BHK',
      '2bhk': '2 BHK',
      '3bhk': '3 BHK',
      studio: 'Studio',
    };
    return types[type] || type;
  };

  const infoItems = [
    {
      icon: <FaBuilding className="w-4 h-4" />,
      label: 'Property Name',
      value: roomInfo.propertyName,
    },
    {
      icon: <MdLocationOn className="w-4 h-4" />,
      label: 'Address',
      value: roomInfo.address,
    },
    {
      icon: <FaMapMarkerAlt className="w-4 h-4" />,
      label: 'City',
      value: roomInfo.city,
    },
    {
      icon: <FaDoorOpen className="w-4 h-4" />,
      label: 'Room Number',
      value: roomInfo.roomNumber,
    },
    {
      icon: <FaHome className="w-4 h-4" />,
      label: 'Room Type',
      value: getRoomTypeLabel(roomInfo.roomType),
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-linear-to-r from-green-500 to-emerald-500 p-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <FaBuilding className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Allocated Room</h3>
            <p className="text-green-100 text-xs">
              This information is read-only
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {infoItems.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-4 flex items-start gap-3"
            >
              <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center text-green-600 shrink-0">
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

export default TenantRoomInfo;