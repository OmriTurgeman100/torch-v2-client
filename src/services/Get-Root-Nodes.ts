import api from "./Http";

export const fetch_root_nodes = async (token: string) => {
  try {
    const response = await api.get("/api/v1/reports/nodes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
