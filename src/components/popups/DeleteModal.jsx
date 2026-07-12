// components/dashboard/DeleteModal.jsx
import React from 'react';
import { FaExclamationCircle, FaTrash } from 'react-icons/fa';

/**
 * ============================================
 * DELETE CONFIRMATION MODAL
 * ============================================
 * Modal for confirming property deletion
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Modal visibility
 * @param {Object} props.property - Property to delete
 * @param {Function} props.onConfirm - Delete confirmation handler
 * @param {Function} props.onCancel - Cancel handler
 */

const DeleteModal = ({ isOpen, property, onConfirm, onCancel }) => {
  if (!isOpen || !property) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-6">
        <div className="text-center">
          {/* Icon */}
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaExclamationCircle className="w-8 h-8 text-red-600" />
          </div>
          
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Property</h3>
          
          {/* Message */}
          <p className="text-gray-500 mb-6">
            Are you sure you want to delete{' '}
            <span className="font-semibold text-gray-900">"{property.propertyName}"</span>? 
            This action cannot be undone.
          </p>
          
          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
            >
              <FaTrash className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;