import api from "./Http";

export const set_node_excluded = async (
  node_status: string,
  node_id: number,
  token: string
) => {
  const response = await api.patch(
    `/api/v1/reports/nodes/Exclude/${node_id}/${node_status}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response;
};
