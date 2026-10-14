// pages/TenantsList.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaUsers,
  FaUserCheck,
  FaUserTimes,
  FaPlus,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaUser,
} from 'react-icons/fa';
import TenantStatsCard from '../../components/cards/TenantStatsCard';
import TenantCard from '../../components/cards/TenantCard';
import TenantSearch from '../../components/tenant/TenantSearch';
import TenantForm from '../../components/forms/TenantForm';
import Header from '../../components/layouts/Header';
import { createNewTenantAsyncThunk, getAllTenantListAsyncThunk } from '../../features/tenant/tenantSlice';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getUserID } from '../../features/auth/authService';

// ============================================
// TENANTS LIST PAGE
// ============================================
const TenantsList = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const tenantStore=useSelector((state)=>state.tenant)

  // ============================================
  // STATE MANAGEMENT
  // ============================================
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
  });

  // Filters
  const [filters, setFilters] = useState({
    name: '',
    status: 'all',
  });

  // Pagination
  const [pagination, setPagination] = useState({
    totalRecords: 0,
    currentPage: 1,
    totalPages: 1,
    pageSize: 10,
    hasNextPage: false,
    hasPreviousPage: false,
  });


  //update store data required time so we handle store updated data using useEffect
  useEffect(()=>{

    setTenants(tenantStore.allTenantList);

    setPagination({
          totalRecords: tenantStore.pagination.totalRecords,
          currentPage: tenantStore.pagination.currentPage,
          totalPages: tenantStore.pagination.totalPages,
          pageSize: tenantStore.pagination.pageSize,
          hasNextPage: tenantStore.pagination.hasNextPage,
          hasPreviousPage: tenantStore.pagination.hasPreviousPage,
     });

     // Update stats (total tenant and active and inactive count)
            setStats({
                total: tenantStore.stats.totalTenantCount || 0,
                active: tenantStore.stats.activeTenantCount || 0,
                inactive: tenantStore.stats.inactiveTenantCount || 0,
            });

  },[tenantStore])

  // ============================================
  // API BASE URL
  // ============================================
//   const API_BASE_URL = 'https://your-api.com/api'; // CHANGE THIS

  // ============================================
  // FETCH TENANTS
  // ============================================
  const fetchTenants = async (page = 1, filterParams = {}) => {
    setLoading(true);

    try {
      /**
       * ============================================
       * API CALL - Fetch tenants with pagination
       * ============================================
       * Endpoint: GET /api/tenants
       * Query Params: page, pageSize, name, status
       */
      const params = new URLSearchParams();
      params.append('page', page);
      params.append('limit', 8);
      if (filterParams.name) params.append('search', filterParams.name);
      if (filterParams.status && filterParams.status !== 'all') {
        params.append('status', filterParams.status);
      }

    //   const response = await fetch(
    //     `${API_BASE_URL}/tenants?${params.toString()}`
    //   );
    //   const result = await response.json();

    //   if (result.success) {
    //     setTenants(result.data.tenants);
    //     setPagination({
    //       totalRecords: result.data.pagination.totalRecords,
    //       currentPage: result.data.pagination.currentPage,
    //       totalPages: result.data.pagination.totalPages,
    //       pageSize: result.data.pagination.pageSize,
    //       hasNextPage: result.data.pagination.hasNextPage,
    //       hasPreviousPage: result.data.pagination.hasPreviousPage,
    //     });
         
    
        // console.log("get tenant API params",params)
        const credentials ={
        ownerID:getUserID(),
        searchParameters:`${params}`
        }
        const resultActionGetAllTenantInfo=await dispatch(getAllTenantListAsyncThunk(credentials))
        if (getAllTenantListAsyncThunk.fulfilled.match(resultActionGetAllTenantInfo)){
            // setTenants(tenantStore.allTenantList);

            
        }else {
            toast.error('Failed to fetch tenants: ' + result.message);
        }
    } catch (error) {
      console.error('Error fetching tenants:', error);
      toast.error('Error fetching tenants. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // INITIAL LOAD
  // ============================================
  useEffect(() => {
    fetchTenants(1);
  }, []);

  // ============================================
  // HANDLE SEARCH
  // ============================================
  const handleSearch = () => {
    fetchTenants(1, filters);
  };

  // ============================================
  // HANDLE CLEAR FILTERS
  // ============================================
  const handleClearFilters = () => {
    const clearedFilters = { name: '', status: 'all' };
    setFilters(clearedFilters);
    fetchTenants(1, clearedFilters);
  };

  // ============================================
  // HANDLE PAGE CHANGE
  // ============================================
  const handlePageChange = (page) => {
    fetchTenants(page, filters);
  };

  // ============================================
  // HANDLE CREATE TENANT
  // ============================================
  const handleCreateTenant = async (data) => {
    setIsSubmitting(true);

    try {
      /**
       * ============================================
       * API CALL - Create new tenant
       * ============================================
       * Endpoint: POST /api/tenants
       * Body: tenant data (status is auto 'inactive' on backend)
       */
      // const response = await fetch(`${API_BASE_URL}/tenants`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });
      // const result = await response.json();

      // if (result.success) {
      //   alert('✅ Tenant created successfully!');
      //   setIsDrawerOpen(false);
      //   fetchTenants(pagination.currentPage, filters);
      // }
        data.ownerId=getUserID();
        // data.status="Inactive"//new tenant status muast be Inactive
        const credentials ={
        data:data
        }
        const resultActionCreateTenant=await dispatch(createNewTenantAsyncThunk(credentials))
        if (createNewTenantAsyncThunk.fulfilled.match(resultActionCreateTenant)){
          toast.success('Tenant created successfully!');
          setIsDrawerOpen(false);
          fetchTenants(pagination.currentPage, filters);    
        } else {
         // ✅ Get the actual error message from Redux
        //  console.log("response payload",resultActionCreateTenant.payload)
        const errorMessage =
          resultActionCreateTenant.payload ||
          resultActionCreateTenant.error?.message ||
          'Something went wrong while creating the tenant.';

        // ✅ Show the error message in toast
        toast.error(`Failed to create tenant: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Error creating tenant:', error);
      toast.error('❌ Error: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ============================================
  // HANDLE TENANT CARD CLICK
  // ============================================
  const handleTenantClick = (tenantId) => {
    navigate(`/tenant/${tenantId}`);
  };

  // ============================================
  // RENDER
  // ============================================
  return (
    <>
    <Header isLoggedIn={true} />
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* ===== HEADER ===== */}
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className='flex items-center gap-3'>
                <button 
                    onClick={() => window.history.back()}
                    className="p-2 hover:bg-gray-200 rounded-xl transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </button>
           
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Tenants</h1>
                    <p className="text-gray-500">
                    Manage all tenants from one place
                    </p>
                </div>
          </div>
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-indigo-500/25 hover:scale-105 transition-all duration-300"
          >
            <FaPlus className="w-4 h-4" />
            Create New Tenant
          </button>
        </div>

        {/* ===== STATS ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <TenantStatsCard
            label="Total Tenants"
            value={stats.total}
            icon={<FaUsers className="w-6 h-6" />}
            bgColor="bg-blue-50"
            textColor="text-blue-600"
          />
          <TenantStatsCard
            label="Active Tenants"
            value={stats.active}
            icon={<FaUserCheck className="w-6 h-6" />}
            bgColor="bg-green-50"
            textColor="text-green-600"
          />
          <TenantStatsCard
            label="Inactive Tenants"
            value={stats.inactive}
            icon={<FaUserTimes className="w-6 h-6" />}
            bgColor="bg-red-50"
            textColor="text-red-600"
          />
        </div>

        {/* ===== SEARCH ===== */}
        <TenantSearch
          filters={filters}
          onFilterChange={setFilters}
          onSearch={handleSearch}
          onClear={handleClearFilters}
        />

        {/* ===== TENANTS LIST ===== */}
        {loading ? (
          <div className="flex items-center justify-center h-64 mt-6">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>
              <p className="text-gray-500 mt-4">Loading tenants...</p>
            </div>
          </div>
        ) : tenants.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-gray-100 mt-6">
            <FaUser className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {filters.name || filters.status !== 'all'
                ? 'No Tenants Found'
                : 'No Tenants Added Yet'}
            </h3>
            <p className="text-gray-500">
              {filters.name || filters.status !== 'all'
                ? 'Try adjusting your search filters'
                : 'Start by adding your first tenant'}
            </p>
            {!filters.name && filters.status === 'all' && (
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="mt-4 px-6 py-2.5 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Create Tenant
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Tenant Cards - Horizontal List */}
            <div className="space-y-3 mt-6">
              {tenants.map((tenant) => (
                <TenantCard
                  key={tenant._id}
                  tenant={tenant}
                  onClick={handleTenantClick}
                />
              ))}
            </div>

            {/* ===== PAGINATION ===== */}
            {pagination.totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between mt-8 bg-white rounded-2xl shadow-sm px-4 py-3 border border-gray-100 gap-3">
                <div className="text-sm text-gray-500">
                  Showing {tenants.length} of {pagination.totalRecords} tenants
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={!pagination.hasPreviousPage}
                    className="p-2 rounded-lg border border-gray-200 hover:border-indigo-400 hover:text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <FaChevronLeft className="w-4 h-4" />
                  </button>

                  {[...Array(pagination.totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    const isCurrent = pageNumber === pagination.currentPage;
                    const isNear = Math.abs(pageNumber - pagination.currentPage) <= 2;
                    const isFirstOrLast =
                      pageNumber === 1 || pageNumber === pagination.totalPages;

                    if (isNear || isFirstOrLast) {
                      return (
                        <button
                          key={index}
                          onClick={() => handlePageChange(pageNumber)}
                          className={`px-4 py-2 rounded-lg font-medium transition-all ${
                            isCurrent
                              ? 'bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                              : 'hover:bg-gray-100 text-gray-600 hover:text-indigo-600'
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    }
                    if (
                      pageNumber === pagination.currentPage - 3 ||
                      pageNumber === pagination.currentPage + 3
                    ) {
                      return (
                        <span key={index} className="px-2 py-2 text-gray-400">
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}

                  <button
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={!pagination.hasNextPage}
                    className="p-2 rounded-lg border border-gray-200 hover:border-indigo-400 hover:text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <FaChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* ============================================
          SIDE DRAWER - Create Tenant
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
                <FaPlus className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Create New Tenant
                </h2>
                <p className="text-sm text-gray-500">
                  Fill in tenant details below
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
              onSubmit={handleCreateTenant}
              onCancel={() => setIsDrawerOpen(false)}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default TenantsList;