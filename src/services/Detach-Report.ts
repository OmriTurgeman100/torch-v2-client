import api from "./Http";

export const detach_report = async (report_id: string, token: string) => {
  try {
    const response = await api.patch(
      `/api/v1/reports/nodes/detach/${report_id}`,
      {},
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
