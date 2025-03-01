import api from "./Http";

export const get_active_node_path = async (token: string, node_id: any) => {
  const response = await api.get(`/api/v1/reports/nodes/path/${node_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
