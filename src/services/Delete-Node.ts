import api from "./Http";

export const delete_node = async (node_id: number, token: string) => {
  try {
    const response = await api.delete(`/api/v1/reports/nodes/${node_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
};
