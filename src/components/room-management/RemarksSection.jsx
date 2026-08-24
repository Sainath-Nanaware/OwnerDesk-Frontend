// components/room-management/RemarksSection.jsx
import React, { useState } from 'react';
import { FaEdit, FaSave, FaTimes, FaStickyNote } from 'react-icons/fa';

/**
 * ============================================
 * REMARKS SECTION COMPONENT
 * ============================================
 * Manages remarks/notes for the room
 * 
 * @param {Object} props
 * @param {string} props.remarks - Current remarks text
 * @param {Function} props.onUpdate - Update remarks handler
 * @param {boolean} props.isLoading - Loading state
 */

const RemarksSection = ({ remarks = '', onUpdate, isLoading = false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempRemarks, setTempRemarks] = useState(remarks);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ============================================
  // HANDLE EDIT
  // ============================================
  const handleEdit = () => {
    setTempRemarks(remarks);
    setIsEditing(true);
  };

  // ============================================
  // HANDLE CANCEL
  // ============================================
  const handleCancel = () => {
    setIsEditing(false);
    setTempRemarks(remarks);
  };

  // ============================================
  // HANDLE SAVE
  // ============================================
  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      await onUpdate({ remarks: tempRemarks });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating remarks:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
            <FaStickyNote className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Remarks</h2>
            <p className="text-sm text-gray-500">Add notes and comments about this room</p>
          </div>
        </div>
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

      {isEditing ? (
        <div className="space-y-4">
          <textarea
            value={tempRemarks}
            onChange={(e) => setTempRemarks(e.target.value)}
            placeholder="Write your remarks here..."
            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none min-h-[100px]"
          />
          <div className="flex gap-3">
            <button
              onClick={handleCancel}
              className="flex-1 px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
            >
              <FaTimes className="w-4 h-4" />
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSubmitting}
              className="flex-1 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-indigo-500/25 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                <>
                  <FaSave className="w-4 h-4" />
                  Save Remarks
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-xl p-4 min-h-[80px]">
          {remarks ? (
            <p className="text-gray-700 whitespace-pre-wrap">{remarks}</p>
          ) : (
            <p className="text-gray-400 text-center py-4">No remarks added yet</p>
          )}
        </div>
      )}
    </div>
  );
};

export default RemarksSection;