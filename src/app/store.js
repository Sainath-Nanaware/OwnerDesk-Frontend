import { configureStore } from "@reduxjs/toolkit"
import authSlice from "../features/auth/authSlice"
import propertySlice from "../features/property/propertySlice"

export const store = configureStore({
  reducer: {
    auth:authSlice,
    property:propertySlice,

  },
})