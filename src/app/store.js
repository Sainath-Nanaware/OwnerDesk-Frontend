import { configureStore } from "@reduxjs/toolkit"
import authSlice from "../features/auth/authSlice"
import propertySlice from "../features/property/propertySlice"
import roomSlice from "../features/room/roomSlice"

export const store = configureStore({
  reducer: {
    auth:authSlice,
    property:propertySlice,
    room:roomSlice,

  },
})