import axiosClient from "./axiosClient";


//Auth API

export const registerUser = (data) => axiosClient.post("/user/register", data);
export const loginUser=(data)=>axiosClient.post("/user/login",data);


//property API
export const getAllProperty = (ownerID,page,limit) =>
  axiosClient.get(`/property/owner/${ownerID}?page=${page}&limit=${limit}`);
export const addNewProperty=(data)=>axiosClient.post("/property/add", data);

