import axios from "axios";

export default axios.create({
  baseURL: import.meta.env.VITE_BACKEND || "http://localhost:3000",
});
