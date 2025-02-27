import api from "./Http";

export const get_graph_data_report = async (
  token: string,
  report_id: string | null | undefined
) => {
  const response = await api.get(`/api/v1/reports/nodes/Graph/${report_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
