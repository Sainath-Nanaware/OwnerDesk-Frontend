import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRoomInfo, updateRoomInfo } from "../../api/apiRequests";

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
      console.log(
        "get all info room thunk API response data:",
        response.data
      );
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
      console.log("Hi am in updateRoomAsyncThunk ");
      console.log(credentials.data);
      const response = await updateRoomInfo(
        credentials.data,
        credentials.roomID,        
      );
      console.log("get all updated info of room thunk API response data:", response.data);
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
    paymentStatus: {},
    error: false,
    loading: false,
  },
  reducers:{},
  extraReducers:(builder)=>{
    builder
      .addCase(getRoomInfoAsyncThunk.fulfilled, (state, action) => {
        // console.log("pp", action.payload.data.paymentStatus);
        state.propertyInfo = action.payload.data?.property ?? {};
        state.roomInfo = action.payload.data?.room ?? {};
        state.tenantInfo = action.payload.data?.tenant ?? {};
        state.electricityBill = action.payload.data?.electricityBill ?? {};
        state.paymentStatus = action.payload.data?.paymentStatus ?? {};
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
      });
  }
});

export default roomManagementSlice.reducer;