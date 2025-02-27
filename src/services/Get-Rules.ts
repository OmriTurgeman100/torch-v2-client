import api from "./Http";

export const fetch_rules = async (token: string, id: string | undefined) => {
  const response = await api.get(`/api/v1/reports/nodes/Rules/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
