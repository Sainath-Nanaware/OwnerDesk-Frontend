import axiosClient from "./axiosClient";


//Auth API

export const registerUser = (data) => axiosClient.post("/user/register", data);
export const loginUser=(data)=>axiosClient.post("/user/login",data);
