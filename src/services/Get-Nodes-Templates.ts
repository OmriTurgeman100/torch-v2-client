import api from "./Http";

export const get_nodes_templates = async (token: string) => {
  const response = await api.get("/api/v1/reports/nodes/templates", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
