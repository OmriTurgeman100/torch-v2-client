import api from "./Http";
import { toast } from "react-toastify";

export const post_node_template = async (
  template_name: string,
  token: string
) => {
  try {
    const response = await api.post(
      "/api/v1/reports/nodes/templates",
      {
        template: template_name,
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
  } catch (error) {
    throw error;
  }
};
