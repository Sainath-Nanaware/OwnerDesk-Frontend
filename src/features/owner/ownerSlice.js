import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { changeLoginPassword, getOwnerInfo, updateOwnerProfile } from "../../api/apiRequests";


export const getOwnerInfoAsyncThunk = createAsyncThunk(
  "/getOwnerInfo",
  async (credentials, thunkAPI) => {
    try {
    //   console.log("Hi am in getOwnerInfoThunk ");
    //   console.log(credentials);
      const response = await getOwnerInfo(credentials.ownerId)
    //   console.log("get all ownerInfo thunk API response data:", response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateOwnerProfileAsyncThunk = createAsyncThunk(
  "/updateOwnerInfo",
  async (credentials, thunkAPI) => {
    try {
      //   console.log("Hi am in updateOwnerInfoThunk ");
        // console.log(credentials);
      const response = await updateOwnerProfile(credentials);
      //   console.log("update ownerInfo thunk API response data:", response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const changeLoginPasswordAsyncThunk = createAsyncThunk(
  "/changeLoginPassword",
  async (credentials, thunkAPI) => {
    try {
      //   console.log("Hi am in changeLoginPasswordThunk ");
      console.log(credentials);
      const response = await changeLoginPassword(credentials);
      //   console.log(" changeLoginPasswordThunk API response data:", response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


const ownerSlice=createSlice({
    name:"owner",
    initialState:{
        ownerInfo:{}
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getOwnerInfoAsyncThunk.fulfilled,(state,action)=>{
            state.ownerInfo = action.payload?.data ?? {};
        })
    }
})


export default ownerSlice.reducer