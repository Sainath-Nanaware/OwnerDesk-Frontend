import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllTenantList } from "../../api/apiRequests";

export const getAllTenantListAsyncThunk=createAsyncThunk(
 "/getAllTenantList",
  async (credentials, thunkAPI) => {
    try {
      console.log("Hi am in getAllTenantList AsyncThunk ");
      console.log(credentials.data);
      const response = await getAllTenantList(
        credentials.ownerID,
        credentials.searchParameters
      );
      console.log("get all list of tenant thunk API response data:", response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const tenantSlice = createSlice({
    name:"tenant",
    initialState:{
        allTenantList:[]
    },
    error:false,
    loading:false,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllTenantListAsyncThunk.fulfilled,(state,action)=>{
            // console.log("All tenant list from builder:", action);
            state.allTenantList = action.payload.data?.tenants?? [];
        })
    }

})

export default tenantSlice.reducer;
