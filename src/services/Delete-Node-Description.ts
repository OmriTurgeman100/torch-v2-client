import api from "./Http";

export const delete_node_description = async (
  token: string,
  node_description_id: number | null | undefined
) => {
  try {
    const response = await api.delete(
      `/api/v1/reports/nodes/description/${node_description_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
};
