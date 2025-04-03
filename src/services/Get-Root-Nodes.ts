import api from "./Http";

export const fetch_root_nodes = async (token: string) => {
  const response = await api.get("/api/v1/reports/nodes", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// import api from "./Http";

// export const fetch_root_nodes = async (token: string) => {
//   console.log("Token:", token); // Just log the token

//   const response = await api.get("/api/v1/reports/nodes");

//   return response.data;
// };
