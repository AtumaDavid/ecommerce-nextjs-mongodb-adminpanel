// import axios from "axios";
// import Cookies from "js-cookie";

// export const axiosInstance = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api", // Replace with your API's base URL
//   timeout: 10000, // Timeout in milliseconds
//   headers: {
//     "Content-Type": "application/json",
//     // Accept: "application/json",
//   },
// });

// // Add an interceptor to include the token in headers
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = Cookies.get("token"); // Retrieve token from cookies
//     if (token) {
//       // If the token exists, set the Authorization header with Bearer token
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     // Handle errors that occur during the request configuration
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;

import axios from "axios";
import Cookies from "js-cookie";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api",
  timeout: 10000,
});

// Add an interceptor to include the token in headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Specifically for file uploads
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
