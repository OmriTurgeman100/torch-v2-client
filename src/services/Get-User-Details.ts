import api from "./Http";

export const fetch_user_details = async (token: string) => {
  const response = await api.get("/api/v1/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};
