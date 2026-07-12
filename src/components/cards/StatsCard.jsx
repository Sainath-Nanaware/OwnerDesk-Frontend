// components/dashboard/StatsCard.jsx
import React from 'react';

/**
 * ============================================
 * STATS CARD COMPONENT
 * ============================================
 * Displays individual stat cards in the dashboard
 * 
 * @param {Object} props
 * @param {string} props.label - Stat label
 * @param {string|number} props.value - Stat value
 * @param {React.ReactNode} props.icon - Icon component
 * @param {string} props.bgColor - Background color class
 * @param {string} props.textColor - Text color class
 */

const StatsCard = ({ label, value, icon, bgColor = 'bg-blue-50', textColor = 'text-blue-600' }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`w-12 h-12 ${bgColor} rounded-xl flex items-center justify-center ${textColor}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;