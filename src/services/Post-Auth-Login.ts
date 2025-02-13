// apiService.ts
import api from "./Http"; // Assuming you have an api instance configured
import { toast } from "react-toastify";

export const AuthUserLogin = async (username: string, password: string) => {
  try {
    const response = await api.post("/api/v1/auth/login", {
      username,
      password,
    });

    toast.success("Login Successful", {
      style: {
        backgroundColor: "#0047AB",
        color: "white",
      },
    });

    return response;
  } catch (error: any) {
    toast.error(error.message);
    throw error;
  }
};
