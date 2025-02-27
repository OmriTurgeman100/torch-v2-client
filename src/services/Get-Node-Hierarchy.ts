import api from "./Http";

export const get_node_hierarchy = async (token: string, node_id: any) => {
  const response = await api.get(`/api/v1/reports/nodes/hierarchy/${node_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
