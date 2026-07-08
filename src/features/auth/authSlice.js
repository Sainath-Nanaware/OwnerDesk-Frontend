import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../../api/apiRequests";
import { handleLogout, setToken, setUserInfo } from "./authService";



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

export const loginAsyncThunk=createAsyncThunk("/login",async(userCredentials,thunkAPI)=>{
  try{
    console.log("User data in login async thunk:",userCredentials)
    const response=await loginUser(userCredentials);
    //set token and user info in local storage is remaining
    // console.log("Login  success response:",response.data.data.token)
    setToken(response.data.data.token);
    setUserInfo(response.data.data.userID, response.data.data.userName);
    return response.data;

  }catch(error){
      return thunkAPI.rejectWithValue(error.response.data);
  }
})

export const logOutAsyncThunk=()=>{
   handleLogout()
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    error: null,
    loading:false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsyncThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAsyncThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        // console.log("user role in slice:", action.payload.data.role);
      })
      .addCase(loginAsyncThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // .addCase(logOutAsyncThunk.fulfilled, (state) => {
      //   state.token = null;
      //   state.user = null;
      // });
  },
});



export default authSlice.reducer;