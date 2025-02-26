import api from "./Http";

export const get_node_comments = async (
  token: string,
  node_id: any,
  filter: string
) => {
  try {
    const response = await api.get(
      `/api/v1/reports/nodes/comments/${node_id}/${filter}`,
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
