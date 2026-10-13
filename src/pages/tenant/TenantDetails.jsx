// pages/TenantDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaEdit, FaTimes, FaArrowLeft } from 'react-icons/fa';
import TenantInfoCard from '../../components/cards/TenantInfoCard';
import TenantRoomInfo from '../../components/tenant/TenantRoomInfo';
import TenantForm from '../../components/forms/TenantForm';
import { getUserID } from '../../features/auth/authService';
import { getTenantInfoAsyncThunk } from '../../features/tenant/tenantSlice';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/layouts/Header';

// ============================================
// TENANT DETAILS PAGE
// ============================================
const TenantDetails = () => {
  // ============================================
  // GET TENANT ID FROM URL
  // ============================================
  const { tenantId } = useParams();

  const tenantStore=useSelector((state)=>state.tenant)
  const dispatch=useDispatch()


  // ============================================
  // STATE MANAGEMENT
  // ============================================
  const [tenant, setTenant] = useState(null);
  const [roomInfo, setRoomInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);


  //update store data required time so we handle store updated data using useEffect
  useEffect(()=>{
    setTenant(tenantStore.tenantInfo);
    const roomAndPropertyInfo={
      ...tenantStore.roomInfo,
      ...tenantStore.propertyInfo
    }
    setRoomInfo(roomAndPropertyInfo || null);
    
  },[tenantStore])


  // ============================================
  // API BASE URL
  // ============================================
  // const API_BASE_URL = 'https://your-api.com/api'; // CHANGE THIS

  // ============================================
  // FETCH TENANT DETAILS
  // ============================================
  const fetchTenantDetails = async () => {
    setLoading(true);

    try {
      /**
       * ============================================
       * API CALL - Fetch single tenant details
       * ============================================
       * Endpoint: GET /api/tenants/:tenantId
       * Response: {
       *   success: true,
       *   data: {
       *     tenant: { ... },
       *     roomInfo: { ... } | null
       *   }
       * }
       */
      // const response = await fetch(`${API_BASE_URL}/tenants/${tenantId}`);
      // const result = await response.json();

      // if (result.success) {
      //   setTenant(result.data.tenant);
      //   setRoomInfo(result.data.roomInfo || null);
      // } 
       const credentials ={
        ownerId:getUserID(),
        tenantId:tenantId
        }
        const resultActionGetTenantInfo=await dispatch(getTenantInfoAsyncThunk(credentials))
        if (getTenantInfoAsyncThunk.fulfilled.match(resultActionGetTenantInfo)){
            // setTenants(tenantStore.allTenantList);

            
        }else {
          toast.error('Failed to fetch tenant details:please try again! ');
        }
    } catch (error) {
      console.error('Error fetching tenant details:', error);
      toast.error('Error fetching tenant details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // INITIAL LOAD
  // ============================================
  useEffect(() => {
    if (tenantId) {
      fetchTenantDetails();
    }
  }, [tenantId]);

  // ============================================
  // HANDLE EDIT TENANT
  // ============================================
  const handleEditTenant = async (data) => {
    setIsSubmitting(true);

    try {
      /**
       * ============================================
       * API CALL - Update tenant info
       * ============================================
       * Endpoint: PUT /api/tenants/:tenantId
       * Body: tenant data (status is NOT editable)
       */
      const response = await fetch(`${API_BASE_URL}/tenants/${tenantId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (result.success) {
        setTenant(result.data);
        setIsDrawerOpen(false);
        alert('✅ Tenant updated successfully!');
      } else {
        alert('❌ Failed to update tenant: ' + result.message);
      }
    } catch (error) {
      console.error('Error updating tenant:', error);
      alert('❌ Error: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ============================================
  // RENDER
  // ============================================
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-500 mt-4">Loading tenant details...</p>
        </div>
      </div>
    );
  }

  if (!tenant) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Tenant not found
          </h2>
          <button
            onClick={() => window.history.back()}
            className="mt-4 px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
    <Header isLoggedIn={true} />
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* ===== HEADER ===== */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.history.back()}
              className="p-2 hover:bg-gray-200 rounded-xl transition-colors"
            >
              <FaArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Tenant Details
              </h1>
              <p className="text-sm text-gray-500">
                View and manage tenant information
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-indigo-500/25 transition-all duration-300"
          >
            <FaEdit className="w-4 h-4" />
            Edit Tenant
          </button>
        </div>

        {/* ===== TENANT INFO ===== */}
        <TenantInfoCard tenant={tenant} />

        {/* ===== ROOM INFO (only if tenant is active) ===== */}
        {tenant.status === 'Active' && roomInfo && (
          <div className="mt-6">
            <TenantRoomInfo roomInfo={roomInfo} />
          </div>
        )}
      </div>

      {/* ============================================
          SIDE DRAWER - Edit Tenant
          ============================================ */}
      <div
        className={`
          fixed inset-0 z-50 transition-all duration-500
          ${isDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsDrawerOpen(false)}
        />

        <div
          className={`
            absolute right-0 top-0 h-full w-full max-w-lg bg-white shadow-2xl transform transition-all duration-500
            ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-linear-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                <FaEdit className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Edit Tenant
                </h2>
                <p className="text-sm text-gray-500">
                  Update tenant details
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <FaTimes className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="p-6 overflow-y-auto h-[calc(100%-80px)]">
            <TenantForm
              initialData={tenant}
              onSubmit={handleEditTenant}
              onCancel={() => setIsDrawerOpen(false)}
              isEditing={true}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default TenantDetails;