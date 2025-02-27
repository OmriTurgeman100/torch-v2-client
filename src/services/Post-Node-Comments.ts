import api from "./Http";

export const post_node_comment = async (
  token: string,
  node_id: number | null | undefined,
  comment: string
) => {
  const response = await api.post(
    `/api/v1/reports/nodes/comments/${node_id}/null`,
    { comment: comment },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
