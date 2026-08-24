// components/room-management/MonthYearFilter.jsx
import React from 'react';
import { MONTHS, getYears } from '../../validations/roomManagementValidation';

/**
 * ============================================
 * MONTH & YEAR FILTER COMPONENT
 * ============================================
 * Allows users to filter room data by month and year
 * 
 * @param {Object} props
 * @param {string} props.selectedMonth - Current selected month
 * @param {string} props.selectedYear - Current selected year
 * @param {Function} props.onMonthChange - Month change handler
 * @param {Function} props.onYearChange - Year change handler
 * @param {Function} props.onApply - Apply filter handler
 */

const MonthYearFilter = ({ 
  selectedMonth, 
  selectedYear, 
  onMonthChange, 
  onYearChange, 
  onApply 
}) => {
  const years = getYears();

  const handleSubmit = (e) => {
    e.preventDefault();
    onApply();
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1 w-full">
            <label className="text-sm font-medium text-gray-700 block mb-1.5">
              Select Month
            </label>
            <select
              value={selectedMonth}
              onChange={(e) => onMonthChange(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-700"
            >
              {MONTHS.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 w-full">
            <label className="text-sm font-medium text-gray-700 block mb-1.5">
              Select Year
            </label>
            <select
              value={selectedYear}
              onChange={(e) => onYearChange(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-700"
            >
              {years.map((year) => (
                <option key={year.value} value={year.value}>
                  {year.label}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full sm:w-auto self-end">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all"
            >
              Apply Filter
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MonthYearFilter;