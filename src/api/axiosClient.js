import axios from "axios";
import { getToken, removeToken } from "../features/auth/authService";
import { toast } from "react-toastify";


const axiosClient = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

// 2. Request Interceptor (Runs before every request is sent)
axiosClient.interceptors.request.use(
  (config) => {
    // Automatically retrieve the auth token (e.g., from LocalStorage)
    const token = getToken();

    if (token) {
      // Inject token into Authorization header
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request configuration errors
    return Promise.reject(error);
  }
);

// 3. Response Interceptor (Runs when a response arrives or an error occurs)
// axiosClient.interceptors.response.use(
//   (response) => {
//     // Axios puts the actual server data inside response.data.
//     // Returning response.data here saves you from typing .data in your components.
//     return response.data;
//   },
//   (error) => {
//     // Global Error Handling
//     if (error.response) {
//       const status = error.response.status;

//       if (status === 401) {
//         // Token expired or unauthorized -> clear storage and redirect to login
//         console.warn("Unauthorized! Logging out...");
//         removeToken()
//         window.location.href = "/login";
//       } else if (status === 403) {
//         console.error("Forbidden: You do not have permission.");
//       } else if (status >= 500) {
//         console.error("Server Error: Something went wrong on the backend.");
//       }
//     } else if (error.request) {
//       // The request was made but no response was received (Network Error)
//       console.error("Network Error: Please check your internet connection.");
//     } else {
//       console.error("Error:", error.message);
//     }

//     return Promise.reject(error);
//   }
// );

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      removeToken();
      toast.error("Session expired. Please log in again.");
      window.location.href = "/login";
    }

    const message = error?.response?.data?.message || "Something went wrong";
    toast.error(message);
    return Promise.reject(message);
  }
);


export default axiosClient;
