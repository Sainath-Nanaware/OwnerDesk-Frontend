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