import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get_node_hierarchy } from "../services/Get-Node-Hierarchy";
import { useAuthContext } from "../Context/UseAuthContext";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify";

interface HierarchyData {
  id: number;
  parent: number | null;
  title: string;
  status: string;
}

export const NodeHierarchy = () => {
  const { node_id } = useParams();
  const { user } = useAuthContext();
  const [NodeHiearchy, setNodeHierarchy] = useState<HierarchyData[]>([]);

  const fetch_node_hierarchy = async () => {
    try {
      const response = await get_node_hierarchy(user.token, node_id);

      setNodeHierarchy(response.data);

      toast.success("Path has been fetched!", {
        style: {
          backgroundColor: "#0047AB",
          color: "white",
        },
      });
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetch_node_hierarchy();
  }, [node_id]);

  return (
    <div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </div>
  );
};
