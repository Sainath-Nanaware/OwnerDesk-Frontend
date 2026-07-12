import axiosClient from "../../api/axiosClient";

const TOKEN_KEY = "token";
const USER_ID = "userID";
const USERNAME = "userName";

export const setToken = (token) => {
  // console.log(token);
  localStorage.setItem(TOKEN_KEY, token);
  axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const setUserInfo = (id,userName) => {
  localStorage.setItem(USER_ID, id);
  localStorage.setItem(USERNAME,userName);
};

export const removeUserInfo=()=>{
  localStorage.removeItem(USER_ID);
  localStorage.removeItem(USERNAME);

}

export const getUserName=()=>{
  return localStorage.getItem(USERNAME)
}

export const getUserID=()=>{
  return localStorage.getItem(USER_ID)
}

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  delete axiosClient.defaults.headers.common["Authorization"];
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const handleLogout=()=>{
 localStorage.removeItem(TOKEN_KEY);
 delete axiosClient.defaults.headers.common["Authorization"];
 localStorage.removeItem(USER_ID);
 localStorage.removeItem(USERNAME);
}
