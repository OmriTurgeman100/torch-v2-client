import api from "./Http";

export const get_node_description = async (token: string, node_id: any) => {
  try {
    const response = await api.get(
      `/api/v1/reports/nodes/description/${node_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
