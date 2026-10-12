// components/tenants/TenantSearch.jsx
import React from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { TENANT_STATUS } from '../../validations/tenantValidation';

/**
 * ============================================
 * TENANT SEARCH COMPONENT
 * ============================================
 * Search & filter bar for tenants
 * 
 * @param {Object} props
 * @param {Object} props.filters - Current filter values
 * @param {Function} props.onFilterChange - Filter change handler
 * @param {Function} props.onSearch - Search handler
 * @param {Function} props.onClear - Clear handler
 */

const TenantSearch = ({ filters, onFilterChange, onSearch, onClear }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  const hasFilters = filters.name || (filters.status && filters.status !== 'all');

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Name Search */}
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              name="name"
              value={filters.name || ''}
              onChange={handleInputChange}
              placeholder="Search tenant by name..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
            />
          </div>

          {/* Status Filter */}
          <div className="sm:w-48">
            <select
              name="status"
              value={filters.status || 'all'}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm text-gray-700"
            >
              {TENANT_STATUS.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-6 py-2.5 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all text-sm flex items-center justify-center gap-2"
            >
              <FaSearch className="w-3.5 h-3.5" />
              Search
            </button>
            {hasFilters && (
              <button
                type="button"
                onClick={onClear}
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

export default TenantSearch;