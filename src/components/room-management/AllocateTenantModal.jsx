// components/room-management/AllocateTenantModal.jsx
import React, { useState, useEffect } from 'react';
import { FaTimes, FaSearch, FaUser, FaUserPlus, FaUserMinus } from 'react-icons/fa';
import { MdPhone, MdEmail } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTenantListAsyncThunk } from '../../features/tenant/tenantSlice';
import { getUserID } from '../../features/auth/authService';

/**
 * ============================================
 * ALLOCATE TENANT MODAL COMPONENT
 * ============================================
 * Popup for searching and allocating tenants to room
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Modal visibility
 * @param {Function} props.onClose - Close handler
 * @param {Function} props.onAllocate - Allocate tenant handler
 * @param {Function} props.onDeallocate - Deallocate tenant handler
 * @param {Object} props.currentTenant - Currently allocated tenant
 * @param {string} props.roomId - Room ID for allocation
 */

const AllocateTenantModal = ({ 
  isOpen, 
  onClose, 
  onAllocate, 
  onDeallocate,
  currentTenant,
  roomId 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const dispatch=useDispatch()
  const tenantStore=useSelector((state)=>state.tenant)

  useEffect(()=>{
      setTenants(tenantStore.allTenantList);
      console.log("store tenants:",tenantStore.allTenantList)
  },[tenantStore])

  // ============================================
  // FETCH TENANTS FOR SEARCH
  // ============================================
  const searchTenants = async (query) => {
    if (!query.trim()) {
      setTenants([]);
      return;
    }

    setLoading(true);
    try {
      /**
       * ============================================
       * API CALL - Search tenants
       * ============================================
       * Endpoint: GET /api/tenants?search=:query
       * Response: { success: true, data: { tenants: [...] } }
       */
      // const response = await fetch(`https://your-api.com/api/tenants?search=${query}`);
      // const result = await response.json();
      const credentials ={
        ownerID:getUserID(),
        searchParameters:`search=${query}&status=inactive` //we only fetch unalocated tenant means only inactive tenants
      }
      const resultActionGetAllTenantInfo=await dispatch(getAllTenantListAsyncThunk(credentials))
      if (getAllTenantListAsyncThunk.fulfilled.match(resultActionGetAllTenantInfo)){
        // setTenants(tenantStore.allTenantList);
      }
    } catch (error) {
      console.error('Error searching tenants:', error);
    } finally {
      setLoading(false);
    }
  };

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.trim()) {
        searchTenants(searchTerm);
      } else {
        setTenants([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleAllocate = () => {
    if (selectedTenant) {
      onAllocate(selectedTenant);
      setSelectedTenant(null);
      setSearchTerm('');
      setTenants([]);
    }
  };

  const handleDeallocate = () => {
    onDeallocate();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-fade-in-down">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <FaUserPlus className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {currentTenant ? 'Current Tenant' : 'Allocate Tenant'}
              </h2>
              <p className="text-sm text-gray-500">
                {currentTenant 
                  ? `Currently occupied by ${currentTenant.fullName}`
                  : 'Search and select a tenant to allocate'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <FaTimes className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {currentTenant ? (
            // ===== SHOW CURRENT TENANT =====
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-4">
                <div className="w-14 h-14 bg-linear-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center text-2xl font-bold text-indigo-600">
                  {currentTenant.fullName?.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{currentTenant.fullName}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                    <span className="flex items-center gap-1">
                      <MdPhone className="w-4 h-4" />
                      {currentTenant.phone}
                    </span>
                    <span className="flex items-center gap-1">
                      <MdEmail className="w-4 h-4" />
                      {currentTenant.email}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleDeallocate}
                  className="px-4 py-2 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors flex items-center gap-2"
                >
                  <FaUserMinus className="w-4 h-4" />
                  Deallocate
                </button>
              </div>
              <p className="text-sm text-gray-500 text-center">
                Click Deallocate to remove tenant from this room
              </p>
            </div>
          ) : (
            // ===== SEARCH & SELECT TENANT =====
            <div className="space-y-4">
              {/* Search Input */}
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search tenants by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Tenant List */}
              {loading ? (
                <div className="text-center py-8">
                  <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto" />
                  <p className="text-gray-500 mt-3">Searching tenants...</p>
                </div>
              ) : tenants.length > 0 ? (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {tenants.map((tenant) => (
                    <div
                      key={tenant._id}
                      onClick={() => setSelectedTenant(tenant)}
                      className={`
                        flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all
                        ${selectedTenant?._id === tenant._id
                          ? 'bg-indigo-50 border-2 border-indigo-500'
                          : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                        }
                      `}
                    >
                      <div className="w-10 h-10 bg-linear-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center text-sm font-bold text-indigo-600">
                        {tenant.fullName?.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{tenant.fullName}</p>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span>{tenant.phone}</span>
                          <span>{tenant.email}</span>
                        </div>
                      </div>
                      {selectedTenant?._id === tenant._id && (
                        <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                          <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : searchTerm ? (
                <div className="text-center py-8">
                  <FaUser className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No tenants found</p>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <FaSearch className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Search for tenants to allocate</p>
                </div>
              )}

              {/* Allocate Button */}
              {selectedTenant && (
                <button
                  onClick={handleAllocate}
                  className="w-full py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all flex items-center justify-center gap-2"
                >
                  <FaUserPlus className="w-4 h-4" />
                  Allocate {selectedTenant.fullName}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllocateTenantModal;