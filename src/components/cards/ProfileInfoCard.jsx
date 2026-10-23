// components/profile/ProfileInfoCard.jsx
import React, { useState } from 'react';
import {
  FaUser,
  FaEnvelope,
  FaMobileAlt,
  FaEdit,
  FaUserCircle,
} from 'react-icons/fa';
import ProfileForm from '../forms/ProfileForm';

/**
 * ============================================
 * PROFILE INFO CARD COMPONENT
 * ============================================
 * Displays user profile info (username, email, mobile)
 * Toggles into edit mode when user clicks Edit
 *
 * @param {Object} props
 * @param {Object} props.user - User data from API
 * @param {Function} props.onUpdate - Called with new data
 * @param {boolean} props.isSubmitting - API loading state
 */

const ProfileInfoCard = ({ user, onUpdate, isSubmitting = false }) => {
  // ============================================
  // EDIT MODE STATE
  // ============================================
  const [isEditing, setIsEditing] = useState(false);

  // ============================================
  // HANDLE SUBMIT
  // ============================================
  const handleSubmit = async (data) => {
    try {
      await onUpdate(data);
      setIsEditing(false);
    } catch (error) {
      // Error handled in parent
    }
  };

  // ============================================
  // INFO ROWS (VIEW MODE)
  // ============================================
  const infoRows = [
    {
      icon: <FaUser className="w-4 h-4" />,
      label: 'Username',
      value: user?.username,
    },
    {
      icon: <FaEnvelope className="w-4 h-4" />,
      label: 'Email Address',
      value: user?.email,
    },
    {
      icon: <FaMobileAlt className="w-4 h-4" />,
      label: 'Mobile Number',
      value: user?.mobile,
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* ===== HEADER ===== */}
      <div className="bg-linear-to-r from-indigo-600 to-purple-600 p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <FaUserCircle className="w-9 h-9 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white">
              {user?.username || 'User'}
            </h2>
            <p className="text-indigo-100 text-sm">Account Information</p>
          </div>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-xl font-medium hover:bg-white/30 transition-colors"
            >
              <FaEdit className="w-4 h-4" />
              Edit
            </button>
          )}
        </div>
      </div>

      {/* ===== BODY ===== */}
      <div className="p-6">
        {isEditing ? (
          // EDIT MODE
          <ProfileForm
            initialData={user}
            onSubmit={handleSubmit}
            onCancel={() => setIsEditing(false)}
            isSubmitting={isSubmitting}
          />
        ) : (
          // VIEW MODE
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {infoRows.map((row, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-4 flex items-start gap-3"
              >
                <div className="w-9 h-9 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 shrink-0">
                  {row.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 mb-0.5">{row.label}</p>
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {row.value || 'N/A'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileInfoCard;