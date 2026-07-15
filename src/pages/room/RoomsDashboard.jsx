// pages/RoomsDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  FaBed, 
  FaUsers, 
  FaMoneyBillWave, 
  FaDoorOpen,
  FaPlus,
  FaTimes
} from 'react-icons/fa';
import RoomStatsCard from '../../components/cards/RoomStatsCard';
import RoomCard from '../../components/cards/RoomCard';
import RoomForm from '../../components/forms/RoomForm';
import RoomFilter from '../../components/room/RoomFilter';
import { ROOM_TYPES } from '../../validations/roomValidation';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRoomsOfPropertyAsyncThunk } from '../../features/room/roomSlice';
import { toast } from 'react-toastify';
import Header from '../../components/layouts/Header';

// ============================================
// ROOMS DASHBOARD COMPONENT
// ============================================
const RoomsDashboard = () => {
  const dispatch=useDispatch()
  const roomStore=useSelector((state)=>state.room)
  // ============================================
  // GET PROPERTY ID FROM URL
  // ============================================
  const { propertyId } = useParams(); // e.g., /property/:propertyId/rooms

  // ============================================
  // STATE MANAGEMENT
  // ============================================
  const [rooms, setRooms] = useState([]);
  const [propertyName, setPropertyName] = useState('');
  const [loading, setLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ============================================
  // FILTER STATE
  // ============================================
  const [filters, setFilters] = useState({
    roomNumber: '',
    roomType: '',
    floor: '',
    isOccupied: '',
  });

  // ============================================
  // PAGINATION STATE
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
  // API BASE URL
  // ============================================
//   const API_BASE_URL = 'https://your-api.com/api'; // CHANGE THIS

//update store data required time so we handle store updated data uding useEffect
  useEffect(()=>{
    console.log("updated property rooms data on room store",roomStore);
    setPropertyName(roomStore.propertyInfo.propertyName || 'Property');
    setRooms(roomStore.allRooms);
    setPagination({
          totalRecords: roomStore.pagination.totalRecords,
          currentPage: roomStore.pagination.currentPage,
          totalPages: roomStore.pagination.totalPages,
          pageSize: roomStore.pagination.pageSize,
          hasNextPage: roomStore.pagination.hasNextPage,
          hasPreviousPage: roomStore.pagination.hasPreviousPage
    });
    console.log("set Rooms bhau:",roomStore.allRooms)
    
  },[roomStore])

  // ============================================
  // FETCH ROOMS WITH PAGINATION & FILTERS
  // ============================================
  const fetchRooms = async (page = 1, filterParams = {}) => {
    setLoading(true);
    
    try {
      /**
       * ============================================
       * API CALL - Fetch rooms with pagination and filters
       * ============================================
       * Endpoint: GET /api/properties/:propertyId/rooms
       * Query Params: page, pageSize, roomNumber, roomType, floor, isOccupied
       * 
       * Response Structure:
       * {
       *   "success": true,
       *   "data": {
       *     "rooms": [...],
       *     "propertyName": "Sunshine PG",
       *     "pagination": {
       *       "totalRecords": 10,
       *       "currentPage": 1,
       *       "totalPages": 2,
       *       "pageSize": 5,
       *       "hasNextPage": true,
       *       "hasPreviousPage": false
       *     }
       *   }
       * }
       */
      
      // Build query parameters
      const params = new URLSearchParams();
      params.append('page', page);
      params.append('limit', 6);
      
      // Add filters if they exist
      if (filterParams.roomNumber) {
        params.append('roomNumber', filterParams.roomNumber);
      }
      if (filterParams.roomType) {
        params.append('roomType', filterParams.roomType);
      }
      if (filterParams.floor) {
        params.append('floor', filterParams.floor);
      }
      if (filterParams.isOccupied && filterParams.isOccupied !== 'all') {
        params.append('isOccupied', filterParams.isOccupied === 'occupied' ? 'true' : 'false');
      }
      //create object of credentials to pass usyncThunk 
      const credentials={
        propertyId:propertyId,
        params:params.toString()
      }
      const resultActionGetAllRoomsOfProperty=await dispatch(getAllRoomsOfPropertyAsyncThunk(credentials))
      // Make API call
    //   const response = await fetch(
    //     `${API_BASE_URL}/properties/${propertyId}/rooms?${params.toString()}`
    //   );
    //   const result = await response.json();
      if (getAllRoomsOfPropertyAsyncThunk.fulfilled.match(resultActionGetAllRoomsOfProperty)){
        console.log("we get all room of property")
        //update store data required time so we handle store updated data uding useEffect in above that function
    
        //   if (result.success) {
        //     setRooms(result.data.rooms);
        //     setPropertyName(result.data.propertyName || 'Property');
        //     setPagination({
        //       totalRecords: result.data.pagination.totalRecords,
        //       currentPage: result.data.pagination.currentPage,
        //       totalPages: result.data.pagination.totalPages,
        //       pageSize: result.data.pagination.pageSize,
        //       hasNextPage: result.data.pagination.hasNextPage,
        //       hasPreviousPage: result.data.pagination.hasPreviousPage
        //     });

      } else {
        // alert('Failed to fetch rooms: ' + result.message);
        console.log("Failed to fetch rooms information please try again!");
        toast.error("Failed to fetch rooms information please try again!")
      }
    } catch (error) {
      console.error('Error fetching rooms:', error);
    //   alert('Error fetching rooms. Please try again.');
      toast.error("Failed to fetch rooms information please try again!")
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // INITIAL LOAD - Fetch rooms on mount
  // ============================================
  useEffect(() => {
    if (propertyId) {
      fetchRooms(1);
    }
  }, [propertyId]);

  // ============================================
  // HANDLE SEARCH WITH FILTERS
  // ============================================
  const handleSearch = () => {
    fetchRooms(1, filters);
  };

  // ============================================
  // HANDLE CLEAR FILTERS
  // ============================================
  const handleClearFilters = () => {
    setFilters({
      roomNumber: '',
      roomType: '',
      floor: '',
      isOccupied: '',
    });
    fetchRooms(1, {});
  };

  // ============================================
  // HANDLE FILTER CHANGE
  // ============================================
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // ============================================
  // HANDLE PAGE CHANGE
  // ============================================
  const handlePageChange = (newPage) => {
    fetchRooms(newPage, filters);
  };

  // ============================================
  // HANDLE CREATE ROOM
  // ============================================
  const handleCreateRoom = async (data) => {
    setIsSubmitting(true);
    
    try {
      /**
       * ============================================
       * API CALL - Create new room
       * ============================================
       * Endpoint: POST /api/properties/:propertyId/rooms
       * Body: room data
       */
      const response = await fetch(`${API_BASE_URL}/properties/${propertyId}/rooms`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (result.success) {
        alert('✅ Room created successfully!');
        setIsDrawerOpen(false);
        fetchRooms(pagination.currentPage, filters);
      } else {
        alert('❌ Failed to create room: ' + result.message);
      }
    } catch (error) {
      console.error('Error creating room:', error);
      alert('❌ Error: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ============================================
  // CALCULATE STATS
  // ============================================
  const totalRooms = pagination.totalRecords || 0;
  const occupiedRooms = rooms.filter(r => r.isOccupied).length;
  const vacantRooms = totalRooms - occupiedRooms;
  const totalRevenue = rooms.reduce((acc, r) => acc + (r.isOccupied ? r.monthlyRent || 0 : 0), 0);

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
          <div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => window.history.back()}
                className="p-2 hover:bg-gray-200 rounded-xl transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{propertyName}</h1>
                <p className="text-gray-500">Manage all rooms for this property</p>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-indigo-500/25 hover:scale-105 transition-all duration-300"
          >
            <FaPlus className="w-4 h-4" />
            Add New Room
          </button>
        </div>

        {/* ===== STATS CARDS ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <RoomStatsCard 
            label="Total Rooms"
            value={totalRooms}
            icon={<FaBed className="w-6 h-6" />}
            bgColor="bg-blue-50"
            textColor="text-blue-600"
          />
          <RoomStatsCard 
            label="Occupied Rooms"
            value={occupiedRooms}
            icon={<FaUsers className="w-6 h-6" />}
            bgColor="bg-green-50"
            textColor="text-green-600"
          />
          <RoomStatsCard 
            label="Vacant Rooms"
            value={vacantRooms}
            icon={<FaDoorOpen className="w-6 h-6" />}
            bgColor="bg-yellow-50"
            textColor="text-yellow-600"
          />
          <RoomStatsCard 
            label="Monthly Revenue"
            value={`₹${totalRevenue.toLocaleString()}`}
            icon={<FaMoneyBillWave className="w-6 h-6" />}
            bgColor="bg-orange-50"
            textColor="text-orange-600"
          />
        </div>

        {/* ===== FILTER ===== */}
        <RoomFilter 
          filters={filters}
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
          onClear={handleClearFilters}
        />

        {/* ===== ROOM CARDS ===== */}
        {loading ? (
          <div className="flex items-center justify-center h-64 mt-6">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>
              <p className="text-gray-500 mt-4">Loading rooms...</p>
            </div>
          </div>
        ) : rooms.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-gray-100 mt-6">
            <FaBed className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {Object.values(filters).some(f => f) ? 'No Rooms Found' : 'No Rooms Added Yet'}
            </h3>
            <p className="text-gray-500">
              {Object.values(filters).some(f => f) 
                ? 'Try adjusting your search filters'
                : 'Start by adding your first room'}
            </p>
            {!Object.values(filters).some(f => f) && (
              <button 
                onClick={() => setIsDrawerOpen(true)}
                className="mt-4 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Add Room
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Room Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
              {rooms.map((room) => {
                /**
                 * ============================================
                 * RENT STATUS LOGIC - Customize based on your data
                 * ============================================
                 * This determines the card color based on payment status
                 * Replace with actual payment data from your API
                 */
                let rentStatus = 'unpaid'; // default
                
                // Example logic - replace with actual payment status
                if (room.paymentStatus === 'paid') {
                  rentStatus = 'paid';
                } else if (room.paymentStatus === 'partial') {
                  rentStatus = 'partial';
                }
                
                return (
                  <RoomCard 
                    key={room._id}
                    room={room}
                    rentStatus={rentStatus}
                  />
                );
              })}
            </div>

            {/* ===== PAGINATION ===== */}
            {pagination.totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between mt-8 bg-white rounded-2xl shadow-sm px-4 py-3 border border-gray-100 gap-3">
                <div className="text-sm text-gray-500">
                  Showing {rooms.length} of {pagination.totalRecords} rooms
                  {Object.values(filters).some(f => f) && ' (filtered)'}
                </div>
                <div className="flex gap-1">
                  {/* Previous Page */}
                  <button
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={!pagination.hasPreviousPage}
                    className="p-2 rounded-lg border border-gray-200 hover:border-indigo-400 hover:text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  {/* Page Numbers */}
                  {[...Array(pagination.totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
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
                              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                              : 'hover:bg-gray-100 text-gray-600 hover:text-indigo-600'
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    }
                    
                    if (pageNumber === pagination.currentPage - 3 || pageNumber === pagination.currentPage + 3) {
                      return <span key={index} className="px-2 py-2 text-gray-400">...</span>;
                    }
                    
                    return null;
                  })}
                  
                  {/* Next Page */}
                  <button
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={!pagination.hasNextPage}
                    className="p-2 rounded-lg border border-gray-200 hover:border-indigo-400 hover:text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* ============================================
          SIDE DRAWER - Create Room
          ============================================ */}
      <div className={`
        fixed inset-0 z-50 transition-all duration-500
        ${isDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
      `}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsDrawerOpen(false)}
        />

        {/* Drawer */}
        <div className={`
          absolute right-0 top-0 h-full w-full max-w-2xl bg-white shadow-2xl transform transition-all duration-500
          ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}
        `}>
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                <FaPlus className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Add New Room</h2>
                <p className="text-sm text-gray-500">Create a new room for {propertyName}</p>
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
            <RoomForm 
              onSubmit={handleCreateRoom}
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

export default RoomsDashboard;