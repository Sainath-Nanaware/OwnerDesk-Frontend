import axios from "axios";
import axiosClient from "./axiosClient";


//Auth API

export const registerUser = (data) => axiosClient.post("/user/register", data);
export const loginUser=(data)=>axiosClient.post("/user/login",data);


//property API
export const getAllProperty = (ownerID,page,limit) =>
  axiosClient.get(`/property/owner/${ownerID}?page=${page}&limit=${limit}`);
export const addNewProperty=(data)=>axiosClient.post("/property/add", data);
export const updateProperty = (data, propertyID) =>
  axiosClient.patch(`/property/${propertyID}`,data);
export const searchProperty = (ownerID,city,page,limit) =>
  axiosClient.get(
    `property/owner/${ownerID}/search?city=${city}&page=${page}&limit=${limit}`
  );

// Rooms API

export const getAllRoomsOfProperty=(propertyId,params)=>axiosClient.get(`/room/property/${propertyId}/rooms?${params}`)
export const createRoom = (data) => axiosClient.post("/room/add",data);

//Room-Management API

export const getRoomInfo = (roomID, ownerID, month, year) =>
  axiosClient.get(
    `/room/dashboard/${roomID}?ownerId=${ownerID}&month=${month}&year=${year}`
  );
export const updateRoomInfo = (data, roomID) =>
  axiosClient.patch(`/room/${roomID}`,data);

export const allocateRoom = (data) =>
  axiosClient.post(`/room/allocate`,data);

export const deallocateRoom = (data) =>
  axiosClient.patch(`/room/deallocate`,data);

//we use single API for update and create electricity bill
export const updateElectricityBill = (data) =>
  axiosClient.post(`/electBill/add`,data);

//update single additional charge 
export const updateAdditionalCharge = (paymentStatusId, chargeId, data) =>
  axiosClient.patch(
    `/electBill/additionalCharges/${paymentStatusId}/charge/${chargeId}`,data
  );

//delete single additional charge
export const deleteAdditionalCharge = (paymentStatusId, chargeId) =>
  axiosClient.delete(
    `/electBill/paymentStatus/${paymentStatusId}/charge/${chargeId}`
  );

//Tenant API

export const getAllTenantList = (ownerID, searchParameters) =>
  axiosClient.get(
    `/tenant/info/${ownerID}/all?${searchParameters}`
  );