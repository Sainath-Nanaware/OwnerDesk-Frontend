import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllProperty } from "../../api/apiRequests";


export const getAllPropertyAsyncThunk = createAsyncThunk(
  "/getAllProperties",
  async (credentials, thunkAPI) => {
    try {
      console.log("Hi am in getAllPropertyThunk ")
      console.log(credentials)
      const response = await getAllProperty(credentials.ownerID,credentials.page,credentials.limit);
      console.log("get all property thunk API response data:",response.data)
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


const propertySlice = createSlice({
  name: "property",
  initialState: {
    properties: [],
    pagination: {
      totalRecords: 0,
      currentPage: 0,
      totalPages: 0,
      pageSize: 0,
      hasNextPage: false,
      hasPreviousPage: false,
    },
    error:false,
    loading:false
  },
  reducers:{},
  extraReducers:(builder) => {
    builder.addCase(getAllPropertyAsyncThunk.fulfilled,(state,action)=>{
        state.properties = action.payload.data.properties;
        // console.log(action.payload.data.properties)
        state.pagination.totalRecords=action.payload.data.pagination.totalRecords;
        state.pagination.currentPage=action.payload.data.pagination.currentPage;
        state.pagination.totalPages=action.payload.data.pagination.totalPages;
        state.pagination.pageSize=action.payload.data.pagination.pageSize;
        state.pagination.hasNextPage =
          action.payload.data.pagination.hasNextPage;
        state.pagination.hasPreviousPage =
          action.payload.data.pagination.hasPreviousPage;
        state.error=false;
        state.loading=false;
        // console.log("updated:state,",state.properties)

    })
    .addCase(getAllPropertyAsyncThunk.pending,(state)=>{
        state.error=false;
        state.loading=true;
    })
    .addCase(getAllPropertyAsyncThunk.rejected,(state,action)=>{
        state.error = action.payload;
        state.loading = false;
    })
  }
});



export default propertySlice.reducer