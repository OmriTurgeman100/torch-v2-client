import api from "./Http";

export const fetch_user_details = async (token: string) => {
  try {
    const response = await api.get("/api/v1/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
};
