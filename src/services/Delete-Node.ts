import api from "./Http";

export const delete_node = async (node_id: number, token: string) => {
  try {
    const response = await api.delete(`/api/v1/reports/nodes/${node_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // toast.success("Node deleted successfully!", {
    //   style: {
    //     backgroundColor: "#0047AB",
    //     color: "white",
    //     fontWeight: "bold",
    //   },
    // });

    return response;
  } catch (error) {
    throw error;
  }
};
