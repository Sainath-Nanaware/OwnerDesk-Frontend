import { configureStore } from "@reduxjs/toolkit"
import authSlice from "../features/auth/authSlice"
import propertySlice from "../features/property/propertySlice"
import roomSlice from "../features/room/roomSlice"
import roomManagementSlice from "../features/roomManagement/roomManagementSlice"
import tenantSlice from "../features/tenant/tenantSlice"

export const store = configureStore({
  reducer: {
    auth:authSlice,
    property:propertySlice,
    room:roomSlice,
    roomManagement:roomManagementSlice,
    tenant:tenantSlice

  },
})