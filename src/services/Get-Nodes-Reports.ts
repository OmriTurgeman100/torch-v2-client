import api from "./Http";

export const fetch_nodes_report = async (
  token: string,
  id: string | undefined
) => {
  const response = await api.get(`/api/v1/reports/nodes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};
