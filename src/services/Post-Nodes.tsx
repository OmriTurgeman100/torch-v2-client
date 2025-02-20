import api from "./Http";
import { toast } from "react-toastify";

export const post_nodes = async (
  title: string,
  description: string,
  id: string | undefined | null | number,
  token: string
) => {
  try {

    console.log(title, description, id, token)
    const response = await api.post(
      "/api/v1/reports/nodes",
      {
        title: title,
        description: description,
        parent: id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("Successful", {
      style: {
        backgroundColor: "#0047AB",
        color: "white",
      },
    });

    return response;
  } catch (error: any) {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
};
