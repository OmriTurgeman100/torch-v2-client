import api from "./Http";

export const post_nodes = async (
  title: string,
  description: string,
  id: string | undefined | null | number,
  token: string
) => {
  console.log(title, description, id, token);
  const response = await api.post(
    "/api/v1/reports/nodes",
    {
      title: title,
      description: description,
      parent: id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response;
};
