import api from "./Http";

export const fetch_nodes_report = async (
  token: string,
  id: string | undefined
) => {
  try {
    const response = await api.get(`/api/v1/reports/nodes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
};
