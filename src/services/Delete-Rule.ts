import api from "./Http";

export const delete_rule = async (token: string, rule_id: number) => {
  try {
    const response = await api.delete(
      `/api/v1/reports/nodes/Rules/${rule_id}`,
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
