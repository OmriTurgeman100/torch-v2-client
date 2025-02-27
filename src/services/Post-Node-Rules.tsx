import api from "./Http";

export const post_node_rules = async (
  token: string,
  id: string | undefined,
  payload: object
) => {
  const response = await api.post(
    `/api/v1/reports/nodes/Rules/${id}`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response;
};
