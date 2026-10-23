// pages/UserProfile.jsx
import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaArrowLeft } from 'react-icons/fa';
import ProfileInfoCard from '../../components/cards/ProfileInfoCard';
import ChangePasswordCard from '../../components/cards/ChangePasswordCard';
import Header from '../../components/layouts/Header';
import { changeLoginPasswordAsyncThunk, getOwnerInfoAsyncThunk, updateOwnerProfileAsyncThunk } from '../../features/owner/ownerSlice';
import { getUserID } from '../../features/auth/authService';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

/**
 * ============================================
 * USER PROFILE PAGE
 * ============================================
 * Displays and edits user profile info
 * Allows password change
 */

const UserProfile = () => {
  // ============================================
  // STATE MANAGEMENT
  // ============================================
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const ownerStore=useSelector((state)=>state.owner)
  const dispatch=useDispatch()



  
  //update store data required time so we handle store updated data using useEffect
  useEffect(()=>{

        setUser(ownerStore.ownerInfo);

  },[ownerStore])
  // ============================================
  // API BASE URL (CHANGE THIS)
  // ============================================
//   const API_BASE_URL = 'https://your-api.com/api';

  // ============================================
  // FETCH USER PROFILE
  // ============================================
  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      /**
       * ============================================
       * API CALL - GET current user profile
       * ============================================
       * Endpoint: GET /api/user/profile
       * Response: { success: true, data: { user: {...} } }
       */
    //   const response = await fetch(`${API_BASE_URL}/user/profile`, {
    //     headers: {
    //       // Authorization: `Bearer ${token}`, // add if using JWT
    //     },
    //   });
    //   const result = await response.json();

    //   if (result.success) {
    //     setUser(result.data.user);
    //   } 
      
      
       const ownerId=getUserID()
        // data.status="Inactive"//new tenant status muast be Inactive
        const credentials ={
        ownerId:ownerId
        }
        const resultActionGetOwnerInfo=await dispatch(getOwnerInfoAsyncThunk(credentials))
        if (getOwnerInfoAsyncThunk.fulfilled.match(resultActionGetOwnerInfo)){
            //  setUser(result.data.user);
            
        }else {
         // ✅ Get the actual error message from Redux
        const errorMessage =
          resultActionGetOwnerInfo.payload ||
          resultActionGetOwnerInfo.error?.message ||
          'Something went wrong while fetch information.';

        // ✅ Show the error message in toast
        toast.error(`Failed to fetch profile information: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Error loading profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // INITIAL LOAD
  // ============================================
  useEffect(() => {
    fetchUserProfile();
  }, []);

  // ============================================
  // HANDLE PROFILE UPDATE
  // ============================================
  const handleUpdateProfile = async (data) => {
    setIsUpdatingProfile(true);
    try {
      /**
       * ============================================
       * API CALL - UPDATE user profile
       * ============================================
       * Endpoint: PUT /api/user/profile
       * Body: { username, email, mobile }
       */
    //   const response = await fetch(`${API_BASE_URL}/user/profile`, {
    //     method: 'PUT',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       // Authorization: `Bearer ${token}`,
    //     },
    //     body: JSON.stringify(data),
    //   });
    //   const result = await response.json();

    //   if (result.success) {
    //     setUser(result.data.user);
    //     alert('✅ Profile updated successfully!');
    //   } 
      
      const ownerId=getUserID()
        // data.status="Inactive"//new tenant status muast be Inactive
        const credentials ={
        ownerId:ownerId,
        ...data
        }
        const resultActionUpdateOwnerInfo=await dispatch(updateOwnerProfileAsyncThunk(credentials))
        if (updateOwnerProfileAsyncThunk.fulfilled.match(resultActionUpdateOwnerInfo)){
            //  setUser(result.data.user);
            toast.success('Profile updated successfully!');
            window.location.reload();//for re-load page 

            
        }else {
         // ✅ Get the actual error message from Redux
        const errorMessage =
          resultActionUpdateOwnerInfo.payload ||
          resultActionUpdateOwnerInfo.error?.message ||
          'Something went wrong while update profile.';

        // ✅ Show the error message in toast
        toast.error(`Failed to update profile information!`);
      }
    } catch (error) {
    //   console.error('Error updating profile:', error);
      toast.error('❌ ' + error.message);
      throw error; // re-throw so child can handle if needed
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  // ============================================
  // HANDLE PASSWORD CHANGE
  // ============================================
  const handleChangePassword = async (data) => {
    setIsChangingPassword(true);
    try {
      /**
       * ============================================
       * API CALL - CHANGE password
       * ============================================
       * Endpoint: PUT /api/user/change-password
       * Body: { oldPassword, newPassword }
       */
    //   const response = await fetch(`${API_BASE_URL}/user/change-password`, {
    //     method: 'PUT',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       // Authorization: `Bearer ${token}`,
    //     },
    //     body: JSON.stringify(data),
    //   });
    //   const result = await response.json();

    //   if (result.success) {
    //     alert('✅ Password changed successfully!');
    //   } 
      
       const ownerId=getUserID()
        // data.status="Inactive"//new tenant status muast be Inactive
        const credentials ={
        ownerId:ownerId,
        currentPassword:data.oldPassword,
        newPassword:data.newPassword
        }
        const resultActionChangeLoginPassword=await dispatch(changeLoginPasswordAsyncThunk(credentials))
        if (changeLoginPasswordAsyncThunk.fulfilled.match(resultActionChangeLoginPassword)){
            // window.location.reload();//for re-load page 
              toast.success('✅ Password changed successfully!');

            
        }else {
        // ✅ Get the actual error message from Redux
        console.log(resultActionChangeLoginPassword.payload )
        const errorMessage =
          resultActionChangeLoginPassword.payload ||
          resultActionChangeLoginPassword.error?.message ||
          'Something went wrong while change password.';

        // ✅ Show the error message in toast
        toast.error(`Failed to update password:please check old password is correct`);
      }
    } catch (error) {
    //   console.error('Error changing password:', error);
      toast.error('❌ ' + error.message);
      throw error;
    } finally {
      setIsChangingPassword(false);
    }
  };

  // ============================================
  // LOADING STATE
  // ============================================
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-500 mt-4">Loading profile...</p>
        </div>
      </div>
    );
  }

  // ============================================
  // RENDER
  // ============================================
  return (
    <>
    <Header isLoggedIn={true} />
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* ===== HEADER ===== */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => window.history.back()}
            className="p-2 hover:bg-gray-200 rounded-xl transition-colors"
          >
            <FaArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <FaUserCircle className="w-6 h-6 text-indigo-600" />
              My Profile
            </h1>
            <p className="text-sm text-gray-500">
              Manage your account information and password
            </p>
          </div>
        </div>

        {/* ===== PROFILE INFO ===== */}
        <div className="space-y-6">
          <ProfileInfoCard
            user={user}
            onUpdate={handleUpdateProfile}
            isSubmitting={isUpdatingProfile}
          />

          {/* ===== CHANGE PASSWORD ===== */}
          <ChangePasswordCard
            onSubmit={handleChangePassword}
            isSubmitting={isChangingPassword}
          />
        </div>
      </div>
    </div>
    </>
  );
};

export default UserProfile;