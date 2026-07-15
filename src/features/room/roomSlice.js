import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllRoomsOfProperty } from "../../api/apiRequests";


export const getAllRoomsOfPropertyAsyncThunk = createAsyncThunk(
  "/getAllRoomsOfProperty",
  async (credentials, thunkAPI) => {
    try {
      console.log("Hi am in getAllPropertyOfRoomsThunk ");
      console.log(credentials);
      const response = await getAllRoomsOfProperty(
        credentials.propertyId,
        credentials.params
      );
      console.log("get all property rooms thunk API response data:", response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const roomSlice = createSlice({
  name: "room",
  initialState: {
    propertyInfo:{},
    allRooms: [],
    pagination: {
      totalRecords: 0,
      currentPage: 0,
      totalPages: 0,
      pageSize: 0,
      hasNextPage: false,
      hasPreviousPage: false,
    },
    error: false,
    loading: false,
  },
  reducers:{},
  extraReducers:(builder)=>{
    builder
      .addCase(getAllRoomsOfPropertyAsyncThunk.fulfilled, (state, action) => {
        state.propertyInfo = action.payload.data.property;
        state.allRooms = action.payload.data.rooms;
        console.log("extrabuilder data of room store",action.payload.data.property)
        state.pagination.totalRecords =
          action.payload.data.pagination.totalRecords;
        state.pagination.currentPage =
          action.payload.data.pagination.currentPage;
        state.pagination.totalPages = action.payload.data.pagination.totalPages;
        state.pagination.pageSize = action.payload.data.pagination.pageSize;
        state.pagination.hasNextPage =
          action.payload.data.pagination.hasNextPage;
        state.pagination.hasPreviousPage =
          action.payload.data.pagination.hasPreviousPage;
        state.error = false;
        state.loading = false;
      })
      .addCase(getAllRoomsOfPropertyAsyncThunk.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(getAllRoomsOfPropertyAsyncThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  }
});


export default roomSlice.reducer