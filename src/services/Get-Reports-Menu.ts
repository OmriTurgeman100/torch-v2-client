import api from "./Http";

export const fetch_report_menu = async (token: string) => {
  const response = await api.get("/api/v1/reports/nodes/Data", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};
