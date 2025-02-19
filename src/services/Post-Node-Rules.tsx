import api from "./Http";
import { toast } from "react-toastify";

export const post_node_rules = async (
  token: string,
  id: string | undefined,
  payload: object
) => {
  try {
    const response = await api.post(
      `/api/v1/reports/nodes/Rules/${id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("Rules created successfully!", {
      style: {
        backgroundColor: "#0047AB",
        color: "white",
        fontWeight: "bold",
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
};
