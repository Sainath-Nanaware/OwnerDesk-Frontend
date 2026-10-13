import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createTenant, getAllTenantList, getTenantInfo } from "../../api/apiRequests";

export const getAllTenantListAsyncThunk=createAsyncThunk(
 "/getAllTenantList",
  async (credentials, thunkAPI) => {
    try {
      console.log("Hi am in getAllTenantList AsyncThunk ");
      console.log(credentials);
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

export const createNewTenantAsyncThunk = createAsyncThunk(
  "/createNewTenant",
  async (credentials, thunkAPI) => {
    try {
      // console.log("Hi am in createNewTenant AsyncThunk ");
      // console.log(credentials);
      const response = await createTenant(
        credentials.data,
      );
      // console.log(
      //   "create new tenant thunk API response data:",
      //   response.data
      // );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getTenantInfoAsyncThunk = createAsyncThunk(
  "/getTenantInfo",
  async (credentials, thunkAPI) => {
    try {
      // console.log("Hi am in getTenantInfo AsyncThunk ");
      console.log(credentials);
      const response = await getTenantInfo(credentials.ownerId,credentials.tenantId);
      // console.log("get tenant info thunk API response data:", response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const tenantSlice = createSlice({
  name: "tenant",
  initialState: {
    allTenantList: [],
    stats: {
      totalTenantCount: 0,
      activeTenantCount: 0,
      inactiveTenantCount: 0,
    },
    pagination: {
      totalRecords: 0,
      currentPage: 0,
      totalPages: 0,
      pageSize: 0,
      hasNextPage: false,
      hasPreviousPage: false,
    },

    // get single tenant info data:
    tenantInfo:{},
    roomInfo:{},
    propertyInfo:{},

    error: false,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTenantListAsyncThunk.fulfilled, (state, action) => {
        // console.log("All tenant list from builder:", action);
        state.allTenantList = action.payload.data?.tenants ?? [];
        state.stats.totalTenantCount =
          action.payload.data?.stats?.totalTenantCount ?? 0;
        state.stats.activeTenantCount =
          action.payload.data?.stats?.activeTenantCount ?? 0;
        state.stats.inactiveTenantCount =
          action.payload.data?.stats?.inactiveTenantCount ?? 0;
        state.pagination.totalRecords =
          action.payload.data?.pagination.totalRecords;
        state.pagination.currentPage =
          action.payload.data?.pagination.currentPage;
        state.pagination.totalPages =
          action.payload.data?.pagination.totalPages;
        state.pagination.pageSize = action.payload.data?.pagination.pageSize;
        state.pagination.hasNextPage =
          action.payload.data?.pagination.hasNextPage;
        state.pagination.hasPreviousPage =
          action.payload.data?.pagination.hasPreviousPage;
        state.error = false;
        state.loading = false;
      })
      .addCase(getTenantInfoAsyncThunk.fulfilled,(state,action)=>{
        state.tenantInfo=action.payload.data?.tenantInfo ?? {};
        state.roomInfo=action.payload.data?.roomInfo ?? {};
        state.propertyInfo=action.payload.data.propertyInfo ?? {};
        state.error = false;
        state.loading = false;
      });
  },
});

export default tenantSlice.reducer;
