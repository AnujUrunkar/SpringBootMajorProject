import axios from "axios";

// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth"); // Fetch the token from localStorage
    console.log("deva shree ganesha in axiosSetUp.js");
    console.log(token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add the token to the Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
