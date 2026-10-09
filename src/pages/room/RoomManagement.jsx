// pages/RoomManagement.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MonthYearFilter from '../../components/room-management/MonthYearFilter';
import RoomInfoSection from '../../components/room-management/RoomInfoSection';
import PaymentSection from '../../components/room-management/PaymentSection';
import RemarksSection from '../../components/room-management/RemarksSection';
import { MONTHS, getYears } from '../../validations/roomManagementValidation';
import { useDispatch, useSelector } from 'react-redux';
import { getUserID } from '../../features/auth/authService';
import { allocateRoomAsyncThunk, deallocateRoomAsyncThunk, deleteAdditionalChargeAsyncThunk, getRoomInfoAsyncThunk, updateAdditionalChargeAsyncThunk, updateElectricityBillAsyncThunk, updateRoomInfoAsyncThunk, updateRoomRemarksAsyncThunk } from '../../features/roomManagement/roomManagementSlice';
import { toast } from 'react-toastify';
import Header from '../../components/layouts/Header';

// ============================================
// ROOM MANAGEMENT PAGE
// ============================================
const RoomManagement = () => {

  const dispatch=useDispatch()
  const roomManagementStore=useSelector((state)=>state.roomManagement)

  // ============================================
  // GET ROOM ID FROM URL
  // ============================================
  const { roomId } = useParams();

  // ============================================
  // STATE MANAGEMENT
  // ============================================
  const [loading, setLoading] = useState(true);
  const [roomData, setRoomData] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  const [electricityBill,setElectricityBillData]=useState(null)
  const [additionalPayments, setAdditionalPayments] = useState([]);
  const [remarks, setRemarks] = useState('');
  
  // Filter state
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // ============================================
  // API BASE URL
  // ============================================
  //   const API_BASE_URL = 'https://your-api.com/api'; // CHANGE THIS

  //Display live changing data from store using useEffect
   useEffect(()=>{
        setRoomData(roomManagementStore.roomInfo);
        setPaymentData(roomManagementStore.paymentStatus);
        setElectricityBillData(roomManagementStore.electricityBill)
        console.log("payment status info:",roomManagementStore.paymentStatus)
        setAdditionalPayments(roomManagementStore.paymentStatus.charges || []);
        setRemarks(roomManagementStore.roomInfo.remarks || '');
   },[roomManagementStore])

  // ============================================
  // FETCH ALL ROOM DATA
  // ============================================
  const fetchRoomData = async (month, year) => {
    setLoading(true);
    
    try {
      /**
       * ============================================
       * API CALL - Fetch complete room data
       * ============================================
       * Endpoint: GET /api/rooms/:roomId?month=:month&year=:year
       * Response: {
       *   success: true,
       *   data: {
       *     roomInfo: { ... },
       *     paymentInfo: { ... },
       *     additionalPayments: [...],
       *     remarks: "..."
       *   }
       * }
       */
    //   const response = await fetch(
    //     `${API_BASE_URL}/rooms/${roomId}?month=${month}&year=${year}`
    //   );
    //   const result = await response.json();

    //create object of credentials to pass usyncThunk 
      const credentials={
        roomID:roomId.toString(),
        ownerID:getUserID(),
        month:month,
        year:year
      }
      const resultActionGetRoomInfo=await dispatch(getRoomInfoAsyncThunk(credentials))
      if (getRoomInfoAsyncThunk.fulfilled.match(resultActionGetRoomInfo)){
        console.log("we get all room info")
        // setRoomData(result.data.roomInfo);
        // setPaymentData(result.data.paymentInfo);
        // setAdditionalPayments(result.data.additionalPayments || []);
        // setRemarks(result.data.remarks || '');

      } else {
        toast.error('Failed to fetch room data, please try again!');
        // alert('Failed to fetch room data: ' + result.message);
      }
    } catch (error) {
      console.error('Error fetching room data:', error);
      toast.error('Failed to fetch room data, please try again!');
    //   alert('Error fetching room data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // INITIAL LOAD
  // ============================================
  useEffect(() => {
    if (roomId) {
      fetchRoomData(selectedMonth, selectedYear);
    }
  }, [roomId]);

  // ============================================
  // HANDLE FILTER APPLY
  // ============================================
  const handleApplyFilter = () => {
    fetchRoomData(selectedMonth, selectedYear);
  };

  // ============================================
  // HANDLE UPDATE ROOM INFO
  // ============================================
  const handleUpdateRoomInfo = async (data) => {
    /**
     * ============================================
     * API CALL - Update room info
     * ============================================
     * Endpoint: PUT /api/rooms/:roomId
     * Body: room data
     * 
     *  const response = await fetch(`${API_BASE_URL}/rooms/${roomId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
     */
    data.ownerId=getUserID();
    data.propertyId=roomManagementStore.propertyInfo._id;
    data.isDeleted= false;//important to add 
    const credentials={
      data:data,
      roomID:roomId
    }
    const resultActionUpdateRoomInfo=await dispatch(updateRoomInfoAsyncThunk(credentials))
      if (updateRoomInfoAsyncThunk.fulfilled.match(resultActionUpdateRoomInfo)){
        // setRoomData(result.data);
        // alert('✅ Room information updated successfully!');
        toast.success("Room information updated successfully!")
      
      } else {
        // toast.error(`${roomManagementStore.error}`)
        // Get error message directly from the action payload
        const errorMessage = 
          resultActionUpdateRoomInfo.payload||  
          "Failed to update room information.";
        toast.error(errorMessage);

      // throw new Error(result.message);
    
    }
  };

  // ============================================
  // HANDLE ALLOCATE TENANT
  // ============================================
  const handleAllocateTenant = async (tenant) => {
    /**
     * ============================================
     * API CALL - Allocate tenant to room
     * ============================================
     * Endpoint: POST /api/rooms/:roomId/allocate
     * Body: { tenantId: tenant._id }
     */
    // const response = await fetch(`${API_BASE_URL}/rooms/${roomId}/allocate`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ tenantId: tenant._id }),
    // });
    // const result = await response.json();
 
    const credentials={
      ownerId:getUserID(),
      propertyId:roomManagementStore.propertyInfo._id,
      roomId:roomId,
      tenantId: tenant._id,
    }

    const resultActionAllocateRoom=await dispatch(allocateRoomAsyncThunk(credentials))
      if (allocateRoomAsyncThunk.fulfilled.match(resultActionAllocateRoom)){
        toast.success(`Tenant "${tenant.fullName}" allocated successfully!`)
        window.location.reload();//for re-load page 

        // alert(`✅ Tenant "${tenant.name}" allocated successfully!`);
      } else {
       const errorMessage = 
          resultActionAllocateRoom.payload||  
          "Failed to allocate room.";
        toast.error(errorMessage);
      }
  };

  // ============================================
  // HANDLE DEALLOCATE TENANT
  // ============================================
  const handleDeallocateTenant = async () => {
    /**
     * ============================================
     * API CALL - Deallocate tenant from room
     * ============================================
     * Endpoint: POST /api/rooms/:roomId/deallocate
     */
    // const response = await fetch(`${API_BASE_URL}/rooms/${roomId}/deallocate`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    // });
    // const result = await response.json();
    const credentials={
      ownerId:getUserID(),
      propertyId:roomManagementStore.propertyInfo._id,
      roomId:roomId,
      // tenantId: tenant._id,
    }
    const resultActionDeAllocateRoom=await dispatch(deallocateRoomAsyncThunk(credentials))
      if (deallocateRoomAsyncThunk.fulfilled.match(resultActionDeAllocateRoom)){
      // setRoomData(result.data.roomInfo);
      toast.success('Tenant deallocated successfully!');
      window.location.reload();//for re-load page 

    } else {
       const errorMessage = 
          resultActionDeAllocateRoom.payload||  
          "Failed to deAllocate room.";
        toast.error(errorMessage);
    }
  };

  // ============================================
  // HANDLE UPDATE ELECTRICITY BILL
  // ============================================
  const handleUpdateElectricity = async (data) => {
    /**
     * ============================================
     * API CALL - Update electricity bill
     * ============================================
     * Endpoint: PUT /api/rooms/:roomId/electricity
     * Body: electricity data
     */
    //   const response = await fetch(`${API_BASE_URL}/rooms/${roomId}/electricity`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // });
    // const result = await response.json();
    // console.log("electricity form data:",data)
    const credentials={
      ownerId:getUserID(),
      propertyId:roomManagementStore.propertyInfo._id,
      roomId:roomId,
      tenantId: roomManagementStore.tenantInfo._id || null,
      month:selectedMonth,
      year:selectedYear,
      previousReading:data.previousReading || 0,
      currentReading:data.currentReading ||0,
      rate:data.ratePerUnit||0,
      charges:[
        {
            type: "Electricity",
            amount:((data.currentReading || 0) - (data.previousReading || 0)) * (data).ratePerUnit || 0,
            paidAmount:data.paidAmount ||0,
            paidDate:data.paymentDate || 'N/A'
        }
      ]
    }
    const resultActionUpdateElectricityBill=await dispatch(updateElectricityBillAsyncThunk(credentials))
      if (updateElectricityBillAsyncThunk.fulfilled.match(resultActionUpdateElectricityBill)){
          // setPaymentData(result.data);
          toast.success('Electricity bill updated successfully!');
          window.location.reload();//for re-load page 

    } else {
      const errorMessage = 
          updateElectricityBillAsyncThunk.payload||  
          "Failed to update ElectrcityBill.";
        toast.error(errorMessage);
    }
  };

  // ============================================
  // HANDLE ADD ADDITIONAL PAYMENT
  // ============================================
  const handleAddPayment = async (data) => {
    /**
     * ============================================
     * API CALL - Add additional payment
     * ============================================
     * Endpoint: POST /api/rooms/:roomId/payments
     * Body: payment data
     */
    // const response = await fetch(`${API_BASE_URL}/rooms/${roomId}/payments`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // });
    // const result = await response.json();

    console.log("new added payment data:",data);
    // if (result.success) {
    //   setAdditionalPayments([...additionalPayments, result.data]);
    //   alert('✅ Payment added successfully!');
    // } else {
    //   alert('❌ Failed to add payment: ' + result.message);
    // }
    const cleanedCharges = (roomManagementStore.paymentStatus?.charges || []).map(
           ({ referenceId, referenceModel, ...cleanCharge }) => cleanCharge
         );

    const credentials={
      ownerId:getUserID(),
      propertyId:roomManagementStore.propertyInfo._id,
      roomId:roomId,
      tenantId: roomManagementStore.tenantInfo._id || null,
      month:selectedMonth,
      year:selectedYear,
      previousReading:roomManagementStore.electricityBill?.previousReading || 0,
      currentReading:roomManagementStore.electricityBill?.currentReading ||0,
      rate:roomManagementStore.electricityBill?.rate||0,
      charges:[
        ...cleanedCharges,
        {
        type:data.type,
        amount:data.amount,
        paidAmount:data.paidAmount,
        paidDate:data.paymentDate,
        status:data.status
       }
      ]
    }
    const resultActionUpdatePaymentDetails=await dispatch(updateElectricityBillAsyncThunk(credentials))
      if (updateElectricityBillAsyncThunk.fulfilled.match(resultActionUpdatePaymentDetails)){
          // setPaymentData(result.data);
          toast.success('Payment added successfully!!');
          window.location.reload();//for re-load page 

    } else {
      const errorMessage = 
          resultActionUpdatePaymentDetails.payload||  
          "Failed add new Payment!";
        toast.error(errorMessage);
    }
  };

  // ============================================
  // HANDLE UPDATE ADDITIONAL PAYMENT
  // ============================================
  const handleUpdatePayment = async (paymentId, updates) => {
    /**
     * ============================================
     * API CALL - Update additional payment
     * ============================================
     * Endpoint: PUT /api/rooms/:roomId/payments/:paymentId
     * Body: updates
     */
    // const response = await fetch(`${API_BASE_URL}/rooms/${roomId}/payments/${paymentId}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(updates),
    // });
    // const result = await response.json();

    // if (result.success) {
    //   setAdditionalPayments(
    //     additionalPayments.map(p => p._id === paymentId ? result.data : p)
    //   );
    const credentials={
      paymentStatusId: roomManagementStore.paymentStatus?._id,
      chargeId:paymentId,
      data:updates
    }
    const resultActionUpdateAdditionalCharge=await dispatch(updateAdditionalChargeAsyncThunk(credentials))
      if (updateAdditionalChargeAsyncThunk.fulfilled.match(resultActionUpdateAdditionalCharge)){
          // setPaymentData(result.data);
          toast.success('Payment details update successfully!!');
          window.location.reload();//for re-load page 

      }else {
          toast.error('Failed to update payment details, please try again!:');
      }
  };

  // ============================================
  // HANDLE DELETE ADDITIONAL PAYMENT
  // ============================================
  const handleDeletePayment = async (paymentId) => {
    if (!window.confirm('Are you sure you want to delete this payment?')) return;

    /**
     * ============================================
     * API CALL - Delete additional payment
     * ============================================
     * Endpoint: DELETE /api/rooms/:roomId/payments/:paymentId
     */
    // const response = await fetch(`${API_BASE_URL}/rooms/${roomId}/payments/${paymentId}`, {
    //   method: 'DELETE',
    // });
    // const result = await response.json();

    // if (result.success) {
    //   setAdditionalPayments(additionalPayments.filter(p => p._id !== paymentId));
    //   alert('✅ Payment deleted successfully!');
    // } 
    
    
    const credentials={
      paymentStatusId: roomManagementStore.paymentStatus?._id,
      chargeId:paymentId,
    }
    const resultActionDeleteAdditionalCharge=await dispatch(deleteAdditionalChargeAsyncThunk(credentials))
      if (deleteAdditionalChargeAsyncThunk.fulfilled.match(resultActionDeleteAdditionalCharge)){
          // setPaymentData(result.data);
          toast.success('Payment details deleted successfully!!');
          window.location.reload();//for re-load page 

      }else {
      //  alert('❌ Failed to delete payment: ' + result.message);
      toast.error('Failed to delete payment details, please try again!:');

    }
  };

  // ============================================
  // HANDLE UPDATE REMARKS
  // ============================================
  const handleUpdateRemarks = async (data) => {
    /**
     * ============================================
     * API CALL - Update remarks
     * ============================================
     * Endpoint: PUT /api/rooms/:roomId/remarks
     * Body: { remarks: data.remarks }
     */

    
    // const response = await fetch(`${API_BASE_URL}/rooms/${roomId}/remarks`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // });
    // const result = await response.json();

    // if (result.success) {
    //   setRemarks(data.remarks);
    //   alert('✅ Remarks updated successfully!');
    // } 
    const credentials={
      roomId: roomId,
      remarks:data,
    }
    const resultActionUpdateRoomRemarks=await dispatch(updateRoomRemarksAsyncThunk(credentials))
      if (updateRoomRemarksAsyncThunk.fulfilled.match(resultActionUpdateRoomRemarks)){
          // setPaymentData(result.data);
          toast.success('remarks update successfully!!');
          window.location.reload();//for re-load page 

      }else {
      // throw new Error(result.message);
      toast.error("remarks not updated, please try again!")
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
          <p className="text-gray-500 mt-4">Loading room data...</p>
        </div>
      </div>
    );
  }

  return (
    <>
    <Header isLoggedIn={true} />
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* ===== BACK BUTTON & HEADER ===== */}
        <div className="flex items-center gap-3 mb-6">
          <button 
            onClick={() => window.history.back()}
            className="p-2 hover:bg-gray-200 rounded-xl transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Room Management</h1>
            <p className="text-sm text-gray-500">
              Room #{roomData?.roomNumber} • {roomData?.roomType}
            </p>
          </div>
        </div>

        {/* ===== MONTH & YEAR FILTER ===== */}
        <MonthYearFilter
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          onMonthChange={setSelectedMonth}
          onYearChange={setSelectedYear}
          onApply={handleApplyFilter}
        />

        {/* ===== SECTIONS ===== */}
        <div className="space-y-6 mt-6">
          {/* Room Info Section */}
          <RoomInfoSection
            roomData={roomData}
            roomId={roomId}
            allocatedTenantInfo={roomManagementStore.tenantInfo}
            onUpdate={handleUpdateRoomInfo}
            onAllocate={handleAllocateTenant}
            onDeallocate={handleDeallocateTenant}
            isLoading={loading}
          />

          {/* Payment Section */}
          <PaymentSection
            paymentData={paymentData}
            electricityBill={electricityBill}
            additionalPayments={additionalPayments}
            onUpdateElectricity={handleUpdateElectricity}
            onAddPayment={handleAddPayment}
            onUpdatePayment={handleUpdatePayment}
            onDeletePayment={handleDeletePayment}
          />

          {/* Remarks Section */}
          <RemarksSection
            remarks={remarks}
            onUpdate={handleUpdateRemarks}
            isLoading={loading}
          />
        </div>
      </div>
    </div>
    </>
  );
};

export default RoomManagement;