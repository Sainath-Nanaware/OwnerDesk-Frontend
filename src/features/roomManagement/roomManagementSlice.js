import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { allocateRoom, deallocateRoom, deleteAdditionalCharge, getRoomInfo, updateAdditionalCharge, updateElectricityBill, updateRemarks, updateRoomInfo } from "../../api/apiRequests";

export const getRoomInfoAsyncThunk = createAsyncThunk(
  "/getRoomInfo",
  async (credentials, thunkAPI) => {
    try {
      // console.log("Hi am in getRoomInfoAsyncThunk ");
      // console.log(credentials);
      const response = await getRoomInfo(
        credentials.roomID,
        credentials.ownerID,
        credentials.month,
        credentials.year
      );
      // console.log(
      //   "get all info room thunk API response data:",
      //   response.data
      // );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateRoomInfoAsyncThunk = createAsyncThunk(
  "/updateRoomInfo",
  async (credentials, thunkAPI) => {
    try {
      // console.log("Hi am in updateRoomAsyncThunk ");
      // console.log(credentials.data);
      const response = await updateRoomInfo(
        credentials.data,
        credentials.roomID,        
      );
      // console.log("get all updated info of room thunk API response data:", response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const allocateRoomAsyncThunk = createAsyncThunk(
  "/allocateRoom",
  async (credentials, thunkAPI) => {
    try {
      // console.log("Hi am in allocateRoomAsyncThunk ");
      // console.log(credentials);
      const response = await allocateRoom(credentials)
      // console.log(
      //   "allocate room thunk API response data:",
      //   response.data
      // );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deallocateRoomAsyncThunk = createAsyncThunk(
  "/deallocateRoom",
  async (credentials, thunkAPI) => {
    try {
      // console.log("Hi am in deallocateRoomAsyncThunk ");
      // console.log(credentials);
      const response = await deallocateRoom(credentials);
      // console.log("deallocate room async thunk API response data:", response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateElectricityBillAsyncThunk = createAsyncThunk(
  "/updateElectricictyBill",
  async (credentials, thunkAPI) => {
    try {
      // console.log("Hi am in deallocateRoomAsyncThunk ");
      console.log("pop:",credentials);
      const response = await updateElectricityBill(credentials);
      // console.log("deallocate room async thunk API response data:", response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateAdditionalChargeAsyncThunk = createAsyncThunk(
  "/updateAdditionalCharge",
  async (credentials, thunkAPI) => {
    try {
      // console.log("Hi am in updateAdditionalChargeAsyncThunk ");
      // console.log("pop:", credentials);
      const response = await updateAdditionalCharge(
        credentials.paymentStatusId,
        credentials.chargeId,
        credentials.data
      );
      // console.log(" updateAdditionalChargeAsyncThunk API response data:", response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAdditionalChargeAsyncThunk = createAsyncThunk(
  "/deleteAdditionalCharge",
  async (credentials, thunkAPI) => {
    try {
      // console.log("Hi am in deleteAdditionalChargeAsyncThunk ");
      // console.log("pop:", credentials);
      const response = await deleteAdditionalCharge(
        credentials.paymentStatusId,
        credentials.chargeId
      );
      // console.log(" deleteAdditionalChargeAsyncThunk API response data:", response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateRoomRemarksAsyncThunk = createAsyncThunk(
  "/updateRoomRemarks",
  async (credentials, thunkAPI) => {
    try {
      // console.log("Hi am in updateRemarksChargeAsyncThunk ");
      // console.log("pop:", credentials);
      const response = await updateRemarks(
        credentials.roomId,
        credentials.remarks
      );
      // console.log(" updateRemarksChargeAsyncThunk API response data:", response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


const roomManagementSlice = createSlice({
  name: "roomManagemenet",
  initialState: {
    propertyInfo: {},
    roomInfo: {},
    tenantInfo: {},
    electricityBill: {},
    paymentStatus: [],
    roomAllocate:1,
    roomDeallocate:1,
    error: false,
    loading: false,
  },
  reducers:{},
  extraReducers:(builder)=>{
    builder
      .addCase(getRoomInfoAsyncThunk.fulfilled, (state, action) => {
        // console.log("pp", action.payload.data.paymentStatus);
        state.propertyInfo = action.payload.data?.property ?? null;
        state.roomInfo = action.payload.data?.room ?? null;
        state.tenantInfo = action.payload.data?.tenant ?? null;
        state.electricityBill = action.payload.data?.electricityBill ?? 0;
        state.paymentStatus = action.payload.data?.paymentStatus ?? [];
        state.error = false;
        state.loading = false;
      })
      .addCase(updateRoomInfoAsyncThunk.fulfilled, (state, action) => {
        state.roomInfo = action.payload.data ?? {};
        state.error=false;
      })
      .addCase(updateRoomInfoAsyncThunk.rejected, (state, action) => {
        // console.log("actiondata:",action.payload) we get only error message here
        state.error=action.payload;
      })
      .addCase(allocateRoomAsyncThunk.fulfilled,(state,action)=>{
        state.roomAllocate=2;//we just update for get live data from roomManagement store
      })
      .addCase(deallocateRoomAsyncThunk.fulfilled,(state,action)=>{
        state.roomDeallocate = 2; //we just update for get live data from roomManagement store
        
      })
  }
});

export default roomManagementSlice.reducer;