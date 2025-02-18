import api from "./Http";
import { toast } from "react-toastify";

export const post_report_rules = async (
  operator: string,
  parsed_value: number,
  action: string,
  parent: any,
  report_id: any,
  token: string
) => {
  try {
    const data = {
      operator: operator,
      conditions: [
        {
          report_id: report_id,
          threshold: parsed_value,
        },
      ],
      action: action,
    };

    console.log(operator, parsed_value, action, parent, report_id, token);
    const response = await api.post(
      `/api/v1/reports/nodes/Rules/${parent}`,
      data,
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
  } catch (error: any) {
    toast.error(error.message);

    throw error;
  }
};
