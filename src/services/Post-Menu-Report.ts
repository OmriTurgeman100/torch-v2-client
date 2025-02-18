import api from "./Http";
import { toast } from "react-toastify";

export const post_report_from_menu = async (
  token: string,
  id: any,
  report_id: string,
  title: string,
  description: string
): Promise<any> => {
  try {
    const response = await api.post(
      "/api/v1/reports/nodes/BlackBox",
      {
        parent: id,
        report_id: report_id,
        title: title,
        description: description,
        value: 0,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("Request Was Successful", {
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
