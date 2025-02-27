import api from "./Http";

export const update_node_description = async (
  token: string,
  id: any,
  team: string | null,
  contact: string | null,
  description: string | null
) => {
  const response = await api.patch(
    `/api/v1/reports/nodes/description/${id}`,
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
