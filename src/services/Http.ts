import axios from "axios";

export default axios.create({
  baseURL: import.meta.env.VITE_BACKEND || "http://localhost:3000",
});
// * set env before up being built.

// import axios from "axios";

// // Create instance
// // const api = axios.create({
// //   baseURL: import.meta.env.VITE_BACKEND || "http://localhost:3000",
// // });

// // // Interceptor to attach token to every request
// // api.interceptors.request.use((config) => {
// //   const token = localStorage.getItem("token"); // or use a cookie, or context, depending on your setup
// //   if (token) {
// //     config.headers.Authorization = `Bearer ${token}`;
// //   }
// //   return config;
// // });

// // export default api;
