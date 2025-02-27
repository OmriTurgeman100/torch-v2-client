import api from "./Http";

export const handle_delete_node_comment = async (
  token: string,
  comment_id: number
) => {
  const response = await api.delete(
    `/api/v1/reports/nodes/comments/${comment_id}/null`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response;
};
