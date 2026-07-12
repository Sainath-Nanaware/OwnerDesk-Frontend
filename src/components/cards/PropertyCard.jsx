// components/dashboard/PropertyCard.jsx
import React from 'react';
import { FaEdit, FaTrash, FaArrowRight, FaBed } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';

/**
 * ============================================
 * PROPERTY CARD COMPONENT
 * ============================================
 * Displays individual property in a card format
 * 
 * @param {Object} props
 * @param {Object} props.property - Property data object
 * @param {Function} props.onClick - Click handler for card
 * @param {Function} props.onEdit - Edit button handler
 * @param {Function} props.onDelete - Delete button handler
 */

const PropertyCard = ({ property, onClick, onEdit, onDelete }) => {
  /**
   * ============================================
   * IMAGE FALLBACK HANDLER
   * ============================================
   * If image fails to load, show property name as fallback
   */
  const handleImageError = (e) => {
    e.target.src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23f3f4f6"/%3E%3Ctext x="200" y="150" font-family="Arial" font-size="18" fill="%239ca3af" text-anchor="middle"%3E${property.propertyName}%3C/text%3E%3C/svg%3E`;
  };

  return (
    <div 
      className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
      onClick={() => onClick(property.id)}
    >
      {/* ===== PROPERTY IMAGE ===== */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={property.image || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop'} 
          alt={property.propertyName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={handleImageError}
        />
        
        {/* ===== CLICK OVERLAY ===== */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-all duration-300">
            <span className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-xl text-sm font-semibold text-gray-900">
              Click to view rooms
            </span>
          </div>
        </div>
      </div>

      {/* ===== CARD CONTENT ===== */}
      <div className="p-5">
        {/* Header with title and action buttons */}
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
            {property.propertyName}
          </h3>
          
          {/* Action Buttons */}
          <div className="flex gap-1">
            <button 
              onClick={(e) => { 
                e.stopPropagation(); 
                onEdit(property); 
              }}
              className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
              title="Edit Property"
            >
              <FaEdit className="w-4 h-4" />
            </button>
            <button 
              onClick={(e) => { 
                e.stopPropagation(); 
                onDelete(property); 
              }}
              className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete Property"
            >
              <FaTrash className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
          <MdLocationOn className="w-4 h-4" />
          <span>{property.city}, {property.state}</span>
          <span className="text-gray-300 mx-1">|</span>
          <span>{property.pincode}</span>
        </div>

        {/* Room Stats */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-gray-50 rounded-lg p-2 text-center">
            <p className="text-xs text-gray-500">Total Rooms</p>
            <p className="text-sm font-bold text-gray-900">{property.totalRooms}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-2 text-center">
            <p className="text-xs text-gray-500">Occupied</p>
            <p className="text-sm font-bold text-green-600">{property.occupiedRooms || 0}</p>
          </div>
        </div>

        {/* Footer with address and view link */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-500">Address</p>
            <p className="text-sm text-gray-700 truncate max-w-[120px]">{property.address}</p>
          </div>
          <div className="flex items-center gap-2 text-indigo-600 font-semibold text-sm group-hover:gap-3 transition-all">
            <span>View Rooms</span>
            <FaArrowRight className="w-3 h-3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;