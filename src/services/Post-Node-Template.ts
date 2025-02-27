import api from "./Http";

export const post_node_template = async (
  template_name: string,
  token: string
) => {
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

  return response;
};
