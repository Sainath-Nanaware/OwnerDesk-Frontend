import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "../../api/apiRequests";



export const signUp = createAsyncThunk(
  "/register",
  async (credentials, thunkAPI) => {
    try {
      console.log("Hi am in signup slice")
      const response = await registerUser(credentials);
      console.log("response of registration user in auth slice:",response)
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);



const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    //   .addCase(login.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(login.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.token = action.payload.token;
    //     // console.log("user role in slice:", action.payload.data.role);
    //     state.userRole = action.payload.data.role;
    //     console.log("user in slice", state.userRole);
    //   })
    //   .addCase(login.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    //   })
    //   .addCase(logout.fulfilled, (state) => {
    //     state.token = null;
    //     state.user = null;
    //   });
  },
});



export default authSlice.reducer;