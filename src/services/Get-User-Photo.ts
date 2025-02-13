import api from "./Http";

export const fetch_user_photo = async (token: string) => {
  try {
    const response = await api.get("/api/v1/users/profile-photo", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const path: string = response.data.path;

    const baseURL = api.defaults.baseURL;
    const fullUrl = new URL(path, baseURL).href;

    return fullUrl;
  } catch (error) {
    console.error("Error fetching photo:", error);
    throw error;
  }
};
