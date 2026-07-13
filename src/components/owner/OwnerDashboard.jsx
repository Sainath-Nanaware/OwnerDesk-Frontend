// pages/OwnerDashboard.jsx
import React, { useState, useEffect } from 'react';
import { 
  FaBuilding, 
  FaMoneyBillWave, 
  FaPlus,
  FaSearch,
  FaTimes,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';
import { FaBed } from 'react-icons/fa';
import StatsCard from '../cards/StatsCard';
import PropertyCard from '../cards/PropertyCard';
import PropertyForm from '../forms/PropertyForm';
import DeleteModal from '../popups/DeleteModal';
import { addNewPropertyAsyncThunk, getAllPropertyAsyncThunk, searchPropertyAsyncThunk, updatePropertyAsyncThunk } from '../../features/property/propertySlice';
import { getUserID } from '../../features/auth/authService';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { addNewProperty } from '../../api/apiRequests';

// ============================================
// OWNER DASHBOARD COMPONENT
// ============================================
const OwnerDashboard = () => {
  const dispatch=useDispatch()
  const propertyStore=useSelector((state)=>state.property)
  // ============================================
  // STATE MANAGEMENT
  // ============================================
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ============================================
  // PAGINATION STATE - Matches API response
  // ============================================
  const [pagination, setPagination] = useState({
    totalRecords: 0,
    currentPage: 1,
    totalPages: 1,
    pageSize: 5,
    hasNextPage: false,
    hasPreviousPage: false
  });

  // ============================================
  // API BASE URL - Update with your backend URL
  // ============================================
  // const API_BASE_URL = 'https://your-api.com/api'; // CHANGE THIS

  // ============================================
  // FETCH PROPERTIES WITH PAGINATION
  // ============================================
  //when resux store data update the we set data because store need time to store data and then react rerender component
  useEffect(()=>{
    console.log("updated store data",propertyStore);
    setProperties(propertyStore.properties);
    setPagination({
          totalRecords: propertyStore.pagination.totalRecords,
          currentPage: propertyStore.pagination.currentPage,
          totalPages: propertyStore.pagination.totalPages,
          pageSize: propertyStore.pagination.pageSize,
          hasNextPage: propertyStore.pagination.hasNextPage,
          hasPreviousPage: propertyStore.pagination.hasPreviousPage
    });
    
  },[propertyStore])

  const fetchProperties = async (page = 1, city = '') => {
    setLoading(true);
    
    try {
      /**
       * ============================================
       * API CALL - Fetch properties with pagination
       * ============================================
       * Endpoint: GET /api/properties
       * Query Params: page, city (optional), pageSize
       * 
       * Response Structure:
       * {
       *   "success": true,
       *   "message": "Properties fetched successfully.",
       *   "data": {
       *     "properties": [...],
       *     "pagination": {
       *       "totalRecords": 1,
       *       "currentPage": 1,
       *       "totalPages": 1,
       *       "pageSize": 5,
       *       "hasNextPage": false,
       *       "hasPreviousPage": false
       *     }
       *   }
       * }
       */
      
      // Build query parameters
      // const params = new URLSearchParams();
      // params.append('page', page);
      // params.append('pageSize', 5); // You can adjust this
      // params.append('ownerID',getUserID)
      // if (city) {
      //   params.append('city', city);
      // }
      //create data need to send call api
      const credential={
        ownerID:getUserID(),
        page:page,
        limit:6,
      }
      console.log("we now call api");
      
      // Make API call
      const resultAction = await dispatch(getAllPropertyAsyncThunk(credential)) 
      if (getAllPropertyAsyncThunk.fulfilled.match(resultAction)){
         // Update properties
        // setProperties(propertyStore.properties);
        console.log("API call succesfully:getAllProperties");        
        
        // Update pagination state
        // setPagination({
        //   totalRecords: result.data.pagination.totalRecords,
        //   currentPage: result.data.pagination.currentPage,
        //   totalPages: result.data.pagination.totalPages,
        //   pageSize: result.data.pagination.pageSize,
        //   hasNextPage: result.data.pagination.hasNextPage,
        //   hasPreviousPage: result.data.pagination.hasPreviousPage
        // });

      }else {
        console.error("failed to get all propeties data:", resultAction.payload);
        toast.error('Error fetching properties. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast.error('Error fetching properties. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // SEARCH PROPERTIES BY CITY
  // ============================================
  const searchProperties = async (city, page = 1) => {
    setLoading(true);
    
    try {
      /**
       * ============================================
       * API CALL - Search properties by city
       * ============================================
       * Endpoint: GET /api/properties
       * Query Params: page, city, pageSize
       * 
       * Same response structure as fetchProperties
       */
      
      // const params = new URLSearchParams();
      // params.append('page', page);
      // params.append('pageSize', 5);
      // if (city.trim()) {
      //   params.append('city', city.trim());
      // }
      const credentials={
        ownerID:getUserID(),
        city:city.trim(),
        page:page,
        limit:6
      }
      const resultActionSearchProperty=await dispatch(searchPropertyAsyncThunk(credentials))
       if (searchPropertyAsyncThunk.fulfilled.match(resultActionSearchProperty)){
         console.log("search property data recived successfully")
       
      //set state when redux data change we already handle that logic using use effect  
      // const response = await fetch(`${API_BASE_URL}/properties?${params.toString()}`);
      // const result = await response.json();

      // if (result.success) {
      //   setProperties(result.data.properties);
      //   setPagination({
      //     totalRecords: result.data.pagination.totalRecords,
      //     currentPage: result.data.pagination.currentPage,
      //     totalPages: result.data.pagination.totalPages,
      //     pageSize: result.data.pagination.pageSize,
      //     hasNextPage: result.data.pagination.hasNextPage,
      //     hasPreviousPage: result.data.pagination.hasPreviousPage
      //   });
      } else {
        toast.error('Error searching properties. Please try again.');
        console.log("failed get serch property data");
      }
    } catch (error) {
      toast.error('Error searching properties. Please try again.');
      console.log("failed get serch property data");
      // alert('Error searching properties. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // INITIAL LOAD - Fetch properties on mount
  // ============================================
  useEffect(() => {
    fetchProperties(1);
  }, []);

  // ============================================
  // HANDLE SEARCH SUBMIT
  // ============================================
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Search by city
      searchProperties(searchTerm, 1);
    } else {
      // If search is empty, fetch all properties
      fetchProperties(1);
    }
  };

  // ============================================
  // HANDLE SEARCH CLEAR
  // ============================================
  const handleClearSearch = () => {
    setSearchTerm('');
    fetchProperties(1);
  };

  // ============================================
  // HANDLE PAGE CHANGE
  // ============================================
  const handlePageChange = (newPage) => {
    if (searchTerm.trim()) {
      // If we're in search mode, search with new page
      searchProperties(searchTerm, newPage);
    } else {
      // Otherwise fetch all properties with new page
      fetchProperties(newPage);
    }
  };

  // ============================================
  // HANDLE PROPERTY CLICK - Navigate to rooms
  // ============================================
  const handlePropertyClick = (propertyId) => {
    /**
     * ============================================
     * NAVIGATE TO PROPERTY ROOMS
     * ============================================
     * Update this with your actual navigation logic
     */
    console.log('Navigate to property rooms:', propertyId);
    // window.location.href = `/property/${propertyId}/rooms`;
    alert(`📋 Navigate to Property #${propertyId} Rooms Dashboard`);
  };

  // ============================================
  // OPEN DRAWER FOR ADD/EDIT
  // ============================================
  const openDrawer = (property = null) => {
    if (property) {
      setIsEditing(true);
      setSelectedProperty(property);
      // console.log("investigate",property)
    } else {
      setIsEditing(false);
      setSelectedProperty(null);
    }
    setIsDrawerOpen(true);
  };

  // ============================================
  // CLOSE DRAWER
  // ============================================
  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedProperty(null);
  };

  // ============================================
  // HANDLE FORM SUBMIT - Add/Edit Property
  // ============================================
  const handleFormSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      if (isEditing && selectedProperty) {
        /**
         * ============================================
         * API CALL - Update property
         * ============================================
         * Endpoint: PUT /api/properties/:id
         * Body: property data
         */
       const credentials={
        data:data,
        propertyID:selectedProperty._id
       }
       const resultActionUpdateProperty=await dispatch(updatePropertyAsyncThunk(credentials))
       if (updatePropertyAsyncThunk.fulfilled.match(resultActionUpdateProperty)){
          toast.success("Property updated successfully!")
          closeDrawer();
           // Refresh the current page data
          if (searchTerm.trim()) {
            searchProperties(searchTerm, pagination.currentPage);
          } else {
            fetchProperties(pagination.currentPage);
          }
       } else {
          toast.error('❌ Failed to update property: ');
          console.log("failed update property")
        }
      } else {
        /**
         * ============================================
         * API CALL - Add new property
         * ============================================
         * Endpoint: POST /api/properties
         * Body: property data
         */
        const resultActionAddProperty=await dispatch(addNewPropertyAsyncThunk(data))
        console.log(resultActionAddProperty)
        if (addNewPropertyAsyncThunk.fulfilled.match(resultActionAddProperty)){
  
           toast.success('Property added successfully!');
           closeDrawer();
          //  reset(); // Clear the form
           console.log("new peoperty added")
          // Refresh the current page data
          if (searchTerm.trim()) {
            searchProperties(searchTerm, pagination.currentPage);
          } else {
            fetchProperties(pagination.currentPage);
          }
        }else {
         console.error("add new property failed:", resultActionAddProperty.payload);
         toast.error('❌ Failed to add property')
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // alert('❌ Error: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ============================================
  // CONFIRM DELETE
  // ============================================
  const confirmDelete = (property) => {
    setPropertyToDelete(property);
    setShowDeleteModal(true);
  };

  // ============================================
  // HANDLE DELETE PROPERTY
  // ============================================
  const handleDelete = async () => {
    try {
      /**
       * ============================================
       * API CALL - Delete property
       * ============================================
       * Endpoint: DELETE /api/properties/:id
       * Only needs property ID
       */
      const response = await fetch(`${API_BASE_URL}/properties/${propertyToDelete._id}`, {
        method: 'DELETE',
      });
      const result = await response.json();

      if (result.success) {
        alert(`🗑️ Property "${propertyToDelete.propertyName}" deleted successfully!`);
        setShowDeleteModal(false);
        setPropertyToDelete(null);
        
        // Refresh the current page data
        if (searchTerm.trim()) {
          searchProperties(searchTerm, pagination.currentPage);
        } else {
          fetchProperties(pagination.currentPage);
        }
      } else {
        alert('❌ Failed to delete property: ' + result.message);
      }
    } catch (error) {
      console.error('Error deleting property:', error);
      alert('❌ Error: ' + error.message);
    }
  };

  // ============================================
  // CALCULATE STATS FROM API DATA
  // ============================================
  // const totalProperties = pagination.totalRecords || 0;
  // const totalRooms = properties.reduce((acc, p) => acc + p.totalRooms, 0);
  // const totalRevenue = properties.reduce((acc, p) => acc + (p.occupiedRooms || 0) * 10000, 0);

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* ===== HEADER ===== */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500">Manage all your properties from one place</p>
          </div>
          <button 
            onClick={() => openDrawer()}
            className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-indigo-500/25 hover:scale-105 transition-all duration-300"
          >
            <FaPlus className="w-4 h-4" />
            Add New Property
          </button>
        </div>

        {/* ===== STATS CARDS ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatsCard 
            label="Total Properties"
            value={pagination.totalRecords}
            icon={<FaBuilding className="w-6 h-6" />}
            bgColor="bg-blue-50"
            textColor="text-blue-600"
          />
          {/* <StatsCard 
            label="Total Rooms"
            value={totalRooms}
            icon={<FaBed className="w-6 h-6" />}
            bgColor="bg-green-50"
            textColor="text-green-600"
          />
          <StatsCard 
            label="Monthly Revenue"
            value={`₹${totalRevenue.toLocaleString()}`}
            icon={<FaMoneyBillWave className="w-6 h-6" />}
            bgColor="bg-orange-50"
            textColor="text-orange-600"
          /> */}
        </div>

        {/* ===== SEARCH ===== */}
        <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100 mb-6">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search properties by City..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all"
            >
              Search
            </button>
          </form>
        </div>

        {/* ===== PROPERTY CARDS ===== */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>
              <p className="text-gray-500 mt-4">Loading properties...</p>
            </div>
          </div>
        ) : properties.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-gray-100">
            <FaBuilding className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchTerm ? 'No Properties Found in this City' : 'No Properties Found'}
            </h3>
            <p className="text-gray-500">
              {searchTerm 
                ? `No properties found in "${searchTerm}". Try a different city.`
                : 'Get started by adding your first property'}
            </p>
            {!searchTerm && (
              <button 
                onClick={() => openDrawer()}
                className="mt-4 px-6 py-2.5 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Add Property
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Property Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard 
                  key={property._id}
                  property={property}
                  onClick={handlePropertyClick}
                  onEdit={openDrawer}
                  onDelete={confirmDelete}
                />
              ))}
            </div>

            {/* ===== PAGINATION ===== */}
            {pagination.totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between mt-8 bg-white rounded-2xl shadow-sm px-4 py-3 border border-gray-100 gap-3">
                <div className="text-sm text-gray-500">
                  Showing {properties.length} of {pagination.totalRecords} properties
                  {searchTerm && ` (filtered by "${searchTerm}")`}
                </div>
                <div className="flex gap-1">
                  {/* Previous Page Button */}
                  <button
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={!pagination.hasPreviousPage}
                    className="p-2 rounded-lg border border-gray-200 hover:border-indigo-400 hover:text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <FaChevronLeft className="w-4 h-4" />
                  </button>
                  
                  {/* Page Numbers */}
                  {[...Array(pagination.totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    // Show limited page numbers with ellipsis for better UX
                    const isCurrentPage = pageNumber === pagination.currentPage;
                    const isNearCurrent = Math.abs(pageNumber - pagination.currentPage) <= 2;
                    const isFirstOrLast = pageNumber === 1 || pageNumber === pagination.totalPages;
                    
                    if (isNearCurrent || isFirstOrLast) {
                      return (
                        <button
                          key={index}
                          onClick={() => handlePageChange(pageNumber)}
                          className={`px-4 py-2 rounded-lg font-medium transition-all ${
                            isCurrentPage
                              ? 'bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                              : 'hover:bg-gray-100 text-gray-600 hover:text-indigo-600'
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    }
                    
                    // Show ellipsis for gaps
                    if (pageNumber === pagination.currentPage - 3 || pageNumber === pagination.currentPage + 3) {
                      return <span key={index} className="px-2 py-2 text-gray-400">...</span>;
                    }
                    
                    return null;
                  })}
                  
                  {/* Next Page Button */}
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
          SIDE DRAWER - Add/Edit Property
          ============================================ */}
      <div className={`
        fixed inset-0 z-50 transition-all duration-500
        ${isDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
      `}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={closeDrawer}
        />

        {/* Drawer */}
        <div className={`
          absolute right-0 top-0 h-full w-full max-w-2xl bg-white shadow-2xl transform transition-all duration-500
          ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}
        `}>
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-linear-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                {isEditing ? (
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                ) : (
                  <FaPlus className="w-5 h-5 text-white" />
                )}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {isEditing ? 'Edit Property' : 'Add New Property'}
                </h2>
                <p className="text-sm text-gray-500">
                  {isEditing ? 'Update your property details' : 'Fill in the details to add a new property'}
                </p>
              </div>
            </div>
            <button
              onClick={closeDrawer}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <FaTimes className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="p-6 overflow-y-auto h-[calc(100%-80px)]">
            <PropertyForm 
              initialData={selectedProperty}
              onSubmit={handleFormSubmit}
              onCancel={closeDrawer}
              isEditing={isEditing}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </div>

      {/* ============================================
          DELETE CONFIRMATION MODAL
          ============================================ */}
      <DeleteModal 
        isOpen={showDeleteModal}
        property={propertyToDelete}
        onConfirm={handleDelete}
        onCancel={() => {
          setShowDeleteModal(false);
          setPropertyToDelete(null);
        }}
      />
    </div>
  );
};

export default OwnerDashboard;