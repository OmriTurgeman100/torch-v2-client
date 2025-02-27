import api from "./Http";

export const post_node_description = async (
  token: string,
  node_id: any,
  team: string,
  contact: string,
  description: string
) => {
  const response = await api.post(
    `/api/v1/reports/nodes/description/${node_id}`,
    {
      team: team,
      contact: contact,
      description: description,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response;
};
