// apiService.ts
import api from "./Http"; 
import { toast } from "react-toastify";

export const AuthUserRegister = async (username: string, password: string) => {
  try {
    const response = await api.post("/api/v1/auth/register", {
      username,
      password,
    });

    toast.success("Registration Successful", {
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
