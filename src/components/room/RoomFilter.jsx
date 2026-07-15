// components/rooms/RoomFilter.jsx
import React from 'react';
import { FaSearch, FaTimes, FaFilter } from 'react-icons/fa';
import { ROOM_TYPES, OCCUPANCY_STATUS } from '../../validations/roomValidation';

/**
 * ============================================
 * ROOM FILTER COMPONENT
 * ============================================
 * Search and filter component for rooms
 * 
 * @param {Object} props
 * @param {Object} props.filters - Current filter values
 * @param {Function} props.onFilterChange - Filter change handler
 * @param {Function} props.onSearch - Search handler
 * @param {Function} props.onClear - Clear filters handler
 * @param {boolean} props.showFilters - Show/hide filters
 */

const RoomFilter = ({ 
  filters, 
  onFilterChange, 
  onSearch, 
  onClear,
  showFilters = true 
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  const handleClear = () => {
    onClear();
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* ===== ROOM NUMBER SEARCH ===== */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              name="roomNumber"
              value={filters.roomNumber || ''}
              onChange={handleInputChange}
              placeholder="Search by Room No."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
            />
          </div>

          {/* ===== ROOM TYPE FILTER ===== */}
          <div>
            <select
              name="roomType"
              value={filters.roomType || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm text-gray-700"
            >
              <option value="">All Room Types</option>
              {ROOM_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* ===== FLOOR FILTER ===== */}
          <div>
            <input
              type="number"
              name="floor"
              value={filters.floor || ''}
              onChange={handleInputChange}
              placeholder="Filter by Floor"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
              min="0"
            />
          </div>

          {/* ===== OCCUPANCY FILTER ===== */}
          <div>
            <select
              name="isOccupied"
              value={filters.isOccupied || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm text-gray-700"
            >
              <option value="">All Occupancy</option>
              {OCCUPANCY_STATUS.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>

          {/* ===== ACTION BUTTONS ===== */}
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all text-sm flex items-center justify-center gap-2"
            >
              <FaSearch className="w-3.5 h-3.5" />
              Search
            </button>
            {(filters.roomNumber || filters.roomType || filters.floor || filters.isOccupied) && (
              <button
                type="button"
                onClick={handleClear}
                className="px-4 py-2.5 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition-all text-sm flex items-center justify-center gap-1"
              >
                <FaTimes className="w-3.5 h-3.5" />
                Clear
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default RoomFilter;