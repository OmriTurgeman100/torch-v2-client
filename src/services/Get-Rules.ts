import api from "./Http";
import { toast } from "react-toastify";

export const fetch_rules = async (token: string, id: string | undefined) => {
  try {
    const response = await api.get(`/api/v1/reports/nodes/Rules/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    toast.success("Rules fetched successfully!", {
      style: {
        backgroundColor: "#0047AB",
        color: "#fff",
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
